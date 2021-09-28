import { UqExt as Uq } from './JkDeliver';
import * as Carrier from './Carrier.ui';
import * as OrderMain from './OrderMain.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as Warehouse from './Warehouse.ui';
import * as DeliverMain from './DeliverMain.ui';
import * as DeliverDetail from './DeliverDetail.ui';
import * as DeliverMainEx from './DeliverMainEx.ui';
import * as CutOffMain from './CutOffMain.ui';
import * as CutOffType from './CutOffType.ui';
import * as DeliverType from './DeliverType.ui';
import * as DxDeliverMain from './DxDeliverMain.ui';
import * as DxDeliverDetail from './DxDeliverDetail.ui';
import * as DxCutOffMain from './DxCutOffMain.ui';
import * as DxDelivering from './DxDelivering.ui';
import * as IxPendingDeliver from './IxPendingDeliver.ui';
import * as IxUserWarehouse from './IxUserWarehouse.ui';
import * as IxCutoffTypeDefinition from './IxCutoffTypeDefinition.ui';
import * as CutOffProcessing from './CutOffProcessing.ui';
import * as DeliverDetailExchangeDetail from './DeliverDetailExchangeDetail.ui';
import * as DeliverDetailOrderDetail from './DeliverDetailOrderDetail.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Carrier', Carrier);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'Warehouse', Warehouse);
	assign(uq, 'DeliverMain', DeliverMain);
	assign(uq, 'DeliverDetail', DeliverDetail);
	assign(uq, 'DeliverMainEx', DeliverMainEx);
	assign(uq, 'CutOffMain', CutOffMain);
	assign(uq, 'CutOffType', CutOffType);
	assign(uq, 'DeliverType', DeliverType);
	assign(uq, 'DxDeliverMain', DxDeliverMain);
	assign(uq, 'DxDeliverDetail', DxDeliverDetail);
	assign(uq, 'DxCutOffMain', DxCutOffMain);
	assign(uq, 'DxDelivering', DxDelivering);
	assign(uq, 'IxPendingDeliver', IxPendingDeliver);
	assign(uq, 'IxUserWarehouse', IxUserWarehouse);
	assign(uq, 'IxCutoffTypeDefinition', IxCutoffTypeDefinition);
	assign(uq, 'CutOffProcessing', CutOffProcessing);
	assign(uq, 'DeliverDetailExchangeDetail', DeliverDetailExchangeDetail);
	assign(uq, 'DeliverDetailOrderDetail', DeliverDetailOrderDetail);
}
export * from './JkDeliver';
