import { UqExt as Uq } from './JkCollectPayment';
import * as Organization from './Organization.ui';
import * as Customer from './Customer.ui';
import * as Currency from './Currency.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as ReceiveDetail from './ReceiveDetail.ui';
import * as ReceiveMain from './ReceiveMain.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxOrderDetailReturn from './DxOrderDetailReturn.ui';
import * as DxReceiveMain from './DxReceiveMain.ui';

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
	assign(uq, 'ReceiveDetail', ReceiveDetail);
	assign(uq, 'ReceiveMain', ReceiveMain);
	assign(uq, 'DxOrderDetail', DxOrderDetail);
	assign(uq, 'DxOrderDetailReturn', DxOrderDetailReturn);
	assign(uq, 'DxReceiveMain', DxReceiveMain);
}
export * from './JkCollectPayment';
