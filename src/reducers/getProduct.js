import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../const";

// Get Product Reducer
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(server+'/api/product');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
