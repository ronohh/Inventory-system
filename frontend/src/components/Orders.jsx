import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrder] = useState([]);

    const fetchOrders = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/api/orders`,{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`
                }
            });
            if(response.data.success){
                setOrder(response.data.orders)
                fetchOrders();
            }else{
                console.error("console error fetching orders. try again", error.message)
                alert("error fetching orders")
            }
        }catch(error){
            console.log("error fetching orders", error)
        }  
    }
    useEffect(() => {
        fetchOrders()
    }, []);
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1  className="text-2xl font-bold">My Orders</h1>
            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border-gray-300 p-2">S NO</th>
                            <th className="border-gray-300 p-2">Product Name</th>
                            <th className="border-gray-300 p-2">Category</th>
                            <th className="border-gray-300 p-2">Quantity</th>
                            <th className="border-gray-300 p-2">Total Price</th>
                            <th className="border-gray-300 p-2">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td className="border border-gray-300 p-2">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{order.product?.name}</td>
                            <td className="border border-gray-300 p-2">{order.product?.categoryId?.categoryName}</td>
                            <td className="border border-gray-300 p-2">{order.Quantity}</td>
                            <td className="border border-gray-300 p-2">{order.totalPrice}</td>
                            <td className="border border-gray-300 p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders;