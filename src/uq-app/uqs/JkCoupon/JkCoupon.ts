//=== UqApp builder created on Wed Nov 03 2021 15:09:59 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqMap, UqHistory, UqID, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/coupon ========
//===============================

export enum EnumCouponType {
	coupon = 1,
	credits = 2,
	vipCard = 3
}

export enum EnumBoundType {
	assign = 1,
	coupon = 2
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

export interface TuidBrand {
	id?: number;
	name: string;
}

export interface ParamIsCanUseCoupon {
	code: string;
	customer: number;
}
export interface ReturnIsCanUseCouponRet {
	result: number;
	id: number;
	code: string;
	type: any;
	validityDate: any;
	isValid: number;
	creator: number;
}
export interface ResultIsCanUseCoupon {
	ret: ReturnIsCanUseCouponRet[];
}

export interface ParamCreateCoupon {
	type: any;
	validityDate: any;
}
export interface ReturnCreateCouponRet {
	coupon: number;
	code: string;
}
export interface ResultCreateCoupon {
	ret: ReturnCreateCouponRet[];
}

export interface ParamAcceptCustomerBounded {
	customer: number;
	salesman: number;
	boundType: number;
}
export interface ResultAcceptCustomerBounded {
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface ParamSearchCoupon {
	key: string;
	type: any;
}
export interface ReturnSearchCoupon$page {
	id: number;
	code: string;
	type: any;
	validityDate: any;
	isValid: number;
	creator: number;
	createDate: any;
}
export interface ResultSearchCoupon {
	$page: ReturnSearchCoupon$page[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetCouponUsedHistory {
	coupon: number;
}
export interface ReturnGetCouponUsedHistoryRet {
	coupon: number;
	customer: number;
	usedDate: any;
}
export interface ResultGetCouponUsedHistory {
	ret: ReturnGetCouponUsedHistoryRet[];
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

export interface ParamSearchBottomDiscount {
}
export interface ReturnSearchBottomDiscountRet {
	brand: number;
	discount: number;
}
export interface ResultSearchBottomDiscount {
	ret: ReturnSearchBottomDiscountRet[];
}

export interface ParamCustomerBoundHistory {
	customer: number;
	boundTo: number;
	boundType: any;
	operation: number;
}
export interface ReturnCustomerBoundHistory$page {
	date: any;
	customer: number;
	boundTo: number;
	boundType: any;
	operation: number;
}
export interface ResultCustomerBoundHistory {
	$page: ReturnCustomerBoundHistory$page[];
}

export interface ParamWebUserBoundHistory {
	webuser: number;
	boundTo: number;
	boundType: any;
	operation: number;
}
export interface ReturnWebUserBoundHistory$page {
	date: any;
	webuser: number;
	boundTo: number;
	boundType: any;
	operation: number;
}
export interface ResultWebUserBoundHistory {
	$page: ReturnWebUserBoundHistory$page[];
}

export interface Coupon {
	id?: number;
	code: string;
	type: any;
	validityDate: any;
	isValid: number;
	creator: number;
	createDate: any;
	$create?: any;
}

export interface CustomerBound {
	ixx: number;
	ix: number;
	xi: number;
	boundDate: any;
	boundDays: number;
}

export interface WebUserBound {
	ixx: number;
	ix: number;
	xi: number;
	boundDate: any;
	boundDays: number;
	boundType: any;
}

export interface IxCouponUsed {
	ixx: number;
	ix: number;
	xi: number;
	usedDate: any;
}

export interface IxWebuserEmployeeCopy {
	ix: number;
	xi: number;
}

export interface ParamActs {
	coupon?: Coupon[];
	customerBound?: CustomerBound[];
	webUserBound?: WebUserBound[];
	ixCouponUsed?: IxCouponUsed[];
	ixWebuserEmployeeCopy?: IxWebuserEmployeeCopy[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Brand: UqTuid<TuidBrand>;
	IsCanUseCoupon: UqAction<ParamIsCanUseCoupon, ResultIsCanUseCoupon>;
	CreateCoupon: UqAction<ParamCreateCoupon, ResultCreateCoupon>;
	AcceptCustomerBounded: UqAction<ParamAcceptCustomerBounded, ResultAcceptCustomerBounded>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	SearchCoupon: UqQuery<ParamSearchCoupon, ResultSearchCoupon>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetCouponUsedHistory: UqQuery<ParamGetCouponUsedHistory, ResultGetCouponUsedHistory>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	SearchBottomDiscount: UqQuery<ParamSearchBottomDiscount, ResultSearchBottomDiscount>;
	BottomDiscount: UqMap;
	VIPCardDiscount: UqMap;
	BrandSalesRegion: UqMap;
	CustomerBoundHistory: UqHistory<ParamCustomerBoundHistory, ResultCustomerBoundHistory>;
	WebUserBoundHistory: UqHistory<ParamWebUserBoundHistory, ResultWebUserBoundHistory>;
	Coupon: UqID<any>;
	CustomerBound: UqIX<any>;
	WebUserBound: UqIX<any>;
	IxCouponUsed: UqIX<any>;
	IxWebuserEmployeeCopy: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
