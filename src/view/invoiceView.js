import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../reducers/getInvoice';
import './styles/invoiceView.css'; 

const InvoiceView = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.getInvoices.invoices);
  const invoiceStatus = useSelector(state => state.getInvoices.status);
  const error = useSelector(state => state.getInvoices.error);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loadedInvoices, setLoadedInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (invoiceStatus === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [invoiceStatus, dispatch]);

  useEffect(() => {
    if (invoiceStatus === 'succeeded') {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setLoadedInvoices(invoices.slice(startIndex, endIndex));
    }
  }, [invoices, invoiceStatus, page, itemsPerPage]);

  const handleScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && page * itemsPerPage < invoices.length) {
      setPage(prevPage => prevPage + 1);
    }
  }, [page, itemsPerPage, invoices.length]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleResize = useCallback(() => {
    const height = window.innerHeight;
    const calculatedItemsPerPage = Math.floor(height / 170); 
    setItemsPerPage(calculatedItemsPerPage);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closePopup = () => {
    const popupCard = document.querySelector('.popup-card');
    popupCard.classList.add('close-animation');
    document.querySelector('.popup-container').classList.add('fade-out');
    setTimeout(() => setSelectedInvoice(null), 100);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page * itemsPerPage < invoices.length) {
      setPage(page + 1);
    }
  };

  if (invoiceStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (invoiceStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='invoice-container'>
      <div>
          <div className='card-invoice-title'><h2 className='card-invoice-title-h1'>Invoices</h2></div>
          <div className="card-container">
            {loadedInvoices.map((invoice, index) => (
            <div key={index} className="card" onClick={() => handleSelectInvoice(invoice)}>
              <div className="card-content">
                <h3 className="card-title">Invoice ID: {invoice.invoice_id}</h3>
                <p className="card-customer">Customer: {invoice.invoice_customer_name}</p>
                <p className="card-salesperson">Salesperson: {invoice.invoice_salesperson_name}</p>
                <p className="card-date">Date: {invoice.invoice_date.slice(0, 10)}</p>
                <p className="card-total">
                  Total: {new Intl.NumberFormat('id-ID').format(invoice.products.reduce((acc, product) => acc + product.product_price, 0))}
                </p>
              </div>
            </div>
          ))}
          </div>
        
        {selectedInvoice && (
          <div className="popup-container">
            <div className="popup-card">
              <span className="close-btn" onClick={closePopup}>×</span>
              <h3>Invoice Details</h3>
              <p>Invoice ID: {selectedInvoice.invoice_id}</p>
              <p>Customer: {selectedInvoice.invoice_customer_name}</p>
              <p>Salesperson: {selectedInvoice.invoice_salesperson_name}</p>
              <p>Date: {selectedInvoice.invoice_date.slice(0, 10)}</p>
              <h4>Products</h4>
              <ul>
                {selectedInvoice.products.map((product, index) => (
                  <li key={index}>
                    <div className='product-card-invoice'>
                      <img src={`http://localhost:1234/${product.product_picture}`} alt={product.product_name} className="card-img-invoice-view" />
                      {product.product_name} - Rp.{new Intl.NumberFormat('id-ID').format(product.product_price)}
                    </div>
                  </li>
                ))}
              </ul>
              <p><b>Total: </b>{new Intl.NumberFormat('id-ID').format(selectedInvoice.products.reduce((acc, product) => acc + product.product_price, 0))}</p>
            </div>
          </div>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={page * itemsPerPage >= invoices.length}>Next</button>
      </div>
    </div>
  );
};

export default InvoiceView;
