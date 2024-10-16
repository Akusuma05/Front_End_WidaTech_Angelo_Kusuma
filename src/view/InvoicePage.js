import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InvoiceView from './invoiceView';
import SummaryView from './summaryView';
import AddInvoiceView from './addInvoiceView';
import { toggleAddInvoice } from '../actions/floatingActionButtonInvoice';
import './styles/invoicePage.css';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const showAddInvoice = useSelector(state => state.invoice.showAddInvoice);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showAddInvoice) {
      setAnimate(true);
    }
  }, [showAddInvoice]);

  const handleFabClick = () => {
    if (showAddInvoice) {
      setAnimate(false);
      setTimeout(() => {
        dispatch(toggleAddInvoice());
      }, 500); 
    } else {
      dispatch(toggleAddInvoice());
    }
  };

  return (
    <div className="invoice-page-container">
      <div className="row"><SummaryView /></div>
      <div className="row"><InvoiceView /></div>
      {showAddInvoice && (
        <div className="popup-container-invoice">
          <div className={`popup-card-invoice ${animate ? 'fade-in-slide-in-invoice' : 'fade-out-slide-out-invoice'}`}>
            <span className="close-btn-invoice" onClick={handleFabClick}>×</span>
            <AddInvoiceView />
          </div>
        </div>
      )}
      <button className="fab-invoice" onClick={handleFabClick}>
        +
      </button>
    </div>
  );
};

export default InvoicePage;
