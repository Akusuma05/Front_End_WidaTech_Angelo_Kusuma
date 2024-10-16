import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './productView';
import AddProductView from './addProductView';
import { toggleAddProduct } from '../actions/floatingActionButtonProduct';
import './styles/productpage.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  const showAddProduct = useSelector(state => state.product.showAddProduct);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showAddProduct) {
      setAnimate(true);
    }
  }, [showAddProduct]);

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
      <div><ProductList /></div>
      {showAddProduct && (
        <div className="popup-container-product">
          <div className={`popup-card-product ${animate ? 'fade-in-slide-in' : 'fade-out-slide-out'}`}>
            <span className="close-btn" onClick={handleFabClick}>×</span>
            <AddProductView />
          </div>
        </div>
      )}
      <button className="fab" onClick={handleFabClick}>+</button>
    </div>
  );
};

export default ProductPage;
