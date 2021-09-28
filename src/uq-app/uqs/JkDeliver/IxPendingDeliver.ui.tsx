import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { IxPendingDeliver } from "./JkDeliver";

/*--fields--*/
const fields = {
	ixx: {
		"name": "ixx",
		"type": "id",
		"isKey": false,
		"label": "Ixx"
	} as FieldItemId,
	ix: {
		"name": "ix",
		"type": "id",
		"isKey": false,
		"label": "Ix"
	} as FieldItemId,
	xi: {
		"name": "xi",
		"type": "id",
		"isKey": false,
		"label": "Xi"
	} as FieldItemId,
	quantity: {
		"name": "quantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Quantity"
	} as FieldItemNum,
	showPrice: {
		"name": "showPrice",
		"isKey": false,
		"label": "ShowPrice"
	} as undefined,
	json: {
		"name": "json",
		"isKey": false,
		"label": "Json"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.ixx, fields.xi, fields.quantity, fields.showPrice, fields.json, 
];

export const ui: UI = {
	label: "IxPendingDeliver",
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

export function render(item: IxPendingDeliver):JSX.Element {
	return <>{uqStringify(item)}</>;
};
