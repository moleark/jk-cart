//=== UqApp builder created on Thu May 13 2021 13:34:38 GMT-0400 (GMT-04:00) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqSheet, UqBook, UqQuery, UqMap, UqHistory, UqPending, UqID } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/order ========
//===============================

export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface Tuid$sheet {
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
	code: string;
	user: number;
	customer: number;
	discount: number;
	preferential: number;
	validitydate: any;
	isValid: number;
}

export interface TuidChemical {
	CAS: string;
}

export interface TuidSalesRegion {
	name: string;
	currency: number;
	no: string;
}

export interface TuidCurrency {
	name: string;
	suffix: string;
}

export interface TuidPackType {
	name: string;
	description: string;
}

export interface TuidAddress {
	country: number;
	province: number;
	city: number;
	county: number;
	description: string;
}

export interface TuidCountry {
	code: string;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidProvince {
	country: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidCity {
	province: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidCounty {
	city: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidInvoiceType {
	description: string;
}

export interface TuidCustomer {
	name: string;
}

export interface TuidOrganization {
	name: string;
}

export interface TuidContact {
	name: string;
	organizationName: string;
	mobile: string;
	telephone: string;
	email: string;
	address: number;
	addressString: string;
}

export interface TuidInvoiceInfo {
	title: string;
	taxNo: string;
	address: string;
	telephone: string;
	bank: string;
	accountNo: string;
}

export interface TuidBrand {
	name: string;
	no: string;
}

export interface TuidProductX {
	brand: number;
}

export interface TuidWarehouse {
	name: string;
}

export interface TuidWebUser {
	name: string;
	no: number;
	password: string;
	icon: string;
}

export interface TuidBuyerAccount {
}

export interface TuidCommonText {
	content: string;
}

export interface TuidExpressLogistics {
}

export interface ParamSetCart {
	product: number;
	pack: number;
	price: number;
	currency: number;
	quantity: number;
}
interface ResultSetCart {
}

export interface ParamRemoveFromCart {
	rows: {
		product: number;
		pack: number;
	}[];

}
interface ResultRemoveFromCart {
}

export interface ParamMergeCart {
	rows: {
		product: number;
		pack: number;
		quantity: number;
	}[];

}
interface ResultMergeCart {
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
interface ReturnGetCart$page {
	date: any;
	product: number;
	pack: number;
	price: number;
	currency: number;
	quantity: number;
}
interface ResultGetCart {
	$page: ReturnGetCart$page[];
}

export interface ParamGetPendingPayment {
}
interface ReturnGetPendingPaymentRet {
	id: number;
	no: string;
	description: string;
	date: any;
	amount: number;
	amountPayed: number;
}
interface ResultGetPendingPayment {
	ret: ReturnGetPendingPaymentRet[];
}

export interface ParamGetPendingAuditOrders {
	webUser: number;
}
interface ReturnGetPendingAuditOrdersRet {
	id: number;
	no: string;
	description: string;
	date: any;
}
interface ResultGetPendingAuditOrders {
	ret: ReturnGetPendingAuditOrdersRet[];
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamCart {
	user: number;
	product: number;
}
interface ReturnCart$page {
	pack: number;
	price: number;
	currency: number;
	quantity: number;
	date: any;
}
interface ResultCart {
	$page: ReturnCart$page[];
}

export interface ParamWebUserAccount {
	webUser: number;
}
interface ReturnWebUserAccount$page {
	currency: number;
	总订单金额: number;
	总到货金额: number;
	总开票金额: number;
	总付款金额: number;
}
interface ResultWebUserAccount {
	$page: ReturnWebUserAccount$page[];
}

export interface ParamOrderState {
}
interface ReturnOrderState$page {
	Order: number;
	总金额: number;
	已付金额: number;
	发货完成: number;
}
interface ResultOrderState {
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
interface ReturnOrderHistory$page {
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
interface ResultOrderHistory {
	$page: ReturnOrderHistory$page[];
}

export interface $PiecewiseDetail {
	id?: number;
	parent: number;
	row?: number;
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

export interface ParamActs {
	$PiecewiseDetail?: $PiecewiseDetail[];
	$Piecewise?: $Piecewise[];
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
	Order: UqSheet<SheetOrder, VerifyOrder>;
	Cart: UqBook<ParamCart, ResultCart>;
	WebUserAccount: UqBook<ParamWebUserAccount, ResultWebUserAccount>;
	OrderState: UqBook<ParamOrderState, ResultOrderState>;
	GetCart: UqQuery<ParamGetCart, ResultGetCart>;
	GetPendingPayment: UqQuery<ParamGetPendingPayment, ResultGetPendingPayment>;
	GetPendingAuditOrders: UqQuery<ParamGetPendingAuditOrders, ResultGetPendingAuditOrders>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SalesRegionWarehouse: UqMap;
	OrderBuyerAccount: UqMap;
	OrderTransportation: UqMap;
	OrderHistory: UqHistory<ParamOrderHistory, ResultOrderHistory>;
	OrderReceivable: UqPending<any, any>;
	$PiecewiseDetail: UqID<any>;
	$Piecewise: UqID<any>;
}
