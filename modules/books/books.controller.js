const { readBookbyIDMongo, readBooksMongo, createBookMongo } = require("./books.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
const { readUsersbyID } = require("../users/users.controller");

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

async function updateBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.identification;

  if (userId !== data.idUser) {
    throw new Error("No puedes actualizar este libro");
  }

  const updateResult = await updateBookMongo(userId, data);
  return updateResult;
}

module.exports = { readBookbyID, readBooks, createBook };
