// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { ReturnMainEx } from "./JkOrder";

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
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.seller, fields.salesman, fields.salesRegion, 
];

export const ui: UI = {
	label: "ReturnMainEx",
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

export function render(item: ReturnMainEx):JSX.Element {
	return <>{uqStringify(item)}</>;
};
