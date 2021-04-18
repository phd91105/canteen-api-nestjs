import { Injectable } from '@nestjs/common';
import { VNPay } from 'vn-payments';
import * as dateFormat from 'dateformat';

@Injectable()
export class VnpayService {
  async payment(amount: string, orderInfo?: string): Promise<any> {
    const vnpay = new VNPay({
      paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      merchant: process.env.MERCHANT,
      secureSecret: process.env.SECURE_SECRET,
    });
    const date = new Date();
    const checkoutPayload: any = {
      createdDate: dateFormat(date, 'yyyymmddHHmmss'),
      amount: +amount,
      clientIp: '127.0.0.1',
      locale: 'vn',
      currency: 'VND',
      orderId: `nest-${dateFormat(date, 'HHmmss')}`,
      orderInfo: orderInfo || 'pay with VNPay',
      orderType: 'food',
      returnUrl: process.env.VNP_RETURN_URL,
      transactionId: `nest-${dateFormat('HHmmss')}`,
      customerId: 'customerId',
      bankCode: 'NCB',
    };
    return await vnpay.buildCheckoutUrl(checkoutPayload);
  }
}
