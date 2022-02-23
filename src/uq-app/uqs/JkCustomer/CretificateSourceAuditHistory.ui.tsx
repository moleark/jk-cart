// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { CretificateSourceAuditHistory } from "./JkCustomer";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	status: {
		"name": "status",
		"isKey": false,
		"label": "Status"
	} as undefined,
	comments: {
		"name": "comments",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Comments"
	} as FieldItemString,
	auditor: {
		"name": "auditor",
		"type": "id",
		"isKey": false,
		"label": "Auditor"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.status, fields.comments, fields.auditor, 
];

export const ui: UI = {
	label: "CretificateSourceAuditHistory",
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

export function render(item: CretificateSourceAuditHistory):JSX.Element {
	return <>{uqStringify(item)}</>;
};
