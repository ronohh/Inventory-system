

const Profile = () => {
    return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold p-2 mt-2">User Profile</h1>
        <form  className="bg-white p-6 rounded-lg shadow max-w-md">
            <div className="mb-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" id="Name" name="name" className="w-full p-2 border rounded-md  "/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input type="text" id="email" name="email" className="w-full p-2 border rounded-md"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                <input type="text" id="Address" name="address" className="w-full p-2 border rounded-md"/>
            </div>
            <button type="submit" className="bg-orange-500 rounded mt-4 p-2">Update Profile</button>
        </form>
    </div>
    )
}

export default Profile;