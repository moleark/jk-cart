import { UqExt as Uq } from './JkOrder';
import * as $PiecewiseDetail from './$PiecewiseDetail.ui';
import * as $Piecewise from './$Piecewise.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as DeliverDetail from './DeliverDetail.ui';
import * as DeliverMain from './DeliverMain.ui';
import * as DeliverCenter from './DeliverCenter.ui';
import * as ReturnDetail from './ReturnDetail.ui';
import * as ReturnMain from './ReturnMain.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.$PiecewiseDetail, $PiecewiseDetail);
	Object.assign(uq.$Piecewise, $Piecewise);
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.OrderMain, OrderMain);
	Object.assign(uq.DeliverDetail, DeliverDetail);
	Object.assign(uq.DeliverMain, DeliverMain);
	Object.assign(uq.DeliverCenter, DeliverCenter);
	Object.assign(uq.ReturnDetail, ReturnDetail);
	Object.assign(uq.ReturnMain, ReturnMain);
	Object.assign(uq.DxOrderDetail, DxOrderDetail);
	Object.assign(uq.DxReturnDetail, DxReturnDetail);
}
export * from './JkOrder';
