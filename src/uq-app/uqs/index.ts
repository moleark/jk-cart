///+++import AppUQs+++///
import {UQs as AppUQs} from '../appUQs';
///###import AppUQs###///
//=== UqApp builder created on Thu May 13 2021 13:34:38 GMT-0400 (GMT-04:00) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as JkOrder from './JkOrder';

export interface UQs extends AppUQs {
	BzHelloTonva: BzHelloTonva.UqExt;
	JkOrder: JkOrder.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as JkOrder from './JkOrder';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
	JkOrder.setUI(uqs.JkOrder);
}
