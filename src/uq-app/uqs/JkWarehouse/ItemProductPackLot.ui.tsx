import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { ItemProductPackLot } from "./JkWarehouse";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	product: {
		"name": "product",
		"type": "id",
		"isKey": true,
		"label": "Product"
	} as FieldItemId,
	pack: {
		"name": "pack",
		"type": "id",
		"isKey": true,
		"label": "Pack"
	} as FieldItemId,
	lot: {
		"name": "lot",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "Lot"
	} as FieldItemString,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.product, fields.pack, fields.lot, 
];

export const ui: UI = {
	label: "ItemProductPackLot",
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

export function render(item: ItemProductPackLot):JSX.Element {
	return <>{uqStringify(item)}</>;
};
