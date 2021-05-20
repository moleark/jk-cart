import { UqExt as Uq } from './JkOrder';
import * as $PiecewiseDetail from './$PiecewiseDetail.ui';
import * as $Piecewise from './$Piecewise.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as DxOrderDraft from './DxOrderDraft.ui';
import * as DxOrderReturning from './DxOrderReturning.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxOrderProcessing from './DxOrderProcessing.ui';
import * as DxOrderDone from './DxOrderDone.ui';
import * as IxCustomerPendingDeliver from './IxCustomerPendingDeliver.ui';
import * as IxCustomerPendingReceive from './IxCustomerPendingReceive.ui';
import * as IxCustomerPendingInvoice from './IxCustomerPendingInvoice.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.$PiecewiseDetail, $PiecewiseDetail);
	Object.assign(uq.$Piecewise, $Piecewise);
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.OrderMain, OrderMain);
	Object.assign(uq.DxOrderDraft, DxOrderDraft);
	Object.assign(uq.DxOrderReturning, DxOrderReturning);
	Object.assign(uq.DxOrderDetail, DxOrderDetail);
	Object.assign(uq.DxOrderProcessing, DxOrderProcessing);
	Object.assign(uq.DxOrderDone, DxOrderDone);
	Object.assign(uq.IxCustomerPendingDeliver, IxCustomerPendingDeliver);
	Object.assign(uq.IxCustomerPendingReceive, IxCustomerPendingReceive);
	Object.assign(uq.IxCustomerPendingInvoice, IxCustomerPendingInvoice);
}
export * from './JkOrder';
