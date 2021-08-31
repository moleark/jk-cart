import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { WarehouseN } from "./JkWarehouse";

/*--fields--*/
const fields = {
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	
];

export const ui: UI = {
	label: "WarehouseN",
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

export function render(item: WarehouseN):JSX.Element {
	return <>{uqStringify(item)}</>;
};
