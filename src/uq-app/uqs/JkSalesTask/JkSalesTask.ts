//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqSheet, UqBook, UqQuery, UqMap, UqHistory, UqPending } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/salesTask ========
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

export interface TuidCustomer {
	id?: number;
	name: string;
	firstName: string;
	lastName: string;
	xyz: string;
	gender: string;
	salutation: string;
	birthDay: any;
	createTime: any;
	isValid: number;
}

export interface TuidOrganization {
	id?: number;
	name: string;
}

export interface TuidEmployee {
	id?: number;
	firstName: string;
	lastName: string;
}

export interface TuidBrand {
	id?: number;
	name: string;
}

export interface TuidProductX {
	id?: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
}

export interface TuidTask {
	id?: number;
	description: string;
	customer: number;
	type: number;
	biz: number;
	priorty: number;
	deadline: any;
	createTime: any;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
}

export interface TuidTaskType {
	id?: number;
	name: string;
	description: string;
}

export interface TuidJkTaskType {
	id?: number;
	name: string;
	TimeLimit: number;
	no: number;
}

export interface TuidJkTask {
	id?: number;
	description: string;
	customer: number;
	jktype: number;
	type: number;
	biz: number;
	employee: number;
	priorty: number;
	deadline: any;
	createTime: any;
	completeTime: any;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
	no: number;
	isValid: number;
}

export interface TuidBizType {
	id?: number;
	name: string;
	description: string;
}

export interface TuidField {
	id?: number;
	name: string;
	json: string;
}

export interface TuidTaskStatus {
	id?: number;
	name: string;
}

export interface TuidProject {
	id?: number;
	name: string;
}

export interface TuidMyCustomer {
	id?: number;
	unit: number;
	name: string;
	firstName: string;
	lastName: string;
	address: number;
	addressString: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
	teacher: string;
	potential: number;
	user: number;
	no: number;
	research: number;
	salutation: string;
	createTime: any;
	isValid: number;
}

export interface TuidMyCustomerUnit {
	id?: number;
	name: string;
	user: number;
	no: number;
	createTime: any;
	isValid: number;
}

export interface TuidMessage {
	id?: number;
	note: string;
	date: any;
	user: number;
	peer: number;
}

export interface TuidCoupon {
	id?: number;
	code: string;
	types: string;
	user: number;
	customer: number;
	validitydate: any;
	discount: number;
	preferential: number;
	createTime: any;
	isValid: number;
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

export interface TuidInvoiceType {
	id?: number;
	description: string;
}

export interface TuidWithdrawalState {
	id?: number;
	name: string;
}

export interface TuidPOST {
	id?: number;
	caption: string;
	discription: string;
}

export interface TuidOfficePost {
	id?: number;
	name: string;
	no: string;
	createTime: any;
}

export interface TuidDepartment {
	id?: number;
	name: string;
	organization: number;
	no: string;
	createTime: any;
}

export interface TuidResearch {
	id?: number;
	name: string;
	no: string;
	createTime: any;
}

export interface TuidVIPCardType {
	id?: number;
}

export interface TuidDomain {
	id?: number;
	name: string;
	parent: number;
}

export interface ParamCompletionTask {
	taskid: number;
	resultType: string;
	result: string;
	fields: {
		fieldName: string;
		value: string;
	}[];

}
export interface ResultCompletionTask {
}

export interface ParamCompletionCustomerInfoTask {
	taskid: number;
	resultType: string;
	result: string;
	fields: {
		fieldName: string;
		value: string;
	}[];

}
export interface ResultCompletionCustomerInfoTask {
}

export interface ParamInvalidTask {
	taskid: number;
	resultType: string;
	result: string;
}
export interface ResultInvalidTask {
}

export interface ParamExtensionTask {
	taskid: number;
	remindDate: any;
	result: string;
}
export interface ResultExtensionTask {
}

export interface ParamAddTask {
	description: string;
	customer: number;
	type: number;
	biz: number;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
	priorty: number;
	deadline: any;
}
export interface ReturnAddTaskRet {
	id: number;
}
export interface ResultAddTask {
	ret: ReturnAddTaskRet[];
}

export interface ParamImportTask {
	task: number;
	customername: string;
	organization: number;
	organizationName: string;
}
export interface ReturnImportTaskRet {
	id: number;
	customer: number;
	description: string;
}
export interface ResultImportTask {
	ret: ReturnImportTaskRet[];
}

export interface ParamCreateTaskProduct {
	taskid: number;
	productid: number;
	note: string;
}
export interface ResultCreateTaskProduct {
}

export interface ParamCreateTaskProductPack {
	task: number;
	product: number;
	pack: number;
	note: string;
}
export interface ResultCreateTaskProductPack {
}

export interface ParamCreateTaskProject {
	taskid: number;
	note: string;
}
export interface ResultCreateTaskProject {
}

export interface ParamCreatePosition {
	invitacode: number;
}
export interface ReturnCreatePositionRet {
	succeed: number;
	code: number;
}
export interface ResultCreatePosition {
	ret: ReturnCreatePositionRet[];
}

export interface ParamCreateMyCustomer {
	unit: number;
	no: number;
	name: string;
	firstName: string;
	lastName: string;
	gender: string;
	salutation: string;
	telephone: string;
	mobile: string;
	newcustomerid: number;
}
export interface ReturnCreateMyCustomerRet {
	code: number;
}
export interface ResultCreateMyCustomer {
	ret: ReturnCreateMyCustomerRet[];
}

export interface ParamCreateMyCustomerUnit {
	name: string;
}
export interface ReturnCreateMyCustomerUnitRet {
	id: number;
}
export interface ResultCreateMyCustomerUnit {
	ret: ReturnCreateMyCustomerUnitRet[];
}

export interface ParamSavePeerAssigned {
	peer: number;
	Assigned: string;
}
export interface ResultSavePeerAssigned {
}

export interface ParamUpdateNowMessage {
}
export interface ResultUpdateNowMessage {
}

export interface ParamCreateCoupon {
	webUser: number;
	validitydate: any;
	discount: number;
	types: string;
}
export interface ReturnCreateCouponRet {
	coupon: number;
	code: string;
}
export interface ResultCreateCoupon {
	ret: ReturnCreateCouponRet[];
}

export interface ParamIsCanUseCoupon {
	code: string;
	webUser: number;
}
export interface ReturnIsCanUseCouponRet {
	result: number;
	id: number;
	code: string;
	user: number;
	webuser: number;
	discount: number;
	preferential: number;
	validitydate: any;
	types: string;
	isValid: number;
}
export interface ResultIsCanUseCoupon {
	ret: ReturnIsCanUseCouponRet[];
}

export interface ParamTestBus1 {
}
export interface ResultTestBus1 {
}

export interface ParamUpateCustomerMyCustomerMap {
	_mycustomer: number;
	_customer: number;
	_webuser: number;
}
export interface ResultUpateCustomerMyCustomerMap {
}

export interface ParamComputeAchievement {
}
export interface ReturnComputeAchievementRet {
	oneSaleVolume_1: number;
	oneMaxVolume: number;
	price: number;
	agentprices: number;
	quantity: number;
	oneRate_1: number;
	oneExcess: number;
	oneNotExcess: number;
	oneRate: number;
	result: number;
}
export interface ResultComputeAchievement {
	ret: ReturnComputeAchievementRet[];
}

export interface ParamAddWebUserAccountMap {
	webuser: number;
	telephone: string;
	identitycard: string;
	identityicon: string;
	identityname: string;
	subbranchbank: string;
	bankaccountnumber: string;
}
export interface ResultAddWebUserAccountMap {
}

export interface ParamComputeBalance {
}
export interface ResultComputeBalance {
}

export interface ParamAddMyCustomerPost {
	customer: number;
	post: number;
}
export interface ResultAddMyCustomerPost {
}

export interface ParamAddCouponSendHistory {
	code: string;
}
export interface ResultAddCouponSendHistory {
}

export interface SheetWithdrawal {
	webUser: number;
	amount: number;
	currency: number;}

export interface ParamSearchTask {
	customer: number;
}
export interface ReturnSearchTaskRet {
	id: number;
	description: string;
	customer: number;
	type: number;
	typeName: string;
	biz: number;
	bizName: string;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
	priorty: number;
	deadline: any;
	remindDate: any;
	createTime: any;
}
export interface ResultSearchTask {
	ret: ReturnSearchTaskRet[];
}

export interface ParamSearchHistoryTask {
	taskid: number;
}
export interface ReturnSearchHistoryTaskRet {
	date: any;
	task: number;
	status: number;
	principal: number;
	resultType: string;
	result: string;
}
export interface ResultSearchHistoryTask {
	ret: ReturnSearchHistoryTaskRet[];
}

export interface ParamSearchHistoryTaskByCustomer {
	customerid: number;
	types: number;
}
export interface ReturnSearchHistoryTaskByCustomerRet {
	date: any;
	id: number;
	description: string;
	customer: number;
	deadline: any;
	type: number;
	biz: number;
	status: number;
	resultType: string;
	result: string;
}
export interface ResultSearchHistoryTaskByCustomer {
	ret: ReturnSearchHistoryTaskByCustomerRet[];
}

export interface ParamSearchHistoryTaskByEmployee {
}
export interface ReturnSearchHistoryTaskByEmployee$page {
	id: number;
	description: string;
	customer: number;
	type: number;
	typeName: string;
	biz: number;
	bizName: string;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
	priorty: number;
	deadline: any;
	createTime: any;
}
export interface ResultSearchHistoryTaskByEmployee {
	$page: ReturnSearchHistoryTaskByEmployee$page[];
}

export interface ParamSearchTaskCompletion {
	taskid: number;
}
export interface ReturnSearchTaskCompletionRet {
	task: number;
	field: string;
	value: number;
	note: string;
	fieldName: string;
}
export interface ResultSearchTaskCompletion {
	ret: ReturnSearchTaskCompletionRet[];
}

export interface ParamSearchTaskProduct {
	taskid: number;
}
export interface ReturnSearchTaskProductRet {
	task: number;
	product: number;
	note: string;
}
export interface ResultSearchTaskProduct {
	ret: ReturnSearchTaskProductRet[];
}

export interface ParamSearchTaskProductPack {
	taskid: number;
}
export interface ReturnSearchTaskProductPackRet {
	task: number;
	product: number;
	pack: number;
	note: string;
}
export interface ResultSearchTaskProductPack {
	ret: ReturnSearchTaskProductPackRet[];
}

export interface ParamSearchTaskProject {
	taskid: number;
}
export interface ReturnSearchTaskProjectRet {
	task: number;
	project: number;
	note: string;
}
export interface ResultSearchTaskProject {
	ret: ReturnSearchTaskProjectRet[];
}

export interface ParamSearchPosition {
	position: number;
}
export interface ReturnSearchPositionRet {
	user: number;
	post: number;
	code: number;
}
export interface ResultSearchPosition {
	ret: ReturnSearchPositionRet[];
}

export interface ParamSearchAchievement {
	user: number;
}
export interface ReturnSearchAchievementRet {
	user: number;
	oneSaleVolume: number;
	twoSaleVolume: number;
	threeSaleVolume: number;
	oneAchievement: number;
	twoAchievement: number;
	threeAchievement: number;
	teamCount: number;
	innerteamCount: number;
	customerCount: number;
	activeCustomerCount: number;
	totalOrderCount: number;
	totalReceivableAmount: number;
	totalaWithdrawal: number;
	waitWithdrawal: number;
	level: number;
}
export interface ResultSearchAchievement {
	ret: ReturnSearchAchievementRet[];
}

export interface ParamSearchTeam {
}
export interface ReturnSearchTeamRet {
	parent: number;
	children: number;
	parentcode: number;
	childrencode: number;
	assigned: string;
	volume: number;
}
export interface ResultSearchTeam {
	ret: ReturnSearchTeamRet[];
}

export interface ParamSearchMyCustomer {
	key: string;
}
export interface ReturnSearchMyCustomer$page {
	id: number;
	unit: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
	teacher: string;
	potential: number;
	research: number;
	salutation: string;
	createTime: any;
	address: number;
	addressString: string;
	validity: any;
}
export interface ResultSearchMyCustomer {
	$page: ReturnSearchMyCustomer$page[];
}

export interface ParamSearchMyCustomerUnit {
	key: string;
}
export interface ReturnSearchMyCustomerUnit$page {
	id: number;
	no: string;
	name: string;
	createTime: any;
	isValid: number;
}
export interface ResultSearchMyCustomerUnit {
	$page: ReturnSearchMyCustomerUnit$page[];
}

export interface ParamSearchMessage {
}
export interface ReturnSearchMessage$page {
	id: number;
	date: any;
	note: string;
	user: number;
	peer: number;
}
export interface ResultSearchMessage {
	$page: ReturnSearchMessage$page[];
}

export interface ParamSearchNowMessage {
}
export interface ReturnSearchNowMessageRet {
	count: number;
}
export interface ResultSearchNowMessage {
	ret: ReturnSearchNowMessageRet[];
}

export interface ParamSearchCoupon {
	key: string;
	types: string;
}
export interface ReturnSearchCoupon$page {
	id: number;
	code: number;
	user: number;
	validitydate: any;
	discount: number;
	preferential: number;
	createTime: any;
	isValid: number;
	couponCount: number;
}
export interface ResultSearchCoupon {
	$page: ReturnSearchCoupon$page[];
}

export interface ParamSearchJKTask {
	key: string;
}
export interface ReturnSearchJKTask$page {
	id: number;
	description: string;
	customer: number;
	type: number;
	biz: number;
	employee: number;
	sourceID: number;
	sourceType: string;
	sourceNo: string;
	priorty: number;
	deadline: any;
	createTime: any;
}
export interface ResultSearchJKTask {
	$page: ReturnSearchJKTask$page[];
}

export interface ParamSearchAchievementHistory {
	types: number;
	state: number;
}
export interface ReturnSearchAchievementHistoryRet {
	date: any;
	sales: number;
	webuser: number;
	mycustomer: number;
	order: number;
	orderno: string;
	ordertype: string;
	types: number;
	amount: number;
	orderAmount: number;
	state: number;
}
export interface ResultSearchAchievementHistory {
	ret: ReturnSearchAchievementHistoryRet[];
}

export interface ParamSearchCustomerMyCustomerMap {
	_mycustomer: number;
}
export interface ReturnSearchCustomerMyCustomerMapRet {
	mycustomer: number;
	customer: number;
	webuser: number;
}
export interface ResultSearchCustomerMyCustomerMap {
	ret: ReturnSearchCustomerMyCustomerMapRet[];
}

export interface ParamMyCustomerIsOccupy {
	_customer: number;
}
export interface ReturnMyCustomerIsOccupyRet {
	code: number;
}
export interface ResultMyCustomerIsOccupy {
	ret: ReturnMyCustomerIsOccupyRet[];
}

export interface ParamSearchMyCustomerActive {
	key: string;
	type: number;
}
export interface ReturnSearchMyCustomerActive$page {
	id: number;
	unit: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
	teacher: string;
	potential: number;
	research: number;
	salutation: string;
	createTime: any;
	address: number;
	addressString: string;
	validity: any;
	isOccupy: number;
}
export interface ResultSearchMyCustomerActive {
	$page: ReturnSearchMyCustomerActive$page[];
}

export interface ParamSearchNewMyCustomer {
}
export interface ReturnSearchNewMyCustomerRet {
	sales: number;
	customer: number;
	webuser: number;
	createTime: any;
}
export interface ResultSearchNewMyCustomer {
	ret: ReturnSearchNewMyCustomerRet[];
}

export interface ParamSearchBalanceHistory {
	ordertype: string;
}
export interface ReturnSearchBalanceHistoryRet {
	date: any;
	sales: number;
	order: number;
	orderNo: number;
	ordertype: string;
	amount: number;
	currency: number;
}
export interface ResultSearchBalanceHistory {
	ret: ReturnSearchBalanceHistoryRet[];
}

export interface ParamSearchWithdrawalStateQuery {
	withdrawal: number;
}
export interface ReturnSearchWithdrawalStateQueryRet {
	Withdrawal: number;
	state: number;
	comments: string;
	createTime: any;
}
export interface ResultSearchWithdrawalStateQuery {
	ret: ReturnSearchWithdrawalStateQueryRet[];
}

export interface ParamSearchMyCustomerByPost {
	key: string;
	post: number;
	domain: number;
}
export interface ReturnSearchMyCustomerByPost$page {
	id: number;
	unit: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
	sharingTimes: number;
	sharingCount: number;
}
export interface ResultSearchMyCustomerByPost {
	$page: ReturnSearchMyCustomerByPost$page[];
}

export interface ParamSearchSubordinate {
	key: string;
}
export interface ReturnSearchSubordinateRet {
	webuser: number;
	employee: number;
	taskcount: number;
}
export interface ResultSearchSubordinate {
	ret: ReturnSearchSubordinateRet[];
}

export interface ParamSearchCustomerOrder {
	_mycustomer: number;
	_ordertype: string;
}
export interface ReturnSearchCustomerOrderRet {
	customer: number;
	webuser: number;
	order: number;
	orderNo: string;
	date: any;
}
export interface ResultSearchCustomerOrder {
	ret: ReturnSearchCustomerOrderRet[];
}

export interface ParamSearchMyCustomerDepartment {
	mycustomer: number;
}
export interface ReturnSearchMyCustomerDepartmentRet {
	customer: number;
	department: number;
}
export interface ResultSearchMyCustomerDepartment {
	ret: ReturnSearchMyCustomerDepartmentRet[];
}

export interface ParamSearchMyCustomerResearch {
	mycustomer: number;
}
export interface ReturnSearchMyCustomerResearchRet {
	customer: number;
	research: number;
}
export interface ResultSearchMyCustomerResearch {
	ret: ReturnSearchMyCustomerResearchRet[];
}

export interface ParamSearchMyCustomerOfficePost {
	mycustomer: number;
}
export interface ReturnSearchMyCustomerOfficePostRet {
	customer: number;
	officpost: number;
}
export interface ResultSearchMyCustomerOfficePost {
	ret: ReturnSearchMyCustomerOfficePostRet[];
}

export interface ParamSearchMyCustomerByUnit {
	_unit: number;
	_key: string;
}
export interface ReturnSearchMyCustomerByUnit$page {
	id: number;
	unit: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
	teacher: string;
	potential: number;
	research: number;
	salutation: string;
	createTime: any;
	address: number;
	addressString: string;
	validity: any;
	isOccupy: number;
}
export interface ResultSearchMyCustomerByUnit {
	$page: ReturnSearchMyCustomerByUnit$page[];
}

export interface ParamSearchTaskHistoryCount {
	user: number;
}
export interface ReturnSearchTaskHistoryCountRet {
	counts: number;
}
export interface ResultSearchTaskHistoryCount {
	ret: ReturnSearchTaskHistoryCountRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
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

export interface ParamSearchCouponUsed {
	coupon: number;
}
export interface ReturnSearchCouponUsedRet {
	order: number;
	webuser: number;
	createDate: any;
}
export interface ResultSearchCouponUsed {
	ret: ReturnSearchCouponUsedRet[];
}

export interface ParamSearchMyCustomerByCategory {
	key: string;
	category: number;
}
export interface ReturnSearchMyCustomerByCategory$page {
	seq: number;
	id: number;
	unit: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	telephone: string;
	mobile: string;
	gender: string;
	birthDay: any;
	email: string;
	wechat: string;
}
export interface ResultSearchMyCustomerByCategory {
	$page: ReturnSearchMyCustomerByCategory$page[];
}

export interface ParamGetPersonMonthlyAchieve {
	user: number;
	year: number;
	month: number;
}
export interface ReturnGetPersonMonthlyAchieveRet {
	date: any;
	user: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetPersonMonthlyAchieve {
	ret: ReturnGetPersonMonthlyAchieveRet[];
}

export interface ParamGetPersonDailyAchieve {
	user: number;
	date: string;
}
export interface ReturnGetPersonDailyAchieveRet {
	date: any;
	user: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetPersonDailyAchieve {
	ret: ReturnGetPersonDailyAchieveRet[];
}

export interface ParamGetPersonYearlyAchieve {
	user: number;
	year: number;
}
export interface ReturnGetPersonYearlyAchieveRet {
	yeara: number;
	montha: number;
	usera: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetPersonYearlyAchieve {
	ret: ReturnGetPersonYearlyAchieveRet[];
}

export interface ParamGetTeamDailyAchieve {
	team: number;
	date: string;
}
export interface ReturnGetTeamDailyAchieveRet {
	date: any;
	user: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetTeamDailyAchieve {
	ret: ReturnGetTeamDailyAchieveRet[];
}

export interface ParamGetTeamMonthlyAchieve {
	team: number;
	year: number;
	month: number;
}
export interface ReturnGetTeamMonthlyAchieveRet {
	yeara: number;
	montha: number;
	usera: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetTeamMonthlyAchieve {
	ret: ReturnGetTeamMonthlyAchieveRet[];
}

export interface ParamGetTeamYearlyAchieve {
	team: number;
	year: number;
}
export interface ReturnGetTeamYearlyAchieveRet {
	yeara: number;
	montha: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetTeamYearlyAchieve {
	ret: ReturnGetTeamYearlyAchieveRet[];
}

export interface ParamGetTeamMemberYearlyAchieve {
	team: number;
	year: number;
}
export interface ReturnGetTeamMemberYearlyAchieveRet {
	yeara: number;
	usera: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	creditsCreated: number;
}
export interface ResultGetTeamMemberYearlyAchieve {
	ret: ReturnGetTeamMemberYearlyAchieveRet[];
}

export interface ParamTaskBook {
}
export interface ReturnTaskBook$page {
	task: number;
	status: number;
	principal: number;
	remindDate: any;
}
export interface ResultTaskBook {
	$page: ReturnTaskBook$page[];
}

export interface ParamTaskFieldBook {
	task: number;
}
export interface ReturnTaskFieldBook$page {
	field: number;
	value: number;
	note: string;
}
export interface ResultTaskFieldBook {
	$page: ReturnTaskFieldBook$page[];
}

export interface ParamTaskProductBook {
	task: number;
}
export interface ReturnTaskProductBook$page {
	product: number;
	note: string;
}
export interface ResultTaskProductBook {
	$page: ReturnTaskProductBook$page[];
}

export interface ParamTaskProductPackBook {
	task: number;
	product: number;
}
export interface ReturnTaskProductPackBook$page {
	pack: number;
	note: string;
}
export interface ResultTaskProductPackBook {
	$page: ReturnTaskProductPackBook$page[];
}

export interface ParamTaskProjectBook {
	task: number;
}
export interface ReturnTaskProjectBook$page {
	project: number;
	note: string;
}
export interface ResultTaskProjectBook {
	$page: ReturnTaskProjectBook$page[];
}

export interface ParamPeerAssignedBook {
	user: number;
}
export interface ReturnPeerAssignedBook$page {
	peer: number;
	Assigned: string;
}
export interface ResultPeerAssignedBook {
	$page: ReturnPeerAssignedBook$page[];
}

export interface ParamMessageBook {
}
export interface ReturnMessageBook$page {
	user: number;
	count: number;
}
export interface ResultMessageBook {
	$page: ReturnMessageBook$page[];
}

export interface ParamCustomerNowSalesBOOK {
}
export interface ReturnCustomerNowSalesBOOK$page {
	customer: number;
	sales: number;
	webuser: number;
	types: string;
	validity: any;
}
export interface ResultCustomerNowSalesBOOK {
	$page: ReturnCustomerNowSalesBOOK$page[];
}

export interface ParamAchievementRuleBook {
	Type: number;
	MinAmount: number;
}
export interface ReturnAchievementRuleBook$page {
	MaxAmount: number;
	value: number;
	TeamCount: number;
}
export interface ResultAchievementRuleBook {
	$page: ReturnAchievementRuleBook$page[];
}

export interface ParamSalesAchievementBook {
}
export interface ReturnSalesAchievementBook$page {
	user: number;
	Level: number;
	oneSaleVolume: number;
	twoSaleVolume: number;
	threeSaleVolume: number;
	oneAchievement: number;
	twoAchievement: number;
	threeAchievement: number;
	totalOrderCount: number;
	totalAchievement: number;
	totalReceivableAmount: number;
	totalaWithdrawal: number;
	waitWithdrawal: number;
}
export interface ResultSalesAchievementBook {
	$page: ReturnSalesAchievementBook$page[];
}

export interface ParamNewMyCustomerBook {
	sales: number;
}
export interface ReturnNewMyCustomerBook$page {
	customer: number;
	webuser: number;
	createTime: any;
}
export interface ResultNewMyCustomerBook {
	$page: ReturnNewMyCustomerBook$page[];
}

export interface ParamWithdrawalStateBook {
}
export interface ReturnWithdrawalStateBook$page {
	Withdrawal: number;
	webuser: number;
	amount: number;
	state: number;
	comments: string;
	createTime: any;
}
export interface ResultWithdrawalStateBook {
	$page: ReturnWithdrawalStateBook$page[];
}

export interface ParamOrderStateBook {
}
export interface ReturnOrderStateBook$page {
	order: number;
	state: number;
	amount: number;
	payAmount: number;
}
export interface ResultOrderStateBook {
	$page: ReturnOrderStateBook$page[];
}

export interface ParamSalesTeamBook {
}
export interface ReturnSalesTeamBook$page {
	user: number;
	teamCount: number;
	innerTeamCount: number;
}
export interface ResultSalesTeamBook {
	$page: ReturnSalesTeamBook$page[];
}

export interface ParamSalesCustomerBook {
}
export interface ReturnSalesCustomerBook$page {
	user: number;
	customerCount: number;
	unitCount: number;
}
export interface ResultSalesCustomerBook {
	$page: ReturnSalesCustomerBook$page[];
}

export interface ParamAchievement {
	date: any;
	manage: number;
}
export interface ReturnAchievement$page {
	user: number;
	year: number;
	month: number;
	endTaskCount: number;
	sendCreditsCount: number;
	sendPostCount: number;
	orderCount: number;
	saleVolume: number;
	couponsCreated: number;
	couponsSended: number;
	couponsUsed: number;
	creditsCreated: number;
	creditsUsed: number;
}
export interface ResultAchievement {
	$page: ReturnAchievement$page[];
}

export interface ParamAssistAchievements {
	year: number;
	month: number;
}
export interface ReturnAssistAchievements$page {
	sales: number;
	Amount: number;
}
export interface ResultAssistAchievements {
	$page: ReturnAssistAchievements$page[];
}

export interface ParamTaskHistory {
	task: number;
	status: number;
	principal: number;
	resultType: string;
	result: string;
}
export interface ReturnTaskHistory$page {
	date: any;
	task: number;
	status: number;
	principal: number;
	resultType: string;
	result: string;
}
export interface ResultTaskHistory {
	$page: ReturnTaskHistory$page[];
}

export interface ParamAchievementHistory {
	sales: number;
	webuser: number;
	order: number;
	orderNo: string;
	ordertype: string;
	price: number;
	agentprices: number;
	types: number;
	amount: number;
}
export interface ReturnAchievementHistory$page {
	date: any;
	sales: number;
	webuser: number;
	order: number;
	orderNo: string;
	ordertype: string;
	price: number;
	agentprices: number;
	types: number;
	amount: number;
}
export interface ResultAchievementHistory {
	$page: ReturnAchievementHistory$page[];
}

export interface ParamBalanceHistory {
	sales: number;
	order: number;
	orderNo: string;
	ordertype: string;
	paymentAmount: number;
	amount: number;
	currency: number;
}
export interface ReturnBalanceHistory$page {
	date: any;
	sales: number;
	order: number;
	orderNo: string;
	ordertype: string;
	paymentAmount: number;
	amount: number;
	currency: number;
}
export interface ResultBalanceHistory {
	$page: ReturnBalanceHistory$page[];
}

export interface ParamWithdrawalStateHistory {
	withdrawal: number;
	state: number;
	comments: string;
}
export interface ReturnWithdrawalStateHistory$page {
	date: any;
	withdrawal: number;
	state: number;
	comments: string;
}
export interface ResultWithdrawalStateHistory {
	$page: ReturnWithdrawalStateHistory$page[];
}

export interface ParamMyCustomerPostHistory {
	sales: number;
	customer: number;
	post: number;
}
export interface ReturnMyCustomerPostHistory$page {
	date: any;
	sales: number;
	customer: number;
	post: number;
}
export interface ResultMyCustomerPostHistory {
	$page: ReturnMyCustomerPostHistory$page[];
}

export interface ParamCouponSendHistory {
	coupon: number;
	webuser: number;
}
export interface ReturnCouponSendHistory$page {
	date: any;
	coupon: number;
	webuser: number;
}
export interface ResultCouponSendHistory {
	$page: ReturnCouponSendHistory$page[];
}

export interface ParamCustomerNowSalesHistory {
	customer: number;
	webuser: number;
	sales: number;
	types: string;
	validity: any;
}
export interface ReturnCustomerNowSalesHistory$page {
	date: any;
	customer: number;
	webuser: number;
	sales: number;
	types: string;
	validity: any;
}
export interface ResultCustomerNowSalesHistory {
	$page: ReturnCustomerNowSalesHistory$page[];
}

export interface ParamWithdrawalsHistory {
	sales: number;
	order: number;
	orderNo: string;
	amount: number;
	currency: number;
}
export interface ReturnWithdrawalsHistory$page {
	date: any;
	sales: number;
	order: number;
	orderNo: string;
	amount: number;
	currency: number;
}
export interface ResultWithdrawalsHistory {
	$page: ReturnWithdrawalsHistory$page[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Customer: UqTuid<TuidCustomer>;
	Organization: UqTuid<TuidOrganization>;
	Employee: UqTuid<TuidEmployee>;
	Brand: UqTuid<TuidBrand>;
	ProductX: UqTuid<TuidProductX>;
	Task: UqTuid<TuidTask>;
	TaskType: UqTuid<TuidTaskType>;
	JkTaskType: UqTuid<TuidJkTaskType>;
	JkTask: UqTuid<TuidJkTask>;
	BizType: UqTuid<TuidBizType>;
	Field: UqTuid<TuidField>;
	TaskStatus: UqTuid<TuidTaskStatus>;
	Project: UqTuid<TuidProject>;
	MyCustomer: UqTuid<TuidMyCustomer>;
	MyCustomerUnit: UqTuid<TuidMyCustomerUnit>;
	Message: UqTuid<TuidMessage>;
	Coupon: UqTuid<TuidCoupon>;
	Address: UqTuid<TuidAddress>;
	Country: UqTuid<TuidCountry>;
	Province: UqTuid<TuidProvince>;
	City: UqTuid<TuidCity>;
	County: UqTuid<TuidCounty>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	Currency: UqTuid<TuidCurrency>;
	InvoiceType: UqTuid<TuidInvoiceType>;
	WithdrawalState: UqTuid<TuidWithdrawalState>;
	POST: UqTuid<TuidPOST>;
	OfficePost: UqTuid<TuidOfficePost>;
	Department: UqTuid<TuidDepartment>;
	Research: UqTuid<TuidResearch>;
	VIPCardType: UqTuid<TuidVIPCardType>;
	Domain: UqTuid<TuidDomain>;
	CompletionTask: UqAction<ParamCompletionTask, ResultCompletionTask>;
	CompletionCustomerInfoTask: UqAction<ParamCompletionCustomerInfoTask, ResultCompletionCustomerInfoTask>;
	InvalidTask: UqAction<ParamInvalidTask, ResultInvalidTask>;
	ExtensionTask: UqAction<ParamExtensionTask, ResultExtensionTask>;
	AddTask: UqAction<ParamAddTask, ResultAddTask>;
	ImportTask: UqAction<ParamImportTask, ResultImportTask>;
	CreateTaskProduct: UqAction<ParamCreateTaskProduct, ResultCreateTaskProduct>;
	CreateTaskProductPack: UqAction<ParamCreateTaskProductPack, ResultCreateTaskProductPack>;
	CreateTaskProject: UqAction<ParamCreateTaskProject, ResultCreateTaskProject>;
	CreatePosition: UqAction<ParamCreatePosition, ResultCreatePosition>;
	CreateMyCustomer: UqAction<ParamCreateMyCustomer, ResultCreateMyCustomer>;
	CreateMyCustomerUnit: UqAction<ParamCreateMyCustomerUnit, ResultCreateMyCustomerUnit>;
	SavePeerAssigned: UqAction<ParamSavePeerAssigned, ResultSavePeerAssigned>;
	UpdateNowMessage: UqAction<ParamUpdateNowMessage, ResultUpdateNowMessage>;
	CreateCoupon: UqAction<ParamCreateCoupon, ResultCreateCoupon>;
	IsCanUseCoupon: UqAction<ParamIsCanUseCoupon, ResultIsCanUseCoupon>;
	TestBus1: UqAction<ParamTestBus1, ResultTestBus1>;
	UpateCustomerMyCustomerMap: UqAction<ParamUpateCustomerMyCustomerMap, ResultUpateCustomerMyCustomerMap>;
	ComputeAchievement: UqAction<ParamComputeAchievement, ResultComputeAchievement>;
	AddWebUserAccountMap: UqAction<ParamAddWebUserAccountMap, ResultAddWebUserAccountMap>;
	ComputeBalance: UqAction<ParamComputeBalance, ResultComputeBalance>;
	AddMyCustomerPost: UqAction<ParamAddMyCustomerPost, ResultAddMyCustomerPost>;
	AddCouponSendHistory: UqAction<ParamAddCouponSendHistory, ResultAddCouponSendHistory>;
	Withdrawal: UqSheet<SheetWithdrawal, any>;
	TaskBook: UqBook<ParamTaskBook, ResultTaskBook>;
	TaskFieldBook: UqBook<ParamTaskFieldBook, ResultTaskFieldBook>;
	TaskProductBook: UqBook<ParamTaskProductBook, ResultTaskProductBook>;
	TaskProductPackBook: UqBook<ParamTaskProductPackBook, ResultTaskProductPackBook>;
	TaskProjectBook: UqBook<ParamTaskProjectBook, ResultTaskProjectBook>;
	PeerAssignedBook: UqBook<ParamPeerAssignedBook, ResultPeerAssignedBook>;
	MessageBook: UqBook<ParamMessageBook, ResultMessageBook>;
	CustomerNowSalesBOOK: UqBook<ParamCustomerNowSalesBOOK, ResultCustomerNowSalesBOOK>;
	AchievementRuleBook: UqBook<ParamAchievementRuleBook, ResultAchievementRuleBook>;
	SalesAchievementBook: UqBook<ParamSalesAchievementBook, ResultSalesAchievementBook>;
	NewMyCustomerBook: UqBook<ParamNewMyCustomerBook, ResultNewMyCustomerBook>;
	WithdrawalStateBook: UqBook<ParamWithdrawalStateBook, ResultWithdrawalStateBook>;
	OrderStateBook: UqBook<ParamOrderStateBook, ResultOrderStateBook>;
	SalesTeamBook: UqBook<ParamSalesTeamBook, ResultSalesTeamBook>;
	SalesCustomerBook: UqBook<ParamSalesCustomerBook, ResultSalesCustomerBook>;
	Achievement: UqBook<ParamAchievement, ResultAchievement>;
	AssistAchievements: UqBook<ParamAssistAchievements, ResultAssistAchievements>;
	SearchTask: UqQuery<ParamSearchTask, ResultSearchTask>;
	SearchHistoryTask: UqQuery<ParamSearchHistoryTask, ResultSearchHistoryTask>;
	SearchHistoryTaskByCustomer: UqQuery<ParamSearchHistoryTaskByCustomer, ResultSearchHistoryTaskByCustomer>;
	SearchHistoryTaskByEmployee: UqQuery<ParamSearchHistoryTaskByEmployee, ResultSearchHistoryTaskByEmployee>;
	SearchTaskCompletion: UqQuery<ParamSearchTaskCompletion, ResultSearchTaskCompletion>;
	SearchTaskProduct: UqQuery<ParamSearchTaskProduct, ResultSearchTaskProduct>;
	SearchTaskProductPack: UqQuery<ParamSearchTaskProductPack, ResultSearchTaskProductPack>;
	SearchTaskProject: UqQuery<ParamSearchTaskProject, ResultSearchTaskProject>;
	SearchPosition: UqQuery<ParamSearchPosition, ResultSearchPosition>;
	SearchAchievement: UqQuery<ParamSearchAchievement, ResultSearchAchievement>;
	SearchTeam: UqQuery<ParamSearchTeam, ResultSearchTeam>;
	SearchMyCustomer: UqQuery<ParamSearchMyCustomer, ResultSearchMyCustomer>;
	SearchMyCustomerUnit: UqQuery<ParamSearchMyCustomerUnit, ResultSearchMyCustomerUnit>;
	SearchMessage: UqQuery<ParamSearchMessage, ResultSearchMessage>;
	SearchNowMessage: UqQuery<ParamSearchNowMessage, ResultSearchNowMessage>;
	SearchCoupon: UqQuery<ParamSearchCoupon, ResultSearchCoupon>;
	SearchJKTask: UqQuery<ParamSearchJKTask, ResultSearchJKTask>;
	SearchAchievementHistory: UqQuery<ParamSearchAchievementHistory, ResultSearchAchievementHistory>;
	SearchCustomerMyCustomerMap: UqQuery<ParamSearchCustomerMyCustomerMap, ResultSearchCustomerMyCustomerMap>;
	MyCustomerIsOccupy: UqQuery<ParamMyCustomerIsOccupy, ResultMyCustomerIsOccupy>;
	SearchMyCustomerActive: UqQuery<ParamSearchMyCustomerActive, ResultSearchMyCustomerActive>;
	SearchNewMyCustomer: UqQuery<ParamSearchNewMyCustomer, ResultSearchNewMyCustomer>;
	SearchBalanceHistory: UqQuery<ParamSearchBalanceHistory, ResultSearchBalanceHistory>;
	SearchWithdrawalStateQuery: UqQuery<ParamSearchWithdrawalStateQuery, ResultSearchWithdrawalStateQuery>;
	SearchMyCustomerByPost: UqQuery<ParamSearchMyCustomerByPost, ResultSearchMyCustomerByPost>;
	SearchSubordinate: UqQuery<ParamSearchSubordinate, ResultSearchSubordinate>;
	SearchCustomerOrder: UqQuery<ParamSearchCustomerOrder, ResultSearchCustomerOrder>;
	SearchMyCustomerDepartment: UqQuery<ParamSearchMyCustomerDepartment, ResultSearchMyCustomerDepartment>;
	SearchMyCustomerResearch: UqQuery<ParamSearchMyCustomerResearch, ResultSearchMyCustomerResearch>;
	SearchMyCustomerOfficePost: UqQuery<ParamSearchMyCustomerOfficePost, ResultSearchMyCustomerOfficePost>;
	SearchMyCustomerByUnit: UqQuery<ParamSearchMyCustomerByUnit, ResultSearchMyCustomerByUnit>;
	SearchTaskHistoryCount: UqQuery<ParamSearchTaskHistoryCount, ResultSearchTaskHistoryCount>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SearchBottomDiscount: UqQuery<ParamSearchBottomDiscount, ResultSearchBottomDiscount>;
	SearchCouponUsed: UqQuery<ParamSearchCouponUsed, ResultSearchCouponUsed>;
	SearchMyCustomerByCategory: UqQuery<ParamSearchMyCustomerByCategory, ResultSearchMyCustomerByCategory>;
	GetPersonMonthlyAchieve: UqQuery<ParamGetPersonMonthlyAchieve, ResultGetPersonMonthlyAchieve>;
	GetPersonDailyAchieve: UqQuery<ParamGetPersonDailyAchieve, ResultGetPersonDailyAchieve>;
	GetPersonYearlyAchieve: UqQuery<ParamGetPersonYearlyAchieve, ResultGetPersonYearlyAchieve>;
	GetTeamDailyAchieve: UqQuery<ParamGetTeamDailyAchieve, ResultGetTeamDailyAchieve>;
	GetTeamMonthlyAchieve: UqQuery<ParamGetTeamMonthlyAchieve, ResultGetTeamMonthlyAchieve>;
	GetTeamYearlyAchieve: UqQuery<ParamGetTeamYearlyAchieve, ResultGetTeamYearlyAchieve>;
	GetTeamMemberYearlyAchieve: UqQuery<ParamGetTeamMemberYearlyAchieve, ResultGetTeamMemberYearlyAchieve>;
	OrganizationCustomer: UqMap;
	TaskBiz: UqMap;
	BizField: UqMap;
	Position: UqMap;
	Relation: UqMap;
	CouponOrderMap: UqMap;
	WebUserEmployeeMap: UqMap;
	TaskBizJKTaskType: UqMap;
	CustomerMyCustomerMap: UqMap;
	ProtectedCustomersMap: UqMap;
	OpenCustomersMap: UqMap;
	WebUserAccountMap: UqMap;
	EmployeeRelation: UqMap;
	WebuserEmployee: UqMap;
	ResearchRelation: UqMap;
	CustomerOfficePost: UqMap;
	OfficePostRelation: UqMap;
	CustomerDepartment: UqMap;
	CustomerResearch: UqMap;
	Importcustomerdata: UqMap;
	TaskOrder: UqMap;
	VIPCardForWebUser: UqMap;
	VIPCardDiscount: UqMap;
	BottomDiscount: UqMap;
	CustomerDomain: UqMap;
	BrandSalesRegion: UqMap;
	TaskHistory: UqHistory<ParamTaskHistory, ResultTaskHistory>;
	AchievementHistory: UqHistory<ParamAchievementHistory, ResultAchievementHistory>;
	BalanceHistory: UqHistory<ParamBalanceHistory, ResultBalanceHistory>;
	WithdrawalStateHistory: UqHistory<ParamWithdrawalStateHistory, ResultWithdrawalStateHistory>;
	MyCustomerPostHistory: UqHistory<ParamMyCustomerPostHistory, ResultMyCustomerPostHistory>;
	CouponSendHistory: UqHistory<ParamCouponSendHistory, ResultCouponSendHistory>;
	CustomerNowSalesHistory: UqHistory<ParamCustomerNowSalesHistory, ResultCustomerNowSalesHistory>;
	WithdrawalsHistory: UqHistory<ParamWithdrawalsHistory, ResultWithdrawalsHistory>;
	CustomerOrderPending: UqPending<any, any>;
	OrderPaymentPending: UqPending<any, any>;
}
