import { Res, setRes, TFunc, UI } from "tonva-react";
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
	customer: {
		"name": "customer",
		"type": "id",
		"isKey": false,
		"label": "Customer"
	} as FieldItemId,
	contact: {
		"name": "contact",
		"type": "id",
		"isKey": false,
		"label": "Contact"
	} as FieldItemId,
	sumQuanity: {
		"name": "sumQuanity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "SumQuanity"
	} as FieldItemNum,
	sumAmount: {
		"name": "sumAmount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "SumAmount"
	} as FieldItemNum,
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
	shippingContact: {
		"name": "shippingContact",
		"type": "id",
		"isKey": false,
		"label": "ShippingContact"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, fields.customer, fields.contact, fields.sumQuanity, fields.sumAmount, fields.couponNo, fields.sheetId, fields.shippingContact, 
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
	return <>{JSON.stringify(item)}</>;
};
