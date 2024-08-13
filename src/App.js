import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import UserManagement from './pages/UserManagement';
import Sidebar from './components/sidebar/Sidebar';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/privateroutes/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<UserManagement />} />
                            <Route path="/admin/products" element={<ProductManagement />} />
                            <Route path="/admin/orders" element={<OrderManagement />} />
                        </Route>
                    </Routes>
                    <ToastContainer />
                </div>
            </div>
        </AuthProvider>
    );
};

export default App;
