import { useEffect, useState } from "react";
import axios from 'axios'


const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        location: "",
        password: ""
    });
    const [edit, setEdit] = useState([])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:3000/api/users/profile", user, {
                headers: { 
                    Authorization : `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if (response.data.success) {
                alert("profile updated succesfully");
                setEdit(false);
            } else {
                alert("Failed to update profile")
            }
        } catch (error) {
            console.error("error updating profile", error);
            alert("Error updating rofile. Please try again. ");
        }
    }
    return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold p-2 mt-2">User Profile</h1>
        <form  className="bg-white p-6 rounded-lg shadow max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" id="Name" name="name" value={user.name} onChange={(e) => setUser({ ...user,name: e.target.value})} className="w-full p-2 border rounded-md  "/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input type="text" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user,email: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                <input type="text" id="location" name="location" value={user.location} onChange={(e) => setUser({ ...user,location: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>

            {edit && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" placeholder="enter new password" onChange={(e) => setUser({ ...user, password: e.target.value})} className="w-full p-2 border rounded-md focus:outline-none focus:ring-blue-500 " />
                </div>
            )}
            {/* /* <button type="submit" onChange=className="bg-orange-500 rounded mt-4 p-2">Update Profile</button> */ }
            {!edit ? (
                <button type='button' onClick={() => setEdit(!edit)} className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 cursor-pointer">Edit Profile</button>
            ) : (
                <>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 py-2 rounded-md hover:bg-yellow-700 cursor-pointer"> Save Changes</button>
                <button type="button" onClick={() => setEdit(!edit)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 ml-2 cursor-pointer">Cancel</button>
                </>
            )}
        </form>
    </div>
    )
}

export default Profile;