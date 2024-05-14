const {
  readBookbyIDMongo,
  readBooksMongo,
  createBookMongo,
  updateBookMongo,
  deleteBookMongo,
} = require("./books.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
const { readUsersbyID } = require("../users/users.controller");
const _ = require("lodash");

dotend.config();

async function readBookbyID(data) {
  const searchResult = await readBookbyIDMongo(data);

  if (searchResult.length === 0) {
    throw new Error("No existe el libro.");
  }

  return searchResult;
}

async function readBooks(data) {
  if (!data.hasOwnProperty("active")) {
    data.active = true;
  }

  if (data.datePublisher) {
    data.datePublisher = {
      $gte: new Date(`${data.datePublisher}T00:00:00.000Z`)
    };
  }

  const searchResult = await readBooksMongo(data);

  if (searchResult.length === 0) {
    throw new Error("No existen libros con esas caractertisticas.");
  }

  return searchResult;
}

async function createBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const user = await readUsersbyID(userId);

  if (!user.active || _.toString(user._id) !== userId) {
    throw new Error("El usuario no está activo o no existe.");
  }

  const creationResult = await createBookMongo(userId, data);
  return creationResult;
}

async function updateBook(idBook, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const infoBook = await readBookbyID(idBook);

  if (_.toString(infoBook.idUSer) !== userId || !infoBook.active) {
    throw new Error("No puedes actualizar este libro.");
  }

  const updateResult = await updateBookMongo(infoBook, data);
  return updateResult;
}

async function removeBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken._id;

  const infoBook = await readBookbyID(data);

  if (_.toString(infoBook.idUSer) !== userId) {
    throw new Error("No puedes eliminar este libro.");
  }

  if (!infoBook.active) {
    throw new Error("El libro ya fue eliminado.");
  }

  const deletionResult = await deleteBookMongo(data);

  return deletionResult;
}

module.exports = {
  readBookbyID,
  readBooks,
  createBook,
  updateBook,
  removeBook,
};
