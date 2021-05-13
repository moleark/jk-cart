import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { $Piecewise } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	name: {
		"name": "name",
		"isKey": true,
		"label": "Name"
	} as undefined,
	ratio: {
		"name": "ratio",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Ratio"
	} as FieldItemNum,
	offset: {
		"name": "offset",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Offset"
	} as FieldItemNum,
	asc: {
		"name": "asc",
		"isKey": false,
		"label": "Asc"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.name, fields.ratio, fields.offset, fields.asc, 
];

export const ui: UI = {
	label: "$Piecewise",
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

export function render(item: $Piecewise):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
