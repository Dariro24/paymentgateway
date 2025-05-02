import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { sendPayment } from '../services/payment';
import {
  startTransaction,
  transactionSuccess,
  transactionError,
} from '../store/transactionSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProduct = useSelector((state: RootState) => state.product.selected);
  const transaction = useSelector((state: RootState) => state.transaction);

  const [form, setForm] = useState({
    number: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
    card_holder: '',
    customerEmail: '',
    customerPhone: '',
    customerLegalId: '',
    legalIdType: 'CC',
    currency: 'COP',
    amountCents: 0,
    reference: `TS-${Date.now()}`,
    paymentDescription: '',
    productId: 0,
    installments: '1',
  });

  // Si no hay producto seleccionado, redirige
  useEffect(() => {
    if (!selectedProduct) {
      const fromLocal = localStorage.getItem('selectedProduct');
      if (fromLocal) {
        const parsed = JSON.parse(fromLocal);
        fillProductFields(parsed);
      } else {
        navigate('/');
      }
    } else {
      fillProductFields(selectedProduct);
    }
  }, [selectedProduct]);

  const fillProductFields = (product: any) => {
    setForm(prev => ({
      ...prev,
      amountCents: Number(product.price) * 100,
      productId: product.id,
      paymentDescription: `Pago de ${product.name}`,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startTransaction());

    try {
      const res = await sendPayment(form);
      dispatch(transactionSuccess(res));
      navigate('/success');
    } catch (err: any) {
      dispatch(transactionError(err.response?.data?.message || 'Error al procesar el pago'));
      navigate('/error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-center">Resumen de compra</h1>

      {/* Producto seleccionado */}
      {selectedProduct && (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center mb-6">
          <img src="/product.jpg" alt={selectedProduct.name} className="w-32 h-32 object-contain mb-2" />
          <p className="text-lg font-bold">{selectedProduct.name}</p>
          <p className="text-sm text-gray-600">{selectedProduct.description}</p>
          <p className="text-green-600 font-semibold">${Number(selectedProduct.price).toLocaleString()} COP</p>
          <p className="text-xs text-gray-500">Stock: {selectedProduct.stock}</p>
        </div>
      )}

      {/* Formulario de pago */}
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input type="text" name="card_holder" placeholder="Titular de la tarjeta" value={form.card_holder} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="number" placeholder="Número de tarjeta" value={form.number} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="cvc" placeholder="CVC" value={form.cvc} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="exp_month" placeholder="Mes expiración (MM)" value={form.exp_month} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="exp_year" placeholder="Año expiración (YY)" value={form.exp_year} onChange={handleChange} required className="border p-2 rounded" />
        <input type="email" name="customerEmail" placeholder="Email" value={form.customerEmail} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="customerPhone" placeholder="Teléfono" value={form.customerPhone} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="customerLegalId" placeholder="Cédula" value={form.customerLegalId} onChange={handleChange} required className="border p-2 rounded" />
        <select name="legalIdType" value={form.legalIdType} onChange={handleChange} className="border p-2 rounded">
          <option value="CC">C.C.</option>
          <option value="CE">C.E.</option>
        </select>
        <select name="installments" value={form.installments} onChange={handleChange} required className="border p-2 rounded">
          <option value="1">1 cuota</option>
          <option value="2">2 cuotas</option>
          <option value="3">3 cuotas</option>
          <option value="6">6 cuotas</option>
          <option value="12">12 cuotas</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Pagar
        </button>
      </form>

      {/* Mensaje de resultado */}
      {transaction.status === 'success' && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {transaction.data.message}
        </div>
      )}

      {transaction.status === 'error' && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          {transaction.error}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
