import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import AppConfiguration from 'src/config/app.config';
import { IPaymentParams } from 'src/interfaces/payment';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MomoService {
  async payment(payParam: IPaymentParams): Promise<string> {
    const endpoint =
      'https://test-payment.momo.vn/gw_payment/transactionProcessor';
    const partnerCode = AppConfiguration.payment.momo.partnerCode;
    const accessKey = AppConfiguration.payment.momo.accessKey;
    const serectkey = AppConfiguration.payment.momo.secret;
    const orderInfo = payParam.orderInfo || 'pay with MoMo';
    const returnUrl = AppConfiguration.payment.momo.returnUrl;
    const notifyurl = 'https://momo.vn/';
    const amount = payParam.amount;
    const orderId = uuidv4();
    const requestId = uuidv4();
    const requestType = 'captureMoMoWallet';
    const extraData = 'merchantName=cantin-hutech';
    const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyurl}&extraData=${extraData}`;

    const signature = crypto
      .createHmac('sha256', serectkey)
      .update(rawSignature)
      .digest('hex');

    const body = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: returnUrl,
      notifyUrl: notifyurl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
    });
    return await axios
      .post(endpoint, body)
      .then((response) => response.data.payUrl);
  }
}
