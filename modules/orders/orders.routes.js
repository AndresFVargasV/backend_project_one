const express = require("express");
const router = express.Router();
const {
  createOrder,
} = require("./orders.controller");

async function getOrdersbyID(req, res) {
  try {
    const orders = await readOrdersbyID(req.params.id);

    res.status(200).json({ ...orders });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await readOrders();

    res.status(200).json({ ...orders });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function postOrders(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const orders = await createOrder(req.body, token);

    if (orders.modifiedCount === 0) {
      throw new Error("No se pudo crear la orden");
    }

    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function patchOrders(req, res) {
  try {
    // Extraer el token del encabezado "Authorization"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Separar el token del prefijo 'Bearer'

    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticación no proporcionado" });
    }

    const orders = await updateOrder(req.body, token);

    if (orders.modifiedCount === 0) {
      throw new Error("No se pudo actualizar la orden");
    }

    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function deleteBook(req, res) {
  try {
    const bookID = req.params.id;

    // Extraer el token del encabezado "Authorization"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Separar el token del prefijo 'Bearer'

    if (!token) {
        throw new Error("Token de autenticación no proporcionado");
    }

    if (!bookID) {
      throw new Error("No se proporcionó un ID de usuario");
    }

    const books = await deleteUser(bookID, token);
    
    if (books.modifiedCount === 0){
        throw new Error("No se pudo borrar el usuario");
    }

    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

router.get("/", getAllOrders);
router.get("/:id", getOrdersbyID);
router.post("/", postOrders);
router.patch("/", patchOrders);
router.delete("/:id", deleteBook);

module.exports = router;
