const Order = require("./orders.model");

async function readOrdersbyIDMongo(data) {
  const OrderbyID = await Order.findOne({ _id: data }).lean();
  return OrderbyID;
}

async function readOrdersMongo() {
  const Orders = await Order.find();

  return Orders;
}

async function createOrderMongo(userId, value, libros) {

  const formatBook = libros.map(libro => ({idBook: libro}))

  const newOrder = await Order.create({idUser: userId, totalPrice: value,  books: formatBook});

  return newOrder;
}

async function updateOrderMongo(OrderId, data) {
  const OrderUpdated = await Order.updateOne({ _id: OrderId }, data);

  return OrderUpdated;
}

async function deleteOrderMongo(OrderId) {
  const OrderDeleted = await Order.updateOne(
    { _id: OrderId },
    { active: false }
  );

  return OrderDeleted;
}

module.exports = {
  readOrdersMongo,
  readOrdersbyIDMongo,
  createOrderMongo,
  updateOrderMongo,
  deleteOrderMongo,
};
