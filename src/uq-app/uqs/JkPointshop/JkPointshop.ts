//=== UqApp builder created on Mon Dec 20 2021 16:49:24 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqSheet, UqQuery, UqMap, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/积分商城 ========
//===============================

export enum EnumPointType {
	total = 1,
	point = 2,
	used = 3
}

export enum EnumPointChangingSource {
	ordermultiple = 1,
	signIn = 2,
	exchange = 3,
	order = 5,
	lottery = 8,
	return = 9
}

export enum EnumExchangeState {
	delivering = 12,
	delivered = 13,
	completed = 14,
	canceled = 15
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

export interface TuidProductX {
	id?: number;
	imageUrl: string;
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

export interface TuidCustomer {
	id?: number;
}

export interface TuidWebUser {
	id?: number;
}

export interface TuidContact {
	id?: number;
}

export interface TuidCurrency {
	id?: number;
}

export interface TuidBuyerAccount {
	id?: number;
}

export interface TuidGenre {
	id?: number;
	name: string;
	imageUrl: string;
}

export interface TuidPointProductLib {
	id?: number;
	description: string;
	descriptionC: string;
	grade: string;
	point: number;
	imageUrl: string;
	startDate: any;
	endDate: any;
	isValid: number;
}

export interface TuidBrand {
	id?: number;
}

export interface ParamIsCanUseOrder {
	orderId: string;
	customer: number;
}
export interface ReturnIsCanUseOrderRet {
	result: number;
	id: string;
}
export interface ResultIsCanUseOrder {
	ret: ReturnIsCanUseOrderRet[];
}

export interface ParamAddPlatformOrderPoint {
	orderId: string;
	couponId: string;
	customer: number;
}
export interface ReturnAddPlatformOrderPointRet {
	result: number;
}
export interface ResultAddPlatformOrderPoint {
	ret: ReturnAddPlatformOrderPointRet[];
}

export interface ParamGetLastPlatFormOrder {
	customer: number;
}
export interface ReturnGetLastPlatFormOrderRet {
	result: number;
	platformOrderId: string;
}
export interface ResultGetLastPlatFormOrder {
	ret: ReturnGetLastPlatFormOrderRet[];
}

export interface ParamSignin {
	webuser: number;
	customer: number;
	amount: number;
}
export interface ResultSignin {
}

export interface ParamSetPointProductVisits {
	pointProduct: number;
}
export interface ResultSetPointProductVisits {
}

export interface ParamPointProductGenreDelete {
	genre: number;
}
export interface ResultPointProductGenreDelete {
}

export interface ParamPointChanged {
	customer: number;
	point: number;
	pointYear: number;
	pointType: number;
	pointSource: number;
	comments: string;
}
export interface ResultPointChanged {
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface SheetPointExchangeSheet {
	customer: number;
	webUser: number;
	amount: number;
	shippingContact: number;
	exchangeItems: {
		product: number;
		point: number;
		quantity: number;
		subAmount: number;
	}[];
}

export interface ParamGetPoints {
	customer: number;
}
export interface ReturnGetPointsRet {
	totalLeftPoint: number;
	effectiveLeftPoint: number;
	usedPoint: number;
	pointYear: number;
}
export interface ResultGetPoints {
	ret: ReturnGetPointsRet[];
}

export interface ParamGetPointProduct {
	startPoint: number;
	endPoint: number;
}
export interface ReturnGetPointProductRet {
	product: number;
}
export interface ResultGetPointProduct {
	ret: ReturnGetPointProductRet[];
}

export interface ParamGetPlatFormOrder {
	platformOrderId: string;
}
export interface ReturnGetPlatFormOrderRet {
	customer: number;
	orderMaker: number;
	platformOrderId: string;
	description: string;
	descriptionC: string;
	radiox: number;
	radioy: number;
	unit: string;
	quantity: number;
	price: number;
	subAmount: number;
	amount: number;
	currency: number;
	mark: string;
}
export interface ResultGetPlatFormOrder {
	ret: ReturnGetPlatFormOrderRet[];
}

export interface ParamGetOrderDrawable {
	customer: number;
	startDate: any;
}
export interface ReturnGetOrderDrawableRet {
	orderId: string;
	orderMaker: number;
	point: number;
}
export interface ResultGetOrderDrawable {
	ret: ReturnGetOrderDrawableRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetPointHistory {
	customer: number;
	key: string;
}
export interface ReturnGetPointHistory$page {
	id: number;
	date: any;
	point: number;
	pointYear: number;
	comments: string;
	pointType: number;
	source: number;
}
export interface ResultGetPointHistory {
	$page: ReturnGetPointHistory$page[];
}

export interface ParamCheckIsSignin {
	customer: number;
}
export interface ReturnCheckIsSigninRet {
	result: number;
}
export interface ResultCheckIsSignin {
	ret: ReturnCheckIsSigninRet[];
}

export interface ParamGetPointSigninHistory {
	customer: number;
}
export interface ReturnGetPointSigninHistory$page {
	id: number;
	date: any;
	point: number;
	pointYear: number;
	comments: string;
	pointType: number;
	source: number;
}
export interface ResultGetPointSigninHistory {
	$page: ReturnGetPointSigninHistory$page[];
}

export interface ParamGetNewPointProducts {
}
export interface ReturnGetNewPointProductsRet {
	id: number;
	point: number;
	startDate: any;
	endDate: any;
	imageUrl: string;
}
export interface ResultGetNewPointProducts {
	ret: ReturnGetNewPointProductsRet[];
}

export interface ParamGetHotPointProducts {
}
export interface ReturnGetHotPointProductsRet {
	id: number;
	point: number;
	startDate: any;
	endDate: any;
	imageUrl: string;
}
export interface ResultGetHotPointProducts {
	ret: ReturnGetHotPointProductsRet[];
}

export interface ParamGetPointProductGenre {
	pointProduct: number;
}
export interface ReturnGetPointProductGenreRet {
	pointProduct: number;
	genre: number;
}
export interface ResultGetPointProductGenre {
	ret: ReturnGetPointProductGenreRet[];
}

export interface ParamGetPointDistribution {
	start: number;
	end: number;
	granularity: number;
}
export interface ReturnGetPointDistributionRet {
	subStart: number;
	subEnd: number;
	numbers: number;
}
export interface ResultGetPointDistribution {
	ret: ReturnGetPointDistributionRet[];
}

export interface ParamGetMaxPoints {
}
export interface ReturnGetMaxPointsRet {
	maxPoints: number;
}
export interface ResultGetMaxPoints {
	ret: ReturnGetMaxPointsRet[];
}

export interface ParamGetPointProductBySource {
	sourceId: number;
	type: string;
}
export interface ReturnGetPointProductBySourceRet {
	pointProduct: number;
}
export interface ResultGetPointProductBySource {
	ret: ReturnGetPointProductBySourceRet[];
}

export interface ParamGetVisitPointProducts {
}
export interface ReturnGetVisitPointProducts$page {
	seq: number;
	id: number;
	point: number;
	startDate: any;
	endDate: any;
	imageUrl: string;
	visits: number;
	exchanges: number;
}
export interface ResultGetVisitPointProducts {
	$page: ReturnGetVisitPointProducts$page[];
}

export interface ParamGetPointProductByGenre {
	genre: number;
}
export interface ReturnGetPointProductByGenreRet {
	pointProduct: number;
	genre: number;
}
export interface ResultGetPointProductByGenre {
	ret: ReturnGetPointProductByGenreRet[];
}

export interface ParamGetPointProductsByPage {
	keyWord: string;
}
export interface ReturnGetPointProductsByPage$page {
	seq: number;
	id: number;
	description: string;
	descriptionC: string;
	grade: string;
	point: number;
	imageUrl: string;
}
export interface ResultGetPointProductsByPage {
	$page: ReturnGetPointProductsByPage$page[];
}

export interface ParamGetBrandMinDiscount {
}
export interface ReturnGetBrandMinDiscount$page {
	seq: number;
	brand: number;
	discount: number;
	isValid: number;
}
export interface ResultGetBrandMinDiscount {
	$page: ReturnGetBrandMinDiscount$page[];
}

export interface ParamSearchExchangeOrders {
	customer: number;
}
export interface ReturnSearchExchangeOrders$page {
	seq: number;
	id: number;
	no: string;
	date: any;
	state: string;
}
export interface ResultSearchExchangeOrders {
	$page: ReturnSearchExchangeOrders$page[];
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

export interface OrderMain {
	id?: number;
	no?: string;
}

export interface OrderDetail {
	id?: number;
	main?: number;
	orderMainNo: string;
	orderDetailNo: string;
	endUser: number;
	createDate: any;
}

export interface ExchangeDetail {
	id?: number;
	main?: number;
	item: number;
	quantity: number;
	point: number;
	subAmount: number;
}

export interface ExchangeMain {
	id?: number;
	no?: string;
	customer: number;
	shippingContact: number;
	amount: number;
	sheetId: number;
	createDate: any;
}

export interface ReceiveMain {
	id?: number;
	createDate: any;
}

export interface ReceiveDetail {
	id?: number;
	main?: number;
	orderDetail: number;
	amount: number;
	createDate: any;
}

export interface DxOrderDetail {
	id: number;
	point?: number;
	totalPoint?: number;
	multiple?: number;
	$act?: number;
}

export interface DxReOrderDetail {
	id: number;
	point?: number;
	totalPoint?: number;
	$act?: number;
}

export interface DxExchangeDetail {
	id: number;
	deliver?: number;
	deliverDone?: number;
	deliverTime?: any;
	$act?: number;
}

export interface DxExchangeMainState {
	id: number;
	state?: any;
	createDate?: any;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	point?: number|IDXValue;
	totalPoint?: number|IDXValue;
	multiple?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReOrderDetail {
	id: number|IDXValue;
	point?: number|IDXValue;
	totalPoint?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxExchangeDetail {
	id: number|IDXValue;
	deliver?: number|IDXValue;
	deliverDone?: number|IDXValue;
	deliverTime?: any|IDXValue;
	$act?: number;
}

export interface ActParamDxExchangeMainState {
	id: number|IDXValue;
	state?: any|IDXValue;
	createDate?: any|IDXValue;
	$act?: number;
}

export interface IxExchangeMainUsedPoint {
	ix: number;
	xi: number;
	point: number;
}

export interface ExchangeDetailDeliver {
	ix: number;
	xi: number;
	deliverDone: number;
	deliverTime: any;
}

export interface IxOrderDetailReceive {
	ix: number;
	xi: number;
	receiveAmount: number;
	createDate: any;
}

export interface ParamActs {
	orderMain?: OrderMain[];
	orderDetail?: OrderDetail[];
	exchangeDetail?: ExchangeDetail[];
	exchangeMain?: ExchangeMain[];
	receiveMain?: ReceiveMain[];
	receiveDetail?: ReceiveDetail[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReOrderDetail?: ActParamDxReOrderDetail[];
	dxExchangeDetail?: ActParamDxExchangeDetail[];
	dxExchangeMainState?: ActParamDxExchangeMainState[];
	ixExchangeMainUsedPoint?: IxExchangeMainUsedPoint[];
	exchangeDetailDeliver?: ExchangeDetailDeliver[];
	ixOrderDetailReceive?: IxOrderDetailReceive[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	ProductX: UqTuid<TuidProductX>;
	$sheet: UqTuid<Tuid$sheet>;
	Customer: UqTuid<TuidCustomer>;
	WebUser: UqTuid<TuidWebUser>;
	Contact: UqTuid<TuidContact>;
	Currency: UqTuid<TuidCurrency>;
	BuyerAccount: UqTuid<TuidBuyerAccount>;
	Genre: UqTuid<TuidGenre>;
	PointProductLib: UqTuid<TuidPointProductLib>;
	Brand: UqTuid<TuidBrand>;
	IsCanUseOrder: UqAction<ParamIsCanUseOrder, ResultIsCanUseOrder>;
	AddPlatformOrderPoint: UqAction<ParamAddPlatformOrderPoint, ResultAddPlatformOrderPoint>;
	GetLastPlatFormOrder: UqAction<ParamGetLastPlatFormOrder, ResultGetLastPlatFormOrder>;
	Signin: UqAction<ParamSignin, ResultSignin>;
	SetPointProductVisits: UqAction<ParamSetPointProductVisits, ResultSetPointProductVisits>;
	PointProductGenreDelete: UqAction<ParamPointProductGenreDelete, ResultPointProductGenreDelete>;
	PointChanged: UqAction<ParamPointChanged, ResultPointChanged>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	PointExchangeSheet: UqSheet<SheetPointExchangeSheet, any>;
	GetPoints: UqQuery<ParamGetPoints, ResultGetPoints>;
	GetPointProduct: UqQuery<ParamGetPointProduct, ResultGetPointProduct>;
	GetPlatFormOrder: UqQuery<ParamGetPlatFormOrder, ResultGetPlatFormOrder>;
	GetOrderDrawable: UqQuery<ParamGetOrderDrawable, ResultGetOrderDrawable>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetPointHistory: UqQuery<ParamGetPointHistory, ResultGetPointHistory>;
	CheckIsSignin: UqQuery<ParamCheckIsSignin, ResultCheckIsSignin>;
	GetPointSigninHistory: UqQuery<ParamGetPointSigninHistory, ResultGetPointSigninHistory>;
	GetNewPointProducts: UqQuery<ParamGetNewPointProducts, ResultGetNewPointProducts>;
	GetHotPointProducts: UqQuery<ParamGetHotPointProducts, ResultGetHotPointProducts>;
	GetPointProductGenre: UqQuery<ParamGetPointProductGenre, ResultGetPointProductGenre>;
	GetPointDistribution: UqQuery<ParamGetPointDistribution, ResultGetPointDistribution>;
	GetMaxPoints: UqQuery<ParamGetMaxPoints, ResultGetMaxPoints>;
	GetPointProductBySource: UqQuery<ParamGetPointProductBySource, ResultGetPointProductBySource>;
	GetVisitPointProducts: UqQuery<ParamGetVisitPointProducts, ResultGetVisitPointProducts>;
	GetPointProductByGenre: UqQuery<ParamGetPointProductByGenre, ResultGetPointProductByGenre>;
	GetPointProductsByPage: UqQuery<ParamGetPointProductsByPage, ResultGetPointProductsByPage>;
	GetBrandMinDiscount: UqQuery<ParamGetBrandMinDiscount, ResultGetBrandMinDiscount>;
	SearchExchangeOrders: UqQuery<ParamSearchExchangeOrders, ResultSearchExchangeOrders>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	PointProduct: UqMap;
	PlatformOrder: UqMap;
	PlatformOrderUsed: UqMap;
	PointShopOrder: UqMap;
	PointProductGenre: UqMap;
	PointProductSource: UqMap;
	PointProductDetail: UqMap;
	BrandMinDiscount: UqMap;
	OrderBack: UqMap;
	PointCustomerBlacklist: UqMap;
	OrderMain: UqID<any>;
	OrderDetail: UqID<any>;
	ExchangeDetail: UqID<any>;
	ExchangeMain: UqID<any>;
	ReceiveMain: UqID<any>;
	ReceiveDetail: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReOrderDetail: UqIDX<any>;
	DxExchangeDetail: UqIDX<any>;
	DxExchangeMainState: UqIDX<any>;
	IxExchangeMainUsedPoint: UqIX<any>;
	ExchangeDetailDeliver: UqIX<any>;
	IxOrderDetailReceive: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
