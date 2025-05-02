import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProduct } from '../store/productSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import '../assets/ProductListPage.css';

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.product.all);

  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.error('Error al obtener productos:', err));
  }, [dispatch]);

  const handleSelect = (product: any) => {
    dispatch(selectProduct(product));
    navigate('/checkout');
  };

  // Función para ir a la ruta de transacciones
  const goToTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="product-list-container">
      <h1 className="title">Selecciona un producto</h1>
      <div className="product-grid">
        {products.map((product: any) => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">
              ${Number(product.price).toLocaleString()} COP
            </p>
            <p className="product-stock">Stock: {product.stock}</p>
            <button onClick={() => handleSelect(product)} className="select-button">
              Seleccionar
            </button>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={goToTransactions} className="transactions-button">
          Ir a Transacciones
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
