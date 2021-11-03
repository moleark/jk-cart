// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Coupon } from "./JkCoupon";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	code: {
		"name": "code",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "Code"
	} as FieldItemString,
	type: {
		"name": "type",
		"isKey": false,
		"label": "Type"
	} as undefined,
	validityDate: {
		"name": "validityDate",
		"isKey": false,
		"label": "ValidityDate"
	} as undefined,
	isValid: {
		"name": "isValid",
		"isKey": false,
		"label": "IsValid"
	} as undefined,
	creator: {
		"name": "creator",
		"type": "id",
		"isKey": false,
		"label": "Creator"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
	$create: {
		"name": "$create",
		"isKey": false,
		"label": "$create"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.code, fields.type, fields.validityDate, fields.isValid, fields.creator, fields.createDate, fields.$create, 
];

export const ui: UI = {
	label: "Coupon",
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

export function render(item: Coupon):JSX.Element {
	return <>{uqStringify(item)}</>;
};
