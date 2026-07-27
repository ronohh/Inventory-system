import React, { useState, useEffect } from "react";
import axios from "axios";


const CustomerProducts = () => {

    const [products, setProducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [orderData, setOrderData] = useState({
        productId: "",
        Quantity: 1,
        total: 0,
        stock: 0,
        price: 0
    })

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

    const handleOrder = (product) => {
        setOrderData({
            productId: product._id,
            Quantity: 1,
            total: product.price,
            stock: product.stock,
            price: product.price
        })
        setOpenModal(true)
    }

    const closeModel = () => {
        setOpenModal(false)
    }

    // same as handlechange
    // e.target.value -- get that value of yours  e(event)
    const increaseQuantity = (e) => {
        if(e.target.value > orderData.stock) {
            alert("Not enough stock")
        } else {
            setOrderData((prev) => ({
                ...prev,
                Quantity: parseInt(e.target.value),
                total: parseInt(e.target.value) * parseInt(orderData.price)
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/orders/add",
                orderData, {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("pos-token")}`,
                    }
                });
                if(response.data.success){
                    setOpenModal(false);
                    setOrderData({
                        productId: "", Quantity: 1, stock: 0, total: 0, price: 0
                    })
                    alert("order added successfully")
                }
        } catch(error) {
            console.log(error);
            alert("error catch", error.message)
        }
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
                                    <button className="px-2 bg-green-400 hover:bg-green-600 rounded text-white" onClick={() => handleOrder(product)}>Order</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && <div>No products</div>}
            </div>

            {openModal && (
                <div className= "fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Place Order</h1>
                        <button className="absolute top-4 right-4 font-bold text-lg cursor-pointer" onClick={closeModel}>X</button>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input type="number" name="Quantity" placeholder="Increase Quantity" value={orderData.Quantity} onChange={increaseQuantity} min="1"  className= "border p-1 bg-white rounded px-4" />
                            <p>{ orderData.Quantity* orderData.price }</p>
                            <div className="flex space-x-2">
                                <button type="submit" className="w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600">Save Changes</button>
                                <button type="button" className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600 " onClick={closeModel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomerProducts;