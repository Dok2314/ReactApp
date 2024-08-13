import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Home</h1>
            {user ? (
                <>
                    <p>Welcome, {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </div>
    );
};

export default Home;
