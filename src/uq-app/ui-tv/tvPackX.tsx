export interface TuidPackX {
	id?: number;
    owner: number;
    radiox: number;
    radioy: number;
    unit: string;
    salesLevel: number;
}

export function renderPackX(item: TuidPackX):JSX.Element {
	let {radiox, radioy, unit} = item;
    let vp: any;
    if (radiox && (radiox !== 1)) {
        vp = <>{radiox}<span className="me-2">x</span></>;
    }
	return <>{vp}{radioy}{unit}</>;
};
