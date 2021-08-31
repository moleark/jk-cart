import { UqExt as Uq } from './JkCommon';
import * as Country from './Country.ui';
import * as Province from './Province.ui';
import * as City from './City.ui';
import * as County from './County.ui';
import * as Address from './Address.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as Currency from './Currency.ui';
import * as PackType from './PackType.ui';
import * as PackTypeStandard from './PackTypeStandard.ui';
import * as Language from './Language.ui';
import * as InvoiceType from './InvoiceType.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Country', Country);
	assign(uq, 'Province', Province);
	assign(uq, 'City', City);
	assign(uq, 'County', County);
	assign(uq, 'Address', Address);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Currency', Currency);
	assign(uq, 'PackType', PackType);
	assign(uq, 'PackTypeStandard', PackTypeStandard);
	assign(uq, 'Language', Language);
	assign(uq, 'InvoiceType', InvoiceType);
}
export * from './JkCommon';
