import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './orderAPI';

const initialState = {
  order: [],
  status: 'idle',
};

export const addOrderAsync = createAsyncThunk(
  'order/addorder',
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order.push( action.payload);
      });
  },
});


// export const selectCount = (state) => state.order.value;

export default orderSlice.reducer;
