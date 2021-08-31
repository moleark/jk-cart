//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqMap, UqID } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/promotion ========
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

export interface TuidSalesRegion {
	id?: number;
	name: string;
	currency: number;
	no: string;
}

export interface TuidLanguage {
	id?: number;
	no: string;
	description: string;
}

export interface TuidCurrency {
	id?: number;
	name: string;
	suffix: string;
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

export interface TuidPromotion {
	id?: number;
	name: string;
	type: number;
	status: number;
	startDate: any;
	endDate: any;
	createTime: any;
	no: string;
}

export interface TuidPromotionType {
	id?: number;
	no: string;
	description: string;
}

export interface TuidPromotionStatus {
	id?: number;
	no: string;
	description: string;
}

export interface TuidChemical {
	id?: number;
	CAS: string;
}

export interface TuidProductCategory {
	id?: number;
	no: number;
	parent: number;
	isLeaf: number;
	orderWithinParent: number;
}

export interface ParamGetPromotionPack {
	product: number;
	pack: number;
	salesRegion: number;
	language: number;
}
export interface ReturnGetPromotionPackRet {
	id: number;
	salesRegion: number;
	description: string;
	url: string;
	product: number;
	pack: number;
	discount: number;
}
export interface ResultGetPromotionPack {
	ret: ReturnGetPromotionPackRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamSearchPromotion {
	keyWord: string;
	promotion: number;
	salesRegion: number;
}
export interface ReturnSearchPromotion$page {
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
}
export interface ResultSearchPromotion {
	$page: ReturnSearchPromotion$page[];
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
	SalesRegion: UqTuid<TuidSalesRegion>;
	Language: UqTuid<TuidLanguage>;
	Currency: UqTuid<TuidCurrency>;
	ProductX: UqTuid<TuidProductX>;
	Brand: UqTuid<TuidBrand>;
	Promotion: UqTuid<TuidPromotion>;
	PromotionType: UqTuid<TuidPromotionType>;
	PromotionStatus: UqTuid<TuidPromotionStatus>;
	Chemical: UqTuid<TuidChemical>;
	ProductCategory: UqTuid<TuidProductCategory>;
	GetPromotionPack: UqQuery<ParamGetPromotionPack, ResultGetPromotionPack>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SearchPromotion: UqQuery<ParamSearchPromotion, ResultSearchPromotion>;
	PromotionSalesRegion: UqMap;
	PromotionLanguage: UqMap;
	PromotionPackDiscount: UqMap;
	$Piecewise: UqID<any>;
	$PiecewiseDetail: UqID<any>;
}
