import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const [openModal, setOpenModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        supplierId: "", 
    });

    const fetchProducts = async () => {
        try{
            const response = await axios.get("http://localhost:3000/api/product", {
                headers: {
                    Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                },
            });
            if(response.data.success){
                setCategories(response.data.categories);
                setSuppliers(response.data.suppliers);
                setProducts(response.data.products)
                setFilteredProducts(response.data.products)
            }else{
                console.error("Error fetching products", error.message);
                alert("error fetching products")
            }
            
        }catch(error){
            console.log("error fetching products", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleEdit = (product) => {
        setOpenModal(true);
        setEditProduct(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId._id,
            supplierId: product.supplierId._id,
        });
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure  you want to delete this product?"
        );
        if (confirmDelete) {
            try{
            const response = await axios.delete(
                `http://localhost:3000/api/product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
                if (response.data.success) {
                    alert("Supplier deleted succesfully!");
                    fetchProducts();
                }else {
                    console.error("Error deleting Supplier", data);
                    alert("Error deleting Supplier. Please try again.");
                } 
            }catch (error){
                    console.error(" error deleting product", data);
                    alert(" Error deleting Product.try again")
                }
        }
    }

    const closeModel = () => {
        setOpenModal(false);
        setEditProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editProduct){
            try {
            const response = await axios.put(
                `http://localhost:3000/api/product/${editProduct}`,
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                    },
                }
            );
            if (response.data.success) {
                fetchProducts();
                alert("product updated successfully");
                setOpenModal(false);
                setEditProduct(null);
                setFormData ({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    categoryId: "",
                    supplierId: "",
                });
            }else {
                alert("Error updating product.please try again");
            }
        }catch (error) {
            alert("server error updating product.please try updating product again")
        }
        }
        else{
        try {
            const response = await axios.post(
                "http://localhost:3000/api/product/add",
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                    },
                }
            );
            if (response.data.success) {
                fetchProducts();
                alert("product added successfully");
                setOpenModal(false);
                setFormData ({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    categoryId: "",
                    supplierId: "",
                });
            }else {
                alert("Error adding product.please try again");
            }
        }catch (error) {
            alert("server error adding product.please try adding product again")
        }
    }
    };

    const handleSearch = (e) => {
        setFilteredProducts(
            products.filter((product) =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase()))
        )
    }

    return(
        <div className= "w-full h-full flex flex-col gap-4 p-4">
            
            <h1 className="text-2xl font-bold">Product Management</h1>
            <div className=" flex justify-between items-center">
                
                <input type="text" placeholder="search" className="border p-1 bg-white rounded px-4" onClick={handleSearch}></input>
    

                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 " onClick={() =>setOpenModal(true)}>Add PRODUCT</button>   

            </div>

            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">S NO</th>
                            <th className="border border-gray-300 p-2">Product Name</th>
                            <th className="border border-gray-300 p-2">Category Name</th>
                            <th className="border border-gray-300 p-2">Supplier Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Stock</th>
                            <th className="border border-gray-300 p-2"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts && filteredProducts.map((product,index) => (
                            <tr key={product._id}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.categoryId.categoryName}</td>
                                <td className="border border-gray-300 p-2">{product.supplierId.name}</td>
                                <td className="border border-gray-300 p-2">{product.price}</td>
                                <td className="border border-gray-300 p-2">
                                    <span className="px-2 py-1">
                                        {product.stock <= 5 ? (
                                           <span className="bg-red-100 text-red-500">{product.stock}</span>
                                        ):
                                            <span className="bg-green-100 text-green-500">{product.stock}</span>
                                        }
                                    </span>
                                </td>
                                <td className="border border-gray-300 p-2 px-2">
                                    <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2" onClick={ () => handleEdit(product)} >Edit</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && <div>No records</div> }
            </div>

            { openModal && (
                <div className="fixed top-0 left-0  w-full h-full bg-black/50  flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Product</h1>
                        <button className="absolute top-4 right-4 font-bold text-lg " onClick={closeModel}>X</button>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit} >
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="product Name" className="border p-1 bg-white  rouded px-4"/>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="product Description" className="border p-1 bg-white  rouded px-4"/>
                            <input type="number" name="price" placeholder="product Price" value={formData.price} onChange={handleChange} className="border p-1 bg-white  rouded px-4"/>
                            <input type="number" name="stock" min="0" placeholder="product Stock"  value={formData.stock} onChange={handleChange} className="border p-1 bg-white  rouded px-4"/>
                            <div className="w-full border">
                                <select name="categoryId" onChange={handleChange} value={formData.categoryId} className="w-full p-2">
                                    <option value=""> Select Category</option>
                                    {categories && categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full border">
                            <select name="supplierId" onChange={handleChange} value={formData.supplierId} className="w-full p-2">
                                    <option value=""> Select Supplier</option>
                                    {suppliers && suppliers.map((supplier) => (
                                        <option key={supplier._id} value={supplier._id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                <button type="submit" className="bg-green-500 hover:bg-green-600 rounded text-white py-2 px-4">
                                    { editProduct ? "save Changes": "Add Product"}
                                </button>
                                <button type="button" className="bg-red-500 hover:bg-red-600 rounded text-white py-2 px-4" onClick={closeModel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product