///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Thu Jul 15 2021 21:55:21 GMT-0400 (北美东部夏令时间) ===//
import * as JkOrder from './JkOrder';
import * as JkCollectPayment from './JkCollectPayment';

export interface UQs extends AppUQs {
	JkOrder: JkOrder.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
}

export * as JkOrder from './JkOrder';
export * as JkCollectPayment from './JkCollectPayment';

export function setUI(uqs:UQs) {
	JkOrder.setUI(uqs.JkOrder);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
}
