const express = require("express");
const router = express.Router();
const { readUsers, createUser } = require("./users.controller");

async function getUsers(req, res) {
  try {
    const users = await readUsers(req.query);
    res.status(200).json({ 
        ...users 
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postUsers(req, res){
    try {
        const users = await createUser(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}

router.get("/", getUsers);
router.post("/", postUsers);

module.exports = router;
