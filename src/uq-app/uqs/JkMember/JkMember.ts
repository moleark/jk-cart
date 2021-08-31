//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqBook, UqQuery, UqMap, UqHistory } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/member ========
//===============================

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	roles: number;
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

export interface TuidMember {
	id?: number;
	recommendationCode: string;
}

export interface ParamMemberAction {
}
export interface ReturnMemberActionRet {
	code: string;
	point: number;
	$id: number;
}
export interface ResultMemberAction {
	ret: ReturnMemberActionRet[];
}

export interface ParamSetReferrer {
	code: string;
}
export interface ResultSetReferrer {
}

export interface ParamGetPoint {
	memberId: number;
}
export interface ReturnGetPointRet {
	member: number;
	point: number;
	$id: number;
}
export interface ResultGetPoint {
	ret: ReturnGetPointRet[];
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

export interface ParamPoint {
}
export interface ReturnPoint$page {
	member: number;
	point: number;
}
export interface ResultPoint {
	$page: ReturnPoint$page[];
}

export interface ParamPointYears {
	member: number;
}
export interface ReturnPointYears$page {
	years: number;
	point: number;
	pointUsed: number;
}
export interface ResultPointYears {
	$page: ReturnPointYears$page[];
}

export interface ParamPointHistory {
	member: number;
	source: string;
	point: number;
}
export interface ReturnPointHistory$page {
	date: any;
	member: number;
	source: string;
	point: number;
}
export interface ResultPointHistory {
	$page: ReturnPointHistory$page[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Member: UqTuid<TuidMember>;
	MemberAction: UqAction<ParamMemberAction, ResultMemberAction>;
	SetReferrer: UqAction<ParamSetReferrer, ResultSetReferrer>;
	Point: UqBook<ParamPoint, ResultPoint>;
	PointYears: UqBook<ParamPointYears, ResultPointYears>;
	GetPoint: UqQuery<ParamGetPoint, ResultGetPoint>;
	$poked: UqQuery<Param$poked, Result$poked>;
	MemberRecommender: UqMap;
	PointHistory: UqHistory<ParamPointHistory, ResultPointHistory>;
}
