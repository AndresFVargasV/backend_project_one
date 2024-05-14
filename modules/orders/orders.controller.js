const {
  readOrdersMongo,
  readOrdersbyIDMongo,
  createOrderMongo,
  updateOrderMongo,
  deleteOrderMongo,
} = require("./orders.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
const readBookbyID = require("../books/books.controller").readBookbyID;
const readUsersbyID = require("../users/users.controller").readUsersbyID;
const updateBook = require("../books/books.controller").updateBook;
const _ = require("lodash");

dotend.config();

async function readOrders(query, token) {
  const filter = {};

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const user = await readUsersbyID(userId);

  if (!user.active || _.toString(user._id) !== userId) {
    throw new Error("Usuario no autenticado.");
  }

  if (query.startDate && query.endDate) {
    filter.createdAt = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }

  if (query.active) {
    filter.active = query.active;
  }

  
  const orders = await readOrdersMongo(filter);

  if (orders.length === 0) {
    throw new Error("No se encontraron ordenes con estas caracteristicas.");
  }

  return orders;
}

async function readOrdersbyID(data) {
  const orders = await readOrdersbyIDMongo(data);

  if (orders.length === 0) {
    throw new Error("No se encontró la orden.");
  }

  return orders;
}

async function createOrder(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const user = await readUsersbyID(userId);

  if (!user.active || _.toString(user._id) !== userId) {
    throw new Error("Usuario no autenticado.");
  }

  const librosPromises = data.libros.map((libro) => readBookbyID(libro));
  const libros = await Promise.all(librosPromises);

  //Quiero verificar que todos los libros pertenezcan al mismo usuario
  const librosUser = libros.filter((libro) => _.toString(libro.idUSer) === _.toString(libros[0].idUSer));

  if (librosUser.length !== data.libros.length) {
    throw new Error("Los libros no le pertenecen a un unico usuario.");
  }

  const totalPrice = libros.reduce(
    (acc, libro) => acc + parseFloat(libro.price.toString()),
    0
  );

  const creationResult = await createOrderMongo(
    userId,
    totalPrice,
    data.libros
  );
  return creationResult;
}

//Esta funcion se encarga de actualizar una orden y es usada por el usuario que realizo el pedido. Solo tiene permisos de cancelar.
async function updateOrder(idOrder, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const user = await readUsersbyID(userId);

  if (!user.active || _.toString(user._id) !== userId) {
    throw new Error("Usuario no autenticado.");
  }

  const infoOrder = await readOrdersbyID(idOrder);

  if (_.toString(infoOrder.idUser) === userId && data.state === "Canceled") {

    if (infoOrder.state === "Canceled") {
      throw new Error("Esta orden ya esta cancelada.");
    }

    return updateCanceled(infoOrder, idOrder, data);
  }

  const idBook = infoOrder.books.map((book) => book.idBook);

  const librosPromises = idBook.map((libro) => readBookbyID(libro));
  const libros = await Promise.all(librosPromises);

  const librosActivos = libros.filter((libro) => libro.active);


  if (librosActivos.length !== idBook.length) {
    throw new Error("Algunos libros ya fueron vendidos.");
  }

  // Quiero verficiar que los libros le pertenecen al usuario que esta vendiendo
  const librosUser = libros.filter((libro) => _.toString(libro.idUSer) === userId);

  if (librosUser.length !== idBook.length) {
    throw new Error("Algunos libros no le pertenecen entonces no puede actualizar esta pedido.");
  }

  const updateResult = await updateOrderMongo(idOrder, data);

  for (const libro of libros) {
    console.log(libro);
    await updateBook(libro._id, { active: false }, token);
  }

  return updateResult;
}


// Esta funcion se encarga de cancelar y es usada por la persona que vende libros y quien compra.
async function updateCanceled(infoOrder, idOrder, data) {
  if (infoOrder.state === "Canceled" && data === "Canceled") {
    throw new Error("Esta orden ya esta cancelada.");
  }

  const updateResult = await updateOrderMongo(idOrder, data);
  return updateResult;
}

async function deleteOrder(idOrder, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const user = await readUsersbyID(userId);

  if (!user.active || _.toString(user._id) !== userId) {
    throw new Error("Usuario no autenticado.");
  }

  const infoOrder = await readOrdersbyID(idOrder);

  if (!infoOrder) {
    throw new Error("No se encontro la orden");
  }

  if (_.toString(infoOrder.idUser) !== userId) {
    throw new Error("No puedes eliminar esta orden");
  }

  const deletionResult = await deleteOrderMongo(idOrder);

  return deletionResult;
}

module.exports = { createOrder, updateOrder, readOrdersbyID, readOrders, deleteOrder };
