import { UqExt as Uq } from './JkCustomerDiscount';
import * as Organization from './Organization.ui';
import * as Brand from './Brand.ui';
import * as Customer from './Customer.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Organization', Organization);
	assign(uq, 'Brand', Brand);
	assign(uq, 'Customer', Customer);
}
export * from './JkCustomerDiscount';
