import { UqExt as Uq } from './JkCollectPayment';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';
import * as DxCustomerReceive from './DxCustomerReceive.ui';
import * as DxCustomerInvoice from './DxCustomerInvoice.ui';
import * as IxCustomerPendingReceive from './IxCustomerPendingReceive.ui';
import * as IxCustomerPendingInvoice from './IxCustomerPendingInvoice.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.OrderMain, OrderMain);
	Object.assign(uq.DxOrderDetail, DxOrderDetail);
	Object.assign(uq.DxReturnDetail, DxReturnDetail);
	Object.assign(uq.DxCustomerReceive, DxCustomerReceive);
	Object.assign(uq.DxCustomerInvoice, DxCustomerInvoice);
	Object.assign(uq.IxCustomerPendingReceive, IxCustomerPendingReceive);
	Object.assign(uq.IxCustomerPendingInvoice, IxCustomerPendingInvoice);
}
export * from './JkCollectPayment';
