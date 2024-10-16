import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducers/getProduct';
import { server } from '../const';
import './styles/productView.css'; 

const ProductView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.getProducts.products);
  const productStatus = useSelector(state => state.getProducts.status);
  const error = useSelector(state => state.getProducts.error);

  //get Products
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (productStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid-container-product">
      {products.map((product) => (
        //Product Card View
        <div key={product.product_id} className="card-product">
          <img src={server+`/${product.product_picture}`} alt={product.product_name} className="card-img-product" />
          <div className="card-content-product">
            <h3 className="card-title-product">{product.product_name}</h3>
            <p className="card-price-product">Rp.{new Intl.NumberFormat('id-ID').format(product.product_price)}</p>
            <p className="card-stock-product">Stock: {product.product_stock}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductView;

