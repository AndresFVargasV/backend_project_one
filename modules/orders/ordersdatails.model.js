import mongoose from 'mongoose';

const detallePedidoSchema = new mongoose.Schema({
  idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
  idOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }
});

const DetallePedido = mongoose.model('DetallePedido', detallePedidoSchema);

export default DetallePedido;
