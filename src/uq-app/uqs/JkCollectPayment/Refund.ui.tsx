import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Refund } from "./JkCollectPayment";

/*--fields--*/
const fields = {
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
	comments: {
		"name": "comments",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Comments"
	} as FieldItemString,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.xi, fields.comments, 
];

export const ui: UI = {
	label: "Refund",
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

export function render(item: Refund):JSX.Element {
	return <>{uqStringify(item)}</>;
};
