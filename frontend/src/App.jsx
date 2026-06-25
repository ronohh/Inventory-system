import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Root from './utils/Root'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Dashboard from './pages/Dashboard'
import Categories from './components/Categories'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin-dashboard" element={<ProtectedRoutes requiredRole={["admin"]}>
              <Dashboard />
          </ProtectedRoutes>} >

            <Route index element={<h1>Summary Dashboard</h1>}/>
            <Route path= "categories" element={<Categories/>}/>

          </Route>

        <Route path="/customer/dashboard" element={<h1>Customer Dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </Router>
  )
}

export default App
