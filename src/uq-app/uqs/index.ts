///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Wed Nov 03 2021 15:09:59 GMT+0800 (中国标准时间) ===//
import * as JkDeliver from './JkDeliver';
import * as JkOrder from './JkOrder';
import * as JkCollectPayment from './JkCollectPayment';
import * as JkPointshop from './JkPointshop';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';
import * as JkCoupon from './JkCoupon';

export interface UQs extends AppUQs {
	JkDeliver: JkDeliver.UqExt;
	JkOrder: JkOrder.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	JkPointshop: JkPointshop.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
	JkCoupon: JkCoupon.UqExt;
}

export * as JkDeliver from './JkDeliver';
export * as JkOrder from './JkOrder';
export * as JkCollectPayment from './JkCollectPayment';
export * as JkPointshop from './JkPointshop';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';
export * as JkCoupon from './JkCoupon';

export function setUI(uqs:UQs) {
	JkDeliver.setUI(uqs.JkDeliver);
	JkOrder.setUI(uqs.JkOrder);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	JkPointshop.setUI(uqs.JkPointshop);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
	JkCoupon.setUI(uqs.JkCoupon);
}
