import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxReceiveMain } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	amount: {
		"name": "amount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Amount"
	} as FieldItemNum,
	usedAmount: {
		"name": "usedAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "UsedAmount"
	} as FieldItemNum,
	returnAmount: {
		"name": "returnAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReturnAmount"
	} as FieldItemNum,
	leftAmount: {
		"name": "leftAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "LeftAmount"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.amount, fields.usedAmount, fields.returnAmount, fields.leftAmount, 
];

export const ui: UI = {
	label: "DxReceiveMain",
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

export function render(item: DxReceiveMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
