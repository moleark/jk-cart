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
	deliver: {
		"name": "deliver",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Deliver"
	} as FieldItemNum,
	deliverDone: {
		"name": "deliverDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "DeliverDone"
	} as FieldItemNum,
	deliverTime: {
		"name": "deliverTime",
		"isKey": false,
		"label": "DeliverTime"
	} as undefined,
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
	receive: {
		"name": "receive",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Receive"
	} as FieldItemNum,
	receiveDone: {
		"name": "receiveDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReceiveDone"
	} as FieldItemNum,
	receiveTime: {
		"name": "receiveTime",
		"isKey": false,
		"label": "ReceiveTime"
	} as undefined,
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
	invoice: {
		"name": "invoice",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Invoice"
	} as FieldItemNum,
	invoiceDone: {
		"name": "invoiceDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvoiceDone"
	} as FieldItemNum,
	invoiceTime: {
		"name": "invoiceTime",
		"isKey": false,
		"label": "InvoiceTime"
	} as undefined,
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
	fields.deliver, fields.deliverDone, fields.deliverTime, fields.deliverReturn, fields.deliverReturnDone, fields.receive, fields.receiveDone, fields.receiveTime, fields.receiveReturn, fields.receiveReturnDone, fields.invoice, fields.invoiceDone, fields.invoiceTime, fields.invoiceReturn, fields.invoiceReturnDone, 
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
