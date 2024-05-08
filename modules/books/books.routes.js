const express = require("express");
const router = express.Router();
const { readBookbyID, readBooks, createBook } = require("./books.controller");

async function getBookbyID(req, res) {
  try {
    const book = await readBookbyID(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function getBooks(req, res) {
  try {
    const books = await readBooks(req.query);

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function postBook(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const book = await createBook(req.body, token);

    if (book.modifiedCount === 0) {
      throw new Error("No se pudo crear el libro");
    }

    res.status(200).json({ mensaje: "Exito. 👍" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function putBook(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const book = await updateBook(req.body, token);

    if (book.modifiedCount === 0) {
      throw new Error("No se pudo actualizar el libro");
    }

    res.status(200).json({ mensaje: "Exito. 👍" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

router.get("/:id", getBookbyID);
router.get("/", getBooks);
router.post("/", postBook);

module.exports = router;
