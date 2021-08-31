import { UqExt as Uq } from './JkChemical';
import * as Chemical from './Chemical.ui';
import * as StorageCondition from './StorageCondition.ui';
import * as JNKRestrict from './JNKRestrict.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Chemical', Chemical);
	assign(uq, 'StorageCondition', StorageCondition);
	assign(uq, 'JNKRestrict', JNKRestrict);
}
export * from './JkChemical';
