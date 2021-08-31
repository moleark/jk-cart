//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqMap, UqID } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/customerDiscount ========
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

export interface TuidOrganization {
	id?: number;
	name: string;
	no: string;
	createTime: any;
}

export interface TuidBrand {
	id?: number;
	name: string;
	no: string;
}

export interface TuidCustomer {
	id?: number;
	name: string;
}

export interface ParamGetDiscount {
	brand: number;
	customer: number;
}
export interface ReturnGetDiscountRet {
	brand: number;
	discount: number;
	$id: number;
}
export interface ResultGetDiscount {
	ret: ReturnGetDiscountRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
	$id: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetDiscountByOrganization {
	brand: number;
	organization: number;
}
export interface ReturnGetDiscountByOrganizationRet {
	brand: number;
	discount: number;
	$id: number;
}
export interface ResultGetDiscountByOrganization {
	ret: ReturnGetDiscountByOrganizationRet[];
}

export interface $Piecewise {
	id?: number;
	name: string;
	mul: number;
	div: number;
	offset: number;
	asc: number;
}

export interface $PiecewiseDetail {
	id?: number;
	parent: number;
	row?: number;
	sec: number;
	value: number;
}

export interface ParamActs {
	$Piecewise?: $Piecewise[];
	$PiecewiseDetail?: $PiecewiseDetail[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Organization: UqTuid<TuidOrganization>;
	Brand: UqTuid<TuidBrand>;
	Customer: UqTuid<TuidCustomer>;
	GetDiscount: UqQuery<ParamGetDiscount, ResultGetDiscount>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetDiscountByOrganization: UqQuery<ParamGetDiscountByOrganization, ResultGetDiscountByOrganization>;
	OrganizationDiscount: UqMap;
	CustomerDiscount: UqMap;
	$Piecewise: UqID<any>;
	$PiecewiseDetail: UqID<any>;
}
