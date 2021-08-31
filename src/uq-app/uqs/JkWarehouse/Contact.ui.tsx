import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Contact } from "./JkWarehouse";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	name: {
		"name": "name",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Name"
	} as FieldItemString,
	organizationName: {
		"name": "organizationName",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "OrganizationName"
	} as FieldItemString,
	mobile: {
		"name": "mobile",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Mobile"
	} as FieldItemString,
	telephone: {
		"name": "telephone",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Telephone"
	} as FieldItemString,
	email: {
		"name": "email",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Email"
	} as FieldItemString,
	addressString: {
		"name": "addressString",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "AddressString"
	} as FieldItemString,
	address: {
		"name": "address",
		"type": "id",
		"isKey": false,
		"label": "Address"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.name, fields.organizationName, fields.mobile, fields.telephone, fields.email, fields.addressString, fields.address, 
];

export const ui: UI = {
	label: "Contact",
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

export function render(item: Contact):JSX.Element {
	return <>{uqStringify(item)}</>;
};
