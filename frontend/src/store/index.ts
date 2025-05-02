import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    product: productReducer,
  },
});

// Tipos derivados del store para usarlos en la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;