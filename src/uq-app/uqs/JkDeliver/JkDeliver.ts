//=== UqApp builder created on Thu Sep 09 2021 08:37:43 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqID, UqIDX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/deliver ========
//===============================

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

export interface TuidCarrier {
	id?: number;
	name: string;
	no: string;
	isValid: number;
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetOrderDetailTransportation {
	orderDetail: number;
}
export interface ReturnGetOrderDetailTransportationRet {
	orderDetail: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
}
export interface ResultGetOrderDetailTransportation {
	ret: ReturnGetOrderDetailTransportationRet[];
}

export interface OrderMain {
	id?: number;
	no?: string;
	customer: number;
	contact: number;
}

export interface OrderDetail {
	id?: number;
	main?: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	lotNumber: string;
	warehouse: number;
}

export interface DeliverMain {
	id?: number;
	no?: string;
	customer: number;
	contact: number;
	warehouse: number;
	$create?: any;
}

export interface DeliverDetail {
	id?: number;
	main?: number;
}

export interface DeliverMainEx {
	id?: number;
	deliverId: string;
	warehouseName: string;
	addressString: string;
}

export interface DxDeliverMain {
	id: number;
	staff?: number;
	rows?: number;
	pickRows?: number;
	carrier?: number;
	waybillNumber?: string;
	deliverTime?: any;
	$act?: number;
}

export interface DxDeliverDetail {
	id: number;
	deliverDone?: number;
	$act?: number;
}

export interface ActParamDxDeliverMain {
	id: number|IDXValue;
	staff?: number|IDXValue;
	rows?: number|IDXValue;
	pickRows?: number|IDXValue;
	carrier?: number|IDXValue;
	waybillNumber?: string|IDXValue;
	deliverTime?: any|IDXValue;
	$act?: number;
}

export interface ActParamDxDeliverDetail {
	id: number|IDXValue;
	deliverDone?: number|IDXValue;
	$act?: number;
}

export interface ParamActs {
	orderMain?: OrderMain[];
	orderDetail?: OrderDetail[];
	deliverMain?: DeliverMain[];
	deliverDetail?: DeliverDetail[];
	deliverMainEx?: DeliverMainEx[];
	dxDeliverMain?: ActParamDxDeliverMain[];
	dxDeliverDetail?: ActParamDxDeliverDetail[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Carrier: UqTuid<TuidCarrier>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetOrderDetailTransportation: UqQuery<ParamGetOrderDetailTransportation, ResultGetOrderDetailTransportation>;
	OrderMain: UqID<any>;
	OrderDetail: UqID<any>;
	DeliverMain: UqID<any>;
	DeliverDetail: UqID<any>;
	DeliverMainEx: UqID<any>;
	DxDeliverMain: UqIDX<any>;
	DxDeliverDetail: UqIDX<any>;
}
