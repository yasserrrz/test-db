import React, { useState } from 'react';
import { useFetch } from './useFetch';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const { data: products, loading, error } = useFetch('/api/db/products');
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_desc: '',
        product_category: '',
    });
    const [isFloatingWindowVisible, setIsFloatingWindowVisible] = useState(false); // State to manage floating window visibility

    // Group products by category
    const categories = products.reduce((acc, product) => {
        const { product_category } = product;
        if (!acc[product_category]) acc[product_category] = [];
        acc[product_category].push(product);
        return acc;
    }, {});

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/db/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (response.ok) {
                setIsFloatingWindowVisible(false); // Close the floating window after adding the product
                // Refresh data by triggering useFetch hook
                window.location.reload(); // Reload page to show the new product
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/db/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Product deleted successfully');
                // Refresh data by triggering useFetch hook
                window.location.reload(); // Reload page to update the product list
            } else {
                console.error('Failed to delete product. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-between align-items-center">
                <h1 className="text-danger fw-bold fst-italic">Shop Now</h1>
                <nav>
                    <a href="#home" className="text-secondary mx-3 text-decoration-none">Home</a>
                    <a
                        href="#new-product"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            setIsFloatingWindowVisible(true); // Show the floating window
                        }}
                        className="text-secondary text-decoration-none"
                    >
                        New Product
                    </a>
                </nav>
            </header>

            {Object.keys(categories).map((category, index) => (
                <div key={index} className="mt-4">
                    <h3 className="text-dark" id="home">{category}</h3>
                    <hr /> {/* The line separating categories */}
                    {categories[category].map(product => (
                        <div key={product.id} className="mb-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="text-danger mb-1">{product.product_name}</h5>
                                <p className="mb-0">{product.product_desc}</p>
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ))}

            {/* Floating Window */}
            {isFloatingWindowVisible && (
                <div className="floating-window-overlay" onClick={() => setIsFloatingWindowVisible(false)}>
                    <div className="floating-window" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsFloatingWindowVisible(false)}>X</button>

                        {/* Add New Product Section */}
                        <div id="new-product" className="product-info mt-5">
                            <h3 className="text-dark">Add New Product</h3>
                            <hr /> {/* The line separating sections */}
                            <form onSubmit={handleAddProduct}>
                                <div className="mb-3">
                                    <label htmlFor="product_name" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="product_name"
                                        name="product_name"
                                        value={newProduct.product_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="product_category" className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="product_category"
                                        name="product_category"
                                        value={newProduct.product_category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="product_desc" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="product_desc"
                                        name="product_desc"
                                        value={newProduct.product_desc}
                                        onChange={handleInputChange}
                                        rows="3"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
