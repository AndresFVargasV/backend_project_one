const express = require('express');
const router = express.Router();
const { readBookbyID, createBook } = require('./books.controller');

async function getBookbyID(req, res) {
    try {
        const book = await readBookbyID(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({mensaje: error.message});
    }
}

async function postBook(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const book = await createBook(req.body, token);

        res.status(200).json({mensaje: 'Exito. 👍'});
    } catch (error) {
        res.status(500).json({mensaje: error.message});
    }
}

router.get('/:id', getBookbyID);
router.post('/', postBook);

module.exports = router;