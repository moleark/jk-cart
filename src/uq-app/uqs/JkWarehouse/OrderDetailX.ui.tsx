import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderDetailX } from "./JkWarehouse";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	needInsuredWhenDelivery: {
		"name": "needInsuredWhenDelivery",
		"isKey": false,
		"label": "NeedInsuredWhenDelivery"
	} as undefined,
	showPrice: {
		"name": "showPrice",
		"isKey": false,
		"label": "ShowPrice"
	} as undefined,
	lotNumber: {
		"name": "lotNumber",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "LotNumber"
	} as FieldItemString,
	json: {
		"name": "json",
		"isKey": false,
		"label": "Json"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.needInsuredWhenDelivery, fields.showPrice, fields.lotNumber, fields.json, 
];

export const ui: UI = {
	label: "OrderDetailX",
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

export function render(item: OrderDetailX):JSX.Element {
	return <>{uqStringify(item)}</>;
};
