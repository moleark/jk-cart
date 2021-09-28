import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxOrderDetailInvoiceReceive } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	ixx: {
		"name": "ixx",
		"type": "id",
		"isKey": false,
		"label": "Ixx"
	} as FieldItemId,
	ix: {
		"name": "ix",
		"type": "id",
		"isKey": false,
		"label": "Ix"
	} as FieldItemId,
	xi: {
		"name": "xi",
		"type": "id",
		"isKey": false,
		"label": "Xi"
	} as FieldItemId,
	amount: {
		"name": "amount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Amount"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.ixx, fields.xi, fields.amount, 
];

export const ui: UI = {
	label: "DxOrderDetailInvoiceReceive",
	fieldArr,
	fields,
};

const resRaw: Res<any> = {
	$zh: {
	},
	$en: {
	}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {
	return res[str as string] ?? str;
}

export function render(item: DxOrderDetailInvoiceReceive):JSX.Element {
	return <>{uqStringify(item)}</>;
};
