//=== UqApp builder created on Tue May 11 2021 19:43:01 GMT-0400 (GMT-04:00) ===//
import * as BizDevHelloTonva from './BizDevHelloTonva';
import * as 百灵威系统工程部Order from './百灵威系统工程部Order';
import {UQs as appUQs} from '../appUQs';

export interface UQs extends appUQs {
	BizDevHelloTonva: BizDevHelloTonva.UqExt;
	百灵威系统工程部Order: 百灵威系统工程部Order.UqExt;
}

export * as BizDevHelloTonva from './BizDevHelloTonva';
export * as 百灵威系统工程部Order from './百灵威系统工程部Order';

export function setUI(uqs:UQs) {
	BizDevHelloTonva.setUI(uqs.BizDevHelloTonva);
	百灵威系统工程部Order.setUI(uqs.百灵威系统工程部Order);
}

export * from '../appUQs';
