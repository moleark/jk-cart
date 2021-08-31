import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { StorePoint } from "./JkWarehouse";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	warehouse: {
		"name": "warehouse",
		"type": "id",
		"isKey": true,
		"label": "Warehouse"
	} as FieldItemId,
	room: {
		"name": "room",
		"type": "id",
		"isKey": true,
		"label": "Room"
	} as FieldItemId,
	x: {
		"name": "x",
		"type": "id",
		"isKey": true,
		"label": "X"
	} as FieldItemId,
	y: {
		"name": "y",
		"type": "id",
		"isKey": true,
		"label": "Y"
	} as FieldItemId,
	z: {
		"name": "z",
		"type": "id",
		"isKey": true,
		"label": "Z"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.warehouse, fields.room, fields.x, fields.y, fields.z, 
];

export const ui: UI = {
	label: "StorePoint",
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

export function render(item: StorePoint):JSX.Element {
	return <>{uqStringify(item)}</>;
};
