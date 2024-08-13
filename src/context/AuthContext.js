import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; // Импортируйте ваш экземпляр axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            api.get('/user', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    localStorage.removeItem('jwtToken');
                });
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
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
