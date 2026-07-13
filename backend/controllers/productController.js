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
        const products = await Product.find({isDeleted: false}).populate('categoryId').populate('supplierId');
        const suppliers =await Supplier.find();
        const categories = await Category.find();
        return res.status(200).json({success: true, products, suppliers, categories});
    }catch(error){
        console.log("error fetching Products", error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const{name,description, price, stock, categoryId, supplierId} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        stock,
        categoryId,
        supplierId,
    }, {new: true});

    if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'product not found'});
    }
    return res.status(200).json({ success: true, message: 'Product updated successfully', product: updateProduct})
} catch (error) {
    console.error('error updating product', error.message);
    return res.status(500).json({success: false, message: 'server error'});
}
}

const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'product not found'});
        }
        if (existingProduct.isDelete){
            return res.status(400).json({ success: true, message: 'product already deleted'});
        }
        await Product.findByIdAndDelete(id, {isDeleted: true}, {new: true});
        return res.status(200).json({ success: true, message: 'product deleted successfully'});
    } catch (error) {
        console.error('Error deleting Product', error);
        return res.status(500).json({ success: false, message: 'server error'})
    }
}

export { getProducts,addProduct , updateProduct, deleteProduct  };