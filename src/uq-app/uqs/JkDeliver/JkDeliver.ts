//=== UqApp builder created on Mon Dec 20 2021 16:49:24 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/deliver ========
//===============================

export enum EnumRole {
	all = 1,
	dev = 2,
	warehouseManager = 3,
	cutOffer = 4,
	tallyer = 5,
	checker = 6,
	picker = 7,
	packer = 8,
	dispatcher = 9
}

export enum EnumRoleOp {
	test = 1
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

export interface TuidCarrier {
	id?: number;
	name: string;
	no: string;
	isValid: number;
}

export interface ParamCutOff {
	aWarehouse: number;
	cutOffType: number;
}
export interface ReturnCutOffMain {
	id: number;
	no: string;
}
export interface ResultCutOff {
	main: ReturnCutOffMain[];
}

export interface ParamTallying {
	cutOffMain: number;
}
export interface ResultTallying {
}

export interface ParamDelivering {
	deliver: number;
}
export interface ResultDelivering {
}

export interface ParamDelivered {
	deliver: number;
	detail: {
		deliverDetail: number;
		orderDetail: number;
		quantity: number;
	}[];

}
export interface ResultDelivered {
}

export interface ParamTallyDoneSingle {
	deliverMain: number;
	deliverDetail: number;
	quantity: number;
}
export interface ResultTallyDoneSingle {
}

export interface ParamTallyDone {
	cutOffMain: number;
}
export interface ResultTallyDone {
}

export interface ParamUpdateDeliverCarrier {
	deliverMain: number;
	carrier: number;
}
export interface ResultUpdateDeliverCarrier {
}

export interface ParamUpdateWaybillNumber {
	deliverMain: number;
	carrier: number;
	waybillNumber: string;
}
export interface ResultUpdateWaybillNumber {
}

export interface ParamCutOffSelected {
	aWarehouse: number;
	cutOffType: number;
	detail: {
		aRequestDetail: number;
	}[];

}
export interface ReturnCutOffSelectedMain {
	id: number;
	no: string;
}
export interface ResultCutOffSelected {
	main: ReturnCutOffSelectedMain[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface ParamTruckArrange {
	aWarehouse: number;
	detail: {
		aBiz: number;
	}[];

}
export interface ResultTruckArrange {
}

export interface ParamTrucked {
	truckMain: number;
	detail: {
		biz: number;
	}[];

}
export interface ResultTrucked {
}

export interface ParamAddTruckAdditionalTask {
	warehouse: number;
	contact: number;
	content: string;
	note: string;
	creator: number;
	requiredDate: any;
	json: string;
}
export interface ResultAddTruckAdditionalTask {
}

export interface ParamAddTruck {
	warehouse: number;
	biz: number;
	contact: number;
	json: string;
}
export interface ResultAddTruck {
}

export interface ParamCancelTallying {
	cutOffMain: number;
}
export interface ResultCancelTallying {
}

export interface ParamTallyCancelSingle {
	deliverMain: number;
	deliverDetail: number;
}
export interface ResultTallyCancelSingle {
}

export interface ParamCancelDelivering {
	deliver: number;
}
export interface ResultCancelDelivering {
}

export interface ParamCancelTruckAdditionalTask {
	warehouse: number;
	truckAdditionalTask: number;
}
export interface ResultCancelTruckAdditionalTask {
}

export interface ParamCancelChecking {
	cutOffMain: number;
}
export interface ResultCancelChecking {
}

export interface ParamCheckDone {
	cutOffMain: number;
	detail: {
		deliverDetail: number;
		quantity: number;
	}[];

}
export interface ResultCheckDone {
}

export interface ParamChecking {
	cutOffMain: number;
}
export interface ResultChecking {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetDeliver {
	deliver: number;
}
export interface ReturnGetDeliverMain {
	id: number;
	no: string;
	customerAccount: number;
	contact: number;
	warehouse: number;
	staff: number;
	rows: number;
	pickRows: number;
	deliverTime: any;
}
export interface ReturnGetDeliverDetail {
	id: number;
	orderDetail: number;
	deliverMain: number;
	item: number;
	lotNumber: string;
	deliverShould: number;
	deliverDone: number;
	returnDone: number;
	content: string;
}
export interface ResultGetDeliver {
	main: ReturnGetDeliverMain[];
	detail: ReturnGetDeliverDetail[];
}

export interface ParamGetReadyCutOffList {
	warehouse: number;
	cutOffType: number;
}
export interface ReturnGetReadyCutOffList$page {
	id: number;
	orderDetail: number;
	item: number;
	shouldQuantity: number;
	contact: number;
	json: string;
}
export interface ResultGetReadyCutOffList {
	$page: ReturnGetReadyCutOffList$page[];
}

export interface ParamGetCutOffMainList {
	warehouse: number;
}
export interface ReturnGetCutOffMainList$page {
	id: number;
	no: string;
	cutter: number;
	create: any;
	sumQuantity: number;
	deliverDone: number;
}
export interface ResultGetCutOffMainList {
	$page: ReturnGetCutOffMainList$page[];
}

export interface ParamGetCutOffMain {
	cutOffMain: number;
}
export interface ReturnGetCutOffMainMain {
	id: number;
	no: string;
	warehouse: number;
	cutter: number;
	staff: number;
	finishTime: any;
}
export interface ReturnGetCutOffMainDetail {
	deliverMain: number;
	trayNumber: number;
	contact: number;
	customerAccount: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
	deliverDetail: number;
	item: number;
	tallyShould: number;
	tallyDone: number;
	tallyState: number;
	lotNumber: string;
	showPrice: number;
	content: string;
}
export interface ResultGetCutOffMain {
	main: ReturnGetCutOffMainMain[];
	detail: ReturnGetCutOffMainDetail[];
}

export interface ParamGetOrderDetailTransportation {
	orderDetail: number;
}
export interface ReturnGetOrderDetailTransportationRet {
	orderDetail: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
}
export interface ResultGetOrderDetailTransportation {
	ret: ReturnGetOrderDetailTransportationRet[];
}

export interface ParamGetPointExchangeDetailTransportation {
	pointExchangeDetail: number;
}
export interface ReturnGetPointExchangeDetailTransportationRet {
	pointExchangeDetail: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
}
export interface ResultGetPointExchangeDetailTransportation {
	ret: ReturnGetPointExchangeDetailTransportationRet[];
}

export interface ParamGetCarrierNo {
}
export interface ReturnGetCarrierNoRet {
	id: number;
	name: string;
	no: string;
}
export interface ResultGetCarrierNo {
	ret: ReturnGetCarrierNoRet[];
}

export interface ParamGetReadyCutOffCount {
}
export interface ReturnGetReadyCutOffCountRet {
	warehouse: number;
	readyCutOffCount: number;
}
export interface ResultGetReadyCutOffCount {
	ret: ReturnGetReadyCutOffCountRet[];
}

export interface ParamGetCutOffTypeCount {
	warehouseId: number;
	cutofftypeId: number;
}
export interface ReturnGetCutOffTypeCountRet {
	warehouse: number;
	cutofftype: number;
	readyCutOffCount: number;
}
export interface ResultGetCutOffTypeCount {
	ret: ReturnGetCutOffTypeCountRet[];
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

export interface ParamGetCutOffTypeDefinition {
	cutOffType: number;
}
export interface ReturnGetCutOffTypeDefinitionList {
	deliverType: number;
	deliverTypeName: string;
	customerAccount: number;
}
export interface ResultGetCutOffTypeDefinition {
	list: ReturnGetCutOffTypeDefinitionList[];
}

export interface ParamGetInsuredTypeBrand {
	insuredType: number;
}
export interface ReturnGetInsuredTypeBrandList {
	insuredType: number;
	brand: number;
}
export interface ResultGetInsuredTypeBrand {
	list: ReturnGetInsuredTypeBrandList[];
}

export interface ParamGetInsuredTypeInterval {
	insuredType: number;
}
export interface ReturnGetInsuredTypeIntervalList {
	insuredType: number;
	insuredInterval: number;
	amount: number;
}
export interface ResultGetInsuredTypeInterval {
	list: ReturnGetInsuredTypeIntervalList[];
}

export interface ParamGetDeliverDetailTransportation {
	deliverDetail: number;
}
export interface ReturnGetDeliverDetailTransportationRet {
	deliverDetail: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
}
export interface ResultGetDeliverDetailTransportation {
	ret: ReturnGetDeliverDetailTransportationRet[];
}

export interface ParamGetReadyTruckTaslList {
	warehouse: number;
}
export interface ReturnGetReadyTruckTaslListRet {
	warehouse: number;
	deliverDetail: number;
	contact: number;
	json: string;
}
export interface ResultGetReadyTruckTaslList {
	ret: ReturnGetReadyTruckTaslListRet[];
}

export interface ParamGetTruckMain {
	truckMain: number;
}
export interface ReturnGetTruckMainMain {
	truckMain: number;
	no: string;
	contact: number;
	warehouse: number;
	staff: number;
	trucking: number;
}
export interface ReturnGetTruckMainDetail {
	truckDetail: number;
	biz: number;
	json: string;
}
export interface ResultGetTruckMain {
	main: ReturnGetTruckMainMain[];
	detail: ReturnGetTruckMainDetail[];
}

export interface ParamGetTruckHistoryList {
}
export interface ReturnGetTruckHistoryListRet {
	warehouse: number;
	truckMain: number;
	no: string;
	contact: number;
	staff: number;
}
export interface ResultGetTruckHistoryList {
	ret: ReturnGetTruckHistoryListRet[];
}

export interface ParamGetTruckAdditionalTask {
}
export interface ReturnGetTruckAdditionalTaskRet {
	id: number;
	contact: number;
	content: string;
	note: string;
	creator: number;
	requiredDate: any;
	staff: number;
	state: number;
	finishTime: any;
	create: any;
}
export interface ResultGetTruckAdditionalTask {
	ret: ReturnGetTruckAdditionalTaskRet[];
}

export interface ParamGetRoleOps {
}
export interface ReturnGetRoleOpsRet {
	role: any;
	op: any;
}
export interface ResultGetRoleOps {
	ret: ReturnGetRoleOpsRet[];
}

export interface ParamGetCutOffHistory {
	warehouse: number;
}
export interface ReturnGetCutOffHistory$page {
	id: number;
	cutOffMain: number;
	no: string;
	finishTime: any;
	staff: number;
}
export interface ResultGetCutOffHistory {
	$page: ReturnGetCutOffHistory$page[];
}

export interface ParamGetDeliverHistory {
	warehouse: number;
}
export interface ReturnGetDeliverHistory$page {
	id: number;
	deliverMain: number;
	no: string;
	cutOffMain: string;
	traynumber: number;
	finishTime: any;
	staff: number;
}
export interface ResultGetDeliverHistory {
	$page: ReturnGetDeliverHistory$page[];
}

export interface ParamGetReadyTruckCount {
}
export interface ReturnGetReadyTruckCountRet {
	warehouse: number;
	readyTruckCount: number;
}
export interface ResultGetReadyTruckCount {
	ret: ReturnGetReadyTruckCountRet[];
}

export interface ParamWarehouseChecks {
}
export interface ReturnWarehouseChecksRet {
	warehouse: number;
	cutOffMain: number;
	no: string;
	staff: number;
	create: any;
}
export interface ResultWarehouseChecks {
	ret: ReturnWarehouseChecksRet[];
}

export interface ParamWarehouseTallys {
}
export interface ReturnWarehouseTallysRet {
	warehouse: number;
	cutOffMain: number;
	no: string;
	create: any;
	staff: number;
}
export interface ResultWarehouseTallys {
	ret: ReturnWarehouseTallysRet[];
}

export interface ParamWarehouseTrucks {
}
export interface ReturnWarehouseTrucksRet {
	warehouse: number;
	truckMain: number;
	no: string;
	contact: number;
	staff: number;
}
export interface ResultWarehouseTrucks {
	ret: ReturnWarehouseTrucksRet[];
}

export interface ParamWarehouseDelivers {
}
export interface ReturnWarehouseDeliversRet {
	warehouse: number;
	deliverMain: number;
	no: string;
	cutOffMain: string;
	traynumber: number;
	customerAccount: number;
	staff: number;
}
export interface ResultWarehouseDelivers {
	ret: ReturnWarehouseDeliversRet[];
}

export interface ParamGetCheckHistory {
	warehouse: number;
}
export interface ReturnGetCheckHistory$page {
	id: number;
	cutOffMain: number;
	no: string;
	finishTime: any;
	staff: number;
}
export interface ResultGetCheckHistory {
	$page: ReturnGetCheckHistory$page[];
}

export interface ParamGetCheckInfo {
	cutOffMain: number;
}
export interface ReturnGetCheckInfoMain {
	id: number;
	no: string;
	warehouse: number;
	staff: number;
	finishTime: any;
}
export interface ReturnGetCheckInfoDetail {
	deliverMain: number;
	trayNumber: number;
	deliverDetail: number;
	item: number;
	checkShould: number;
	checkDone: number;
	lotNumber: string;
	content: string;
}
export interface ResultGetCheckInfo {
	main: ReturnGetCheckInfoMain[];
	detail: ReturnGetCheckInfoDetail[];
}

export interface ParamGetOrganizationTruckStaff {
	staff: number;
}
export interface ReturnGetOrganizationTruckStaffRet {
	truckStaff: number;
	organization: number;
	truckBatchId: number;
	truckBatchName: string;
}
export interface ResultGetOrganizationTruckStaff {
	ret: ReturnGetOrganizationTruckStaffRet[];
}

export interface OrderMain {
	id?: number;
	no?: string;
	customerAccount: number;
	contact: number;
	currency: number;
}

export interface OrderDetail {
	id?: number;
	main?: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	lotNumber: string;
}

export interface Warehouse {
	id?: number;
	name: string;
}

export interface DeliverMain {
	id?: number;
	no?: string;
	customerAccount: number;
	contact: number;
	warehouse: number;
	cutOffMain: number;
	trayNumber: number;
}

export interface DeliverDetail {
	id?: number;
	main?: number;
	biz: number;
	item: number;
	quantity: number;
	lotNumber: string;
	showPrice: number;
	json: string;
}

export interface DeliverMainEx {
	id?: number;
	deliverId: string;
	warehouseName: string;
	addressString: string;
}

export interface CutOffMain {
	id?: number;
	no?: string;
	warehouse: number;
	cutter: number;
}

export interface CutOffType {
	id?: number;
	name: string;
	description: string;
}

export interface DeliverType {
	id?: number;
	name: string;
	description: string;
}

export interface RequestDetail {
	id?: number;
	main?: number;
	biz: number;
	cutOffType: number;
	warehouse: number;
	item: number;
	quantity: number;
	lotNumber: string;
	showPrice: number;
	json: string;
}

export interface Request {
	id?: number;
	customerAccount: number;
	contact: number;
}

export interface InsuredInterval {
	id?: number;
	start: number;
	end: number;
}

export interface InsuredType {
	id?: number;
	name: string;
	description: string;
}

export interface TruckDetail {
	id?: number;
	main?: number;
	biz: number;
	json: string;
}

export interface TruckMain {
	id?: number;
	no?: string;
	contact: number;
	warehouse: number;
}

export interface TruckAdditionalTask {
	id?: number;
	contact: number;
	content: string;
	note: string;
	creator: number;
	requiredDate: any;
	staff: number;
	finishTime: any;
	state: number;
}

export interface Role {
	id?: number;
	name: string;
	discription: string;
}

export interface TruckBatch {
	id?: number;
	name: string;
	description: string;
}

export interface TruckStaff {
	id?: number;
	name: string;
	webuser: number;
}

export interface DxDeliverMain {
	id: number;
	rows?: number;
	pickRows?: number;
	carrier?: number;
	waybillNumber?: string;
	deliverTime?: any;
	staff?: number;
	startTime?: any;
	finishTime?: any;
	$act?: number;
}

export interface DxDeliverDetail {
	id: number;
	deliverDone?: number;
	pickDone?: number;
	checkDone?: number;
	tallyDone?: number;
	tallyState?: number;
	deliverReturn?: number;
	returnDone?: number;
	$act?: number;
}

export interface DxDelivering {
	id: number;
	$act?: number;
}

export interface DxCutOffTypeBuyerAccount {
	id: number;
	name?: string;
	description?: string;
	$act?: number;
}

export interface DxTruckMain {
	id: number;
	staff?: number;
	startTime?: any;
	finishTime?: any;
	$act?: number;
}

export interface DxTrucking {
	id: number;
	$act?: number;
}

export interface ActParamDxDeliverMain {
	id: number|IDXValue;
	rows?: number|IDXValue;
	pickRows?: number|IDXValue;
	carrier?: number|IDXValue;
	waybillNumber?: string|IDXValue;
	deliverTime?: any|IDXValue;
	staff?: number|IDXValue;
	startTime?: any|IDXValue;
	finishTime?: any|IDXValue;
	$act?: number;
}

export interface ActParamDxDeliverDetail {
	id: number|IDXValue;
	deliverDone?: number|IDXValue;
	pickDone?: number|IDXValue;
	checkDone?: number|IDXValue;
	tallyDone?: number|IDXValue;
	tallyState?: number|IDXValue;
	deliverReturn?: number|IDXValue;
	returnDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxDelivering {
	id: number|IDXValue;
	$act?: number;
}

export interface ActParamDxCutOffTypeBuyerAccount {
	id: number|IDXValue;
	name?: string|IDXValue;
	description?: string|IDXValue;
	$act?: number;
}

export interface ActParamDxTruckMain {
	id: number|IDXValue;
	staff?: number|IDXValue;
	startTime?: any|IDXValue;
	finishTime?: any|IDXValue;
	$act?: number;
}

export interface ActParamDxTrucking {
	id: number|IDXValue;
	$act?: number;
}

export interface IxUserWarehouse {
	ix: number;
	xi: number;
}

export interface IxCutoffTypeDefinition {
	ixx: number;
	ix: number;
	xi: number;
}

export interface DeliverDetailExchangeDetail {
	ix: number;
	xi: number;
}

export interface DeliverDetailOrderDetail {
	ix: number;
	xi: number;
}

export interface InsuredTypeBrand {
	ix: number;
	xi: number;
}

export interface InsuredTypeInterval {
	ix: number;
	xi: number;
	amount: number;
}

export interface IxPendingTruck {
	ix: number;
	xi: number;
	contact: number;
	json: string;
	truckStaff: number;
}

export interface IxOrganizationTruckSetting {
	ix: number;
	xi: number;
	ixx: number;
}

export interface ParamActs {
	orderMain?: OrderMain[];
	orderDetail?: OrderDetail[];
	warehouse?: Warehouse[];
	deliverMain?: DeliverMain[];
	deliverDetail?: DeliverDetail[];
	deliverMainEx?: DeliverMainEx[];
	cutOffMain?: CutOffMain[];
	cutOffType?: CutOffType[];
	deliverType?: DeliverType[];
	requestDetail?: RequestDetail[];
	request?: Request[];
	insuredInterval?: InsuredInterval[];
	insuredType?: InsuredType[];
	truckDetail?: TruckDetail[];
	truckMain?: TruckMain[];
	truckAdditionalTask?: TruckAdditionalTask[];
	role?: Role[];
	truckBatch?: TruckBatch[];
	truckStaff?: TruckStaff[];
	dxDeliverMain?: ActParamDxDeliverMain[];
	dxDeliverDetail?: ActParamDxDeliverDetail[];
	dxDelivering?: ActParamDxDelivering[];
	dxCutOffTypeBuyerAccount?: ActParamDxCutOffTypeBuyerAccount[];
	dxTruckMain?: ActParamDxTruckMain[];
	dxTrucking?: ActParamDxTrucking[];
	ixUserWarehouse?: IxUserWarehouse[];
	ixCutoffTypeDefinition?: IxCutoffTypeDefinition[];
	deliverDetailExchangeDetail?: DeliverDetailExchangeDetail[];
	deliverDetailOrderDetail?: DeliverDetailOrderDetail[];
	insuredTypeBrand?: InsuredTypeBrand[];
	insuredTypeInterval?: InsuredTypeInterval[];
	ixPendingTruck?: IxPendingTruck[];
	ixOrganizationTruckSetting?: IxOrganizationTruckSetting[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Carrier: UqTuid<TuidCarrier>;
	CutOff: UqAction<ParamCutOff, ResultCutOff>;
	Tallying: UqAction<ParamTallying, ResultTallying>;
	Delivering: UqAction<ParamDelivering, ResultDelivering>;
	Delivered: UqAction<ParamDelivered, ResultDelivered>;
	TallyDoneSingle: UqAction<ParamTallyDoneSingle, ResultTallyDoneSingle>;
	TallyDone: UqAction<ParamTallyDone, ResultTallyDone>;
	UpdateDeliverCarrier: UqAction<ParamUpdateDeliverCarrier, ResultUpdateDeliverCarrier>;
	UpdateWaybillNumber: UqAction<ParamUpdateWaybillNumber, ResultUpdateWaybillNumber>;
	CutOffSelected: UqAction<ParamCutOffSelected, ResultCutOffSelected>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	TruckArrange: UqAction<ParamTruckArrange, ResultTruckArrange>;
	Trucked: UqAction<ParamTrucked, ResultTrucked>;
	AddTruckAdditionalTask: UqAction<ParamAddTruckAdditionalTask, ResultAddTruckAdditionalTask>;
	AddTruck: UqAction<ParamAddTruck, ResultAddTruck>;
	CancelTallying: UqAction<ParamCancelTallying, ResultCancelTallying>;
	TallyCancelSingle: UqAction<ParamTallyCancelSingle, ResultTallyCancelSingle>;
	CancelDelivering: UqAction<ParamCancelDelivering, ResultCancelDelivering>;
	CancelTruckAdditionalTask: UqAction<ParamCancelTruckAdditionalTask, ResultCancelTruckAdditionalTask>;
	CancelChecking: UqAction<ParamCancelChecking, ResultCancelChecking>;
	CheckDone: UqAction<ParamCheckDone, ResultCheckDone>;
	Checking: UqAction<ParamChecking, ResultChecking>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetDeliver: UqQuery<ParamGetDeliver, ResultGetDeliver>;
	GetReadyCutOffList: UqQuery<ParamGetReadyCutOffList, ResultGetReadyCutOffList>;
	GetCutOffMainList: UqQuery<ParamGetCutOffMainList, ResultGetCutOffMainList>;
	GetCutOffMain: UqQuery<ParamGetCutOffMain, ResultGetCutOffMain>;
	GetOrderDetailTransportation: UqQuery<ParamGetOrderDetailTransportation, ResultGetOrderDetailTransportation>;
	GetPointExchangeDetailTransportation: UqQuery<ParamGetPointExchangeDetailTransportation, ResultGetPointExchangeDetailTransportation>;
	GetCarrierNo: UqQuery<ParamGetCarrierNo, ResultGetCarrierNo>;
	GetReadyCutOffCount: UqQuery<ParamGetReadyCutOffCount, ResultGetReadyCutOffCount>;
	GetCutOffTypeCount: UqQuery<ParamGetCutOffTypeCount, ResultGetCutOffTypeCount>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	GetCutOffTypeDefinition: UqQuery<ParamGetCutOffTypeDefinition, ResultGetCutOffTypeDefinition>;
	GetInsuredTypeBrand: UqQuery<ParamGetInsuredTypeBrand, ResultGetInsuredTypeBrand>;
	GetInsuredTypeInterval: UqQuery<ParamGetInsuredTypeInterval, ResultGetInsuredTypeInterval>;
	GetDeliverDetailTransportation: UqQuery<ParamGetDeliverDetailTransportation, ResultGetDeliverDetailTransportation>;
	GetReadyTruckTaslList: UqQuery<ParamGetReadyTruckTaslList, ResultGetReadyTruckTaslList>;
	GetTruckMain: UqQuery<ParamGetTruckMain, ResultGetTruckMain>;
	GetTruckHistoryList: UqQuery<ParamGetTruckHistoryList, ResultGetTruckHistoryList>;
	GetTruckAdditionalTask: UqQuery<ParamGetTruckAdditionalTask, ResultGetTruckAdditionalTask>;
	GetRoleOps: UqQuery<ParamGetRoleOps, ResultGetRoleOps>;
	GetCutOffHistory: UqQuery<ParamGetCutOffHistory, ResultGetCutOffHistory>;
	GetDeliverHistory: UqQuery<ParamGetDeliverHistory, ResultGetDeliverHistory>;
	GetReadyTruckCount: UqQuery<ParamGetReadyTruckCount, ResultGetReadyTruckCount>;
	WarehouseChecks: UqQuery<ParamWarehouseChecks, ResultWarehouseChecks>;
	WarehouseTallys: UqQuery<ParamWarehouseTallys, ResultWarehouseTallys>;
	WarehouseTrucks: UqQuery<ParamWarehouseTrucks, ResultWarehouseTrucks>;
	WarehouseDelivers: UqQuery<ParamWarehouseDelivers, ResultWarehouseDelivers>;
	GetCheckHistory: UqQuery<ParamGetCheckHistory, ResultGetCheckHistory>;
	GetCheckInfo: UqQuery<ParamGetCheckInfo, ResultGetCheckInfo>;
	GetOrganizationTruckStaff: UqQuery<ParamGetOrganizationTruckStaff, ResultGetOrganizationTruckStaff>;
	OrderMain: UqID<any>;
	OrderDetail: UqID<any>;
	Warehouse: UqID<any>;
	DeliverMain: UqID<any>;
	DeliverDetail: UqID<any>;
	DeliverMainEx: UqID<any>;
	CutOffMain: UqID<any>;
	CutOffType: UqID<any>;
	DeliverType: UqID<any>;
	RequestDetail: UqID<any>;
	Request: UqID<any>;
	InsuredInterval: UqID<any>;
	InsuredType: UqID<any>;
	TruckDetail: UqID<any>;
	TruckMain: UqID<any>;
	TruckAdditionalTask: UqID<any>;
	Role: UqID<any>;
	TruckBatch: UqID<any>;
	TruckStaff: UqID<any>;
	DxDeliverMain: UqIDX<any>;
	DxDeliverDetail: UqIDX<any>;
	DxDelivering: UqIDX<any>;
	DxCutOffTypeBuyerAccount: UqIDX<any>;
	DxTruckMain: UqIDX<any>;
	DxTrucking: UqIDX<any>;
	IxUserWarehouse: UqIX<any>;
	IxCutoffTypeDefinition: UqIX<any>;
	DeliverDetailExchangeDetail: UqIX<any>;
	DeliverDetailOrderDetail: UqIX<any>;
	InsuredTypeBrand: UqIX<any>;
	InsuredTypeInterval: UqIX<any>;
	IxPendingTruck: UqIX<any>;
	IxOrganizationTruckSetting: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
