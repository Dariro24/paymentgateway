import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
}

interface ProductState {
  selected: Product | null;
  all: Product[];
}

const initialState: ProductState = {
  selected: JSON.parse(localStorage.getItem('selectedProduct') || 'null'),
  all: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.all = action.payload;
    },
    selectProduct(state, action: PayloadAction<Product>) {
      state.selected = action.payload;
      localStorage.setItem('selectedProduct', JSON.stringify(action.payload));
    },
    clearSelectedProduct(state) {
      state.selected = null;
      localStorage.removeItem('selectedProduct');
    },
  },
});

export const { setProducts, selectProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
