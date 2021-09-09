import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DeliverMain } from "./JkDeliver";

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
	warehouse: {
		"name": "warehouse",
		"type": "id",
		"isKey": false,
		"label": "Warehouse"
	} as FieldItemId,
	$create: {
		"name": "$create",
		"isKey": false,
		"label": "$create"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, fields.customer, fields.contact, fields.warehouse, fields.$create, 
];

export const ui: UI = {
	label: "DeliverMain",
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

export function render(item: DeliverMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
