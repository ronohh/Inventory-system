import React from "react"

const Users = () => {
    return(
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-8">Company employes</h1>
            <div className=" flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h1 className="text-center font-bold text-xl mb-4">Add User</h1>
                            <form className="space-y-4 ">
                                <div>
                                <input type="text" placeholder="name" name="user" className="border w-full rounded-md p-2" />
                                </div>
                                <div>
                                <input type="text" placeholder="second name" className="border w-full rounded-md p-2" />
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
                            <td></td>
                            <td></td>
                            <td></td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;