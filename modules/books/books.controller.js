const { readBookbyIDMongo, readBooksMongo, createBookMongo, updateBookMongo, deleteBookMongo } = require("./books.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
const { readUsersbyID } = require("../users/users.controller");
const _ = require("lodash");

dotend.config();

async function readBookbyID(data) {
  const searchResult = await readBookbyIDMongo(data);

  if (!searchResult) {
    throw new Error("No existe el libro");
  }

  return searchResult;
}

async function readBooks(data) {
    const searchResult = await readBooksMongo(data);

    if (searchResult.length === 0) {
        throw new Error("No existen libros");
    }

    return searchResult;
}

async function createBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.identification;

  const user = await readUsersbyID(userId);

  

  const creationResult = await createBookMongo(user._id, data);
  return creationResult;
}

async function updateBook(idBook, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.identification;

  const infoUser = await readUsersbyID(userId);

  const infoBook = await readBookbyID(idBook);

  if (_.isEqual(infoUser._id, infoBook.idUSer) === false) {
    throw new Error("No puedes actualizar este libro");
  }

  const updateResult = await updateBookMongo(infoBook, data);
  return updateResult;
}

async function removeBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.identification;

  const infoUser = await readUsersbyID(userId);

  const infoBook = await readBookbyID(data);

  if (_.isEqual(infoUser._id, infoBook.idUSer) === false) {
    throw new Error("No puedes eliminar este libro");
  }

  if (!infoBook.active) {
    throw new Error("El libro ya fue eliminado");
  }

  const deletionResult = await deleteBookMongo(data);

  return deletionResult;
}

module.exports = { readBookbyID, readBooks, createBook, updateBook, removeBook };
