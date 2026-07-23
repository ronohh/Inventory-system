import React from "react";


const CustomerProducts = () => {
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerProducts;