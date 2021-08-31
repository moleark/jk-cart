//=== UqApp builder created on Tue Aug 31 2021 13:51:03 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/deliver ========
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

export interface ParamAutoWarehouseDeliver {
}
export interface ResultAutoWarehouseDeliver {
}

export interface ParamPicking {
	deliver: number;
}
export interface ResultPicking {
}

export interface ParamDonePickup {
	deliver: number;
	detail: {
		id: number;
		quantity: number;
	}[];

}
export interface ResultDonePickup {
}

export interface ParamCutOff {
	currentWarehouse: number;
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

export interface ParamTallied {
	cutOffMain: number;
	detail: {
		orderDetail: number;
		quantity: number;
	}[];

}
export interface ResultTallied {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamWarehousePendingDeliver {
}
export interface ReturnWarehousePendingDeliverRet {
	warehouse: number;
	rowCount: number;
}
export interface ResultWarehousePendingDeliver {
	ret: ReturnWarehousePendingDeliverRet[];
}

export interface ParamCustomerPendingDeliver {
	warehouse: number;
	customer: number;
}
export interface ReturnCustomerPendingDeliverRet {
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	deliverShould: number;
	deliverDone: number;
	returnDone: number;
}
export interface ResultCustomerPendingDeliver {
	ret: ReturnCustomerPendingDeliverRet[];
}

export interface ParamWarehouseDeliverMain {
}
export interface ReturnWarehouseDeliverMainRet {
	warehouse: number;
	deliverMain: number;
	no: string;
	customer: number;
	create: any;
	rows: number;
	pickRows: number;
	staff: number;
}
export interface ResultWarehouseDeliverMain {
	ret: ReturnWarehouseDeliverMainRet[];
}

export interface ParamGetDeliver {
	deliver: number;
}
export interface ReturnGetDeliverMain {
	no: string;
	customer: number;
	contact: number;
	warehouse: number;
	staff: number;
	rows: number;
	pickRows: number;
	deliverTime: any;
}
export interface ReturnGetDeliverDetail {
	delivermain: number;
	item: number;
	product: number;
	deliverShould: number;
	pickDone: number;
	deliverDone: number;
	returnDone: number;
}
export interface ResultGetDeliver {
	main: ReturnGetDeliverMain[];
	detail: ReturnGetDeliverDetail[];
}

export interface ParamGetReadyCutOffList {
	warehouse: number;
}
export interface ReturnGetReadyCutOffListList {
	orderDetail: number;
	product: number;
	item: number;
	shouldQuantity: number;
	customer: number;
}
export interface ResultGetReadyCutOffList {
	list: ReturnGetReadyCutOffListList[];
}

export interface ParamGetCutOffMainList {
	warehouse: number;
}
export interface ReturnGetCutOffMainListList {
	id: number;
	no: string;
}
export interface ResultGetCutOffMainList {
	list: ReturnGetCutOffMainListList[];
}

export interface ParamWarehouseCutOffMain {
}
export interface ReturnWarehouseCutOffMainRet {
	warehouse: number;
	cutOffMain: number;
	no: string;
	cutter: number;
	create: any;
	staff: number;
}
export interface ResultWarehouseCutOffMain {
	ret: ReturnWarehouseCutOffMainRet[];
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
}
export interface ReturnGetCutOffMainDetail {
	delivermain: number;
	trayNumber: number;
	contact: number;
	customer: number;
	carrier: number;
	waybillNumber: string;
	deliverTime: any;
	deliverDetail: number;
	item: number;
	product: number;
	tallyShould: number;
	orderExt: string;
}
export interface ResultGetCutOffMain {
	main: ReturnGetCutOffMainMain[];
	detail: ReturnGetCutOffMainDetail[];
}

export interface OrderMain {
	id?: number;
	no?: string;
	customer: number;
	contact: number;
}

export interface OrderDetail {
	id?: number;
	main?: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	warehouse: number;
}

export interface Warehouse {
	id?: number;
	name: string;
}

export interface DeliverMain {
	id?: number;
	no?: string;
	customer: number;
	contact: number;
	warehouse: number;
	cutOffMain: number;
	trayNumber: number;
}

export interface DeliverDetail {
	id?: number;
	main?: number;
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
	$create?: any;
}

export interface DxOrderDetail {
	id: number;
	deliverShould?: number;
	deliverReturn?: number;
	returnDone?: number;
	pickDone?: number;
	deliverDone?: number;
	$act?: number;
}

export interface DxReturnDetail {
	id: number;
	quantityDone?: number;
	$act?: number;
}

export interface OrderDetailX {
	id: number;
	needInsuredWhenDelivery?: number;
	showPrice?: number;
	lotNumber?: string;
	json?: string;
	$act?: number;
}

export interface DxDeliverMain {
	id: number;
	staff?: number;
	rows?: number;
	pickRows?: number;
	carrier?: number;
	waybillNumber?: string;
	deliverTime?: any;
	$act?: number;
}

export interface DXDeliverDetail {
	id: number;
	deliverDone?: number;
	$act?: number;
}

export interface DxCutOffMain {
	id: number;
	staff?: number;
	startTime?: any;
	finishTime?: any;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	deliverShould?: number|IDXValue;
	deliverReturn?: number|IDXValue;
	returnDone?: number|IDXValue;
	pickDone?: number|IDXValue;
	deliverDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReturnDetail {
	id: number|IDXValue;
	quantityDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamOrderDetailX {
	id: number|IDXValue;
	needInsuredWhenDelivery?: number|IDXValue;
	showPrice?: number|IDXValue;
	lotNumber?: string|IDXValue;
	json?: string|IDXValue;
	$act?: number;
}

export interface ActParamDxDeliverMain {
	id: number|IDXValue;
	staff?: number|IDXValue;
	rows?: number|IDXValue;
	pickRows?: number|IDXValue;
	carrier?: number|IDXValue;
	waybillNumber?: string|IDXValue;
	deliverTime?: any|IDXValue;
	$act?: number;
}

export interface ActParamDXDeliverDetail {
	id: number|IDXValue;
	deliverDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxCutOffMain {
	id: number|IDXValue;
	staff?: number|IDXValue;
	startTime?: any|IDXValue;
	finishTime?: any|IDXValue;
	$act?: number;
}

export interface IxPendingDeliver {
	ixx: number;
	ix: number;
	xi: number;
}

export interface IxUserWarehouse {
	ix: number;
	xi: number;
}

export interface IxWarehouseDeliverMain {
	ix: number;
	xi: number;
}

export interface IxWarehouseCutOffMain {
	ix: number;
	xi: number;
}

export interface ParamActs {
	orderMain?: OrderMain[];
	orderDetail?: OrderDetail[];
	warehouse?: Warehouse[];
	deliverMain?: DeliverMain[];
	deliverDetail?: DeliverDetail[];
	deliverMainEx?: DeliverMainEx[];
	cutOffMain?: CutOffMain[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReturnDetail?: ActParamDxReturnDetail[];
	orderDetailX?: ActParamOrderDetailX[];
	dxDeliverMain?: ActParamDxDeliverMain[];
	dXDeliverDetail?: ActParamDXDeliverDetail[];
	dxCutOffMain?: ActParamDxCutOffMain[];
	ixPendingDeliver?: IxPendingDeliver[];
	ixUserWarehouse?: IxUserWarehouse[];
	ixWarehouseDeliverMain?: IxWarehouseDeliverMain[];
	ixWarehouseCutOffMain?: IxWarehouseCutOffMain[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	AutoWarehouseDeliver: UqAction<ParamAutoWarehouseDeliver, ResultAutoWarehouseDeliver>;
	Picking: UqAction<ParamPicking, ResultPicking>;
	DonePickup: UqAction<ParamDonePickup, ResultDonePickup>;
	CutOff: UqAction<ParamCutOff, ResultCutOff>;
	Tallying: UqAction<ParamTallying, ResultTallying>;
	Tallied: UqAction<ParamTallied, ResultTallied>;
	$poked: UqQuery<Param$poked, Result$poked>;
	WarehousePendingDeliver: UqQuery<ParamWarehousePendingDeliver, ResultWarehousePendingDeliver>;
	CustomerPendingDeliver: UqQuery<ParamCustomerPendingDeliver, ResultCustomerPendingDeliver>;
	WarehouseDeliverMain: UqQuery<ParamWarehouseDeliverMain, ResultWarehouseDeliverMain>;
	GetDeliver: UqQuery<ParamGetDeliver, ResultGetDeliver>;
	GetReadyCutOffList: UqQuery<ParamGetReadyCutOffList, ResultGetReadyCutOffList>;
	GetCutOffMainList: UqQuery<ParamGetCutOffMainList, ResultGetCutOffMainList>;
	WarehouseCutOffMain: UqQuery<ParamWarehouseCutOffMain, ResultWarehouseCutOffMain>;
	GetCutOffMain: UqQuery<ParamGetCutOffMain, ResultGetCutOffMain>;
	OrderMain: UqID<any>;
	OrderDetail: UqID<any>;
	Warehouse: UqID<any>;
	DeliverMain: UqID<any>;
	DeliverDetail: UqID<any>;
	DeliverMainEx: UqID<any>;
	CutOffMain: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReturnDetail: UqIDX<any>;
	OrderDetailX: UqIDX<any>;
	DxDeliverMain: UqIDX<any>;
	DXDeliverDetail: UqIDX<any>;
	DxCutOffMain: UqIDX<any>;
	IxPendingDeliver: UqIX<any>;
	IxUserWarehouse: UqIX<any>;
	IxWarehouseDeliverMain: UqIX<any>;
	IxWarehouseCutOffMain: UqIX<any>;
}
