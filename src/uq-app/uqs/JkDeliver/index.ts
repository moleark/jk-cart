import { UqExt as Uq } from './JkDeliver';
import * as Carrier from './Carrier.ui';
import * as OrderMain from './OrderMain.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as DeliverMain from './DeliverMain.ui';
import * as DeliverDetail from './DeliverDetail.ui';
import * as DeliverMainEx from './DeliverMainEx.ui';
import * as DxDeliverMain from './DxDeliverMain.ui';
import * as DxDeliverDetail from './DxDeliverDetail.ui';

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
	assign(uq, 'DeliverMain', DeliverMain);
	assign(uq, 'DeliverDetail', DeliverDetail);
	assign(uq, 'DeliverMainEx', DeliverMainEx);
	assign(uq, 'DxDeliverMain', DxDeliverMain);
	assign(uq, 'DxDeliverDetail', DxDeliverDetail);
}
export * from './JkDeliver';
