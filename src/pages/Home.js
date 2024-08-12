import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Home</h1>
            {!isAuthenticated && <button onClick={() => navigate('/login')}>Login</button>}
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default Home;
