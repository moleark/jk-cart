///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Mon Sep 27 2021 14:37:25 GMT+0800 (中国标准时间) ===//
import * as JkDeliver from './JkDeliver';
import * as JkOrder from './JkOrder';
import * as JkCollectPayment from './JkCollectPayment';
import * as Jk积分商城 from './Jk积分商城';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';

export interface UQs extends AppUQs {
	JkDeliver: JkDeliver.UqExt;
	JkOrder: JkOrder.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	Jk积分商城: Jk积分商城.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as JkDeliver from './JkDeliver';
export * as JkOrder from './JkOrder';
export * as JkCollectPayment from './JkCollectPayment';
export * as Jk积分商城 from './Jk积分商城';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	JkDeliver.setUI(uqs.JkDeliver);
	JkOrder.setUI(uqs.JkOrder);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	Jk积分商城.setUI(uqs.Jk积分商城);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
}
