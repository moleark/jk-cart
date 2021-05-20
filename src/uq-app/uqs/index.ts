///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Wed May 19 2021 23:34:22 GMT-0400 (GMT-04:00) ===//
import * as JkOrder from './JkOrder';

export interface UQs extends AppUQs {
	JkOrder: JkOrder.UqExt;
}

export * as JkOrder from './JkOrder';

export function setUI(uqs:UQs) {
	JkOrder.setUI(uqs.JkOrder);
}
