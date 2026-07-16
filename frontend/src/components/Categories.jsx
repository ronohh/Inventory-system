import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);

    const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/category/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                });
                console.log(response.data.categories);
                setCategories(response.data.categories);
                
            }catch (error) {
                console.error('Error fetching categories:', error);
                console.error(error.response?.data);
                console.error(error.message)
            }
        };
    useEffect(() => {
        
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editCategory) {
            const response = await axios.put(`http://localhost:3000/api/category/${editCategory}`, 
            {categoryName, categoryDescription},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
        }
    );
    if (response.data.success){
        setEditCategory(null);
        setCategoryName("")
        setCategoryDescription("")
        alert('Category updated successfully');
        fetchCategories();
    }else {
        console.error('Error editing category', data);
        alert("Error updating category. Please try again");
    }

        }
        const response = await axios.post("http://localhost:3000/api/category/add", 
            {categoryName, categoryDescription},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
        }
    );
    if (response.data.success){
        setCategoryName("");
        setCategoryDescription("");
        alert('Category added successfully');
        fetchCategories();
    }else {
        console.error('Error adding category', data);
        alert("Error adding category. Please try again");
    }

    };

    const handleEdit = async (category) => {
        setEditCategory(category._id);
        setCategoryName(category.categoryName);
        setCategoryDescription(category.categoryDescription);
    };
    const handleCancel = () => {
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
    };
    const handleDelete = async () =>{
        const confirmDelete = window.confirm("Are you sure you want to delete this category")
        if (confirmDelete){
            try{
                const response = await axios.delete(
                    'http://localhost:3000/api/category/${id}',
                    {
                        headers: {
                            Authorization: 'Bearer ${localStorage.getItem("pos-token")}',
                        },
                    }
                );
                if (response.data.success){
                    alert("category deleted sucessfully");
                    fetchCategories();
                }else {
                    console.error("error deleting category:", data);
                    alert("error deleting category. please try again")
                }
            }catch (error) {
                console.error("Error deleting category:", data)
                alert("error deleting category. please try again");
            }
        }
    }
    return (
        <div className="p-4 ">
            <h1 className="text-2xl font-bold mb-8">Categories</h1>
            <div className=" flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3">
                <div className="bg-White shadow-md rounded-lg p-4">
                <h2 className="text-center text-xl font-bold mb-4">{editCategory ? "Edit Category" : "Create Category"}</h2>
                    <form className="space-y-4 " onSubmit={handleSubmit}>
                         <div >
                        <input type="text" value={categoryName} placeholder="CategoryName" className="border w-full p-2 rounded-md" onChange={(e) => setCategoryName(e.target.value)}/>
                        </div>
                         <div >
                        <input type= "text" value={categoryDescription} placeholder="Category description" className="border w-full p-2 rounded-md" onChange={(e) => setCategoryDescription(e.target.value)}/>
                        </div>
                        <div>
                        <button type="Submit" className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600">{editCategory ? "Update Category" : "Add Category"}</button>
                        {editCategory && (
                            <button type="button" className="w-full rounded-md bg-gray-500 text-white p-3 cursor-pointer hover:bg-gray-600 mt-2"
                             onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                        </div>
                    </form>
                </div>
                </div>
                <div className="lg:w-2/3">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead >
                            <tr>
                                <th className="border border-gray-200 p-2">S No</th>
                                <th className="border border-gray-200 p-2">Category Name</th>
                                <th className="border border-gray-200 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-200 p-2">{index + 1}</td>
                                    <td className="border border-gray-200 p-2">{category.categoryName}</td>
                                    <td className="border border-gray-200 p-2">
                                        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2" onClick= {() => handleEdit(category)}>Edit</button>
                                        <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => handleDelete(category._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Categories;