const { readOrdersMongo,
    readOrdersbyIDMongo,
    createOrderMongo,
    updateOrderMongo,
    deleteOrderMongo, } = require("./orders.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");

dotend.config();

async function createOrder(data, token) {

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.identification;


    const creationResult = await createOrderMongo(userId, data);
    return creationResult;
}


module.exports = { createOrder };