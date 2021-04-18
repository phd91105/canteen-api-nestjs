import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as crypto from 'crypto';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MomoService {
  async payment(
    _amount: string,
    _orderInfo?: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const endpoint =
      'https://test-payment.momo.vn/gw_payment/transactionProcessor';
    const partnerCode = process.env.PARTNER_CODE;
    const accessKey = process.env.ACCESS_KEY;
    const serectkey = process.env.MOMO_SECRET;
    const orderInfo = _orderInfo || 'pay with MoMo';
    const returnUrl = process.env.MOMO_RETURN_URL;
    const notifyurl = 'https://momo.vn/';
    const amount = _amount;
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
}
