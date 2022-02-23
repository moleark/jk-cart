import { UqExt as Uq, assign } from './JkCoupon';
import * as Brand from './Brand.ui';
import * as Coupon from './Coupon.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Brand', Brand);
	assign(uq, 'Coupon', Coupon);
}
export * from './JkCoupon';
