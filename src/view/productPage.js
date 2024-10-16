import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductView from './productView';
import AddProductView from './addProductView';
import { toggleAddProduct } from '../actions/floatingActionButtonProduct';
import './styles/productpage.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  const showAddProduct = useSelector(state => state.product.showAddProduct);
  const [animate, setAnimate] = useState(false);

  //Card View Animation
  useEffect(() => {
    if (showAddProduct) {
      setAnimate(true);
    }
  }, [showAddProduct]);

  //Floating Action Button Pressed
  const handleFabClick = () => {
    if (showAddProduct) {
      setAnimate(false);
      setTimeout(() => {
        dispatch(toggleAddProduct());
      }, 500); 
    } else {
      dispatch(toggleAddProduct());
    }
  };

  return (
    <div className="product-page-container">
      {/* ProductView */}
      <div><ProductView /></div>

      {/* Pop Up Add Product View */}
      {showAddProduct && (
        <div className="popup-container-product">
          <div className={`popup-card-product ${animate ? 'fade-in-slide-in' : 'fade-out-slide-out'}`}>
            <span className="close-btn" onClick={handleFabClick}>×</span>
            <AddProductView />
          </div>
        </div>
      )}

      {/* Floating Action Button Add Product View */}
      <button className="fab" onClick={handleFabClick}>+</button>
    </div>
  );
};

export default ProductPage;
