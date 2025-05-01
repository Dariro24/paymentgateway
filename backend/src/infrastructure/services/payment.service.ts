import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private apiUrl = process.env.API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';
  private publicKey = process.env.PUBLIC_KEY || '';
  private privateKey = process.env.PRIVATE_KEY || '';
  private integrityKey = process.env.INTEGRITY_KEY || '';

  /**
   * Paso 1: Obtener acceptance_token desde Wompi
   */
  async getAcceptanceToken(): Promise<string> {
    const url = `${this.apiUrl}/merchants/${this.publicKey}`;
    try {
      const response = await axios.get(url);
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      console.error('❌ Error al obtener acceptance_token:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Paso 1.1: Generar Signature - VERSIÓN CORREGIDA
   */
  private generateSignature(
    amountInCents: number, 
    currency: string, 
    reference: string
  ): string {
    // 1. Validar que la integrityKey esté configurada
    if (!this.integrityKey) {
      throw new Error('Integrity Key no configurada');
    }
  
    // 2. Asegurar formato correcto y consistente de variables
    const amountStr = Math.round(amountInCents).toString(); // Asegurar que es un entero sin decimales
    const currencyStr = currency.toUpperCase(); // Asegurar que currency está en mayúsculas
    const referenceStr = reference.toString(); // Convertir a string si no lo es
    
    // 3. Concatenar en ORDEN CORRECTO sin espacios ni caracteres adicionales
    const signatureString = `${referenceStr}${amountStr}${currencyStr}${this.integrityKey}`;
  
    // 4. Generar hash SHA256
    const signature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');
      
    return signature;
  }

  /**
   * Paso 2: Generar token de tarjeta
   */
  async getCardToken(params: {
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
    acceptanceToken: string; 
  }): Promise<string> {
    const url = `${this.apiUrl}/tokens/cards`;

    const body = {
      number: params.number,
      cvc: params.cvc,
      exp_month: params.expMonth,
      exp_year: params.expYear,
      card_holder: params.cardHolder,
      acceptance_token: params.acceptanceToken,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data.id; // token de tarjeta (ej. tok_stagtest_...)
    } catch (error) {
      console.error('❌ Error al generar token de tarjeta:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Paso 3: Crear transacción en Wompi con el token y el acceptance_token
   */
  async createTransaction(params: {
    amountCents: number;
    currency: string;
    customerEmail: string;
    paymentMethodToken: string;
    customerLegalId: string;
    customerFullName: string;
    customerPhone: string;
    legalIdType: string;
    installments: string;
    reference: string;
    paymentDescription: string;
  }) {
    const acceptanceToken = await this.getAcceptanceToken();

    // Asegurar que amountCents es un entero
    const amountInCents = Math.round(params.amountCents);
    // Asegurar que currency está en mayúsculas
    const currency = params.currency.toUpperCase();
    
    const signature = this.generateSignature(
      amountInCents,
      currency,
      params.reference
    );
  
    const body = {
      acceptance_token: acceptanceToken,
      amount_in_cents: amountInCents,
      currency: currency,
      customer_email: params.customerEmail,
      reference: params.reference,
      signature: signature,
      customer_data: {
        legal_id: params.customerLegalId,
        full_name: params.customerFullName,
        phone_number: params.customerPhone,
        legal_id_type: params.legalIdType,
      },
      payment_method: {
        type: 'CARD',
        user_type: 'PERSON',
        phone_number: params.customerPhone,
        installments: params.installments || '1',
        payment_description: params.paymentDescription,
        token: params.paymentMethodToken, 
      },
    };
    
    try {
      const response = await axios.post(`${this.apiUrl}/transactions`, body, {
        headers: {
          Authorization: `Bearer ${this.privateKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data; // Contiene status, id, etc.
    } catch (error) {
      if (error.response?.data) {
        console.error('❌ Error al crear transacción:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.error('❌ Error al crear transacción', error.message);
      }
      throw error;
    }
  }
}