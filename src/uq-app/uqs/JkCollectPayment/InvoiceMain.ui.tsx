import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { InvoiceMain } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	invoiceNr: {
		"name": "invoiceNr",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "InvoiceNr"
	} as FieldItemString,
	invoiceType: {
		"name": "invoiceType",
		"type": "id",
		"isKey": false,
		"label": "InvoiceType"
	} as FieldItemId,
	organization: {
		"name": "organization",
		"type": "id",
		"isKey": false,
		"label": "Organization"
	} as FieldItemId,
	customer: {
		"name": "customer",
		"type": "id",
		"isKey": false,
		"label": "Customer"
	} as FieldItemId,
	currency: {
		"name": "currency",
		"type": "id",
		"isKey": false,
		"label": "Currency"
	} as FieldItemId,
	blueRed: {
		"name": "blueRed",
		"isKey": false,
		"label": "BlueRed"
	} as undefined,
	isValid: {
		"name": "isValid",
		"isKey": false,
		"label": "IsValid"
	} as undefined,
	comments: {
		"name": "comments",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Comments"
	} as FieldItemString,
	invoicer: {
		"name": "invoicer",
		"type": "id",
		"isKey": false,
		"label": "Invoicer"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.invoiceNr, fields.invoiceType, fields.organization, fields.customer, fields.currency, fields.blueRed, fields.isValid, fields.comments, fields.invoicer, fields.createDate, 
];

export const ui: UI = {
	label: "InvoiceMain",
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

export function render(item: InvoiceMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
