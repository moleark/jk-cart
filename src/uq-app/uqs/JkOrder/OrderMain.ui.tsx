// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderMain } from "./JkOrder";

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
	webUser: {
		"name": "webUser",
		"type": "id",
		"isKey": false,
		"label": "WebUser"
	} as FieldItemId,
	customer: {
		"name": "customer",
		"type": "id",
		"isKey": false,
		"label": "Customer"
	} as FieldItemId,
	buyerAccount: {
		"name": "buyerAccount",
		"type": "id",
		"isKey": false,
		"label": "BuyerAccount"
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
	invoiceType: {
		"name": "invoiceType",
		"type": "id",
		"isKey": false,
		"label": "InvoiceType"
	} as FieldItemId,
	invoiceInfo: {
		"name": "invoiceInfo",
		"type": "id",
		"isKey": false,
		"label": "InvoiceInfo"
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
	couponNo: {
		"name": "couponNo",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "CouponNo"
	} as FieldItemString,
	sheetId: {
		"name": "sheetId",
		"type": "id",
		"isKey": false,
		"label": "SheetId"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, fields.webUser, fields.customer, fields.buyerAccount, fields.shippingContact, fields.invoiceContact, fields.invoiceType, fields.invoiceInfo, fields.sumAmount, fields.currency, fields.couponNo, fields.sheetId, fields.createDate, 
];

export const ui: UI = {
	label: "OrderMain",
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

export function render(item: OrderMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
