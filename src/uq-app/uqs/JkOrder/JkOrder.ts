//=== UqApp builder created on Fri Jul 16 2021 23:48:12 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqSheet, UqBook, UqQuery, UqMap, UqHistory, UqPending, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/order ========
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

export interface TuidCoupon {
	id?: number;
	code: string;
	user: number;
	customer: number;
	discount: number;
	preferential: number;
	validitydate: any;
	isValid: number;
}

export interface TuidChemical {
	id?: number;
	CAS: string;
}

export interface TuidSalesRegion {
	id?: number;
	name: string;
	currency: number;
	no: string;
}

export interface TuidCurrency {
	id?: number;
	name: string;
	suffix: string;
}

export interface TuidPackType {
	id?: number;
	name: string;
	description: string;
}

export interface TuidAddress {
	id?: number;
	country: number;
	province: number;
	city: number;
	county: number;
	description: string;
}

export interface TuidCountry {
	id?: number;
	code: string;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidProvince {
	id?: number;
	country: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidCity {
	id?: number;
	province: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidCounty {
	id?: number;
	city: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidInvoiceType {
	id?: number;
	description: string;
}

export interface TuidCustomer {
	id?: number;
	name: string;
}

export interface TuidOrganization {
	id?: number;
	name: string;
}

export interface TuidContact {
	id?: number;
	name: string;
	organizationName: string;
	mobile: string;
	telephone: string;
	email: string;
	address: number;
	addressString: string;
}

export interface TuidInvoiceInfo {
	id?: number;
	title: string;
	taxNo: string;
	address: string;
	telephone: string;
	bank: string;
	accountNo: string;
}

export interface TuidBrand {
	id?: number;
	name: string;
	no: string;
}

export interface TuidProductX {
	id?: number;
	brand: number;
}

export interface TuidWarehouse {
	id?: number;
	name: string;
}

export interface TuidWebUser {
	id?: number;
	name: string;
	no: number;
	password: string;
	icon: string;
}

export interface TuidBuyerAccount {
	id?: number;
}

export interface TuidCommonText {
	id?: number;
	content: string;
}

export interface TuidExpressLogistics {
	id?: number;
}

export interface ParamSetCart {
	product: number;
	pack: number;
	price: number;
	currency: number;
	quantity: number;
}
export interface ResultSetCart {
}

export interface ParamRemoveFromCart {
	rows: {
		product: number;
		pack: number;
	}[];

}
export interface ResultRemoveFromCart {
}

export interface ParamMergeCart {
	rows: {
		product: number;
		pack: number;
		quantity: number;
	}[];

}
export interface ResultMergeCart {
}

export interface ParamOrderPaid {
	id: number;
	amount: number;
}
export interface ReturnOrderPaidRet {
	ok: number;
}
export interface ResultOrderPaid {
	ret: ReturnOrderPaidRet[];
}

export interface ParamSaveOrderReturn {
	detail: {
		orderDetail: number;
		quantity: number;
	}[];

}
export interface ReturnSaveOrderReturnRet {
	id: number;
}
export interface ResultSaveOrderReturn {
	ret: ReturnSaveOrderReturnRet[];
}

export interface ParamOrderConfirm {
	id: number;
}
export interface ResultOrderConfirm {
}

export interface ParamSaveOrder {
	id: number;
	no: string;
	customer: number;
	contact: number;
	sumQuanity: number;
	sumAmount: number;
	couponNo: string;
	sheetId: number;
	shippingContact: number;
	detail: {
		id: number;
		main: number;
		warehouse: number;
		item: number;
		product: number;
		quantity: number;
		amount: number;
		price: number;
	}[];

}
export interface ReturnSaveOrderRet {
	id: number;
}
export interface ResultSaveOrder {
	ret: ReturnSaveOrderRet[];
}

export interface SheetOrder {
	webUser: number;
	organization: number;
	customer: number;
	shippingContact: number;
	invoiceContact: number;
	invoiceType: number;
	invoiceInfo: number;
	amount: number;
	currency: number;
	freightFee: number;
	freightFeeRemitted: number;
	coupon: number;
	couponOffsetAmount: number;
	couponRemitted: number;
	point: number;
	comments: string;
	salesRegion: number;
	orderItems: {
		product: number;
		pack: number;
		price: number;
		quantity: number;
		subAmount: number;
		refrigerationFee: number;
		freezingFee: number;
		packingFee: number;
		proxyFreightFee: number;
	}[];
}
export interface VerifyOrder {
}

export interface ParamGetCart {
}
export interface ReturnGetCart$page {
	date: any;
	product: number;
	pack: number;
	price: number;
	currency: number;
	quantity: number;
}
export interface ResultGetCart {
	$page: ReturnGetCart$page[];
}

export interface ParamGetPendingPayment {
}
export interface ReturnGetPendingPaymentRet {
	id: number;
	no: string;
	description: string;
	date: any;
	amount: number;
	amountPayed: number;
}
export interface ResultGetPendingPayment {
	ret: ReturnGetPendingPaymentRet[];
}

export interface ParamGetPendingAuditOrders {
	webUser: number;
}
export interface ReturnGetPendingAuditOrdersRet {
	id: number;
	no: string;
	description: string;
	date: any;
}
export interface ResultGetPendingAuditOrders {
	ret: ReturnGetPendingAuditOrdersRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetCustomerReturnable {
	customer: number;
}
export interface ReturnGetCustomerReturnable$page {
	id: number;
	main: number;
	warehouse: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	deliver: number;
	deliverDone: number;
	deliverTime: any;
	deliverReturn: number;
	deliverReturnDone: number;
	receive: number;
	receiveDone: number;
	receiveTime: any;
	receiveReturn: number;
	receiveReturnDone: number;
	invoice: number;
	invoiceDone: number;
	invoiceTime: any;
	invoiceReturn: number;
	invoiceReturnDone: number;
}
export interface ResultGetCustomerReturnable {
	$page: ReturnGetCustomerReturnable$page[];
}

export interface ParamGetCustomerOrderReturn {
	customer: number;
	order: number;
}
export interface ReturnGetCustomerOrderReturnMain {
	id: number;
	no: string;
	customer: number;
	contact: number;
	sumQuanity: number;
	sumAmount: number;
	couponNo: string;
	sheetId: number;
	shippingContact: number;
}
export interface ReturnGetCustomerOrderReturnDetail {
	id: number;
	main: number;
	warehouse: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	deliver: number;
	deliverDone: number;
	deliverTime: any;
	deliverReturn: number;
	deliverReturnDone: number;
	receive: number;
	receiveDone: number;
	receiveTime: any;
	receiveReturn: number;
	receiveReturnDone: number;
	invoice: number;
	invoiceDone: number;
	invoiceTime: any;
	invoiceReturn: number;
	invoiceReturnDone: number;
}
export interface ResultGetCustomerOrderReturn {
	main: ReturnGetCustomerOrderReturnMain[];
	detail: ReturnGetCustomerOrderReturnDetail[];
}

export interface ParamCart {
	user: number;
	product: number;
}
export interface ReturnCart$page {
	pack: number;
	price: number;
	currency: number;
	quantity: number;
	date: any;
}
export interface ResultCart {
	$page: ReturnCart$page[];
}

export interface ParamWebUserAccount {
	webUser: number;
}
export interface ReturnWebUserAccount$page {
	currency: number;
	总订单金额: number;
	总到货金额: number;
	总开票金额: number;
	总付款金额: number;
}
export interface ResultWebUserAccount {
	$page: ReturnWebUserAccount$page[];
}

export interface ParamOrderState {
}
export interface ReturnOrderState$page {
	Order: number;
	总金额: number;
	已付金额: number;
	发货完成: number;
}
export interface ResultOrderState {
	$page: ReturnOrderState$page[];
}

export interface ParamOrderHistory {
	webUser: number;
	product: number;
	pack: number;
	price: number;
	quantity: number;
	amount: number;
	refrigerationFee: number;
	freezingFee: number;
	packingFee: number;
	proxyFreightFee: number;
	currency: number;
	salesRegion: number;
}
export interface ReturnOrderHistory$page {
	date: any;
	webUser: number;
	product: number;
	pack: number;
	price: number;
	quantity: number;
	amount: number;
	refrigerationFee: number;
	freezingFee: number;
	packingFee: number;
	proxyFreightFee: number;
	currency: number;
	salesRegion: number;
	type: number;
	sheet: number;
	row: number;
	user: number;
}
export interface ResultOrderHistory {
	$page: ReturnOrderHistory$page[];
}

export interface $PiecewiseDetail {
	id?: number;
	main?: number;
	sec: number;
	value: number;
}

export interface $Piecewise {
	id?: number;
	name: string;
	ratio: number;
	offset: number;
	asc: number;
}

export interface OrderDetail {
	id?: number;
	main?: number;
	warehouse: number;
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
	contact: number;
	sumQuanity: number;
	sumAmount: number;
	couponNo: string;
	sheetId: number;
	shippingContact: number;
}

export interface ReturnDetail {
	id?: number;
	main?: number;
	orderDetail: number;
	quantity: number;
	amount: number;
}

export interface ReturnMain {
	id?: number;
}

export interface DxOrderDetail {
	id: number;
	deliver?: number;
	deliverDone?: number;
	deliverTime?: any;
	deliverReturn?: number;
	deliverReturnDone?: number;
	receive?: number;
	receiveDone?: number;
	receiveTime?: any;
	receiveReturn?: number;
	receiveReturnDone?: number;
	invoice?: number;
	invoiceDone?: number;
	invoiceTime?: any;
	invoiceReturn?: number;
	invoiceReturnDone?: number;
	$act?: number;
}

export interface DxReturnDetail {
	id: number;
	deliverReturnDone?: number;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	deliver?: number|IDXValue;
	deliverDone?: number|IDXValue;
	deliverTime?: any|IDXValue;
	deliverReturn?: number|IDXValue;
	deliverReturnDone?: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	receiveTime?: any|IDXValue;
	receiveReturn?: number|IDXValue;
	receiveReturnDone?: number|IDXValue;
	invoice?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	invoiceTime?: any|IDXValue;
	invoiceReturn?: number|IDXValue;
	invoiceReturnDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReturnDetail {
	id: number|IDXValue;
	deliverReturnDone?: number|IDXValue;
	$act?: number;
}

export interface IxCustomerReturnable {
	ixx: number;
	ix: number;
	xi: number;
}

export interface ParamActs {
	$PiecewiseDetail?: $PiecewiseDetail[];
	$Piecewise?: $Piecewise[];
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	returnDetail?: ReturnDetail[];
	returnMain?: ReturnMain[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReturnDetail?: ActParamDxReturnDetail[];
	ixCustomerReturnable?: IxCustomerReturnable[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Coupon: UqTuid<TuidCoupon>;
	Chemical: UqTuid<TuidChemical>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	Currency: UqTuid<TuidCurrency>;
	PackType: UqTuid<TuidPackType>;
	Address: UqTuid<TuidAddress>;
	Country: UqTuid<TuidCountry>;
	Province: UqTuid<TuidProvince>;
	City: UqTuid<TuidCity>;
	County: UqTuid<TuidCounty>;
	InvoiceType: UqTuid<TuidInvoiceType>;
	Customer: UqTuid<TuidCustomer>;
	Organization: UqTuid<TuidOrganization>;
	Contact: UqTuid<TuidContact>;
	InvoiceInfo: UqTuid<TuidInvoiceInfo>;
	Brand: UqTuid<TuidBrand>;
	ProductX: UqTuid<TuidProductX>;
	Warehouse: UqTuid<TuidWarehouse>;
	WebUser: UqTuid<TuidWebUser>;
	BuyerAccount: UqTuid<TuidBuyerAccount>;
	CommonText: UqTuid<TuidCommonText>;
	ExpressLogistics: UqTuid<TuidExpressLogistics>;
	SetCart: UqAction<ParamSetCart, ResultSetCart>;
	RemoveFromCart: UqAction<ParamRemoveFromCart, ResultRemoveFromCart>;
	MergeCart: UqAction<ParamMergeCart, ResultMergeCart>;
	OrderPaid: UqAction<ParamOrderPaid, ResultOrderPaid>;
	SaveOrderReturn: UqAction<ParamSaveOrderReturn, ResultSaveOrderReturn>;
	OrderConfirm: UqAction<ParamOrderConfirm, ResultOrderConfirm>;
	SaveOrder: UqAction<ParamSaveOrder, ResultSaveOrder>;
	Order: UqSheet<SheetOrder, VerifyOrder>;
	Cart: UqBook<ParamCart, ResultCart>;
	WebUserAccount: UqBook<ParamWebUserAccount, ResultWebUserAccount>;
	OrderState: UqBook<ParamOrderState, ResultOrderState>;
	GetCart: UqQuery<ParamGetCart, ResultGetCart>;
	GetPendingPayment: UqQuery<ParamGetPendingPayment, ResultGetPendingPayment>;
	GetPendingAuditOrders: UqQuery<ParamGetPendingAuditOrders, ResultGetPendingAuditOrders>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetCustomerReturnable: UqQuery<ParamGetCustomerReturnable, ResultGetCustomerReturnable>;
	GetCustomerOrderReturn: UqQuery<ParamGetCustomerOrderReturn, ResultGetCustomerOrderReturn>;
	SalesRegionWarehouse: UqMap;
	OrderBuyerAccount: UqMap;
	OrderTransportation: UqMap;
	OrderHistory: UqHistory<ParamOrderHistory, ResultOrderHistory>;
	OrderReceivable: UqPending<any, any>;
	$PiecewiseDetail: UqID<any>;
	$Piecewise: UqID<any>;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	ReturnDetail: UqID<any>;
	ReturnMain: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReturnDetail: UqIDX<any>;
	IxCustomerReturnable: UqIX<any>;
}
