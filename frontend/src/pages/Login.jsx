import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,password });

            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                }else {
                    navigate('/customer-dashboard');
                }
            }else{
                alert(response.data.error);
            }
        }catch (error) {
            console.log(error);
            if(error.response){
                setError(error.response.data.message);
            }
        }finally {            
            setLoading(false);
        }
    }
    return (
        <div className=" flex flex-col items-center justify-center bg-gradient-to-b from-green-600  to-gray-100 to-50% space-y-6 ">
            <h2 className="text-3xl text-white">Inventory Management System</h2>
            <div className=" border shadow-lg p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && (
                    <div className=" bg-red-200 text-red-800 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border rounded"
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input 
                        type="password"
                        className=" border w-full px-3 py-2 rounded" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>
                    <div className="mb-4">
                        <button 
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded"
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;