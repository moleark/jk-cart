import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxOrderDetail } from "./Jk积分商城";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	point: {
		"name": "point",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Point"
	} as FieldItemInt,
	totalPoint: {
		"name": "totalPoint",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "TotalPoint"
	} as FieldItemInt,
	multiple: {
		"name": "multiple",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Multiple"
	} as FieldItemInt,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.point, fields.totalPoint, fields.multiple, 
];

export const ui: UI = {
	label: "DxOrderDetail",
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

export function render(item: DxOrderDetail):JSX.Element {
	return <>{uqStringify(item)}</>;
};
