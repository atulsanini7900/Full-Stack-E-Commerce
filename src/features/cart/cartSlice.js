import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchItemByUserId,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (item) => {
    const response = await deleteCartItem(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items.splice(index, 1)
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
