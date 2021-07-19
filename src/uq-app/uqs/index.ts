///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Fri Jul 16 2021 23:48:12 GMT-0400 (北美东部夏令时间) ===//
import * as JkOrder from './JkOrder';
import * as JkCollectPayment from './JkCollectPayment';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';

export interface UQs extends AppUQs {
	JkOrder: JkOrder.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as JkOrder from './JkOrder';
export * as JkCollectPayment from './JkCollectPayment';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	JkOrder.setUI(uqs.JkOrder);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
}
