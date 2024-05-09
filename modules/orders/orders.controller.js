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

dotend.config();

async function readOrdersbyID(data) {
  const orders = await readOrdersbyIDMongo(data);

  if (!orders) {
    throw new Error("No se encontró la orden");
  }

  return orders;
}

async function createOrder(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const librosPromises = data.libros.map((libro) => readBookbyID(libro));
  const libros = await Promise.all(librosPromises);

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

async function updateOrder(idOrder, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const infoOrder = await readOrdersbyID(idOrder);

  if (userId !== infoOrder.idUser) {
    throw new Error("No tienes permisos para actualizar esta orden");
  }

  if (infoOrder.state === "Completed" && data.state === "Completed") {
    throw new Error("Esta order ya esta completada.");
  }

  if (infoOrder.state === "Canceled" && data.state === "Canceled") {
    throw new Error("Esta orden ya esta cancelada.");
  }

  const updateResult = await updateOrderMongo(idOrder, data);
  return updateResult;
}

module.exports = { createOrder, updateOrder, readOrdersbyID};
