import Product from '../models/Products.js';
import OrderModel from '../models/Order.js';

const getData = async (req, res) => {
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
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
        ]);
        const revenue = revenueResult[0]?.totalRevenue || 0;

        const outOfStockProducts = await Product.find({ stock: 0 }).select('name stock').populate('categoryId', 'categoryName');

        const lowStockProducts = await Product.find({ stock: { $gt: 0, $lte: 5 } }).select('name stock').populate('categoryId', 'categoryName');

        const recentOrders = await OrderModel.find().populate('customer', 'name').populate('product', 'name').sort({ orderDate: -1 }).limit(5);

        res.json({
            totalProducts,
            totalStock,
            ordersToday,
            revenue,
            highestSaleProducts: [],
            lowStockProducts: [],
            outOfStockProducts,
            recentOrders
        });
};

export { getData };