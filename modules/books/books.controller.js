const { createBookMongo } = require("./books.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");

dotend.config();

async function createBook(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.identification;

  const creationResult = await createBookMongo(userId, data);
  return creationResult;
}

module.exports = { createBook };
