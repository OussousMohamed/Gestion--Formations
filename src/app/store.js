import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employeeSlice';
import formationReducer from '../features/formationSlice';
import participationReducer from '../features/participationSlice';


const store = configureStore({
 reducer: {
         employees: employeeReducer,
         formations: formationReducer,
         participations: participationReducer
 },
});

export default store;