// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { CertificateSource } from "./JkCustomer";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	certificate: {
		"name": "certificate",
		"type": "id",
		"isKey": false,
		"label": "Certificate"
	} as FieldItemId,
	buyeraccount: {
		"name": "buyeraccount",
		"type": "id",
		"isKey": false,
		"label": "Buyeraccount"
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
	status: {
		"name": "status",
		"isKey": false,
		"label": "Status"
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
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.certificate, fields.buyeraccount, fields.expiredDate, fields.path, fields.status, fields.creator, fields.createDate, 
];

export const ui: UI = {
	label: "CertificateSource",
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

export function render(item: CertificateSource):JSX.Element {
	return <>{uqStringify(item)}</>;
};
