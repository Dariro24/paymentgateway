import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentStatusService {
  constructor(private readonly httpService: HttpService) {}

  
  private apiUrl = process.env.API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';

  async getTransactionStatus(transactionId: string) {
    const url = `${this.apiUrl}/transactions/${transactionId}`;
    
    try {
      const response = await this.httpService.get(url).toPromise();
      return response?.data ?? null;
    } catch (error) {
      console.error('Error consultando el estado de la transacción:', error);
      return null;
    }
  }
}