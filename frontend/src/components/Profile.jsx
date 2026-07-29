import { useEffect, useState } from "react";
import axios from 'axios'


const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        location: "",
        password: ""
    });

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if(response.data.success) {
                setUser({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    location: response.data.user.location,
                })
            }
        }catch (error){
            console.error("Error fetching user profile:", error);
            alert("Error fetching user profile.")
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold p-2 mt-2">User Profile</h1>
        <form  className="bg-white p-6 rounded-lg shadow max-w-md">
            <div className="mb-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" id="Name" name="name" value={user.name} onChange={(e) => setUser({ ...user,name: e.target.value})} className="w-full p-2 border rounded-md  "/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input type="text" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user,email: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                <input type="text" id="location" name="location" value={user.location} onChange={(e) => setUser({ ...user,location: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>
            <button type="submit" className="bg-orange-500 rounded mt-4 p-2">Update Profile</button>
        </form>
    </div>
    )
}

export default Profile;