import { UqExt as Uq } from './JkMember';
import * as Member from './Member.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Member', Member);
}
export * from './JkMember';
