import { UqExt as Uq, assign } from './JkCollectPayment';
import * as Organization from './Organization.ui';
import * as Customer from './Customer.ui';
import * as Currency from './Currency.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as InvoiceDetail from './InvoiceDetail.ui';
import * as InvoiceMain from './InvoiceMain.ui';
import * as ReceiveDetail from './ReceiveDetail.ui';
import * as ReceiveMain from './ReceiveMain.ui';
import * as InvoiceDetailRaw from './InvoiceDetailRaw.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Organization', Organization);
	assign(uq, 'Customer', Customer);
	assign(uq, 'Currency', Currency);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'InvoiceDetail', InvoiceDetail);
	assign(uq, 'InvoiceMain', InvoiceMain);
	assign(uq, 'ReceiveDetail', ReceiveDetail);
	assign(uq, 'ReceiveMain', ReceiveMain);
	assign(uq, 'InvoiceDetailRaw', InvoiceDetailRaw);
}
export * from './JkCollectPayment';
