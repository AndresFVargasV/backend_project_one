const express = require("express");
const router = express.Router();
const {
  readUsersbyID,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.controller");

async function getUsersbyID(req, res) {
  try {

    const users = await readUsersbyID(req.params.id);
    res.status(200).json({
      ...users
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function postUsers(req, res) {
  try {
    const users = await createUser(req.body);

    if (users.modifiedCount === 0) {
        throw new Error("No se pudo crear el usuario");
    }

    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function patchUsers(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if (!token) {
      throw new Error("Token de autenticación no proporcionado");
    }

    const users = await updateUser(req.body, req.params.id, token);

    if (users.modifiedCount === 0) {
      throw new Error("No se pudo actualizar el usuario");
    }

    res.status(200).json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function deleteUsers(req, res) {
  try {

    const userID = req.params.id;

    // Extraer el token del encabezado "Authorization"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Separar el token del prefijo 'Bearer'

    if (!token) {
        throw new Error("Token de autenticación no proporcionado");
    }

    if (!userID) {
      throw new Error("No se proporcionó el ID del usuario");
    }

    const users = await deleteUser(userID, token);

    if (users.modifiedCount === 0) {
        throw new Error("No se pudo borrar el usuario");
    }

    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

router.get("/:id", getUsersbyID);
router.post("/", postUsers);
router.patch("/:id", patchUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
