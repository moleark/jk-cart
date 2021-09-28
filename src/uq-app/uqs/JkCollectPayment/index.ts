import { UqExt as Uq } from './JkCollectPayment';
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
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';
import * as DxCustomerReceive from './DxCustomerReceive.ui';
import * as DxCustomerInvoice from './DxCustomerInvoice.ui';
import * as DxInvoiceMain from './DxInvoiceMain.ui';
import * as DxOrderDetailReturn from './DxOrderDetailReturn.ui';
import * as DxReceiveMain from './DxReceiveMain.ui';
import * as IxCustomerPendingReceive from './IxCustomerPendingReceive.ui';
import * as IxCustomerPendingInvoice from './IxCustomerPendingInvoice.ui';
import * as DxOrderDetailInvoiceReceive from './DxOrderDetailInvoiceReceive.ui';
import * as Refund from './Refund.ui';
import * as RedInvoiceMain from './RedInvoiceMain.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
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
	assign(uq, 'DxOrderDetail', DxOrderDetail);
	assign(uq, 'DxReturnDetail', DxReturnDetail);
	assign(uq, 'DxCustomerReceive', DxCustomerReceive);
	assign(uq, 'DxCustomerInvoice', DxCustomerInvoice);
	assign(uq, 'DxInvoiceMain', DxInvoiceMain);
	assign(uq, 'DxOrderDetailReturn', DxOrderDetailReturn);
	assign(uq, 'DxReceiveMain', DxReceiveMain);
	assign(uq, 'IxCustomerPendingReceive', IxCustomerPendingReceive);
	assign(uq, 'IxCustomerPendingInvoice', IxCustomerPendingInvoice);
	assign(uq, 'DxOrderDetailInvoiceReceive', DxOrderDetailInvoiceReceive);
	assign(uq, 'Refund', Refund);
	assign(uq, 'RedInvoiceMain', RedInvoiceMain);
}
export * from './JkCollectPayment';
