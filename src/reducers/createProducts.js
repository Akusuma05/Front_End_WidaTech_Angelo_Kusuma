import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Create Product Reducer
export const submitProduct = createAsyncThunk('products/submitProduct', async (productData) => {
  const formData = new FormData();
  formData.append('product_name', productData.product_name);
  formData.append('product_picture', productData.product_picture);
  formData.append('product_stock', productData.product_stock);
  formData.append('product_price', productData.product_price);

  const response = await axios.post('http://localhost:1234/api/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
});

const createProductSlice = createSlice({
  name: 'createProducts',
  initialState: {
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(submitProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default createProductSlice.reducer;
