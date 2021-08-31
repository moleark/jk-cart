import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderMainEx } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	orderId: {
		"name": "orderId",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "OrderId"
	} as FieldItemString,
	seller: {
		"name": "seller",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Seller"
	} as FieldItemString,
	salesman: {
		"name": "salesman",
		"type": "id",
		"isKey": false,
		"label": "Salesman"
	} as FieldItemId,
	salesRegion: {
		"name": "salesRegion",
		"type": "id",
		"isKey": false,
		"label": "SalesRegion"
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
	organization: {
		"name": "organization",
		"type": "id",
		"isKey": false,
		"label": "Organization"
	} as FieldItemId,
	currency: {
		"name": "currency",
		"type": "id",
		"isKey": false,
		"label": "Currency"
	} as FieldItemId,
	promotionId: {
		"name": "promotionId",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "PromotionId"
	} as FieldItemString,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.orderId, fields.seller, fields.salesman, fields.salesRegion, fields.customer, fields.buyerAccount, fields.organization, fields.currency, fields.promotionId, fields.createDate, 
];

export const ui: UI = {
	label: "OrderMainEx",
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

export function render(item: OrderMainEx):JSX.Element {
	return <>{uqStringify(item)}</>;
};
