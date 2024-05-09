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

async function createOrder(data, token) {

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const librosPromises = data.libros.map((libro) => readBookbyID(libro));
  const libros = await Promise.all(librosPromises);

  const totalPrice = libros.reduce((acc, libro) => acc + parseFloat(libro.price.toString()), 0);


  const creationResult = await createOrderMongo(userId, totalPrice, data.libros);
  return creationResult;
}

module.exports = { createOrder };
