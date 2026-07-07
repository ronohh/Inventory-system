import Supplier from '../models/Supplier.js';
import Category from '../models/Category.js';
import Product from '../models/Products.js';

const addProduct = async (req, res) => {
    try{
        const { name, description, price, stock, categoryId, supplierId } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            categoryId,
            supplierId,
        });
        await newProduct.save();
        return res.status(201).json({success:true, message:'product added succesfully'})
    }catch (error) {
        console.error("server error adding product", error.message)
        return res.status(500).json({success: false, message: 'server error'});
    }
}

const getProducts = async (req,res) => {
    try{
        const products = await Product.find().populate('categoryId').populate('supplierId');
        const suppliers =await Supplier.find();
        const categories = await Category.find();
        return res.status(200).json({success: true, products, suppliers, categories});
    }catch(error){
        console.log("error fetching Products", error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export { getProducts,addProduct };