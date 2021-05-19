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
	askReturnBeforeDeliverQuantity: {
		"name": "askReturnBeforeDeliverQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskReturnBeforeDeliverQuantity"
	} as FieldItemNum,
	askReturnDeforeDeliverAmount: {
		"name": "askReturnDeforeDeliverAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskReturnDeforeDeliverAmount"
	} as FieldItemNum,
	askReturnAfterDeliverQuantity: {
		"name": "askReturnAfterDeliverQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskReturnAfterDeliverQuantity"
	} as FieldItemNum,
	askReturnAfterDeliverAmount: {
		"name": "askReturnAfterDeliverAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "AskReturnAfterDeliverAmount"
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
	fields.deliveredQuantity, fields.paidAmount, fields.invoicedAmount, fields.askReturnBeforeDeliverQuantity, fields.askReturnDeforeDeliverAmount, fields.askReturnAfterDeliverQuantity, fields.askReturnAfterDeliverAmount, fields.returnedQuantity, fields.refundAmount, 
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
