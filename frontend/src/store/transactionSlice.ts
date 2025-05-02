import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  data: any | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: TransactionState = {
  data: JSON.parse(localStorage.getItem('transaction') || 'null'),
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    startTransaction(state) {
      state.status = 'loading';
      state.error = null;
    },
    transactionSuccess(state, action: PayloadAction<any>) {
      state.status = 'success';
      state.data = action.payload;
      localStorage.setItem('transaction', JSON.stringify(action.payload));
    },
    transactionError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    clearTransaction(state) {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('transaction');
    },
  },
});

export const {
  startTransaction,
  transactionSuccess,
  transactionError,
  clearTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
