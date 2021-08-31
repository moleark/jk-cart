import { UqExt as Uq } from './JkWebuser';
import * as InvoiceInfo from './InvoiceInfo.ui';
import * as Address from './Address.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as County from './County.ui';
import * as Customer from './Customer.ui';
import * as WebUser from './WebUser.ui';
import * as AuditPendingUserRefuseReason from './AuditPendingUserRefuseReason.ui';
import * as City from './City.ui';
import * as InvoiceType from './InvoiceType.ui';
import * as BuyerAccount from './BuyerAccount.ui';
import * as Currency from './Currency.ui';
import * as Country from './Country.ui';
import * as Province from './Province.ui';
import * as Contact from './Contact.ui';
import * as WebUserSettingType from './WebUserSettingType.ui';
import * as VIPCardType from './VIPCardType.ui';
import * as ProductX from './ProductX.ui';
import * as Brand from './Brand.ui';
import * as Chemical from './Chemical.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'InvoiceInfo', InvoiceInfo);
	assign(uq, 'Address', Address);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'County', County);
	assign(uq, 'Customer', Customer);
	assign(uq, 'WebUser', WebUser);
	assign(uq, 'AuditPendingUserRefuseReason', AuditPendingUserRefuseReason);
	assign(uq, 'City', City);
	assign(uq, 'InvoiceType', InvoiceType);
	assign(uq, 'BuyerAccount', BuyerAccount);
	assign(uq, 'Currency', Currency);
	assign(uq, 'Country', Country);
	assign(uq, 'Province', Province);
	assign(uq, 'Contact', Contact);
	assign(uq, 'WebUserSettingType', WebUserSettingType);
	assign(uq, 'VIPCardType', VIPCardType);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Brand', Brand);
	assign(uq, 'Chemical', Chemical);
}
export * from './JkWebuser';
