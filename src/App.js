import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/users" element={<UserManagement />} />
                    </Routes>
                    <ToastContainer />
                </header>
            </div>
        </AuthProvider>
    );
};

export default App;
