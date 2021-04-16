import { Injectable } from '@nestjs/common';
import { VNPay } from 'vn-payments';
import * as dateFormat from 'dateformat';

@Injectable()
export class VnpayService {
  async payment(
    amount: string,
    orderInfo: string,
    orderType: string,
    customerId: string,
  ): Promise<any> {
    const vnpay = new VNPay({
      paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      merchant: process.env.MERCHANT,
      secureSecret: process.env.SECURE_SECRET,
    });
    const date = new Date();
    const checkoutPayload: any = {
      createdDate: dateFormat(date, 'yyyymmddHHmmss'),
      amount: parseInt(amount),
      clientIp: '127.0.0.1',
      locale: 'vn',
      currency: 'VND',
      orderId: `nest-${dateFormat(date, 'HHmmss')}`,
      orderInfo: orderInfo,
      orderType: orderType,
      returnUrl: process.env.VNP_RETURN_URL,
      transactionId: `nest-${dateFormat('HHmmss')}`,
      customerId: customerId,
      bankCode: 'NCB',
    };
    return await vnpay.buildCheckoutUrl(checkoutPayload);
  }

  async returnUrl(
    vnp_TransactionNo: string,
    vnp_BankTranNo: string,
    vnp_Amount: string,
    vnp_BankCode: string,
    vnp_OrderInfo: string,
    vnp_PayDate: string,
  ) {
    return {
      vnp_TransactionNo: vnp_TransactionNo,
      vnp_BankTranNo: vnp_BankTranNo,
      vnp_Amount: parseInt(vnp_Amount) / 100,
      vnp_BankCode: vnp_BankCode,
      vnp_OrderInfo: vnp_OrderInfo,
      responseTime: vnp_PayDate,
    };
  }
}
