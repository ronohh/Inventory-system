import React from 'react'
import { useState } from 'react';

const Product = () => {
    const [openModal, setOpenModal] = useState(false);
    return(
        <div className= "w-full h-full flex flex-col gap-4 p-4">
            
            <h1 className="text-2xl font-bold">Product Management</h1>
            <div className=" flex justify-between items-center">
                <input type="text" placeholder="search" className="border p-1 bg-white rounded px-4"></input>
    

                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 " onClick={() =>setOpenModal(true)}>Add PRODUCT</button>

            </div>

            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50  flex jusitfy-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Product</h1>
                        <button className="absolute top-4 right-4 font-bold text-lg " onClick={() => setOpenModal(false)}>X</button>
                        <form className="flex flex-col gap-4 mt-4" >
                            <input type="text" name="name" placeholder="product Name" className="border p-1 bg-white  rouded px-4"/>
                            <input type="text" name="description" placeholder="product Description" className="border p-1 bg-white  rouded px-4"/>
                            <input type="number" name="price" placeholder="product Price" className="border p-1 bg-white  rouded px-4"/>
                            <input type="number" name="stock" placeholder="product Stock" className="border p-1 bg-white  rouded px-4"/>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product