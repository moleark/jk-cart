import { UqExt as Uq } from './JkDeliver';
import * as OrderMain from './OrderMain.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as Warehouse from './Warehouse.ui';
import * as DeliverMain from './DeliverMain.ui';
import * as DeliverDetail from './DeliverDetail.ui';
import * as DeliverMainEx from './DeliverMainEx.ui';
import * as CutOffMain from './CutOffMain.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';
import * as OrderDetailX from './OrderDetailX.ui';
import * as DxDeliverMain from './DxDeliverMain.ui';
import * as DXDeliverDetail from './DXDeliverDetail.ui';
import * as DxCutOffMain from './DxCutOffMain.ui';
import * as IxPendingDeliver from './IxPendingDeliver.ui';
import * as IxUserWarehouse from './IxUserWarehouse.ui';
import * as IxWarehouseDeliverMain from './IxWarehouseDeliverMain.ui';
import * as IxWarehouseCutOffMain from './IxWarehouseCutOffMain.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'Warehouse', Warehouse);
	assign(uq, 'DeliverMain', DeliverMain);
	assign(uq, 'DeliverDetail', DeliverDetail);
	assign(uq, 'DeliverMainEx', DeliverMainEx);
	assign(uq, 'CutOffMain', CutOffMain);
	assign(uq, 'DxOrderDetail', DxOrderDetail);
	assign(uq, 'DxReturnDetail', DxReturnDetail);
	assign(uq, 'OrderDetailX', OrderDetailX);
	assign(uq, 'DxDeliverMain', DxDeliverMain);
	assign(uq, 'DXDeliverDetail', DXDeliverDetail);
	assign(uq, 'DxCutOffMain', DxCutOffMain);
	assign(uq, 'IxPendingDeliver', IxPendingDeliver);
	assign(uq, 'IxUserWarehouse', IxUserWarehouse);
	assign(uq, 'IxWarehouseDeliverMain', IxWarehouseDeliverMain);
	assign(uq, 'IxWarehouseCutOffMain', IxWarehouseCutOffMain);
}
export * from './JkDeliver';
