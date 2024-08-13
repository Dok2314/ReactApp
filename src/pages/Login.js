import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, password });
            const data = response.data;

            localStorage.setItem('jwtToken', data.token);
            login(data);

            navigate('/');
        } catch (error) {
            toast.error('Invalid email or password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h1>Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
