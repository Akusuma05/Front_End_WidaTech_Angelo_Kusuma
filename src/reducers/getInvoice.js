import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../const";

// Get Invoice Reducer
export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  const response = await fetch(server+'/api/invoice');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default invoiceSlice.reducer;
