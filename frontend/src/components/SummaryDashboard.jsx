import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SummaryDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalStock: 0,
        ordersToday: 0,
        revenue:0,
        outofstockproducts: [],
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
                    <p className="text-2xl font-bold">{dashboardData.revenue}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Out of Stock products</h3>
                    {dashboardData.outofstockproducts.length > 0 ? (
                        <ul className="space-y-2">
                            {dashboardData.outofstockproducts.map((product, index) => (
                                <li key={index} className="text-gray-600">
                                    {product.name}{" "}
                                    <span className="text-red-400 font-bold"> ({product.category.name})</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No products are out of stock.</p>
                    )}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Highest Sale Products</h3>
                    {dashboardData.highestSaleProducts?.name ? (
                        <div className= "text-gray-600">
                            <p><strong>Name:</strong> {dashboardData.highestSaleProducts.name}</p>
                            <p><strong>Category:</strong> {dashboardData.highestSaleProducts.category}</p>
                            <p><strong>Total Units Sold:</strong> {dashboardData.highestSaleProducts.totalQuantity}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">{dashboardData.highestSaleProducts?.message || "No sales data available."}</p>
                    ) }
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Low Stock products</h3>
                    {dashboardData.lowStockProducts.length > 0 ? (
                        <ul className="space-y-2">
                            {dashboardData.lowStockProducts.map((product, index) => (
                                <li key={index} className="text-gray-600">
                                    <strong>{product.name}</strong> - {product.stock} left{""}
                                    <span className="text-red-400">{product.category.name}</span>
                                </li>
                            ))}
                        </ul>
                    ): (
                        <p className="text-gray-500">No products are low on stock.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SummaryDashboard;