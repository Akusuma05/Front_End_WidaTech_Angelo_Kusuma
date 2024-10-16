import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitProduct } from '../reducers/createProducts';
import { fetchProducts } from '../reducers/getProduct';
import './styles/addProductView.css'; 

const AddProductView = () => {
    const [productName, setProductName] = useState('');
    const [productPicture, setProductPicture] = useState(null);
    const [productStock, setProductStock] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const dispatch = useDispatch();

    //Submit Button Pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            product_name: productName,
            product_picture: productPicture,
            product_stock: productStock,
            product_price: productPrice,
        };
        dispatch(submitProduct(productData)).then((result) => {
            if (result.type === 'products/submitProduct/fulfilled') {
                dispatch(fetchProducts());
                alert('Product added successfully!');
            } else {
                alert('Failed to add product.');
            }
        });
    };

    return (
        <div className="add-product-form card-content">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>

                {/* Product Name Form */}
                <div className="form-group">
                    <label htmlFor="product_name">Product Name:</label>
                    <input
                        type="text"
                        id="product_name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                {/* Product Picture Input Form */}
                <div className="form-group">
                    <label htmlFor="product_picture">Product Picture:</label>
                    <input
                        type="file"
                        id="product_picture"
                        onChange={(e) => setProductPicture(e.target.files[0])}
                        required
                    />
                </div>

                {/* Product Stock */}
                <div className="form-group">
                    <label htmlFor="product_stock">Product Stock:</label>
                    <input
                        type="number"
                        id="product_stock"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        required
                    />
                </div>

                {/* Product Price */}
                <div className="form-group">
                    <label htmlFor="product_price">Product Price:</label>
                    <input
                        type="number"
                        id="product_price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="center">Submit</button>
            </form>
        </div>
    );
};

export default AddProductView;
