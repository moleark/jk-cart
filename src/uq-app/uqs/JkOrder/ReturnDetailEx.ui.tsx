// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { ReturnDetailEx } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	returnItemId: {
		"name": "returnItemId",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "ReturnItemId"
	} as FieldItemString,
	endUser: {
		"name": "endUser",
		"type": "id",
		"isKey": false,
		"label": "EndUser"
	} as FieldItemId,
	mark: {
		"name": "mark",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Mark"
	} as FieldItemString,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.returnItemId, fields.endUser, fields.mark, 
];

export const ui: UI = {
	label: "ReturnDetailEx",
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

export function render(item: ReturnDetailEx):JSX.Element {
	return <>{uqStringify(item)}</>;
};
