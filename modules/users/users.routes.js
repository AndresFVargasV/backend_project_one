const express = require("express");
const router = express.Router();
const { readUsers, readUsersbyID, createUser, updateUser, deleteUser } = require("./users.controller");

async function getUsersbyID(req, res) {
  try {
    const users = await readUsersbyID(req.params.id);
    res.status(200).json({ 
        ...users 
    });
  } catch (error) {
    res.status(500).json({mensaje: error.message});
  }
}

async function getAllUsers(req, res) {
    try {
        const users = await readUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({mensaje: error.message});
    }
}

async function postUsers(req, res){
    try {

        const users = await createUser(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch (error) {
        res.status(500).json({mensaje: error.message});
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
        res.status(500).json({mensaje: error.message});
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
        res.status(500).json({mensaje: error.message});
    }
}

router.get("/", getAllUsers);
router.get("/:id", getUsersbyID);
router.post("/", postUsers);
router.patch("/", patchUsers);
router.delete("/", deleteUsers);

module.exports = router;
