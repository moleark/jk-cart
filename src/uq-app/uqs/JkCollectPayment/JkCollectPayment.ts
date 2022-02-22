//=== UqApp builder created on Fri Oct 08 2021 19:33:33 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


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

export enum EnumBlueRed {
	blue = 1,
	red = -1
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
	customerAccount: number;
}

export interface InvoiceDetail {
	id?: number;
	main?: number;
	orderDetail: number;
	amount: number;
}

export interface InvoiceMain {
	id?: number;
	invoiceNr: string;
	invoiceType: number;
	organization: number;
	customer: number;
	currency: number;
	blueRed: any;
	isValid: number;
	comments: string;
	invoicer: number;
	createDate: any;
}

export interface ReceiveDetail {
	id?: number;
	main?: number;
	orderDetail: number;
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

export interface InvoiceDetailRaw {
	id?: number;
	main?: number;
	amount: number;
}

export interface DxOrderDetail {
	id: number;
	receive?: number;
	receiveDone?: number;
	invoice?: number;
	invoiceDone?: number;
	$act?: number;
}

export interface DxReturnDetail {
	id: number;
	receive?: number;
	receiveDone?: number;
	invoice?: number;
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

export interface DxInvoiceMain {
	id: number;
	sumAmount?: number;
	usedAmount?: number;
	redAmount?: number;
	invalidAmount?: number;
	leftAmount?: number;
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
	sumAmount?: number;
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

export interface ActParamDxReturnDetail {
	id: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	invoice?: number|IDXValue;
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

export interface ActParamDxInvoiceMain {
	id: number|IDXValue;
	sumAmount?: number|IDXValue;
	usedAmount?: number|IDXValue;
	redAmount?: number|IDXValue;
	invalidAmount?: number|IDXValue;
	leftAmount?: number|IDXValue;
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
	sumAmount?: number|IDXValue;
	usedAmount?: number|IDXValue;
	returnAmount?: number|IDXValue;
	leftAmount?: number|IDXValue;
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

export interface DxOrderDetailInvoiceReceive {
	ixx: number;
	ix: number;
	xi: number;
	amount: number;
}

export interface Refund {
	ix: number;
	xi: number;
	comments: string;
}

export interface RedInvoiceMain {
	ix: number;
	xi: number;
}

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	invoiceDetail?: InvoiceDetail[];
	invoiceMain?: InvoiceMain[];
	receiveDetail?: ReceiveDetail[];
	receiveMain?: ReceiveMain[];
	invoiceDetailRaw?: InvoiceDetailRaw[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReturnDetail?: ActParamDxReturnDetail[];
	dxCustomerReceive?: ActParamDxCustomerReceive[];
	dxCustomerInvoice?: ActParamDxCustomerInvoice[];
	dxInvoiceMain?: ActParamDxInvoiceMain[];
	dxOrderDetailReturn?: ActParamDxOrderDetailReturn[];
	dxReceiveMain?: ActParamDxReceiveMain[];
	ixCustomerPendingReceive?: IxCustomerPendingReceive[];
	ixCustomerPendingInvoice?: IxCustomerPendingInvoice[];
	dxOrderDetailInvoiceReceive?: DxOrderDetailInvoiceReceive[];
	refund?: Refund[];
	redInvoiceMain?: RedInvoiceMain[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Organization: UqTuid<TuidOrganization>;
	Customer: UqTuid<TuidCustomer>;
	Currency: UqTuid<TuidCurrency>;
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
	InvoiceDetail: UqID<any>;
	InvoiceMain: UqID<any>;
	ReceiveDetail: UqID<any>;
	ReceiveMain: UqID<any>;
	InvoiceDetailRaw: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReturnDetail: UqIDX<any>;
	DxCustomerReceive: UqIDX<any>;
	DxCustomerInvoice: UqIDX<any>;
	DxInvoiceMain: UqIDX<any>;
	DxOrderDetailReturn: UqIDX<any>;
	DxReceiveMain: UqIDX<any>;
	IxCustomerPendingReceive: UqIX<any>;
	IxCustomerPendingInvoice: UqIX<any>;
	DxOrderDetailInvoiceReceive: UqIX<any>;
	Refund: UqIX<any>;
	RedInvoiceMain: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	Object.assign((uq as any)[to], from);
}
