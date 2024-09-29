import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import water_intakeReducer from './water_intakeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    water_intakes: water_intakeReducer,
  },
});
