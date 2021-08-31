//=== UqApp builder created on Tue Aug 31 2021 13:51:03 GMT+0800 (中国标准时间) ===//
import * as JkDeliver from './JkDeliver';
import * as JkOrder from './JkOrder';
import * as JkChemical from './JkChemical';
import * as JkChemicalSecurity from './JkChemicalSecurity';
import * as JkProduct from './JkProduct';
import * as JkCommon from './JkCommon';
import * as JkWebuser from './JkWebuser';
import * as JkCustomer from './JkCustomer';
import * as JkCustomerDiscount from './JkCustomerDiscount';
import * as JkPromotion from './JkPromotion';
import * as JkWarehouse from './JkWarehouse';
import * as JkSalesTask from './JkSalesTask';
import * as JkMember from './JkMember';
import * as Jk积分商城 from './Jk积分商城';
import * as JkWebBuilder from './JkWebBuilder';
import * as JkPlatformjoint from './JkPlatformjoint';

export interface UQs {
	JkDeliver: JkDeliver.UqExt;
	JkOrder: JkOrder.UqExt;
	JkChemical: JkChemical.UqExt;
	JkChemicalSecurity: JkChemicalSecurity.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCommon: JkCommon.UqExt;
	JkWebuser: JkWebuser.UqExt;
	JkCustomer: JkCustomer.UqExt;
	JkCustomerDiscount: JkCustomerDiscount.UqExt;
	JkPromotion: JkPromotion.UqExt;
	JkWarehouse: JkWarehouse.UqExt;
	JkSalesTask: JkSalesTask.UqExt;
	JkMember: JkMember.UqExt;
	Jk积分商城: Jk积分商城.UqExt;
	JkWebBuilder: JkWebBuilder.UqExt;
	JkPlatformjoint: JkPlatformjoint.UqExt;
}

export * as JkDeliver from './JkDeliver';
export * as JkOrder from './JkOrder';
export * as JkChemical from './JkChemical';
export * as JkChemicalSecurity from './JkChemicalSecurity';
export * as JkProduct from './JkProduct';
export * as JkCommon from './JkCommon';
export * as JkWebuser from './JkWebuser';
export * as JkCustomer from './JkCustomer';
export * as JkCustomerDiscount from './JkCustomerDiscount';
export * as JkPromotion from './JkPromotion';
export * as JkWarehouse from './JkWarehouse';
export * as JkSalesTask from './JkSalesTask';
export * as JkMember from './JkMember';
export * as Jk积分商城 from './Jk积分商城';
export * as JkWebBuilder from './JkWebBuilder';
export * as JkPlatformjoint from './JkPlatformjoint';

export function setUI(uqs:UQs) {
	JkDeliver.setUI(uqs.JkDeliver);
	JkOrder.setUI(uqs.JkOrder);
	JkChemical.setUI(uqs.JkChemical);
	JkChemicalSecurity.setUI(uqs.JkChemicalSecurity);
	JkProduct.setUI(uqs.JkProduct);
	JkCommon.setUI(uqs.JkCommon);
	JkWebuser.setUI(uqs.JkWebuser);
	JkCustomer.setUI(uqs.JkCustomer);
	JkCustomerDiscount.setUI(uqs.JkCustomerDiscount);
	JkPromotion.setUI(uqs.JkPromotion);
	JkWarehouse.setUI(uqs.JkWarehouse);
	JkSalesTask.setUI(uqs.JkSalesTask);
	JkMember.setUI(uqs.JkMember);
	Jk积分商城.setUI(uqs.Jk积分商城);
	JkWebBuilder.setUI(uqs.JkWebBuilder);
	JkPlatformjoint.setUI(uqs.JkPlatformjoint);
}
