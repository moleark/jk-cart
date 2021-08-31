//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqBook, UqQuery, UqMap, UqHistory, UqPending } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/platformjoint ========
//===============================

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

export interface TuidPlatform {
	id?: number;
	name: string;
}

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface TuidCity {
	id?: number;
}

export interface TuidCounty {
	id?: number;
}

export interface TuidProvince {
	id?: number;
}

export interface TuidJDCity {
	id?: number;
	province: number;
	englishName: string;
	chineseName: string;
	isValid: number;
	order: number;
}

export interface TuidJDCounty {
	id?: number;
	city: number;
	englishName: string;
	chineseName: string;
	isValid: number;
	order: number;
}

export interface TuidJDTown {
	id?: number;
	county: number;
	englishName: string;
	chineseName: string;
	isValid: number;
	order: number;
}

export interface TuidJDProvince {
	id?: number;
	country: number;
	englishName: string;
	chineseName: string;
	isValid: number;
	order: number;
}

export interface TuidPlatformCustomer {
	id?: number;
	platform: number;
	idOnPlatform: string;
	name: string;
	organizationName: string;
	phone: string;
	departmentName: string;
	laboratoryName: string;
}

export interface TuidCustomer {
	id?: number;
}

export interface TuidEpecProvince {
	id?: number;
	country: number;
	englishName: string;
	chineseName: string;
	code: string;
	isValid: number;
	order: number;
}

export interface TuidEpecCity {
	id?: number;
	province: number;
	englishName: string;
	chineseName: string;
	code: string;
	isValid: number;
	order: number;
}

export interface TuidEpecCounty {
	id?: number;
	city: number;
	englishName: string;
	chineseName: string;
	code: string;
	isValid: number;
	order: number;
}

export interface TuidWebUser {
	id?: number;
}

export interface TuidEpecMessage {
	id?: number;
	content: string;
	createtime: any;
}

export interface TuidEpecMessageData {
	id?: number;
	epecMessage: number;
	messageId: number;
	messageSortNumber: number;
	messageBody: string;
	messageType: string;
	receivedTime: any;
	createtime: any;
}

export interface TuidApiRawContent {
	id?: number;
	platform: number;
	api: string;
	content: string;
	avoidDuplicationId: string;
}

export interface TuidExpressLogistics {
	id?: number;
}

export interface TuidPunchoutSetupRequest {
	id?: number;
	platform: number;
	fromDomain: string;
	fromIdentity: string;
	toDomain: string;
	toIdentity: string;
	senderDomain: string;
	senderIdentity: string;
	senderUserAgent: string;
	senderSharedSecret: string;
	browserFormPostUrl: string;
	buyerCookie: string;
	payloadID: string;
	body: string;
}

export interface TuidOrganization {
	id?: number;
}

export interface TuidPlatformCustomers {
	id?: number;
	platform: number;
	platformCustomerId: string;
}

export interface TuidMessage {
	id?: number;
	platform: number;
	messageBody: string;
	type: number;
	createtime: any;
	state: number;
}

export interface ParamAuditPlatformCustomerRefuse {
	platformCustomer: number;
	reason: string;
}
export interface ResultAuditPlatformCustomerRefuse {
}

export interface ParamApplyAuditPlatformCustomer {
	platformCustomer: number;
}
export interface ResultApplyAuditPlatformCustomer {
}

export interface ParamAuditPlatformCustomer {
	platformCustomer: number;
	customer: number;
}
export interface ResultAuditPlatformCustomer {
}

export interface ParamAddPlatformCustomerAuditPending {
	platformCustomer: number;
	comments: string;
	orderid: string;
	consigneeName: string;
	consigneePhone: string;
	receivingAddress: string;
	invoiceTitle: string;
	isCentralizedInspection: number;
	orderState: string;
	inspectionAddress: string;
	orderItemId: string;
	descriptionC: string;
	description: string;
	originalId: string;
	brandName: string;
	package: string;
	casFormat: string;
	catalogPrice: number;
	quantity: number;
	purity: string;
}
export interface ResultAddPlatformCustomerAuditPending {
}

export interface ParamSaveCancelOrder {
	pendingid: number;
	platform: number;
	order: number;
	reason: string;
	content: string;
	confirmStatus: number;
	refuseReason: string;
}
export interface ResultSaveCancelOrder {
}

export interface ParamSaveInvoiceRequest {
	pendingid: number;
	platform: number;
	invoiceRequestId: string;
	invoiceStatus: number;
	cancelReason: string;
	content: string;
}
export interface ResultSaveInvoiceRequest {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetplatformCustomerID {
	platform: number;
	idOnPlatform: string;
}
export interface ReturnGetplatformCustomerIDRet {
	id: number;
}
export interface ResultGetplatformCustomerID {
	ret: ReturnGetplatformCustomerIDRet[];
}

export interface ParamGetPlatformCustomerAuditOrderPending {
	platformCustomer: number;
}
export interface ReturnGetPlatformCustomerAuditOrderPendingRet {
	orderid: string;
	date: any;
}
export interface ResultGetPlatformCustomerAuditOrderPending {
	ret: ReturnGetPlatformCustomerAuditOrderPendingRet[];
}

export interface ParamSearchHavingAuditRefusePlatformCustomer {
}
export interface ReturnSearchHavingAuditRefusePlatformCustomer$page {
	date: any;
	platformcustomer: number;
	reason: string;
}
export interface ResultSearchHavingAuditRefusePlatformCustomer {
	$page: ReturnSearchHavingAuditRefusePlatformCustomer$page[];
}

export interface ParamGetOrderDetails {
	orderid: string;
}
export interface ReturnGetOrderDetailsRet {
	orderid: string;
	consigneeName: string;
	consigneePhone: string;
	receivingAddress: string;
	invoiceTitle: string;
	isCentralizedInspection: number;
	orderState: string;
	inspectionAddress: string;
	orderItemId: string;
	descriptionC: string;
	description: string;
	originalId: string;
	brandName: string;
	package: string;
	casFormat: string;
	catalogPrice: number;
	quantity: number;
	purity: string;
	comments: string;
}
export interface ResultGetOrderDetails {
	ret: ReturnGetOrderDetailsRet[];
}

export interface ParamSearchHavingAuditPlatformCustomer {
}
export interface ReturnSearchHavingAuditPlatformCustomer$page {
	date: any;
	platformcustomer: number;
	customer: number;
}
export interface ResultSearchHavingAuditPlatformCustomer {
	$page: ReturnSearchHavingAuditPlatformCustomer$page[];
}

export interface ParamGetPendingAuditPlatformCustomer {
}
export interface ReturnGetPendingAuditPlatformCustomerRet {
	platformcustomer: number;
}
export interface ResultGetPendingAuditPlatformCustomer {
	ret: ReturnGetPendingAuditPlatformCustomerRet[];
}

export interface ParamGetNewOrderItemId {
	platform: number;
}
export interface ResultGetNewOrderItemId {
}

export interface ParamGetNewOrderId {
	platform: number;
}
export interface ResultGetNewOrderId {
}

export interface ParamSearchEpecUser {
	key: string;
}
export interface ReturnSearchEpecUser$page {
	webUser: number;
	username: string;
	organizationName: string;
	mobile: string;
	email: string;
	isAdmin: number;
}
export interface ResultSearchEpecUser {
	$page: ReturnSearchEpecUser$page[];
}

export interface ParamSearchNeoTridentUser {
	key: string;
}
export interface ReturnSearchNeoTridentUser$page {
	webUser: number;
	username: string;
	organization: string;
	team: string;
}
export interface ResultSearchNeoTridentUser {
	$page: ReturnSearchNeoTridentUser$page[];
}

export interface ParamSearchEpecOrganization {
	key: string;
}
export interface ReturnSearchEpecOrganization$page {
	organization: number;
	organizationId: string;
	organizationName: string;
}
export interface ResultSearchEpecOrganization {
	$page: ReturnSearchEpecOrganization$page[];
}

export interface ParamGetOrderIdByNo {
	orderNo: string;
}
export interface ReturnGetOrderIdByNoRet {
	orderId: number;
}
export interface ResultGetOrderIdByNo {
	ret: ReturnGetOrderIdByNoRet[];
}

export interface ParamSearchInvoiceRequestPending {
	invoiceRequestId: number;
}
export interface ReturnSearchInvoiceRequestPendingRet {
	id: number;
	platform: number;
	invoiceRequestId: string;
	content: string;
	createtime: any;
}
export interface ResultSearchInvoiceRequestPending {
	ret: ReturnSearchInvoiceRequestPendingRet[];
}

export interface ParamSearchCancelOrderPending {
	orderId: number;
}
export interface ReturnSearchCancelOrderPendingRet {
	id: number;
	platform: number;
	order: number;
	reason: string;
	content: string;
	createtime: any;
}
export interface ResultSearchCancelOrderPending {
	ret: ReturnSearchCancelOrderPendingRet[];
}

export interface ParamSearchInvoiceApplys {
}
export interface ReturnSearchInvoiceApplys$page {
	id: number;
	platform: number;
	invoiceRequestId: string;
	content: string;
	createtime: any;
}
export interface ResultSearchInvoiceApplys {
	$page: ReturnSearchInvoiceApplys$page[];
}

export interface ParamSearchCancelOrderApplys {
}
export interface ReturnSearchCancelOrderApplys$page {
	id: number;
	platform: number;
	order: number;
	reason: string;
	content: string;
	createtime: any;
}
export interface ResultSearchCancelOrderApplys {
	$page: ReturnSearchCancelOrderApplys$page[];
}

export interface ParamOrderState {
}
export interface ReturnOrderState$page {
	Order: number;
	state: number;
}
export interface ResultOrderState {
	$page: ReturnOrderState$page[];
}

export interface ParamPlatformCustomerAuditRefuseHistory {
	platformCustomer: number;
	reason: string;
}
export interface ReturnPlatformCustomerAuditRefuseHistory$page {
	date: any;
	platformCustomer: number;
	reason: string;
	user: number;
}
export interface ResultPlatformCustomerAuditRefuseHistory {
	$page: ReturnPlatformCustomerAuditRefuseHistory$page[];
}

export interface ParamPlatformCustomerAuditHistory {
	platformCustomer: number;
	customer: number;
}
export interface ReturnPlatformCustomerAuditHistory$page {
	date: any;
	platformCustomer: number;
	customer: number;
	user: number;
}
export interface ResultPlatformCustomerAuditHistory {
	$page: ReturnPlatformCustomerAuditHistory$page[];
}

export interface ParamInvoiceRequestHistory {
	platform: number;
	invoiceRequestId: string;
	invoiceStatus: number;
	cancelReason: string;
	content: string;
}
export interface ReturnInvoiceRequestHistory$page {
	date: any;
	platform: number;
	invoiceRequestId: string;
	invoiceStatus: number;
	cancelReason: string;
	content: string;
}
export interface ResultInvoiceRequestHistory {
	$page: ReturnInvoiceRequestHistory$page[];
}

export interface ParamCancelOrderHistory {
	platform: number;
	order: number;
	reason: string;
	confirmStatus: number;
	refuseReason: string;
	content: string;
}
export interface ReturnCancelOrderHistory$page {
	date: any;
	platform: number;
	order: number;
	reason: string;
	confirmStatus: number;
	refuseReason: string;
	content: string;
}
export interface ResultCancelOrderHistory {
	$page: ReturnCancelOrderHistory$page[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$sheet: UqTuid<Tuid$sheet>;
	Platform: UqTuid<TuidPlatform>;
	$user: UqTuid<Tuid$user>;
	City: UqTuid<TuidCity>;
	County: UqTuid<TuidCounty>;
	Province: UqTuid<TuidProvince>;
	JDCity: UqTuid<TuidJDCity>;
	JDCounty: UqTuid<TuidJDCounty>;
	JDTown: UqTuid<TuidJDTown>;
	JDProvince: UqTuid<TuidJDProvince>;
	PlatformCustomer: UqTuid<TuidPlatformCustomer>;
	Customer: UqTuid<TuidCustomer>;
	EpecProvince: UqTuid<TuidEpecProvince>;
	EpecCity: UqTuid<TuidEpecCity>;
	EpecCounty: UqTuid<TuidEpecCounty>;
	WebUser: UqTuid<TuidWebUser>;
	EpecMessage: UqTuid<TuidEpecMessage>;
	EpecMessageData: UqTuid<TuidEpecMessageData>;
	ApiRawContent: UqTuid<TuidApiRawContent>;
	ExpressLogistics: UqTuid<TuidExpressLogistics>;
	PunchoutSetupRequest: UqTuid<TuidPunchoutSetupRequest>;
	Organization: UqTuid<TuidOrganization>;
	PlatformCustomers: UqTuid<TuidPlatformCustomers>;
	Message: UqTuid<TuidMessage>;
	AuditPlatformCustomerRefuse: UqAction<ParamAuditPlatformCustomerRefuse, ResultAuditPlatformCustomerRefuse>;
	ApplyAuditPlatformCustomer: UqAction<ParamApplyAuditPlatformCustomer, ResultApplyAuditPlatformCustomer>;
	AuditPlatformCustomer: UqAction<ParamAuditPlatformCustomer, ResultAuditPlatformCustomer>;
	AddPlatformCustomerAuditPending: UqAction<ParamAddPlatformCustomerAuditPending, ResultAddPlatformCustomerAuditPending>;
	SaveCancelOrder: UqAction<ParamSaveCancelOrder, ResultSaveCancelOrder>;
	SaveInvoiceRequest: UqAction<ParamSaveInvoiceRequest, ResultSaveInvoiceRequest>;
	OrderState: UqBook<ParamOrderState, ResultOrderState>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetplatformCustomerID: UqQuery<ParamGetplatformCustomerID, ResultGetplatformCustomerID>;
	GetPlatformCustomerAuditOrderPending: UqQuery<ParamGetPlatformCustomerAuditOrderPending, ResultGetPlatformCustomerAuditOrderPending>;
	SearchHavingAuditRefusePlatformCustomer: UqQuery<ParamSearchHavingAuditRefusePlatformCustomer, ResultSearchHavingAuditRefusePlatformCustomer>;
	GetOrderDetails: UqQuery<ParamGetOrderDetails, ResultGetOrderDetails>;
	SearchHavingAuditPlatformCustomer: UqQuery<ParamSearchHavingAuditPlatformCustomer, ResultSearchHavingAuditPlatformCustomer>;
	GetPendingAuditPlatformCustomer: UqQuery<ParamGetPendingAuditPlatformCustomer, ResultGetPendingAuditPlatformCustomer>;
	GetNewOrderItemId: UqQuery<ParamGetNewOrderItemId, ResultGetNewOrderItemId>;
	GetNewOrderId: UqQuery<ParamGetNewOrderId, ResultGetNewOrderId>;
	SearchEpecUser: UqQuery<ParamSearchEpecUser, ResultSearchEpecUser>;
	SearchNeoTridentUser: UqQuery<ParamSearchNeoTridentUser, ResultSearchNeoTridentUser>;
	SearchEpecOrganization: UqQuery<ParamSearchEpecOrganization, ResultSearchEpecOrganization>;
	GetOrderIdByNo: UqQuery<ParamGetOrderIdByNo, ResultGetOrderIdByNo>;
	SearchInvoiceRequestPending: UqQuery<ParamSearchInvoiceRequestPending, ResultSearchInvoiceRequestPending>;
	SearchCancelOrderPending: UqQuery<ParamSearchCancelOrderPending, ResultSearchCancelOrderPending>;
	SearchInvoiceApplys: UqQuery<ParamSearchInvoiceApplys, ResultSearchInvoiceApplys>;
	SearchCancelOrderApplys: UqQuery<ParamSearchCancelOrderApplys, ResultSearchCancelOrderApplys>;
	AccessToken: UqMap;
	JDCityMapping: UqMap;
	JDProvinceMapping: UqMap;
	JDCountyMapping: UqMap;
	OutwardOrderMapping: UqMap;
	PlatformCustomerMapping: UqMap;
	EpecUser: UqMap;
	EpecCountyMapping: UqMap;
	EpecCityMapping: UqMap;
	NeoTridentUser: UqMap;
	EpecProvinceMapping: UqMap;
	OrderItemIds: UqMap;
	OrderItemIdPointer: UqMap;
	OrderIdPointer: UqMap;
	OrderIds: UqMap;
	TransCompanyMapping: UqMap;
	EpecOrganization: UqMap;
	PlatformInformation: UqMap;
	AccessTokenOut: UqMap;
	WebUserPlatformCustomers: UqMap;
	PlatformCustomerAuditRefuseHistory: UqHistory<ParamPlatformCustomerAuditRefuseHistory, ResultPlatformCustomerAuditRefuseHistory>;
	PlatformCustomerAuditHistory: UqHistory<ParamPlatformCustomerAuditHistory, ResultPlatformCustomerAuditHistory>;
	InvoiceRequestHistory: UqHistory<ParamInvoiceRequestHistory, ResultInvoiceRequestHistory>;
	CancelOrderHistory: UqHistory<ParamCancelOrderHistory, ResultCancelOrderHistory>;
	PlatformCustomerAuditOrderPending: UqPending<any, any>;
	PlatformCustomerAuditPending: UqPending<any, any>;
	EpecLoginPending: UqPending<any, any>;
	CancelOrderPending: UqPending<any, any>;
	InvoiceRequestPending: UqPending<any, any>;
}
