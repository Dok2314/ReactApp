import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (page = 1) => {
        try {
            const response = await api.get('/products', { params: { page, locale: 'ua', per_page: 15 } });
            setProducts(response.data.data || []);
            setPagination(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, newProduct);
                setEditingProduct(null);
            } else {
                await api.post('/admin/products', newProduct);
            }
            setNewProduct({ name: '', description: '', price: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({ name: product.name, description: product.description, price: product.price });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/admin/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handlePageChange = (page) => {
        fetchProducts(page);
    };

    return (
        <div className="product-management">
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    step="0.01"
                    min="0"
                    required
                />
                <button type="submit" className="submit-button">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
            </form>
            <div className="product-table">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => handleEdit(product)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available.</td>
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

export default ProductManagement;
