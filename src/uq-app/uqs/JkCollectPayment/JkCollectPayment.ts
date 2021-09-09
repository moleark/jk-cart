//=== UqApp builder created on Thu Sep 09 2021 08:37:43 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqID, UqIDX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/CollectPayment ========
//===============================

export enum EnumReceiveDirection {
	in = 1,
	out = -1
}

export enum EnumReceiveWay {
	bank = 1,
	weixin = 2,
	alipay = 3,
	cash = 4
}

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface Tuid$sheet {
	id?: number;
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface TuidOrganization {
	id?: number;
}

export interface TuidCustomer {
	id?: number;
}

export interface TuidCurrency {
	id?: number;
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface OrderDetail {
	id?: number;
	main?: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
}

export interface OrderMain {
	id?: number;
	no?: string;
	customer: number;
}

export interface ReceiveDetail {
	id?: number;
	main?: number;
	amount: number;
	createDate: any;
}

export interface ReceiveMain {
	id?: number;
	organization: number;
	customer: number;
	currency: number;
	direction: any;
	isValid: number;
	comments: string;
	receiveWay: any;
	receiveNr: string;
	receiveDate: any;
	receiver: number;
	createDate: any;
}

export interface DxOrderDetail {
	id: number;
	receive?: number;
	receiveDone?: number;
	invoice?: number;
	invoiceDone?: number;
	$act?: number;
}

export interface DxOrderDetailReturn {
	id: number;
	receiveReturn?: number;
	receiveReturnDone?: number;
	invoiceReturn?: number;
	invoiceReturnDone?: number;
	$act?: number;
}

export interface DxReceiveMain {
	id: number;
	amount?: number;
	usedAmount?: number;
	returnAmount?: number;
	leftAmount?: number;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	invoice?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxOrderDetailReturn {
	id: number|IDXValue;
	receiveReturn?: number|IDXValue;
	receiveReturnDone?: number|IDXValue;
	invoiceReturn?: number|IDXValue;
	invoiceReturnDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReceiveMain {
	id: number|IDXValue;
	amount?: number|IDXValue;
	usedAmount?: number|IDXValue;
	returnAmount?: number|IDXValue;
	leftAmount?: number|IDXValue;
	$act?: number;
}

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	receiveDetail?: ReceiveDetail[];
	receiveMain?: ReceiveMain[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxOrderDetailReturn?: ActParamDxOrderDetailReturn[];
	dxReceiveMain?: ActParamDxReceiveMain[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Organization: UqTuid<TuidOrganization>;
	Customer: UqTuid<TuidCustomer>;
	Currency: UqTuid<TuidCurrency>;
	$poked: UqQuery<Param$poked, Result$poked>;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	ReceiveDetail: UqID<any>;
	ReceiveMain: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxOrderDetailReturn: UqIDX<any>;
	DxReceiveMain: UqIDX<any>;
}
