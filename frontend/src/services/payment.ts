import axios from 'axios';

interface PaymentData {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
  customerEmail: string;
  customerPhone: string;
  customerLegalId: string;
  legalIdType: string;
  currency: string;
  amountCents: number;
  reference: string;
  paymentDescription: string;
  productId: number;
}

export async function sendPayment(data: PaymentData) {
  const response = await axios.post('http://localhost:3000/transactions/pay', data);
  return response.data;
}
