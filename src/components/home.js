import React, { useState } from 'react';
import { useFetch } from './useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const { data: products, loading, error } = useFetch('http://localhost:5000/products');
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_desc: '',
        product_category: '',
    });

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
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (response.ok) {
                window.location.reload(); // Reload page to show the new product
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-between align-items-center">
                <h1 className="text-danger fw-bold fst-italic">Shop Now</h1>
                <nav>
                    <a href="#" className="text-secondary mx-3 text-decoration-none">Home</a>
                    <a href="#new-product" className="text-secondary text-decoration-none">New Product</a>
                </nav>
            </header>

            {Object.keys(categories).map((category, index) => (
                <div key={index} className="mt-4">
                    <h3 className="text-dark">{category}</h3>
                    <hr /> {/* The line separating categories */}
                    {categories[category].map(product => (
                        <div key={product.product_id} className="mb-3">
                            <h5 className="text-danger">{product.product_name}</h5>
                            <p>{product.product_desc}</p>
                        </div>
                    ))}
                </div>
            ))}

            {/* Add New Product Section */}
            <div id="new-product" className="mt-5">
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
    );
};

export default Home;
