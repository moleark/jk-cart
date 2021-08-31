import { Res, setRes, TFunc, UI, uqStringify } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderDetailEx } from "./JkOrder";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	orderItemId: {
		"name": "orderItemId",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "OrderItemId"
	} as FieldItemString,
	brand: {
		"name": "brand",
		"type": "id",
		"isKey": false,
		"label": "Brand"
	} as FieldItemId,
	retail: {
		"name": "retail",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Retail"
	} as FieldItemNum,
	retailCurrency: {
		"name": "retailCurrency",
		"type": "id",
		"isKey": false,
		"label": "RetailCurrency"
	} as FieldItemId,
	bottomPrice: {
		"name": "bottomPrice",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "BottomPrice"
	} as FieldItemNum,
	bottomPriceCurrency: {
		"name": "bottomPriceCurrency",
		"type": "id",
		"isKey": false,
		"label": "BottomPriceCurrency"
	} as FieldItemId,
	costPrice: {
		"name": "costPrice",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "CostPrice"
	} as FieldItemNum,
	costPriceCurrency: {
		"name": "costPriceCurrency",
		"type": "id",
		"isKey": false,
		"label": "CostPriceCurrency"
	} as FieldItemId,
	mark: {
		"name": "mark",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Mark"
	} as FieldItemString,
	tradeType: {
		"name": "tradeType",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "TradeType"
	} as FieldItemString,
	taxRate: {
		"name": "taxRate",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "TaxRate"
	} as FieldItemNum,
	createDate: {
		"name": "createDate",
		"isKey": false,
		"label": "CreateDate"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.orderItemId, fields.brand, fields.retail, fields.retailCurrency, fields.bottomPrice, fields.bottomPriceCurrency, fields.costPrice, fields.costPriceCurrency, fields.mark, fields.tradeType, fields.taxRate, fields.createDate, 
];

export const ui: UI = {
	label: "OrderDetailEx",
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

export function render(item: OrderDetailEx):JSX.Element {
	return <>{uqStringify(item)}</>;
};
