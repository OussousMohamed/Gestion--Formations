import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// دالة تسجيل الدخول (Async Thunk)
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8585/users');
    const user = response.data.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // حفظ الجلسة
      return user;
    } else {
      return rejectWithValue('Email ou mot de passe incorrect');
    }
  } catch (error) {
    return rejectWithValue('Erreur de connexion au serveur');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
