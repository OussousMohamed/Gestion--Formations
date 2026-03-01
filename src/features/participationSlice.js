import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API
const API_URL = "http://localhost:8585/participations";

// CRUD Operations

// Fetch all participations
export const fetchParticipations = createAsyncThunk(
  'participations/fetchParticipations',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Add new participation
export const addParticipation = createAsyncThunk(
  'participations/addParticipation',
  async (participation) => {
    const response = await axios.post(API_URL, participation);
    return response.data;
  }
);

// update participation
export const updateParticipation = createAsyncThunk(
  'participations/updateParticipation',
  async (participation) => {
    const response = await axios.put(`${API_URL}/${participation.id}`, participation);
    return response.data;
  }
);

// delete participation
export const deleteParticipation = createAsyncThunk(
  'participations/deleteParticipation',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const participationSlice = createSlice({
  name: 'participations',
  initialState: {
    participations: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipations.fulfilled, (state, action) => {
        state.loading = false;
        state.participations = action.payload;
      })
      .addCase(fetchParticipations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addParticipation.fulfilled, (state, action) => {
        state.participations.push(action.payload);
      })
      .addCase(updateParticipation.fulfilled, (state, action  ) => {
        const index = state.participations.findIndex(part => part.id === action.payload.id);
        if (index !== -1) {
          state.participations[index] = action.payload;
        }
      })
      .addCase(deleteParticipation.fulfilled, (state, action) => {
        state.participations = state.participations.filter(part => part.id !== action.payload);
      });
  }
});

export default participationSlice.reducer; 