///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Thu Sep 09 2021 08:37:43 GMT+0800 (中国标准时间) ===//
import * as JkDeliver from './JkDeliver';
import * as JkOrder from './JkOrder';
import * as JkCollectPayment from './JkCollectPayment';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';

export interface UQs extends AppUQs {
	JkDeliver: JkDeliver.UqExt;
	JkOrder: JkOrder.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as JkDeliver from './JkDeliver';
export * as JkOrder from './JkOrder';
export * as JkCollectPayment from './JkCollectPayment';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	JkDeliver.setUI(uqs.JkDeliver);
	JkOrder.setUI(uqs.JkOrder);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
}
