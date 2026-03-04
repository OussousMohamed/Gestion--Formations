import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employeeSlice';
import formationReducer from '../features/formationSlice';
import participationReducer from '../features/participationSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
        reducer: {
                employees: employeeReducer,
                formations: formationReducer,
                participations: participationReducer,
                auth: authReducer,
        },
});

export default store;