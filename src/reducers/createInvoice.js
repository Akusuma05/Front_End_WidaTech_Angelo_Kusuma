import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Create Invoice Reducer
export const submitInvoice = createAsyncThunk('invoices/submitInvoice', async (invoiceData) => {
  const formData = new FormData();
  formData.append('invoice_customer_name', invoiceData.invoice_customer_name);
  formData.append('invoice_salesperson_name', invoiceData.invoice_salesperson_name);
  formData.append('invoice_notes', invoiceData.invoice_notes);
  formData.append('invoice_date', invoiceData.invoice_date);

  const response = await axios.post('http://localhost:1234/api/invoice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status === 201) {
    const invoiceId = response.data.invoice.invoice_id;

    const productPromises = invoiceData.products.map((product) => {
        const productFormData = new FormData();
        productFormData.append('invoice_id', invoiceId);
        productFormData.append('product_id', product.id);
        return axios.post('http://localhost:1234/api/productinvoice', productFormData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    });

    await Promise.all(productPromises);
  }

  return response.data;
});

const submitInvoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoice: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(submitInvoice.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(submitInvoice.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.invoice = action.payload;
        })
        .addCase(submitInvoice.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
  },
});

export default submitInvoiceSlice.reducer;
