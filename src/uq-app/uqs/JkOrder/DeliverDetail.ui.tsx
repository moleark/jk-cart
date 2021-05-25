import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DeliverDetail } from "./JkOrder";

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
		"isKey": true,
		"label": "Main"
	} as FieldItemId,
	row: {
		"name": "row",
		"type": "integer",
		"isKey": true,
		"widget": "updown",
		"label": "Row"
	} as FieldItemInt,
	orderDetailId: {
		"name": "orderDetailId",
		"type": "id",
		"isKey": false,
		"label": "OrderDetailId"
	} as FieldItemId,
	deliverQuantity: {
		"name": "deliverQuantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "DeliverQuantity"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.main, fields.row, fields.orderDetailId, fields.deliverQuantity, 
];

export const ui: UI = {
	label: "DeliverDetail",
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

export function render(item: DeliverDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
