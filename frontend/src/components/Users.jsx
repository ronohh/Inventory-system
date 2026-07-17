import React from "react"
import { useState } from "react";
import axios from "axios";

const Users = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        role: "",
    });

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
                alert("user added sucessfully")
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phonenumber: "",
                    role: "",
                });
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
                                <input type="text" name="role" value={ formData.role} onChange={handleChange} placeholder="role" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                    <button type="Submit" className="w-full rounded-md  bg-green-500 text-white p-3 ">Add User</button>
                                </div>
                            </form>
                    </div>
                </div>
                <div className="lg:w-2/3">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <td className="border border-gray-200 p-2">S:No</td>
                                <td className="border border-gray-200 p-2">Name</td>
                                <td className="border border-gray-200 p-2">Position</td>
                            </tr>
            
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;