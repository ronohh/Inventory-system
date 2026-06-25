import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/api/category/add", 
            {categoryName, categoryDescription},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
        }
    );
    if (response.data.success){
        alert('Category added successfully');
        setCategoryName("");
        setCategoryDescription("");
    }else {
        console.error('Error adding category', data);
        alert("Error adding category. Please try again");
    }

    };
    return (
        <div className="p-4 ">
            <h1 className="text-2xl font-bold mb-8">Categories</h1>
            <div className=" flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3">
                <div className="bg-White shadow-md rounded-lg p-4">
                <h2 className="text-center text-xl font-bold mb-4">Create Category</h2>
                    <form className="space-y-4 " onSubmit={handleSubmit}>
                         <div >
                        <input type="text" placeholder="CategoryName" className="border w-full p-2 rounded-md" onChange={(e) => setCategoryName(e.target.value)}/>
                        </div>
                         <div >
                        <input type= "text" placeholder="Category description" className="border w-full p-2 rounded-md" onChange={(e) => setCategoryDescription(e.target.value)}/>
                        </div>
                        <button type="Submit" className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600">ADD category</button>
                    </form>
                </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Categories;