//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqMap, UqID } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/common ========
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

export interface TuidCountry {
	id?: number;
	code: string;
	englishName: string;
	chineseName: string;
	no: string;
	isValid: number;
	order: number;
}

export interface TuidProvince {
	id?: number;
	country: number;
	englishName: string;
	chineseName: string;
	no: string;
	isValid: number;
	order: number;
}

export interface TuidCity {
	id?: number;
	province: number;
	englishName: string;
	chineseName: string;
	no: string;
	isValid: number;
	order: number;
}

export interface TuidCounty {
	id?: number;
	city: number;
	englishName: string;
	chineseName: string;
	no: string;
	isValid: number;
	order: number;
}

export interface TuidAddress {
	id?: number;
	country: number;
	province: number;
	city: number;
	county: number;
	zipCode: string;
	description: string;
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

export interface TuidPackType {
	id?: number;
	name: string;
	description: string;
	no: number;
}

export interface TuidPackTypeStandard {
	id?: number;
	name: string;
	no: number;
	description: string;
	class: string;
}

export interface TuidLanguage {
	id?: number;
	no: string;
	description: string;
}

export interface TuidInvoiceType {
	id?: number;
	description: string;
}

export interface ParamGetCountryProvinces {
	country: number;
}
export interface ReturnGetCountryProvincesRet {
	province: number;
	$id: number;
}
export interface ResultGetCountryProvinces {
	ret: ReturnGetCountryProvincesRet[];
}

export interface ParamGetProvinceCities {
	province: number;
}
export interface ReturnGetProvinceCitiesRet {
	city: number;
	$id: number;
}
export interface ResultGetProvinceCities {
	ret: ReturnGetProvinceCitiesRet[];
}

export interface ParamGetCityCounties {
	city: number;
}
export interface ReturnGetCityCountiesRet {
	county: number;
	$id: number;
}
export interface ResultGetCityCounties {
	ret: ReturnGetCityCountiesRet[];
}

export interface ParamGetProvinceByName {
	country: number;
	provinceName: string;
}
export interface ReturnGetProvinceByNameRet {
	province: number;
	$id: number;
}
export interface ResultGetProvinceByName {
	ret: ReturnGetProvinceByNameRet[];
}

export interface ParamGetCountyByName {
	city: number;
	countyName: string;
}
export interface ReturnGetCountyByNameRet {
	county: number;
	$id: number;
}
export interface ResultGetCountyByName {
	ret: ReturnGetCountyByNameRet[];
}

export interface ParamGetCityByName {
	province: number;
	cityName: string;
}
export interface ReturnGetCityByNameRet {
	city: number;
	$id: number;
}
export interface ResultGetCityByName {
	ret: ReturnGetCityByNameRet[];
}

export interface ParamSearchPackType {
}
export interface ReturnSearchPackTypeRet {
	id: number;
	name: string;
	$id: number;
}
export interface ResultSearchPackType {
	ret: ReturnSearchPackTypeRet[];
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

export interface $PiecewiseDetail {
	id?: number;
	parent: number;
	row?: number;
	sec: number;
	value: number;
}

export interface $Piecewise {
	id?: number;
	name: string;
	ratio: number;
	offset: number;
	asc: number;
}

export interface ParamActs {
	$PiecewiseDetail?: $PiecewiseDetail[];
	$Piecewise?: $Piecewise[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Country: UqTuid<TuidCountry>;
	Province: UqTuid<TuidProvince>;
	City: UqTuid<TuidCity>;
	County: UqTuid<TuidCounty>;
	Address: UqTuid<TuidAddress>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	Currency: UqTuid<TuidCurrency>;
	PackType: UqTuid<TuidPackType>;
	PackTypeStandard: UqTuid<TuidPackTypeStandard>;
	Language: UqTuid<TuidLanguage>;
	InvoiceType: UqTuid<TuidInvoiceType>;
	GetCountryProvinces: UqQuery<ParamGetCountryProvinces, ResultGetCountryProvinces>;
	GetProvinceCities: UqQuery<ParamGetProvinceCities, ResultGetProvinceCities>;
	GetCityCounties: UqQuery<ParamGetCityCounties, ResultGetCityCounties>;
	GetProvinceByName: UqQuery<ParamGetProvinceByName, ResultGetProvinceByName>;
	GetCountyByName: UqQuery<ParamGetCountyByName, ResultGetCountyByName>;
	GetCityByName: UqQuery<ParamGetCityByName, ResultGetCityByName>;
	SearchPackType: UqQuery<ParamSearchPackType, ResultSearchPackType>;
	$poked: UqQuery<Param$poked, Result$poked>;
	PackTypeMapToStandard: UqMap;
	CurrencyExchangeRate: UqMap;
	$PiecewiseDetail: UqID<any>;
	$Piecewise: UqID<any>;
}
