// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { BuyeraccountCertificate } from "./JkCustomer";

/*--fields--*/
const fields = {
	ix: {
		"name": "ix",
		"type": "id",
		"isKey": false,
		"label": "Ix"
	} as FieldItemId,
	xi: {
		"name": "xi",
		"type": "id",
		"isKey": false,
		"label": "Xi"
	} as FieldItemId,
	expiredDate: {
		"name": "expiredDate",
		"isKey": false,
		"label": "ExpiredDate"
	} as undefined,
	path: {
		"name": "path",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Path"
	} as FieldItemString,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.xi, fields.expiredDate, fields.path, fields.createDate, 
];

export const ui: UI = {
	label: "BuyeraccountCertificate",
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

export function render(item: BuyeraccountCertificate):JSX.Element {
	return <>{uqStringify(item)}</>;
};
