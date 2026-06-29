import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: {type:String, required:true },
    email: {type:String, required: true },
    number: {type: String, required: true },
    location: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const SupplierModel = mongoose.model("Supplier", supplierSchema);

export default SupplierModel;