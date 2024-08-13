import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
