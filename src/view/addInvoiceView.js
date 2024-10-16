import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { fetchProducts } from '../reducers/getProduct';
import { submitInvoice } from '../reducers/createInvoice';
import { fetchInvoices } from '../reducers/getInvoice';
import { server } from '../const'
import './styles/addInvoiceView.css';

const AddInvoiceView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProducts.products);
  const productStatus = useSelector((state) => state.getProducts.status);
  const error = useSelector((state) => state.getProducts.error);
  const invoiceStatus = useSelector((state) => state.getInvoices.status);
  
  const [invoiceData, setInvoiceData] = useState({
    invoice_customer_name: '',
    invoice_salesperson_name: '',
    invoice_notes: '',
    invoice_date: new Date().toISOString().slice(0, 10),
    products: [],
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const newProducts = products.map(product => ({
    id: product.product_id,
    name: product.product_name + " Rp." + product.product_price,
    picture: product.product_picture,
    ...product
  }));
  
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);
  
  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
  };
  
  const handleAddProduct = () => {
    if (selectedProduct) {
      setInvoiceData({
        ...invoiceData,
        products: [...invoiceData.products, selectedProduct],
      });
      setSelectedProduct(null);
    }
  };
  
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...invoiceData.products];
    updatedProducts.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      products: updatedProducts,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...invoiceData,
    };
    dispatch(submitInvoice(formData)).then((result) => {
      if (result.type === 'invoices/submitInvoice/fulfilled') {
        dispatch(fetchInvoices())
        alert('Invoice saved successfully!');
      } else {
        alert('Failed to save invoice.');
      }
    });
  };
  
  const formatItem = (product) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={server+`/${product.product_picture}`} alt={product.product_name} style={{ width: '50px', marginRight: '10px' }} />
      <span>{product.product_name}</span>
    </div>
  );
  
  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (productStatus === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (
      <div className="add-invoice-form">
        <h2>Add Invoice</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="invoice_customer_name">Customer Name:</label>
            <input
              type="text"
              id="invoice_customer_name"
              name="invoice_customer_name"
              value={invoiceData.invoice_customer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoice_salesperson_name">Salesperson Name:</label>
            <input
              type="text"
              id="invoice_salesperson_name"
              name="invoice_salesperson_name"
              value={invoiceData.invoice_salesperson_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoice_notes">Notes:</label>
            <textarea
              id="invoice_notes"
              name="invoice_notes"
              value={invoiceData.invoice_notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="invoice_date">Invoice Date:</label>
            <input
              type="date"
              id="invoice_date"
              name="invoice_date"
              value={invoiceData.invoice_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-form">
            <h3>Products</h3>
            <div style={{ width: '100%' }}>
              <ReactSearchAutocomplete
                items={newProducts}
                onSelect={handleSelectProduct}
                autoFocus
                formatResult={formatItem}
                placeholder="Search for products"
                styling={{ width: '100%' }} 
              />
            </div>
            <button type="button" className="center" onClick={handleAddProduct}>
              Add Product
            </button>
            {invoiceData.products.map((product, index) => (
              <div key={index} className="product-item" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={server+`/${product.product_picture}`} alt={product.product_name} style={{ width: '50px', marginRight: '10px' }} />
                <span>{product.product_name}</span>
                <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button type="submit" className="center">Submit</button>
        </form>
      </div>
  );
};

export default AddInvoiceView;
