import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderManagement.css';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/admin',
});

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [newOrder, setNewOrder] = useState({ product_id: '', user_id: '', quantity: '' });
    const [editingOrder, setEditingOrder] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    const fetchOrders = async (page = 1) => {
        try {
            const response = await api.get('/orders', { params: { page, per_page: 10 } });
            setOrders(response.data.data || []);
            setPagination(response.data.meta || {});
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    const fetchProducts = async (page = 1) => {
        try {
            const response = await api.get('/products', { params: { page, per_page: 10 } });
            // Обработка ответа
            if (response.data && Array.isArray(response.data.data)) {
                setProducts(response.data.data);
                setPagination({
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    next_page_url: response.data.next_page_url,
                    prev_page_url: response.data.prev_page_url,
                });
            } else {
                console.error('Unexpected response format for products:', response.data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            if (response.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error('Unexpected response format for users:', response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingOrder) {
                await api.put(`/orders/${editingOrder.id}`, newOrder);
                setEditingOrder(null);
            } else {
                await api.post('/orders', newOrder);
            }
            setNewOrder({ product_id: '', user_id: '', quantity: '' });
            fetchOrders();
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setNewOrder({ product_id: order.product_id, user_id: order.user_id, quantity: order.quantity });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/orders/${id}`);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handlePageChange = (page) => {
        fetchOrders(page);
    };

    return (
        <div className="order-management">
            <h1>Order Management</h1>
            <form onSubmit={handleSubmit} className="order-form">
                <select
                    name="product_id"
                    value={newOrder.product_id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <select
                    name="user_id"
                    value={newOrder.user_id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                />
                <button type="submit" className="submit-button">
                    {editingOrder ? 'Update Order' : 'Add Order'}
                </button>
            </form>
            <div className="order-table">
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.user}</td>
                                <td>
                                    <button onClick={() => handleEdit(order)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(order.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No orders available.</td>
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

export default OrderManagement;
