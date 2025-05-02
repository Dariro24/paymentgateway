import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProduct } from '../store/productSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';


const ProductListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.product.all);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => dispatch(setProducts(res.data)))
      .catch(err => console.error('Error al obtener productos:', err));
  }, [dispatch]);

  const handleSelect = (product: any) => {
    dispatch(selectProduct(product));
    navigate('/checkout');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-center mb-4">Selecciona un producto</h1>
      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-green-600 font-semibold mb-2">${Number(product.price).toLocaleString()} COP</p>
            <button
              onClick={() => handleSelect(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
