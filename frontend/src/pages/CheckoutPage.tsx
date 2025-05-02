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
import '../assets/CheckoutPage.css'; 

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
    <div className="checkout-container">
      <div className="checkout-content">
        <h1 className="checkout-title">Resumen de compra</h1>
  
        {selectedProduct && (
          <div className="product-card">
            <img src="/product.jpg" alt={selectedProduct.name} />
            <p className="product-name">{selectedProduct.name}</p>
            <p className="product-description">{selectedProduct.description}</p>
            <p className="product-price">${Number(selectedProduct.price).toLocaleString()} COP</p>
            <p className="product-stock">Stock: {selectedProduct.stock}</p>
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="checkout-form">
          <input type="text" name="card_holder" placeholder="Titular de la tarjeta" value={form.card_holder} onChange={handleChange} required />
          <input type="text" name="number" placeholder="Número de tarjeta" value={form.number} onChange={handleChange} required />
          <input type="text" name="cvc" placeholder="CVC" value={form.cvc} onChange={handleChange} required />
          <input type="text" name="exp_month" placeholder="Mes expiración (MM)" value={form.exp_month} onChange={handleChange} required />
          <input type="text" name="exp_year" placeholder="Año expiración (YY)" value={form.exp_year} onChange={handleChange} required />
          <input type="email" name="customerEmail" placeholder="Email" value={form.customerEmail} onChange={handleChange} required />
          <input type="text" name="customerPhone" placeholder="Teléfono" value={form.customerPhone} onChange={handleChange} required />
          <input type="text" name="customerLegalId" placeholder="Cédula" value={form.customerLegalId} onChange={handleChange} required />
          <select name="legalIdType" value={form.legalIdType} onChange={handleChange}>
            <option value="CC">C.C.</option>
            <option value="CE">C.E.</option>
          </select>
          <select name="installments" value={form.installments} onChange={handleChange} required>
            <option value="1">1 cuota</option>
            <option value="2">2 cuotas</option>
            <option value="3">3 cuotas</option>
            <option value="6">6 cuotas</option>
            <option value="12">12 cuotas</option>
          </select>
  
          <button type="submit" className="checkout-button">
            Pagar
          </button>
        </form>
  
        {transaction.status === 'success' && (
          <div className="success-message">{transaction.data.message}</div>
        )}
  
        {transaction.status === 'error' && (
          <div className="error-message">{transaction.error}</div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
