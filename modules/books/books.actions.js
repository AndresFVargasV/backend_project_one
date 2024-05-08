const Book = require("./books.model");

async function readBookbyIDMongo(id) {
  return Book.findById(id);
}

async function readBooksMongo(query) {
  return Book.find(query);
}

async function createBookMongo(userId, book) {
  return Book.create({ ...book, idUSer: userId });
}

async function updateBookMongo(userId, book) {
  return Book.updateOne({ idUser: userId, _id: book._id }, book);
}

module.exports = { readBookbyIDMongo, readBooksMongo, createBookMongo };
