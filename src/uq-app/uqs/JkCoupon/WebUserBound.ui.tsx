// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { WebUserBound } from "./JkCoupon";

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
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.ixx, fields.xi, fields.boundDate, fields.boundDays, 
];

export const ui: UI = {
	label: "WebUserBound",
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

export function render(item: WebUserBound):JSX.Element {
	return <>{uqStringify(item)}</>;
};
