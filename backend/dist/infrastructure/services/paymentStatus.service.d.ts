import { HttpService } from '@nestjs/axios';
export declare class PaymentStatusService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private apiUrl;
    getTransactionStatus(transactionId: string): Promise<any>;
}
