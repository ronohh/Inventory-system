import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    Quantity: {type: Number, required: true},
    totalPrice: {type: Number, required: true },
    orderDate: {type: Date, default: Date.now}
});

const OrderModel = mongoose.model('order', OrderSchema);
export default OrderModel;