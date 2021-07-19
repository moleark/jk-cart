import { UqExt as Uq } from './JkProduct';
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

export function setUI(uq: Uq) {
	Object.assign(uq.Chemical, Chemical);
	Object.assign(uq.SalesRegion, SalesRegion);
	Object.assign(uq.Currency, Currency);
	Object.assign(uq.PackType, PackType);
	Object.assign(uq.Language, Language);
	Object.assign(uq.Brand, Brand);
	Object.assign(uq.Stuff, Stuff);
	Object.assign(uq.ProductX, ProductX);
	Object.assign(uq.ProductCategory, ProductCategory);
	Object.assign(uq.Lot, Lot);
	Object.assign(uq.PackSalesLevel, PackSalesLevel);
}
export * from './JkProduct';

