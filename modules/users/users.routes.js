const express = require('express')
const router = express.Router()
const {readUsers} = require('./users.controller')

async function getUsers(req, res) {
    try {
        const users = await readUsers(req.query)
        res.status(200).json({...users})
    } catch (error) {
        res.status(500).send(error.message)
    }
}


router.get('/', getUsers)


module.exports = router