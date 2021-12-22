//=== UqApp builder created on Mon Dec 20 2021 16:49:24 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqSheet, UqQuery, UqMap, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/order ========
//===============================

export enum EnumFeeType {
	packing = 11,
	refrigeration = 12,
	freezing = 13,
	proxyFreight = 14
}

export enum EnumAmountDiff {
	packing = 11,
	refrigeration = 12,
	freezing = 13,
	proxyFreight = 14
}

export enum EnumOrderState {
	matching = 11,
	delivering = 12,
	delivered = 13,
	completed = 14,
	canceled = 15,
	pendingPayment = 21,
	paid = 22
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

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
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

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamSearchOrders {
	keyWord: string;
	state: string;
	customer: number;
}
export interface ReturnSearchOrders$page {
	seq: number;
	id: number;
	no: string;
	date: any;
	state: string;
}
export interface ResultSearchOrders {
	$page: ReturnSearchOrders$page[];
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
	warehouse: number;
	item: number;
	product: number;
	quantity: number;
	price: number;
	amount: number;
	lotNumber: string;
	createDate: any;
}

export interface OrderMain {
	id?: number;
	no?: string;
	webUser: number;
	customer: number;
	buyerAccount: number;
	shippingContact: number;
	invoiceContact: number;
	invoiceType: number;
	invoiceInfo: number;
	sumAmount: number;
	currency: number;
	couponNo: string;
	sheetId: number;
	createDate: any;
}

export interface ReturnDetail {
	id?: number;
	main?: number;
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	price: number;
	amount: number;
	lotNumber: string;
	createDate: any;
}

export interface ReturnMain {
	id?: number;
	no?: string;
	customerAccount: number;
	webUser: number;
	shippingContact: number;
	invoiceContact: number;
	sumAmount: number;
	currency: number;
	createDate: any;
}

export interface OrderMainEx {
	id?: number;
	seller: number;
	salesman: number;
	salesRegion: number;
	organization: number;
	currency: number;
	poNumber: string;
	orderType: number;
	carrier: number;
	commentsAboutDeliver: string;
	createDate: any;
}

export interface OrderDetailEx {
	id?: number;
	orderItemId: string;
	endUser: number;
	brand: number;
	retail: number;
	retailCurrency: number;
	bottomPrice: number;
	bottomPriceCurrency: number;
	costPrice: number;
	costPriceCurrency: number;
	poItemNumber: string;
	mark: string;
	tradeType: string;
	taxRate: number;
	promotionId: string;
	createDate: any;
}

export interface ReturnDetailEx {
	id?: number;
	returnItemId: string;
	endUser: number;
	mark: string;
}

export interface ReturnMainEx {
	id?: number;
	seller: number;
	salesman: number;
	salesRegion: number;
}

export interface DxOrderMainState {
	id: number;
	state?: any;
	createDate?: any;
	$act?: number;
}

export interface ActParamDxOrderMainState {
	id: number|IDXValue;
	state?: any|IDXValue;
	createDate?: any|IDXValue;
	$act?: number;
}

export interface OrderDetailDeliver {
	ix: number;
	xi: number;
	deliverDone: number;
	deliverTime: any;
}

export interface OrderDetailReceive {
	ix: number;
	xi: number;
	receiveDone: number;
	receiveTime: any;
}

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	returnDetail?: ReturnDetail[];
	returnMain?: ReturnMain[];
	orderMainEx?: OrderMainEx[];
	orderDetailEx?: OrderDetailEx[];
	returnDetailEx?: ReturnDetailEx[];
	returnMainEx?: ReturnMainEx[];
	dxOrderMainState?: ActParamDxOrderMainState[];
	orderDetailDeliver?: OrderDetailDeliver[];
	orderDetailReceive?: OrderDetailReceive[];
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
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	Order: UqSheet<SheetOrder, VerifyOrder>;
	GetCart: UqQuery<ParamGetCart, ResultGetCart>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SearchOrders: UqQuery<ParamSearchOrders, ResultSearchOrders>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	SalesRegionWarehouse: UqMap;
	OrderBuyerAccount: UqMap;
	CurrencyExchangeRate: UqMap;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	ReturnDetail: UqID<any>;
	ReturnMain: UqID<any>;
	OrderMainEx: UqID<any>;
	OrderDetailEx: UqID<any>;
	ReturnDetailEx: UqID<any>;
	ReturnMainEx: UqID<any>;
	DxOrderMainState: UqIDX<any>;
	OrderDetailDeliver: UqIX<any>;
	OrderDetailReceive: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
