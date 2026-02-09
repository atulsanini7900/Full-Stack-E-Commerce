import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductByFilter,
  fetchSingleProduct,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  selectedProduct: null,
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  },
);

export const fetchAllCategoryAsync = createAsyncThunk(
  "product/fetchAllCategory",
  async () => {
    const response = await fetchCategories();
    return response.data;
  },
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  },
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchByFilter",
  async ({ filter, pagination }) => {
    const response = await fetchProductByFilter(filter, pagination);
    return response.data;
  },
);

export const fetchSingleProductAsync = createAsyncThunk(
  "product/fetchSingleProduct",
   async (id) => {
    const response = await fetchSingleProduct(id);
    return response.data;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchSingleProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectSelectedProduct = (state) => state.product.selectedProduct;

export default productSlice.reducer;
