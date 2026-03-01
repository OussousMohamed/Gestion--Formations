import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// API
const API_URL = "http://localhost:8585/formations";


// CRUD Operations

// Fetch all formations
export const fetchFormations = createAsyncThunk(
  'formations/fetchFormations',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Add new formation
export const addFormation = createAsyncThunk(
  'formations/addFormation',
  async (formation) => {
    const response = await axios.post(API_URL, formation);
    return response.data;
  }
);

// update formation
export const updateFormation = createAsyncThunk(
  'formations/updateFormation',
  async (formation) => {
    const response = await axios.put(`${API_URL}/${formation.id}`, formation);
    return response.data;
  }
);

// delete formation
export const deleteFormation = createAsyncThunk(
  'formations/deleteFormation',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormations.fulfilled, (state, action) => {
        state.loading = false;
        state.formations = action.payload;
      })
      .addCase(fetchFormations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFormation.fulfilled, (state, action) => {
        state.formations.push(action.payload);
      })
      .addCase(updateFormation.fulfilled, (state, action) => {
        const index = state.formations.findIndex(
          (formation) => formation.id === action.payload.id
        );
        if (index !== -1) {
          state.formations[index] = action.payload;
        }
      })
      .addCase(deleteFormation.fulfilled, (state, action) => {
        state.formations = state.formations.filter(
          (formation) => formation.id !== action.payload
        );
      });
  },
});  

export default formationSlice.reducer;