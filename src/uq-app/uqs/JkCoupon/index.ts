import { UqExt as Uq, assign } from './JkCoupon';
import * as Brand from './Brand.ui';
import * as Coupon from './Coupon.ui';
import * as CustomerBound from './CustomerBound.ui';
import * as WebUserBound from './WebUserBound.ui';
import * as IxCouponUsed from './IxCouponUsed.ui';
import * as IxWebuserEmployeeCopy from './IxWebuserEmployeeCopy.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Brand', Brand);
	assign(uq, 'Coupon', Coupon);
	assign(uq, 'CustomerBound', CustomerBound);
	assign(uq, 'WebUserBound', WebUserBound);
	assign(uq, 'IxCouponUsed', IxCouponUsed);
	assign(uq, 'IxWebuserEmployeeCopy', IxWebuserEmployeeCopy);
}
export * from './JkCoupon';
