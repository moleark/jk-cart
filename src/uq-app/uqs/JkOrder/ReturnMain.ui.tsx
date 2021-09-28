import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { ReturnMain } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	no: {
		"name": "no",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "No"
	} as FieldItemString,
	customerAccount: {
		"name": "customerAccount",
		"type": "id",
		"isKey": false,
		"label": "CustomerAccount"
	} as FieldItemId,
	webUser: {
		"name": "webUser",
		"type": "id",
		"isKey": false,
		"label": "WebUser"
	} as FieldItemId,
	shippingContact: {
		"name": "shippingContact",
		"type": "id",
		"isKey": false,
		"label": "ShippingContact"
	} as FieldItemId,
	invoiceContact: {
		"name": "invoiceContact",
		"type": "id",
		"isKey": false,
		"label": "InvoiceContact"
	} as FieldItemId,
	sumAmount: {
		"name": "sumAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "SumAmount"
	} as FieldItemNum,
	currency: {
		"name": "currency",
		"type": "id",
		"isKey": false,
		"label": "Currency"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, fields.customerAccount, fields.webUser, fields.shippingContact, fields.invoiceContact, fields.sumAmount, fields.currency, fields.createDate, 
];

export const ui: UI = {
	label: "ReturnMain",
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

export function render(item: ReturnMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
