import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxInvoiceMain } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	sumAmount: {
		"name": "sumAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "SumAmount"
	} as FieldItemNum,
	usedAmount: {
		"name": "usedAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "UsedAmount"
	} as FieldItemNum,
	redAmount: {
		"name": "redAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "RedAmount"
	} as FieldItemNum,
	invalidAmount: {
		"name": "invalidAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvalidAmount"
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
	fields.sumAmount, fields.usedAmount, fields.redAmount, fields.invalidAmount, fields.leftAmount, 
];

export const ui: UI = {
	label: "DxInvoiceMain",
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

export function render(item: DxInvoiceMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
