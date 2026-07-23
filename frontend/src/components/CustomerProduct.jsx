import React, { useState, useEffect } from "react";
import axios from "axios";


const CustomerProducts = () => {

    const [products, setProducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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
                setFilteredProducts(response.data.products)
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

    const handleSearch = (e) => {
        setFilteredProducts(
            products.filter((product)=>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }

    const handleChangeCategory = (e) => {
        setFilteredProducts(
            products.filter((product) => product.categoryId._id === e.target.value)
        )
    }
    return (
        <div>
            <div className="py-4 px-6">
                <h2 className="font-bold text-xl">Products</h2>
            </div>
            <div className=" py-4 px-6 flex justify-between items-center w-full">
                <div>
                    <select name="categories" id="" className="text-black bg-white border rounded p-1" onChange={handleChangeCategory} >
                        <option  value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type="text"  placeholder="search" className="p-1 border bg-white rounded" onChange={handleSearch}/>
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
                        {filteredProducts && filteredProducts.map((product,index) => (
                            <tr key = {product._id} >
                                <td className="border border-gray-300 p-2 ">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.categoryId.categoryName}</td>
                                <td className="border border-gray-300 p-2">{product.price}</td>
                                <td className="border border-gray-300 p-2">{product.stock}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="px-2 bg-green-400 hover:bg-green-600 rounded text-white">Order</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && <div>No products</div>}
            </div>
        </div>
    )
}

export default CustomerProducts;