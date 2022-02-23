// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { InsuredInterval } from "./JkDeliver";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	start: {
		"name": "start",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Start"
	} as FieldItemNum,
	end: {
		"name": "end",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "End"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.start, fields.end, 
];

export const ui: UI = {
	label: "InsuredInterval",
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

export function render(item: InsuredInterval):JSX.Element {
	return <>{uqStringify(item)}</>;
};
