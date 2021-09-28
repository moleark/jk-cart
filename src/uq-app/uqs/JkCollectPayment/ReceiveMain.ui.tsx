import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { ReceiveMain } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
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
	direction: {
		"name": "direction",
		"isKey": false,
		"label": "Direction"
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
	receiveWay: {
		"name": "receiveWay",
		"isKey": false,
		"label": "ReceiveWay"
	} as undefined,
	receiveNr: {
		"name": "receiveNr",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "ReceiveNr"
	} as FieldItemString,
	receiveDate: {
		"name": "receiveDate",
		"isKey": false,
		"label": "ReceiveDate"
	} as undefined,
	receiver: {
		"name": "receiver",
		"type": "id",
		"isKey": false,
		"label": "Receiver"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.organization, fields.customer, fields.currency, fields.direction, fields.isValid, fields.comments, fields.receiveWay, fields.receiveNr, fields.receiveDate, fields.receiver, fields.createDate, 
];

export const ui: UI = {
	label: "ReceiveMain",
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

export function render(item: ReceiveMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
