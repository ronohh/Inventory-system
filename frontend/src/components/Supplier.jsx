import react from 'react'
import { useState, useEffect } from "react"
import axios from 'axios';


const Suppliers = () => {
    // state variable

    const [addModal, setAddModal] = useState(false);
    const [editSupplier, setEditSupplier] = useState(null);
    const [formData, setFormData] = useState({name: "", email: "", phone: "", location: ""});
    const [ loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/supplier", {
                headers: {
                    Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                }
            });
            console.log(response.data.suppliers);
            setSuppliers(response.data.suppliers);
            setFilteredSuppliers(response.data.suppliers)
        }catch(error) {
            console.error("Error fetching suppliers:", error);
            setLoading(false)
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSuppliers();
    },[]);

    const handleEdit = (supplier) => {
        setFormData({
            name: supplier.name,
            email: supplier.email,
            number: supplier.number,
            location: supplier.location,
        });
        setEditSupplier(supplier._id);
        setAddModal(true);
    }

    const closeModal = () => {
        setAddModal(false);
        setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    location: "",
                });
                setEditSupplier(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editSupplier){
            try{
            const response = await axios.put(
                `http://localhost:3000/api/supplier/${editSupplier}`,
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ${localStorage.getItem("pos-token")}'
                    },
                }
            );
            if (response.data.success){
                fetchSuppliers();
                alert("Supplier edited successfully");
                setAddModal(false);
                setEditSupplier(null);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    location: "",
                });
            }else {
                console.error("Error editing supplier", data);
                alert("error editing suplier.please try again")
            }
        } catch (error) {
            console.error("Error editing supplier: ", error);
            alert("error editing supplier.");
        }
        }else {
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
                fetchSuppliers();
                alert("Supplier added successfully");
                setAddModal(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    location: "",
                });
            }else {
                console.error("Error adding supplier", data);
                alert("error adding suplier.please try again")
            }
        } catch (error) {
            console.error("Error adding supplier: ", error);
            alert("error adding supplier.");
        }
    }
    };
    const handleDelete = async (id) =>{
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier")
        if (confirmDelete){
            try{
                const response = await axios.delete(
                    'http://localhost:3000/api/supplier/${id}',
                    {
                        headers: {
                            Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                        },
                    }
                );
                if (response.data.success){
                    alert("supplier deleted sucessfully");
                    fetchSuppliers();
                }else {
                    console.error("error deleting supplier:", data);
                    alert("error deleting supplier. please try again")
                }
            }catch (error) {
                console.error("Error deleting supplier:", data)
                alert("error deleting supplier. please try again");
            }
        }
    }
    const handleSearch = (e) => {
        setFilteredSuppliers(
            suppliers.filter((supplier) =>
                supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }
    return (
        <div className="w-full h-full flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold p-4">Supplier Management</h1>
            <div className="flex justify-between items-center">    
                <input text="text" placeholder="search" className="border p-1 bg-white rounded px-4" onChange={handleSearch}/>
                <button className=" py-1.5 bg-blue-500 text-white px-4 rounded" onClick={() => setAddModal(true)}>Add Supplier</button>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Supplier Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Phone Number</th>
                            <th className="border border-gray-300 p-2">location</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier._id}>
                                <td className="border border-gray-300 p-2">{supplier.name}</td>
                                <td className="border border-gray-300 p-2">{supplier.email}</td>
                                <td className="border border-gray-300 p-2">{supplier.number}</td>
                                <td className="border border-gray-300 p-2">{supplier.location}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2" onClick={() => handleEdit(supplier)}>Edit</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer" onClick={() => handleDelete(supplier._id)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                        }
                    </tbody>
                </table>
                {filteredSuppliers.length === 0 && <div> No records </div>}
            </div>

            {addModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Supplier</h1>
                        <button className="absolute top-4 right-4 font-bold" onClick={closeModal}>X</button>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input text="text" name="name" value={formData.name} onChange={handleChange} placeholder="Supplier Name" className="border p-1 bg-white rounded px-4"/>
                            <input text="email" name="email" value={formData.email} onChange={handleChange} placeholder="Supplier Email" className="border p-1 bg-white rounded px-4" />
                            <input text="number" name="number" value={formData.number} onChange={handleChange} placeholder="Supplier Phone number" className="border p-1 bg-white rounded px-4" />
                            <input text="text" name="location" value={formData.location} onChange={handleChange} placeholder="Supplier location" className="border p-1 bg-white rounded px-4" />
                            {/* <button className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer" >Add Supplier</button> */}

                            <div className="flex space-x-2">
                                <button type="submit" className="w-full mt-2 rounded-md bg-green-500 text-white p-3 hover:bg-green-600">
                                    {editSupplier ? "save Changes" : "Add Supplier"}
                                </button>
                                {editSupplier && (
                                    <button type="button" className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600" onClick={closeModal}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Suppliers