// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxDeliverMain } from "./JkDeliver";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	rows: {
		"name": "rows",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Rows"
	} as FieldItemInt,
	pickRows: {
		"name": "pickRows",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "PickRows"
	} as FieldItemInt,
	carrier: {
		"name": "carrier",
		"type": "id",
		"isKey": false,
		"label": "Carrier"
	} as FieldItemId,
	waybillNumber: {
		"name": "waybillNumber",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "WaybillNumber"
	} as FieldItemString,
	deliverTime: {
		"name": "deliverTime",
		"isKey": false,
		"label": "DeliverTime"
	} as undefined,
	staff: {
		"name": "staff",
		"type": "id",
		"isKey": false,
		"label": "Staff"
	} as FieldItemId,
	startTime: {
		"name": "startTime",
		"isKey": false,
		"label": "StartTime"
	} as undefined,
	finishTime: {
		"name": "finishTime",
		"isKey": false,
		"label": "FinishTime"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.rows, fields.pickRows, fields.carrier, fields.waybillNumber, fields.deliverTime, fields.staff, fields.startTime, fields.finishTime, 
];

export const ui: UI = {
	label: "DxDeliverMain",
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

export function render(item: DxDeliverMain):JSX.Element {
	return <>{uqStringify(item)}</>;
};
