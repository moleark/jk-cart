import { UqExt as Uq } from './JkChemicalSecurity';
import * as JNKRestrict from './JNKRestrict.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'JNKRestrict', JNKRestrict);
}
export * from './JkChemicalSecurity';
