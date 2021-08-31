import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DeliverMainEx } from "./JkDeliver";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	deliverId: {
		"name": "deliverId",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "DeliverId"
	} as FieldItemString,
	warehouseName: {
		"name": "warehouseName",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "WarehouseName"
	} as FieldItemString,
	addressString: {
		"name": "addressString",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "AddressString"
	} as FieldItemString,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.deliverId, fields.warehouseName, fields.addressString, 
];

export const ui: UI = {
	label: "DeliverMainEx",
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

export function render(item: DeliverMainEx):JSX.Element {
	return <>{uqStringify(item)}</>;
};
