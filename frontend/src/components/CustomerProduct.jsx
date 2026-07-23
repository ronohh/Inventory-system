import React, { useState, useEffect } from "react";
import axios from "axios";


const CustomerProducts = () => {

    const [products, setProducts] = useState([]);
    const [categories, setcategories] = useState([])

    const fetchProducts = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/product`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                });
            if(response.data.success){
                setProducts(response.data.products);
                setcategories(response.data.categories);
            }else{
                console.log("error fetching customer for products")
            }
        }catch(error){
            console.error("error fetchproducts function")
        }
    }
    useEffect(() => { 
        fetchProducts();
    },[]);
    return (
        <div>
            <div className="py-4 px-6">
                <h2 className="font-bold text-xl">Products</h2>
            </div>
            <div className=" py-4 px-6 flex justify-between items-center w-full">
                <div>
                    <select name="" >
                        <option value="">Select Category</option>
                        <option value="">Rice</option>
                        <option value="">Beverages</option>
                    </select>
                </div>
                <div>
                    <input type="text"  placeholder="search" className="p-1 border bg-white rounded"/>
                </div>
            </div>
            <div className=" py-4 px-6">
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Stock</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product,index) => (
                            <tr key = "product._id" >
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.categoryId.categoryName}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="bg-green-500 bg-hover-green-600">Order</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerProducts;