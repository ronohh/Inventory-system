import react from 'react';
import { FaHome, FaTable,FaTruck,FaBox, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const menuItems = [
        { name: "Dashboard", path: "/admin-dashboard", icon : <FaHome /> },
        { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable/>},
        { name: "Supplier", path: "/admin-dashboard/suppliers", icon: <FaTruck/>},
        { name: "Products", path: "/admin-dashboard/products", icon: <FaBox/>},
        { name: "profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false, },
        { name: "LogOut", path: "/admin-dashboard/logout", icon: <FaSignOutAlt/>, isParent:false},
    ];
    return (
        <div className= "flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed">
            <div className= "h-16 flex flex-items justify-center">
                <span className="hidden md:block text-lg font-bold">Inventory Management System</span>
                <span className= "md:hidden text-xl font-bold">IMS</span>
            </div>
            
            <div>
                <ul className='space-y-2 p-2'>
                    {
                        menuItems.map((item) => (
                            <li key={item.name} >
                                <NavLink className={({isActive}) => isActive ? "flex items-center p-2 text-white bg-gray-700 rounded" : "flex items-center p-2 text-white hover:bg-gray-700 rounded"} to={item.path}>
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="hidden md:block">{item.name}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
        
    )
}

export default Sidebar;