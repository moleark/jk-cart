//=== UqApp builder created on Fri Jul 16 2021 23:48:12 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/CollectPayment ========
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

export interface ParamDoneReceive {
	customer: number;
	detail: {
		orderDetail: number;
		amount: number;
	}[];

}
export interface ResultDoneReceive {
}

export interface ParamDoneInvoice {
	customer: number;
	detail: {
		orderDetail: number;
		amount: number;
	}[];

}
export interface ResultDoneInvoice {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamPendingInvoice {
}
export interface ReturnPendingInvoice$page {
	customer: number;
	sumAmount: number;
}
export interface ResultPendingInvoice {
	$page: ReturnPendingInvoice$page[];
}

export interface ParamPendingReceive {
}
export interface ReturnPendingReceive$page {
	customer: number;
	sumAmount: number;
}
export interface ResultPendingReceive {
	$page: ReturnPendingReceive$page[];
}

export interface ParamCustomerPendingInvoice {
	customer: number;
}
export interface ReturnCustomerPendingInvoiceRet {
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	invoice: number;
	invoiceDone: number;
	invoiceReturn: number;
	invoiceReturnDone: number;
	$id: number;
}
export interface ResultCustomerPendingInvoice {
	ret: ReturnCustomerPendingInvoiceRet[];
}

export interface ParamCustomerPendingReceive {
	customer: number;
}
export interface ReturnCustomerPendingReceiveRet {
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	receive: number;
	receiveDone: number;
	receiveReturn: number;
	receiveReturnDone: number;
}
export interface ResultCustomerPendingReceive {
	ret: ReturnCustomerPendingReceiveRet[];
}

export interface ParamCustomerPending {
	customers: string;
}
export interface ReturnCustomerPendingRet {
	customer: number;
	receive: number;
	invoice: number;
}
export interface ResultCustomerPending {
	ret: ReturnCustomerPendingRet[];
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

export interface $Piecewise {
	id?: number;
	name: string;
	ratio: number;
	offset: number;
	asc: number;
}

export interface $PiecewiseDetail {
	id?: number;
	main?: number;
	sec: number;
	value: number;
}

export interface DxOrderDetail {
	id: number;
	receive?: number;
	receiveDone?: number;
	receiveReturn?: number;
	receiveReturnDone?: number;
	invoice?: number;
	invoiceDone?: number;
	invoiceReturn?: number;
	invoiceReturnDone?: number;
	$act?: number;
}

export interface DxReturnDetail {
	id: number;
	receiveDone?: number;
	invoiceDone?: number;
	$act?: number;
}

export interface DxCustomerReceive {
	id: number;
	sumAmount?: number;
	$act?: number;
}

export interface DxCustomerInvoice {
	id: number;
	sumAmount?: number;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	receiveReturn?: number|IDXValue;
	receiveReturnDone?: number|IDXValue;
	invoice?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	invoiceReturn?: number|IDXValue;
	invoiceReturnDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReturnDetail {
	id: number|IDXValue;
	receiveDone?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxCustomerReceive {
	id: number|IDXValue;
	sumAmount?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxCustomerInvoice {
	id: number|IDXValue;
	sumAmount?: number|IDXValue;
	$act?: number;
}

export interface IxCustomerPendingReceive {
	ix: number;
	xi: number;
}

export interface IxCustomerPendingInvoice {
	ix: number;
	xi: number;
}

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	$Piecewise?: $Piecewise[];
	$PiecewiseDetail?: $PiecewiseDetail[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReturnDetail?: ActParamDxReturnDetail[];
	dxCustomerReceive?: ActParamDxCustomerReceive[];
	dxCustomerInvoice?: ActParamDxCustomerInvoice[];
	ixCustomerPendingReceive?: IxCustomerPendingReceive[];
	ixCustomerPendingInvoice?: IxCustomerPendingInvoice[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	DoneReceive: UqAction<ParamDoneReceive, ResultDoneReceive>;
	DoneInvoice: UqAction<ParamDoneInvoice, ResultDoneInvoice>;
	$poked: UqQuery<Param$poked, Result$poked>;
	PendingInvoice: UqQuery<ParamPendingInvoice, ResultPendingInvoice>;
	PendingReceive: UqQuery<ParamPendingReceive, ResultPendingReceive>;
	CustomerPendingInvoice: UqQuery<ParamCustomerPendingInvoice, ResultCustomerPendingInvoice>;
	CustomerPendingReceive: UqQuery<ParamCustomerPendingReceive, ResultCustomerPendingReceive>;
	CustomerPending: UqQuery<ParamCustomerPending, ResultCustomerPending>;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	$Piecewise: UqID<any>;
	$PiecewiseDetail: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReturnDetail: UqIDX<any>;
	DxCustomerReceive: UqIDX<any>;
	DxCustomerInvoice: UqIDX<any>;
	IxCustomerPendingReceive: UqIX<any>;
	IxCustomerPendingInvoice: UqIX<any>;
}
