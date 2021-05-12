import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Tag } from "./BizDevHelloTonva";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	parent: {
		"name": "parent",
		"type": "integer",
		"isKey": true,
		"widget": "updown",
		"label": "Parent"
	} as FieldItemInt,
	name: {
		"name": "name",
		"isKey": true,
		"label": "Name"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.parent, fields.name, 
];

export const ui: UI = {
	label: "Tag",
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

export function render(item: Tag):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
