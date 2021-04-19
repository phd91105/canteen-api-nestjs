import { Injectable } from '@nestjs/common';
import { VNPay } from 'vn-payments';
import * as dateFormat from 'dateformat';
import { IPaymentParams } from 'src/interfaces/payment';
import AppConfiguration from 'src/config/app.config';

@Injectable()
export class VnpayService {
  async payment(payParam: IPaymentParams): Promise<string> {
    const vnpay = new VNPay({
      paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      merchant: AppConfiguration.payment.vnpay.merchant,
      secureSecret: AppConfiguration.payment.vnpay.secret,
    });
    const date = new Date();
    const checkoutPayload: any = {
      createdDate: `${dateFormat(date, 'yyyymmddHHmmss')}`,
      amount: +payParam.amount,
      clientIp: '127.0.0.1',
      locale: 'vn',
      currency: 'VND',
      orderId: `nest-${dateFormat(date, 'HHmmss')}`,
      orderInfo: payParam.orderInfo || 'pay with VNPay',
      orderType: 'food',
      returnUrl: AppConfiguration.payment.vnpay.returnUrl,
      transactionId: `nest-${dateFormat('HHmmss')}`,
      customerId: 'customerId',
      bankCode: 'NCB',
    };
    return (await vnpay.buildCheckoutUrl(checkoutPayload)).toString();
  }
}
