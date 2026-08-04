import Product from '../models/Products.js';
import OrderModel from '../models/Order.js';

const getData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        
        const stockResult = await Product.aggregate([
            {$group: {_id: null, totalStock: {$sum: "$stock"}}}
        ]);
        const totalStock = stockResult[0]?.totalStock || 0;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const ordersToday = await OrderModel.countDocuments({
            OrderDate: { $gte: startOfDay, $lte: endOfDay }
        });

        const revenueResult = await OrderModel.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        const revenue = revenueResult[0]?.totalRevenue || 0;


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getData };