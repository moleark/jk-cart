//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqBook, UqQuery, UqMap, UqHistory } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/webuser ========
//===============================

export interface TuidInvoiceInfo {
	id?: number;
	title: string;
	taxNo: string;
	address: string;
	telephone: string;
	bank: string;
	accountNo: string;
}

export interface TuidAddress {
	id?: number;
	country: number;
	province: number;
	city: number;
	county: number;
	zip: string;
	description: string;
}

export interface TuidSalesRegion {
	id?: number;
	name: string;
	currency: number;
	no: string;
}

export interface TuidCounty {
	id?: number;
	city: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidCustomer {
	id?: number;
	name: string;
	firstName: string;
	lastName: string;
	no: string;
	gender: string;
	salutation: string;
	birthDay: any;
	createTime: any;
}

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface TuidWebUser {
	id?: number;
	name: string;
	firstName: string;
	lastName: string;
	gender: string;
	salutation: string;
	organizationName: string;
	departmentName: string;
	no: number;
}

export interface TuidAuditPendingUserRefuseReason {
	id?: number;
	description: string;
}

export interface TuidCity {
	id?: number;
	province: number;
	englishName: string;
	chineseName: string;
	no: string;
}

export interface TuidInvoiceType {
	id?: number;
	description: string;
}

export interface TuidBuyerAccount {
	id?: number;
}

export interface TuidCurrency {
	id?: number;
	name: string;
	suffix: string;
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

export interface TuidWebUserSettingType {
	id?: number;
	description: string;
}

export interface TuidVIPCardType {
	id?: number;
}

export interface TuidProductX {
	id?: number;
	brand: number;
}

export interface TuidBrand {
	id?: number;
	name: string;
	no: string;
}

export interface TuidChemical {
	id?: number;
}

export interface ParamAuditPendingUser {
	id: number;
	customerId: number;
	buyerAccountId: number;
}
export interface ResultAuditPendingUser {
}

export interface ParamAuditPendingUserRefuse {
	id: number;
	reason: number;
	comments: string;
}
export interface ResultAuditPendingUserRefuse {
}

export interface ParamRecordLogin {
	webUser: number;
	ip: string;
	app: string;
}
export interface ResultRecordLogin {
}

export interface ParamSetCustomerMainWebUser {
	customer: number;
	webUser: number;
}
export interface ResultSetCustomerMainWebUser {
}

export interface ParamApplyAuditUser {
	webUser: number;
}
export interface ResultApplyAuditUser {
}

export interface ParamGetPendingAuditUser {
}
export interface ReturnGetPendingAuditUserRet {
	webUser: number;
}
export interface ResultGetPendingAuditUser {
	ret: ReturnGetPendingAuditUserRet[];
}

export interface ParamSearchHavingRefuseUser {
}
export interface ReturnSearchHavingRefuseUser$page {
	id: number;
	webUser: number;
	reason: number;
	comments: string;
	date: any;
}
export interface ResultSearchHavingRefuseUser {
	$page: ReturnSearchHavingRefuseUser$page[];
}

export interface ParamSearchHavingAuditUser {
}
export interface ReturnSearchHavingAuditUser$page {
	id: number;
	webUser: number;
	customer: number;
	date: any;
}
export interface ResultSearchHavingAuditUser {
	$page: ReturnSearchHavingAuditUser$page[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetMyFavirates {
	webUser: number;
	salesRegion: number;
}
export interface ReturnGetMyFavirates$page {
	seq: number;
	id: number;
	no: string;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	chemical: number;
	CAS: string;
	purity: string;
	molecularFomula: string;
	molecularWeight: string;
	discountinued: number;
}
export interface ResultGetMyFavirates {
	$page: ReturnGetMyFavirates$page[];
}

export interface ParamGetMyExpiredCoupon {
	webUser: number;
}
export interface ReturnGetMyExpiredCoupon$page {
	seq: number;
	id: number;
	code: number;
	types: string;
	createdate: any;
	expireddate: any;
}
export interface ResultGetMyExpiredCoupon {
	$page: ReturnGetMyExpiredCoupon$page[];
}

export interface ParamGetMyUsedCoupon {
	webUser: number;
}
export interface ReturnGetMyUsedCoupon$page {
	seq: number;
	id: number;
	code: number;
	types: string;
	useddate: any;
}
export interface ResultGetMyUsedCoupon {
	$page: ReturnGetMyUsedCoupon$page[];
}

export interface ParamSearchCouponReceive {
	coupon: number;
}
export interface ReturnSearchCouponReceiveRet {
	webuser: number;
	createDate: any;
}
export interface ResultSearchCouponReceive {
	ret: ReturnSearchCouponReceiveRet[];
}

export interface ParamGetWebUserByCustomer {
	customer: number;
}
export interface ReturnGetWebUserByCustomerRet {
	id: number;
	name: string;
	firstName: string;
	lastName: string;
	organizationName: string;
	priority: number;
}
export interface ResultGetWebUserByCustomer {
	ret: ReturnGetWebUserByCustomerRet[];
}

export interface ParamPendingAuditWebUser {
}
export interface ReturnPendingAuditWebUser$page {
	webUser: number;
}
export interface ResultPendingAuditWebUser {
	$page: ReturnPendingAuditWebUser$page[];
}

export interface ParamWebUserAuditHistory {
	webUser: number;
	customer: number;
	buyerAccount: number;
}
export interface ReturnWebUserAuditHistory$page {
	date: any;
	webUser: number;
	customer: number;
	buyerAccount: number;
	user: number;
}
export interface ResultWebUserAuditHistory {
	$page: ReturnWebUserAuditHistory$page[];
}

export interface ParamWebUserAuditRefuseHistory {
	webUser: number;
	reason: number;
	comments: string;
}
export interface ReturnWebUserAuditRefuseHistory$page {
	date: any;
	webUser: number;
	reason: number;
	comments: string;
	user: number;
}
export interface ResultWebUserAuditRefuseHistory {
	$page: ReturnWebUserAuditRefuseHistory$page[];
}

export interface ParamLoginHistory {
	webUser: number;
	ip: string;
	app: string;
}
export interface ReturnLoginHistory$page {
	date: any;
	webUser: number;
	ip: string;
	app: string;
}
export interface ResultLoginHistory {
	$page: ReturnLoginHistory$page[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	InvoiceInfo: UqTuid<TuidInvoiceInfo>;
	Address: UqTuid<TuidAddress>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	County: UqTuid<TuidCounty>;
	Customer: UqTuid<TuidCustomer>;
	$user: UqTuid<Tuid$user>;
	WebUser: UqTuid<TuidWebUser>;
	AuditPendingUserRefuseReason: UqTuid<TuidAuditPendingUserRefuseReason>;
	City: UqTuid<TuidCity>;
	InvoiceType: UqTuid<TuidInvoiceType>;
	BuyerAccount: UqTuid<TuidBuyerAccount>;
	Currency: UqTuid<TuidCurrency>;
	$sheet: UqTuid<Tuid$sheet>;
	Country: UqTuid<TuidCountry>;
	Province: UqTuid<TuidProvince>;
	Contact: UqTuid<TuidContact>;
	WebUserSettingType: UqTuid<TuidWebUserSettingType>;
	VIPCardType: UqTuid<TuidVIPCardType>;
	ProductX: UqTuid<TuidProductX>;
	Brand: UqTuid<TuidBrand>;
	Chemical: UqTuid<TuidChemical>;
	AuditPendingUser: UqAction<ParamAuditPendingUser, ResultAuditPendingUser>;
	AuditPendingUserRefuse: UqAction<ParamAuditPendingUserRefuse, ResultAuditPendingUserRefuse>;
	RecordLogin: UqAction<ParamRecordLogin, ResultRecordLogin>;
	SetCustomerMainWebUser: UqAction<ParamSetCustomerMainWebUser, ResultSetCustomerMainWebUser>;
	ApplyAuditUser: UqAction<ParamApplyAuditUser, ResultApplyAuditUser>;
	PendingAuditWebUser: UqBook<ParamPendingAuditWebUser, ResultPendingAuditWebUser>;
	GetPendingAuditUser: UqQuery<ParamGetPendingAuditUser, ResultGetPendingAuditUser>;
	SearchHavingRefuseUser: UqQuery<ParamSearchHavingRefuseUser, ResultSearchHavingRefuseUser>;
	SearchHavingAuditUser: UqQuery<ParamSearchHavingAuditUser, ResultSearchHavingAuditUser>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetMyFavirates: UqQuery<ParamGetMyFavirates, ResultGetMyFavirates>;
	GetMyExpiredCoupon: UqQuery<ParamGetMyExpiredCoupon, ResultGetMyExpiredCoupon>;
	GetMyUsedCoupon: UqQuery<ParamGetMyUsedCoupon, ResultGetMyUsedCoupon>;
	SearchCouponReceive: UqQuery<ParamSearchCouponReceive, ResultSearchCouponReceive>;
	GetWebUserByCustomer: UqQuery<ParamGetWebUserByCustomer, ResultGetWebUserByCustomer>;
	WebUserBuyerAccount: UqMap;
	WebUserContact: UqMap;
	WebUserCustomer: UqMap;
	WebUserSettingAlter: UqMap;
	WebUserContacts: UqMap;
	WebUserSetting: UqMap;
	WebUserVIPCard: UqMap;
	WebUserCoupon: UqMap;
	WebUserCouponUsed: UqMap;
	MyFavorites: UqMap;
	WebUserCredits: UqMap;
	WebUserCreditsUsed: UqMap;
	WebUserAuditHistory: UqHistory<ParamWebUserAuditHistory, ResultWebUserAuditHistory>;
	WebUserAuditRefuseHistory: UqHistory<ParamWebUserAuditRefuseHistory, ResultWebUserAuditRefuseHistory>;
	LoginHistory: UqHistory<ParamLoginHistory, ResultLoginHistory>;
}
