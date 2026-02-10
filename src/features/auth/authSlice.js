import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
};

export const CreateUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";

        // 🔐 password Redux me store mat karo
        const { password, ...safeUser } = action.payload;
        state.loggedInUser = safeUser;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;;
      })
  },
});


export const { logout } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;
