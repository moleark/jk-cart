import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxOrderDetail } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	deliveredQuantity: {
		"name": "deliveredQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "DeliveredQuantity"
	} as FieldItemNum,
	paidAmount: {
		"name": "paidAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "PaidAmount"
	} as FieldItemNum,
	invoicedAmount: {
		"name": "invoicedAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvoicedAmount"
	} as FieldItemNum,
	returnQuantity: {
		"name": "returnQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReturnQuantity"
	} as FieldItemNum,
	returnAmount: {
		"name": "returnAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReturnAmount"
	} as FieldItemNum,
	returnInvoiceAmount: {
		"name": "returnInvoiceAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReturnInvoiceAmount"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.deliveredQuantity, fields.paidAmount, fields.invoicedAmount, fields.returnQuantity, fields.returnAmount, fields.returnInvoiceAmount, 
];

export const ui: UI = {
	label: "DxOrderDetail",
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

export function render(item: DxOrderDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
