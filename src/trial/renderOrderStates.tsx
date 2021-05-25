import { Order } from "./CTrial";

export function renderOrderStates(order: Order) {
	let {draft, processing, returning, done} = order;
	let states:{caption:string, state:number}[] = [
		{caption: 'draft', state: draft},
		{caption: 'processing', state: processing},
		{caption: 'returning', state: returning},
		{caption: 'done', state: done},
	];
	let count = 0;
	return <>
		{states.map((v, index) => {
			let {caption, state} = v;
			if (!state) return null;
			let cn = 'small text-info bg-white border border-warning rounded-pill px-2';
			if (count>0) cn += ' ml-3';
			++count;
			return <div key={index} className={cn}>{caption}</div>;
		})}
	</>;
}
