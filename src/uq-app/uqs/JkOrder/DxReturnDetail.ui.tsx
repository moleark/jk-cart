import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxReturnDetail } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	deliverReturn: {
		"name": "deliverReturn",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "DeliverReturn"
	} as FieldItemNum,
	deliverReturnDone: {
		"name": "deliverReturnDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "DeliverReturnDone"
	} as FieldItemNum,
	receiveReturn: {
		"name": "receiveReturn",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReceiveReturn"
	} as FieldItemNum,
	receiveReturnDone: {
		"name": "receiveReturnDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReceiveReturnDone"
	} as FieldItemNum,
	invoiceReturn: {
		"name": "invoiceReturn",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvoiceReturn"
	} as FieldItemNum,
	invoiceReturnDone: {
		"name": "invoiceReturnDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvoiceReturnDone"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.deliverReturn, fields.deliverReturnDone, fields.receiveReturn, fields.receiveReturnDone, fields.invoiceReturn, fields.invoiceReturnDone, 
];

export const ui: UI = {
	label: "DxReturnDetail",
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

export function render(item: DxReturnDetail):JSX.Element {
	return <>{uqStringify(item)}</>;
};
