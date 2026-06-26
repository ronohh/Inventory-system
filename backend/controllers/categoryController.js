import Category from '../models/Category.js';

const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exists' });
        } 
        const newCategory = new Category({
            categoryName,
            categoryDescription,
        });

        await newCategory.save();
        return res.status(201).json({ success: true, message: 'Category added successfully' });

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({success: true, categories});
    }catch(error){
        console.error('Error fetching categories:',error);
        return res.status(500).json({ success: false, message: 'server errror getting categories'})
    }
}

const updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const {categoryName, categoryDescription} = req.body;
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({success: false, message: 'Category not found'});
        }
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {categoryName, categoryDescription},
            {new: true}
        );
        return res.status(200).json({success: true, message: 'Category updated successfully', category: updateCategory});
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({success: false, message: 'Internal server error'});
        
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const existingCategory = await Category.findById(id);
        if(!existingCategory) {
            return res.status(404).json({ success: false, message: 'Category not found'});
        }

        await Category.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'category deleted successfully'});
    }catch (error) {
        console.error('error deleting category', error);
        return res.status(500).json({success: false, message: 'server error'});
    }
}

export { addCategory, getCategories, updateCategory, deleteCategory };