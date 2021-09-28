import { UqExt as Uq } from './JkCustomer';
import * as Currency from './Currency.ui';
import * as Contact from './Contact.ui';
import * as Customer from './Customer.ui';
import * as InvoiceType from './InvoiceType.ui';
import * as Research from './Research.ui';
import * as Province from './Province.ui';
import * as Department from './Department.ui';
import * as BuyerAccount from './BuyerAccount.ui';
import * as Organization from './Organization.ui';
import * as Country from './Country.ui';
import * as InvoiceInfo from './InvoiceInfo.ui';
import * as City from './City.ui';
import * as Post from './Post.ui';
import * as County from './County.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as Employee from './Employee.ui';
import * as Address from './Address.ui';
import * as Domain from './Domain.ui';
import * as ProductX from './ProductX.ui';
import * as Brand from './Brand.ui';
import * as CustomerSettingType from './CustomerSettingType.ui';
import * as VIPCardType from './VIPCardType.ui';
import * as CustomerSalesman from './CustomerSalesman.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Currency', Currency);
	assign(uq, 'Contact', Contact);
	assign(uq, 'Customer', Customer);
	assign(uq, 'InvoiceType', InvoiceType);
	assign(uq, 'Research', Research);
	assign(uq, 'Province', Province);
	assign(uq, 'Department', Department);
	assign(uq, 'BuyerAccount', BuyerAccount);
	assign(uq, 'Organization', Organization);
	assign(uq, 'Country', Country);
	assign(uq, 'InvoiceInfo', InvoiceInfo);
	assign(uq, 'City', City);
	assign(uq, 'Post', Post);
	assign(uq, 'County', County);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Employee', Employee);
	assign(uq, 'Address', Address);
	assign(uq, 'Domain', Domain);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Brand', Brand);
	assign(uq, 'CustomerSettingType', CustomerSettingType);
	assign(uq, 'VIPCardType', VIPCardType);
	assign(uq, 'CustomerSalesman', CustomerSalesman);
}
export * from './JkCustomer';
