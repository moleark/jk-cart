// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { CustomerBound } from "./JkCoupon";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	salesman: {
		"name": "salesman",
		"type": "id",
		"isKey": false,
		"label": "Salesman"
	} as FieldItemId,
	boundDate: {
		"name": "boundDate",
		"isKey": false,
		"label": "BoundDate"
	} as undefined,
	boundDays: {
		"name": "boundDays",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "BoundDays"
	} as FieldItemInt,
	boundType: {
		"name": "boundType",
		"isKey": false,
		"label": "BoundType"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.salesman, fields.boundDate, fields.boundDays, fields.boundType, 
];

export const ui: UI = {
	label: "CustomerBound",
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

export function render(item: CustomerBound):JSX.Element {
	return <>{uqStringify(item)}</>;
};
