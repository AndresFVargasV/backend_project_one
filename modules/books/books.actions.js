const Book = require("./books.model");

async function createBookMongo(userId, book) {
  book.idUser = userId;
  return Book.create(book);
}

module.exports = { createBookMongo };
