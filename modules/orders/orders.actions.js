const Order = require("./orders.model");

async function readOrdersbyIDMongo(data) {
  const Order = await Order.findOne({
    $or: [{ identification: data }, { mail: data }],
  }).lean();

  return Order;
}

async function readOrdersMongo() {
  const Orders = await Order.find();

  return Orders;
}

async function createOrderMongo(userId, value, libros) {

  const formatBook = libros.map(libro => ({idBook: libro}))

  console.log(formatBook)

  const newOrder = await Order.create({idUser: userId, totalPrice: value,  books: formatBook});

  return newOrder;
}

async function updateOrderMongo(OrderId, data) {
  const OrderUpdated = await Order.updateOne({ identification: OrderId }, data);

  return OrderUpdated;
}

async function deleteOrderMongo(OrderId) {
  const OrderDeleted = await Order.updateOne(
    { identification: OrderId },
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
