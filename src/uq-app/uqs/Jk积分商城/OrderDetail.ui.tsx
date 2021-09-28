import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderDetail } from "./Jk积分商城";

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
	orderMainNo: {
		"name": "orderMainNo",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "OrderMainNo"
	} as FieldItemString,
	orderDetailNo: {
		"name": "orderDetailNo",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "OrderDetailNo"
	} as FieldItemString,
	endUser: {
		"name": "endUser",
		"type": "id",
		"isKey": false,
		"label": "EndUser"
	} as FieldItemId,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.main, fields.orderMainNo, fields.orderDetailNo, fields.endUser, fields.createDate, 
];

export const ui: UI = {
	label: "OrderDetail",
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

export function render(item: OrderDetail):JSX.Element {
	return <>{uqStringify(item)}</>;
};
