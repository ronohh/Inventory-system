import Supplier from '../models/Supplier.js'

const addSupplier = async (req, res ) => {
    try{
        const { name, email, number, location } = req.body;

        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier){
            return res.status(400).json({ sucess:false, message: 'suppier already exist'});
        }

        const newSupplier = new Supplier({
            name,
            email,
            number,
            location
        });

        await newSupplier.save();
        return res.status(201).json({ success:true, message: 'supplier added succesfully'})
    }catch (error) {
        console.error('Error adding Supplier');
        return res.status(500).json({ success: false, message: 'server error'});
    }
}

const getSuppliers = async (req, res) => {
    try{
        const suppliers = await Supplier.find();
        return res.status(200).json({success: true, suppliers})
    }catch (error) {
        console.error('Error fetching suppliers', error);
        return res.status(500).json({ success: false, message: 'server error in getting suppliers'});
    }
}

const updateSupplier = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, number, location} = req.body;
        const existingSupplier = await Supplier.findById(id);
        if (!existingSupplier) {
            return res.status(404).json({success: false, message: 'Supplier not found'});
        }
        const updateSupplier = await Supplier.findByIdAndUpdate(
            id,
            {name, email, number, location},
            {new: true}
        );
        return res.status(200).json({success: true, message: 'Supplier updated successfully', supplier: updateSupplier});
    } catch (error) {
        console.error('Error updating supplier:', error);
        return res.status(500).json({success: false, message: 'Internal server error'});
        
    }
}
const deleteSupplier = async (req, res) => {
    try {
        const {id} = req.params;
        const existingSupplier = await Supplier.findById(id);
        if(!existingSupplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found'});
        }

        await Supplier.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Supplier deleted successfully'});
    }catch (error) {
        console.error('error deleting supplier', error);
        return res.status(500).json({success: false, message: 'server error'});
    }
}

export {addSupplier, getSuppliers, updateSupplier, deleteSupplier};