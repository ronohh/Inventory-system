import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SummaryDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalStock: 0,
        ordersToday: 0,
        revenue:0,
        outOfStockProducts: [],
        recentOrders:[],
        highestSaleProducts: null,
        lowStockProducts: []
    })

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/dashboard/", {
                headers : {
                        Authorization : `Bearer ${localStorage.getItem("pos-token")}`,
                    }
            });
            console.log(localStorage.getItem("pos-token"));
            setDashboardData(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="p-5">
            <h2 className='text-3xl font-bold'>Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg-grid-cols-4 gap-4 my-6">
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold">Total Products</p>
                    <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold">Total Stock</p>
                    <p className="text-2xl font-bold">{dashboardData.totalStock}</p>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold">Orders Today</p>
                    <p className="text-2xl font-bold">{dashboardData.ordersToday}</p>
                </div>
                <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold">Revenue</p>
                    <p className="text-2xl font-bold">KES {dashboardData.revenue}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Top Selling Products</h3>
                    <div className="overflow-x-auto">
                    { dashboardData.highestSaleProducts && dashboardData.highestSaleProducts.length > 0 ? (
                        
                        <table className="w-full border border-gray-200 border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-left">Total Units Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.highestSaleProducts.map((product, index) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.categoryId?.categoryName}</td>
                                        <td className="p-2">{product.totalQuantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">{dashboardData.highestSaleProducts?.message || "No sales data available."}</p>
                    ) } 
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Low Stock products</h2>
                    <div className="overflow-x-auto">
                    {dashboardData.lowStockProducts.length > 0 ? (
                        <table className="w-full border border-gray-200 border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-left">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.lowStockProducts.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.categoryId?.categoryName}</td>
                                        <td className={`border p-2 text-center font-semibold ${product.stock <= 2 ? "text-red-600" : "text-yellow-600" }`}>{product.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    ): (
                        <p className="text-gray-500">No products are low on stock.</p>
                    )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-4 my-6">
                <div className="bg-white rounded-lg shadow p-5 ">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className=" border border-gray-200 border-collapse">

                        <thead>

                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Customer</th>
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-left">Qty</th>
                                    <th className="p-2 text-left">Total</th>
                                    <th className="p-2 text-left">Date</th>

                                </tr>
                            </thead>
                        <tbody>

                                {dashboardData.recentOrders.map(order=>(

                                <tr key={order._id} className="border-b hover:bg-gray-50">

                                    <td className="p-2">{order.customer?.name}</td>
                                    <td className="p-2">{order.product?.name}</td><td className="p-2">{order.Quantity}</td><td className="p-2">KES {order.totalPrice}</td>
                                    <td className="p-2">{new Date(order.orderDate).toLocaleDateString()}</td>

                                </tr>

                                ))
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SummaryDashboard;