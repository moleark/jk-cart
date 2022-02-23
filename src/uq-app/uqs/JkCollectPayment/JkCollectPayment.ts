//=== UqApp builder created on Mon Dec 20 2021 16:49:24 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID } from "tonva-react";


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
	timezone: number;
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

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
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

export interface Param$getMyTimezone {
}
export interface Return$getMyTimezoneRet {
	timezone: number;
	unitTimeZone: number;
}
export interface Result$getMyTimezone {
	ret: Return$getMyTimezoneRet[];
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

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	invoiceDetail?: InvoiceDetail[];
	invoiceMain?: InvoiceMain[];
	receiveDetail?: ReceiveDetail[];
	receiveMain?: ReceiveMain[];
	invoiceDetailRaw?: InvoiceDetailRaw[];
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
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$poked: UqQuery<Param$poked, Result$poked>;
	PendingInvoice: UqQuery<ParamPendingInvoice, ResultPendingInvoice>;
	PendingReceive: UqQuery<ParamPendingReceive, ResultPendingReceive>;
	CustomerPendingInvoice: UqQuery<ParamCustomerPendingInvoice, ResultCustomerPendingInvoice>;
	CustomerPendingReceive: UqQuery<ParamCustomerPendingReceive, ResultCustomerPendingReceive>;
	CustomerPending: UqQuery<ParamCustomerPending, ResultCustomerPending>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	InvoiceDetail: UqID<any>;
	InvoiceMain: UqID<any>;
	ReceiveDetail: UqID<any>;
	ReceiveMain: UqID<any>;
	InvoiceDetailRaw: UqID<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
