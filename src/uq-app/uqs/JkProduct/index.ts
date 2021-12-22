import { UqExt as Uq, assign } from './JkProduct';
import * as Chemical from './Chemical.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as Currency from './Currency.ui';
import * as PackType from './PackType.ui';
import * as Language from './Language.ui';
import * as Brand from './Brand.ui';
import * as Stuff from './Stuff.ui';
import * as ProductX from './ProductX.ui';
import * as ProductCategory from './ProductCategory.ui';
import * as Lot from './Lot.ui';
import * as PackSalesLevel from './PackSalesLevel.ui';
import * as Research from './Research.ui';
import * as ProductCategoryResearchDomain from './ProductCategoryResearchDomain.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Chemical', Chemical);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Currency', Currency);
	assign(uq, 'PackType', PackType);
	assign(uq, 'Language', Language);
	assign(uq, 'Brand', Brand);
	assign(uq, 'Stuff', Stuff);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'ProductCategory', ProductCategory);
	assign(uq, 'Lot', Lot);
	assign(uq, 'PackSalesLevel', PackSalesLevel);
	assign(uq, 'Research', Research);
	assign(uq, 'ProductCategoryResearchDomain', ProductCategoryResearchDomain);
}
export * from './JkProduct';
