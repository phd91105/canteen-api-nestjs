import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as crypto from 'crypto';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class MomoService {
  async payment(
    _amount?: number,
    msg?: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const endpoint =
      'https://test-payment.momo.vn/gw_payment/transactionProcessor';
    const partnerCode = 'MOMOBKUN20180529';
    const accessKey = 'klm05TvNBzhg7h7j';
    const serectkey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
    const orderInfo = msg || 'pay with MoMo';
    const returnUrl = 'http://localhost:8080/momo/payment';
    const notifyurl = 'https://momo.vn/';
    const amount = _amount.toString() || 25000;
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

    return await axios.post(endpoint, body).then((response) => response.data);
  }

  async returnUrl(
    _amount: string,
    localMessage: string,
    orderId: string,
    orderType: string,
    payType: string,
    extraData: string,
    requestId: string,
    transId: string,
    responseTime: string,
  ) {
    return {
      transId: transId,
      requestId: requestId,
      orderId: orderId,
      amount: _amount,
      localMessage: localMessage,
      responseTime: responseTime,
      orderType: orderType,
      payType: payType,
      extraData: extraData,
    };
  }
}
