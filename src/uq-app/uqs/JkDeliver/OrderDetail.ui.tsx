import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderDetail } from "./JkDeliver";

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
	item: {
		"name": "item",
		"type": "id",
		"isKey": false,
		"label": "Item"
	} as FieldItemId,
	product: {
		"name": "product",
		"type": "id",
		"isKey": false,
		"label": "Product"
	} as FieldItemId,
	quantity: {
		"name": "quantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Quantity"
	} as FieldItemNum,
	amount: {
		"name": "amount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Amount"
	} as FieldItemNum,
	price: {
		"name": "price",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Price"
	} as FieldItemNum,
	lotNumber: {
		"name": "lotNumber",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "LotNumber"
	} as FieldItemString,
	warehouse: {
		"name": "warehouse",
		"type": "id",
		"isKey": false,
		"label": "Warehouse"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.main, fields.item, fields.product, fields.quantity, fields.amount, fields.price, fields.lotNumber, fields.warehouse, 
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
