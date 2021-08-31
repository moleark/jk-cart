import { UqExt as Uq } from './JkPromotion';
import * as SalesRegion from './SalesRegion.ui';
import * as Language from './Language.ui';
import * as Currency from './Currency.ui';
import * as ProductX from './ProductX.ui';
import * as Brand from './Brand.ui';
import * as Promotion from './Promotion.ui';
import * as PromotionType from './PromotionType.ui';
import * as PromotionStatus from './PromotionStatus.ui';
import * as Chemical from './Chemical.ui';
import * as ProductCategory from './ProductCategory.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Language', Language);
	assign(uq, 'Currency', Currency);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Brand', Brand);
	assign(uq, 'Promotion', Promotion);
	assign(uq, 'PromotionType', PromotionType);
	assign(uq, 'PromotionStatus', PromotionStatus);
	assign(uq, 'Chemical', Chemical);
	assign(uq, 'ProductCategory', ProductCategory);
}
export * from './JkPromotion';
