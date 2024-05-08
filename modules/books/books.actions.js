const Book = require("./books.model");

async function readBookbyIDMongo(id) {
  return Book.findById(id);
}

async function createBookMongo(userId, book) {
  book.idUser = userId;
  return Book.create(book);
}

module.exports = { readBookbyIDMongo, createBookMongo };
