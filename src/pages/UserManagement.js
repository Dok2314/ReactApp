import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>User Management</h1>
            {user ? <p>Logged in as {user.name}</p> : <p>You are not logged in</p>}
        </div>
    );
};

export default UserManagement;
