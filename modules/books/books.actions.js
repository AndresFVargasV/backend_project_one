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

async function updateBookMongo(infoBook, data) {
  return Book.updateOne({_id: infoBook._id }, data);
}

async function deleteBookMongo(id){
  return Book.updateOne({_id: id}, {active: false});
}

module.exports = { readBookbyIDMongo, readBooksMongo, createBookMongo, updateBookMongo, deleteBookMongo };
