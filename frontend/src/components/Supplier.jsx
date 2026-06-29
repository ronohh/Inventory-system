import react from 'react'
import { useState } from "react"
import axios from 'axios';


const Suppliers = () => {
    // state variable

    const [addEditModal, setAddEditModal] = useState(null);
    const [formData, setFormData] = useState({name: "", email: "", phone: "", location: ""})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:3000/api/supplier/add",
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ${localStorage.getItem("pos-token")}'
                    }
                }
            );
            if (response.data.success){
                alert("Supplier added successfully");
                setAddEditModal(null);
            }else {
                console.error("Error adding supplier", data);
                alert("error adding suplier.please try again")
            }
        } catch (error) {
            console.error("Error adding supplier: ", error);
            alert("error adding supplier.")
        }
    }
    return (
        <div className="w-full h-full flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold p-4">Supplier Management</h1>
            <div className="flex justify-between items-center">    
                <input text="text" placeholder="search" className='border p-1 bg-white rounded px-4'/>
                <button className=" py-1.5 bg-blue-500 text-white px-4 rounded" onClick={() => setAddEditModal(1)}>Add Supplier</button>
            </div>

            {addEditModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Supplier</h1>
                        <button className="absolute top-4 right-4 font-bold" onClick={() => setAddEditModal(null)}>X</button>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input text="text" name="name" value={formData.name} onChange={handleChange} placeholder="Supplier Name" className="border p-1 bg-white rounded px-4"/>
                            <input text="email" name="email" value={formData.email} onChange={handleChange} placeholder="Supplier Email" className="border p-1 bg-white rounded px-4" />
                            <input text="number" name="number" value={formData.number} onChange={handleChange} placeholder="Supplier Phone number" className="border p-1 bg-white rounded px-4" />
                            <input text="text" name="location" value={formData.location} onChange={handleChange} placeholder="Supplier location" className="border p-1 bg-white rounded px-4" />
                            <button className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer" >Add Supplier</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Suppliers