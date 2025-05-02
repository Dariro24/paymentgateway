import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearTransaction } from '../store/transactionSlice';
import { clearSelectedProduct } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state: RootState) => state.transaction.error);

  const handleBack = () => {
    dispatch(clearTransaction());
    navigate('/checkout');
  };

  const handleCancel = () => {
    dispatch(clearTransaction());
    dispatch(clearSelectedProduct());
    navigate('/');
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Ocurrió un error</h1>
      <p className="text-gray-700 mb-2">Tu transacción no pudo ser completada.</p>
      <p className="text-sm text-gray-500">Motivo: <strong>{errorMessage || 'Error desconocido'}</strong></p>

      <div className="mt-6 flex flex-col gap-2">
        <button
          onClick={handleBack}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Reintentar pago
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Cancelar y volver a productos
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
