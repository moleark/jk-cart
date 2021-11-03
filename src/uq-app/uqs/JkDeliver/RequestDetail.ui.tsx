// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { RequestDetail } from "./JkDeliver";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	main: {
		"name": "main",
		"type": "id",
		"isKey": false,
		"label": "Main"
	} as FieldItemId,
	biz: {
		"name": "biz",
		"type": "id",
		"isKey": false,
		"label": "Biz"
	} as FieldItemId,
	cutOffType: {
		"name": "cutOffType",
		"type": "id",
		"isKey": false,
		"label": "CutOffType"
	} as FieldItemId,
	warehouse: {
		"name": "warehouse",
		"type": "id",
		"isKey": false,
		"label": "Warehouse"
	} as FieldItemId,
	item: {
		"name": "item",
		"type": "id",
		"isKey": false,
		"label": "Item"
	} as FieldItemId,
	quantity: {
		"name": "quantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Quantity"
	} as FieldItemNum,
	lotNumber: {
		"name": "lotNumber",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "LotNumber"
	} as FieldItemString,
	showPrice: {
		"name": "showPrice",
		"isKey": false,
		"label": "ShowPrice"
	} as undefined,
	json: {
		"name": "json",
		"isKey": false,
		"label": "Json"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.main, fields.biz, fields.cutOffType, fields.warehouse, fields.item, fields.quantity, fields.lotNumber, fields.showPrice, fields.json, 
];

export const ui: UI = {
	label: "RequestDetail",
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

export function render(item: RequestDetail):JSX.Element {
	return <>{uqStringify(item)}</>;
};
