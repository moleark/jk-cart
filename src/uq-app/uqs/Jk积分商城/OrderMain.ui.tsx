import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderMain } from "./Jk积分商城";

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
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, 
];

export const ui: UI = {
	label: "OrderMain",
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

export function render(item: OrderMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
