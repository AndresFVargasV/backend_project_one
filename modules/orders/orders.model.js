const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String, enum: ["In Progress", "Completed", "Canceled"], required: true, default: "In Progress" },
  totalPrice: { type: mongoose.Types.Decimal128, required: true },
  books: [{
    _id: false,
    idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  }],
  active: { type: Boolean, default: true }
}, 
{
  versionKey: false,
  timestamps: true
});

const Pedido = mongoose.model('Order', pedidoSchema);

module.exports = Pedido;
