import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxOrderProcessing } from "./JkOrder";

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
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.deliveredQuantity, fields.paidAmount, fields.invoicedAmount, 
];

export const ui: UI = {
	label: "DxOrderProcessing",
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

export function render(item: DxOrderProcessing):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
