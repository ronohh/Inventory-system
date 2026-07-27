import Product from '../models/Products.js';
import OrderModel from '../models/Order.js';

const addOrder = async (req, res) => {
    try {
        const {productId,  Quantity, total} = req.body;
        const userId = req.user._id;
        const product = await Product.findById({_id: productId});
        if(!product) {
            return res.status(404).json({error: "product not found in order"});
        }

        if(Quantity > product.stock) {
            return res.status(400).json({error: " Not enough stock"});
        } else {
            product.stock -= parseInt(Quantity);
            await product.save();
        }

        const orderObj = new OrderModel({
            customer: userId,
            product: productId,
            Quantity,
            totalPrice: total
        })
        await orderObj.save();
        return res.status(200).json({success: true, message: "order added successfully"});

    } catch(error) {
        console.log(error)
        return res.status(500).json({success: false, error: "server error adding order"})
    }
}

const getOrders = async (req, res) => {
    try{
        const userId = req.user._id;
        const orders = await Order.find({ customer: userId}).populate({path: 'product', populate: {path: 'category', select: 'categoryName'}, select: 'name price'}).populate('user', 'name email');
        return res.status(200).json({success: true, orders});
    } catch(error) {
        console.log(error);
        return res.status(500).json({success: false, error: "server error in fetching orders "});
    }
}

export {addOrder, getOrders}