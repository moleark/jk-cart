// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { IxPendingTruck } from "./JkDeliver";

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
	contact: {
		"name": "contact",
		"type": "id",
		"isKey": false,
		"label": "Contact"
	} as FieldItemId,
	json: {
		"name": "json",
		"isKey": false,
		"label": "Json"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.xi, fields.contact, fields.json, 
];

export const ui: UI = {
	label: "IxPendingTruck",
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

export function render(item: IxPendingTruck):JSX.Element {
	return <>{uqStringify(item)}</>;
};
