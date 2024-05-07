const mongoose = require('mongoose');
const { readUsers } = require('../users/users.controller');

const pedidoSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  state: { type: String, enum: ["In Progress", "Completed", "Canceled"], required: true },
  date: { type: Date, required: true },
  totalPrice: { type: mongoose.Types.Decimal128, required: true },
  active: { type: Boolean, default: true }
}, 
{
  versionKey: false,
  timestamps: true
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
