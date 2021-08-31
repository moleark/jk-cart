import { UqExt as Uq } from './Jk积分商城';
import * as ProductX from './ProductX.ui';
import * as Customer from './Customer.ui';
import * as WebUser from './WebUser.ui';
import * as Contact from './Contact.ui';
import * as Currency from './Currency.ui';
import * as BuyerAccount from './BuyerAccount.ui';
import * as Genre from './Genre.ui';
import * as PointProductLib from './PointProductLib.ui';
import * as Brand from './Brand.ui';
import * as OrderMain from './OrderMain.ui';
import * as OrderDetail from './OrderDetail.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Customer', Customer);
	assign(uq, 'WebUser', WebUser);
	assign(uq, 'Contact', Contact);
	assign(uq, 'Currency', Currency);
	assign(uq, 'BuyerAccount', BuyerAccount);
	assign(uq, 'Genre', Genre);
	assign(uq, 'PointProductLib', PointProductLib);
	assign(uq, 'Brand', Brand);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'OrderDetail', OrderDetail);
}
export * from './Jk积分商城';
