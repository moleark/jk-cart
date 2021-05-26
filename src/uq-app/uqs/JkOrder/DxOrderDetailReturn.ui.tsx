import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxOrderDetailReturn } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	askQuantity: {
		"name": "askQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskQuantity"
	} as FieldItemNum,
	askAmount: {
		"name": "askAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskAmount"
	} as FieldItemNum,
	returnedQuantity: {
		"name": "returnedQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReturnedQuantity"
	} as FieldItemNum,
	refundAmount: {
		"name": "refundAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "RefundAmount"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.askQuantity, fields.askAmount, fields.returnedQuantity, fields.refundAmount, 
];

export const ui: UI = {
	label: "DxOrderDetailReturn",
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

export function render(item: DxOrderDetailReturn):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
