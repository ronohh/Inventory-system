import React from "react"
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        role: "",
    });
    const [users, setUsers] = useState([]);

    const fetchUsers = async () =>{
        try{
            const response = await axios.get("http://localhost:3000/api/user/", {
                headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
            });
            console.log(response.data.users);
            setUsers(response.data.users); 
        }catch (error) {
                console.error('Error fetching users:', error);
                console.error(error.response?.data);
                console.error(error.message)
            }
    };
    useEffect(() => {
        fetchUsers();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/user/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`
                    }
                }
            );
            if(response.data.success){
                alert("user added sucessfully");
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phonenumber: "",
                    role: "",
                });
                fetchUsers();
            }
            else{
                console.error( "error adding new user", response.data);
                alert ("error adding new user");
            }
        }catch(error){
            console.error("error adding users", error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    } 

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete this User");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`
                        }
                    }
                );
                if(response.data.success){
                    alert("user Deleted successfully")
                    fetchUsers();
                }else {
                    console.error("error deleting user:", data);
                    alert("error deleting user. please try again")
                }
            }catch(error){
                console.error("error deleting user", error)
            }
        }
    }
    return(
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-8">Company employes</h1>
            <div className=" flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h1 className="text-center font-bold text-xl mb-4">Add User</h1>
                            <form className="space-y-4 " onSubmit={handleSubmit}>
                                <div>
                                <input type="text" name="name" value={ formData.name} onChange={handleChange} placeholder="name" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                <input type="email" name="email" value={ formData.email} onChange={handleChange} placeholder="email" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                <input type="password" name="password" value={ formData.password} onChange={handleChange} placeholder="password" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                <input type="number" name="phonenumber" value={ formData.phonenumber} onChange={handleChange} placeholder="Phone Number" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                    <select name="role" value={formData.role} onChange={handleChange} className="border w-full rounded-md p-2">
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="Submit" className="w-full rounded-md  bg-green-500 text-white p-3 " >Add User</button>
                                </div>
                            </form>
                    </div>
                </div>
                <div className="lg:w-2/3">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 p-2">S.No</th>
                                <th className="border border-gray-200 p-2">Name</th>
                                <th className="border border-gray-200 p-2">Email</th>
                                <th className="border border-gray-200 p-2">Phone</th>
                                <th className="border border-gray-200 p-2">Role</th>
                                <th className="border border-gray-200 p-2">Action</th>
                            </tr>
            
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key= {index}>
                                    <td className="border border-gray-200 p-2" > {index + 1}</td>
                                    <td className="border border-gray-200 p-2">{user.name}</td>
                                    <td className="border border-gray-200 p-2">{user.email}</td>
                                    <td className="border border-gray-200 p-2">{user.phonenumber}</td>
                                    <td className="border border-gray-200 p-2">{user.role}</td>
                                    <td className="border border-gray-200 p-2">
                                        <button className="bg-red-500 rounded p-2 text-white" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;