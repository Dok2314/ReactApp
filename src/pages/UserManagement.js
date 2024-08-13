import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page = 1) => {
        try {
            const response = await api.get('/admin/users', { params: { page, per_page: 10 } });
            setUsers(response.data.data || []);
            setPagination(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', newUser);

        try {
            if (editingUser) {
                await api.put(`/admin/users/${editingUser.id}`, newUser);
                setEditingUser(null);
            } else {
                await api.post('/admin/users', newUser);
            }
            setNewUser({ name: '', email: '', password: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error submitting user:', error);
            if (error.response && error.response.data) {
                console.log('Server response data:', error.response.data);
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({ name: user.name, email: user.email, password: '' });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="User Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="User Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="submit-button">
                    {editingUser ? 'Update User' : 'Add User'}
                </button>
            </form>
            <div className="user-table">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users available.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {pagination.prev_page_url && (
                    <button onClick={() => handlePageChange(pagination.current_page - 1)} className="pagination-button">
                        Previous
                    </button>
                )}
                {pagination.next_page_url && (
                    <button onClick={() => handlePageChange(pagination.current_page + 1)} className="pagination-button">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
