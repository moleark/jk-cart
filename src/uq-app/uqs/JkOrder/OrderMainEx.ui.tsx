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
	poNumber: {
		"name": "poNumber",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "PoNumber"
	} as FieldItemString,
	carrier: {
		"name": "carrier",
		"type": "id",
		"isKey": false,
		"label": "Carrier"
	} as FieldItemId,
	commentsAboutDeliver: {
		"name": "commentsAboutDeliver",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "CommentsAboutDeliver"
	} as FieldItemString,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.seller, fields.salesman, fields.salesRegion, fields.buyerAccount, fields.organization, fields.currency, fields.poNumber, fields.carrier, fields.commentsAboutDeliver, fields.createDate, 
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
