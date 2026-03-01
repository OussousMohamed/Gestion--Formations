import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// API
const API_URL = "http://localhost:8585/employes";


// CRUD Operations
// Fetch all employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Add new employee
export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
});

// update employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee) => {
    const response = await axios.put(`${API_URL}/${employee.id}`, employee);
    return response.data;
});

// delete employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    }
});

export default employeeSlice.reducer;