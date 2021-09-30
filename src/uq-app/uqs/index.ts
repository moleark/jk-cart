///+++import AppUQs+++///
import { UQs as AppUQs } from 'uqs';
///###import AppUQs###///
//=== UqApp builder created on Mon Sep 27 2021 10:50:52 GMT+0800 (中国标准时间) ===//
import * as JkOrder from './JkOrder';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';

export interface UQs extends AppUQs {
	JkOrder: JkOrder.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as JkOrder from './JkOrder';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	JkOrder.setUI(uqs.JkOrder);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
}
