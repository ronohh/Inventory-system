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

export {addSupplier};