import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Root from './components/Root.jsx'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoutes.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin/dashboard" element={<ProtectedRoutes requiredRole={["admin"]}><h1>Admin Dashboard</h1></ProtectedRoutes>} />
        <Route path="/customer/dashboard" element={<h1>Customer Dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </Router>
  )
}

export default App
