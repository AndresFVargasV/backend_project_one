const express = require("express");
const router = express.Router();
const { readUsers, createUser, updateUser, deleteUser } = require("./users.controller");

async function getUsers(req, res) {
  try {
    const users = await readUsers();
    res.status(200).json({ 
        ...users 
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postUsers(req, res){
    try {
        console.log(req.body);

        const users = await createUser(req.body);

        if (!users) {
            throw new Error("No se pudo crear el usuario");
        }

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}


async function patchUsers(req, res) {
    try {
        const users = await updateUser(req.body);

        if (!users) {
            throw new Error("No se pudo actualizar el usuario");
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteUsers(req, res) {
    try {
        const users = await deleteUser(req.body);

        if (!users) {
            throw new Error("No se pudo eliminar el usuario");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


router.get("/", getUsers);
router.post("/", postUsers);
router.patch("/", patchUsers);
router.delete("/", deleteUsers);

module.exports = router;
