// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { TruckAdditionalTask } from "./JkDeliver";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	contact: {
		"name": "contact",
		"type": "id",
		"isKey": false,
		"label": "Contact"
	} as FieldItemId,
	content: {
		"name": "content",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Content"
	} as FieldItemString,
	note: {
		"name": "note",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Note"
	} as FieldItemString,
	creator: {
		"name": "creator",
		"type": "id",
		"isKey": false,
		"label": "Creator"
	} as FieldItemId,
	requiredDate: {
		"name": "requiredDate",
		"isKey": false,
		"label": "RequiredDate"
	} as undefined,
	staff: {
		"name": "staff",
		"type": "id",
		"isKey": false,
		"label": "Staff"
	} as FieldItemId,
	scheduleDate: {
		"name": "scheduleDate",
		"isKey": false,
		"label": "ScheduleDate"
	} as undefined,
	finishTime: {
		"name": "finishTime",
		"isKey": false,
		"label": "FinishTime"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.contact, fields.content, fields.note, fields.creator, fields.requiredDate, fields.staff, fields.scheduleDate, fields.finishTime, 
];

export const ui: UI = {
	label: "TruckAdditionalTask",
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

export function render(item: TruckAdditionalTask):JSX.Element {
	return <>{uqStringify(item)}</>;
};
