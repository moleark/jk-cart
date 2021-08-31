import { UqExt as Uq } from './JkOrder';
import * as Coupon from './Coupon.ui';
import * as Chemical from './Chemical.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as Currency from './Currency.ui';
import * as PackType from './PackType.ui';
import * as Address from './Address.ui';
import * as Country from './Country.ui';
import * as Province from './Province.ui';
import * as City from './City.ui';
import * as County from './County.ui';
import * as InvoiceType from './InvoiceType.ui';
import * as Customer from './Customer.ui';
import * as Organization from './Organization.ui';
import * as Contact from './Contact.ui';
import * as InvoiceInfo from './InvoiceInfo.ui';
import * as Brand from './Brand.ui';
import * as ProductX from './ProductX.ui';
import * as Warehouse from './Warehouse.ui';
import * as WebUser from './WebUser.ui';
import * as BuyerAccount from './BuyerAccount.ui';
import * as CommonText from './CommonText.ui';
import * as ExpressLogistics from './ExpressLogistics.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as ReturnDetail from './ReturnDetail.ui';
import * as ReturnMain from './ReturnMain.ui';
import * as OrderMainEx from './OrderMainEx.ui';
import * as OrderDetailEx from './OrderDetailEx.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';
import * as IxCustomerReturnable from './IxCustomerReturnable.ui';
import * as IxOrderAmountDiff from './IxOrderAmountDiff.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Coupon', Coupon);
	assign(uq, 'Chemical', Chemical);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Currency', Currency);
	assign(uq, 'PackType', PackType);
	assign(uq, 'Address', Address);
	assign(uq, 'Country', Country);
	assign(uq, 'Province', Province);
	assign(uq, 'City', City);
	assign(uq, 'County', County);
	assign(uq, 'InvoiceType', InvoiceType);
	assign(uq, 'Customer', Customer);
	assign(uq, 'Organization', Organization);
	assign(uq, 'Contact', Contact);
	assign(uq, 'InvoiceInfo', InvoiceInfo);
	assign(uq, 'Brand', Brand);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Warehouse', Warehouse);
	assign(uq, 'WebUser', WebUser);
	assign(uq, 'BuyerAccount', BuyerAccount);
	assign(uq, 'CommonText', CommonText);
	assign(uq, 'ExpressLogistics', ExpressLogistics);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'ReturnDetail', ReturnDetail);
	assign(uq, 'ReturnMain', ReturnMain);
	assign(uq, 'OrderMainEx', OrderMainEx);
	assign(uq, 'OrderDetailEx', OrderDetailEx);
	assign(uq, 'DxOrderDetail', DxOrderDetail);
	assign(uq, 'DxReturnDetail', DxReturnDetail);
	assign(uq, 'IxCustomerReturnable', IxCustomerReturnable);
	assign(uq, 'IxOrderAmountDiff', IxOrderAmountDiff);
}
export * from './JkOrder';
