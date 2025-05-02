import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearTransaction } from '../store/transactionSlice';
import { clearSelectedProduct } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transaction = useSelector((state: RootState) => state.transaction.data);

  const handleFinish = () => {
    dispatch(clearTransaction());
    dispatch(clearSelectedProduct());
    navigate('/');
  };

  if (!transaction) {
    return <p className="text-center mt-10">No hay transacción disponible.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">¡Gracias por tu compra! 🎉</h1>
      <p className="text-gray-700 mb-2">Tu transacción fue procesada exitosamente.</p>
      <p className="text-sm text-gray-500">Referencia: <strong>{transaction.transaction_reference}</strong></p>
      <p className="text-sm text-gray-500">Estado: <strong>{transaction.status}</strong></p>

      <button
        onClick={handleFinish}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Volver a productos
      </button>
    </div>
  );
};

export default SuccessPage;
