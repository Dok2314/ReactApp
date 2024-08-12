import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                const usersData = response.data.data || [];
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <ul>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserManagement;
