import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            api.get('/user', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUser(response.data.user);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('jwtToken');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (data) => {
        setUser(data.user);
        localStorage.setItem('jwtToken', data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
