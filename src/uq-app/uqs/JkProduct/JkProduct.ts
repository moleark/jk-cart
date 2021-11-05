//=== UqApp builder created on Fri Nov 05 2021 17:48:44 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqMap, UqHistory } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/product ========
//===============================

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

export interface TuidChemical {
	id?: number;
	CAS: string;
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
}

export interface TuidLanguage {
	id?: number;
	no: string;
	description: string;
}

export interface TuidBrand {
	id?: number;
	name: string;
	no: string;
}

export interface TuidStuff {
	id?: number;
	name: string;
	packType: number;
}

export interface TuidProductX {
	id?: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	no: string;
	isValid: number;
}

export interface TuidProductCategory {
	id?: number;
	no: number;
	parent: number;
	isLeaf: number;
	orderWithinParent: number;
}

export interface TuidLot {
	id?: number;
	lotnumber: string;
	product: number;
}

export interface TuidPackSalesLevel {
	id?: number;
	name: string;
	no: string;
}

export interface ParamCountProductCategoryInclusion {
}
export interface ResultCountProductCategoryInclusion {
}

export interface ParamGetRootCategory {
	salesRegion: number;
	language: number;
}
export interface ReturnGetRootCategoryFirst {
	productCategory: number;
	name: string;
	total: number;
}
export interface ReturnGetRootCategorySecend {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ReturnGetRootCategoryThird {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ResultGetRootCategory {
	first: ReturnGetRootCategoryFirst[];
	secend: ReturnGetRootCategorySecend[];
	third: ReturnGetRootCategoryThird[];
}

export interface ParamGetChildrenCategory {
	parent: number;
	salesRegion: number;
	language: number;
}
export interface ReturnGetChildrenCategoryFirst {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ReturnGetChildrenCategorySecend {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ResultGetChildrenCategory {
	first: ReturnGetChildrenCategoryFirst[];
	secend: ReturnGetChildrenCategorySecend[];
}

export interface ParamSearchProductByCategory {
	productCategory: number;
	salesRegion: number;
	language: number;
}
export interface ReturnSearchProductByCategory$page {
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
export interface ResultSearchProductByCategory {
	$page: ReturnSearchProductByCategory$page[];
}

export interface ParamGetFutureDeliveryTime {
	product: number;
	salesRegion: number;
}
export interface ReturnGetFutureDeliveryTimeRet {
	minValue: number;
	maxValue: number;
	unit: string;
	deliveryTimeDescription: string;
}
export interface ResultGetFutureDeliveryTime {
	ret: ReturnGetFutureDeliveryTimeRet[];
}

export interface ParamSearchProduct {
	keyWord: string;
	salesRegion: number;
}
export interface ReturnSearchProduct$page {
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
export interface ResultSearchProduct {
	$page: ReturnSearchProduct$page[];
}

export interface ParamGetRootCategories {
	salesRegion: number;
	language: number;
}
export interface ReturnGetRootCategoriesRet {
	productCategory: number;
	name: string;
	total: number;
}
export interface ResultGetRootCategories {
	ret: ReturnGetRootCategoriesRet[];
}

export interface ParamGetPack {
	brandName: string;
	origin: string;
	radiox: number;
	radioy: number;
	unit: string;
}
export interface ReturnGetPackRet {
	product: number;
	pack: number;
	jkcat: string;
}
export interface ResultGetPack {
	ret: ReturnGetPackRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamSearchPointProduct {
	keyWord: string;
	salesRegion: number;
}
export interface ReturnSearchPointProduct$page {
	seq: number;
	id: number;
	product: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	radiox: number;
	radioy: number;
	unit: string;
	retail: number;
}
export interface ResultSearchPointProduct {
	$page: ReturnSearchPointProduct$page[];
}

export interface ParamGetProductByOrigin {
	origin: string;
	salesRegion: number;
}
export interface ReturnGetProductByOriginRet {
	id: number;
}
export interface ResultGetProductByOrigin {
	ret: ReturnGetProductByOriginRet[];
}

export interface ParamGetPointProductMoreBySource {
	pack: number;
	salesRegion: number;
}
export interface ReturnGetPointProductMoreBySourceRet {
	id: number;
	product: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	radiox: number;
	radioy: number;
	unit: string;
	retail: number;
}
export interface ResultGetPointProductMoreBySource {
	ret: ReturnGetPointProductMoreBySourceRet[];
}

export interface ParamGetLotByLotnumber {
	lotnumber: string;
	origin: string;
}
export interface ReturnGetLotByLotnumberRet {
	id: number;
	product: number;
}
export interface ResultGetLotByLotnumber {
	ret: ReturnGetLotByLotnumberRet[];
}

export interface ParamGetAvailableProductById {
	product: number;
	salesRegion: number;
}
export interface ReturnGetAvailableProductByIdRet {
	id: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	no: string;
	isValid: number;
}
export interface ResultGetAvailableProductById {
	ret: ReturnGetAvailableProductByIdRet[];
}

export interface ParamGetProductPackByOrigin {
	origin: string;
	salesRegion: number;
}
export interface ReturnGetProductPackByOriginRet {
	product: number;
	pack: number;
}
export interface ResultGetProductPackByOrigin {
	ret: ReturnGetProductPackByOriginRet[];
}

export interface ParamGetProductPrices {
	product: number;
	salesRegion: number;
}
export interface ReturnGetProductPricesRet {
	product: number;
	pack: number;
	salesRegion: number;
	retail: number;
	expireDate: any;
	discountinued: number;
	salesLevel: number;
}
export interface ResultGetProductPrices {
	ret: ReturnGetProductPricesRet[];
}

export interface ParamGetProductLotNumber {
	product: number;
}
export interface ReturnGetProductLotNumberRet {
	id: number;
	product: number;
	lotnumber: string;
}
export interface ResultGetProductLotNumber {
	ret: ReturnGetProductLotNumberRet[];
}

export interface ParamProductSearchHistory {
	webUser: number;
	salesRegion: number;
	keyword: string;
}
export interface ReturnProductSearchHistory$page {
	date: any;
	webUser: number;
	salesRegion: number;
	keyword: string;
}
export interface ResultProductSearchHistory {
	$page: ReturnProductSearchHistory$page[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Chemical: UqTuid<TuidChemical>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	Currency: UqTuid<TuidCurrency>;
	PackType: UqTuid<TuidPackType>;
	Language: UqTuid<TuidLanguage>;
	Brand: UqTuid<TuidBrand>;
	Stuff: UqTuid<TuidStuff>;
	ProductX: UqTuid<TuidProductX>;
	ProductCategory: UqTuid<TuidProductCategory>;
	Lot: UqTuid<TuidLot>;
	PackSalesLevel: UqTuid<TuidPackSalesLevel>;
	CountProductCategoryInclusion: UqAction<ParamCountProductCategoryInclusion, ResultCountProductCategoryInclusion>;
	GetRootCategory: UqQuery<ParamGetRootCategory, ResultGetRootCategory>;
	GetChildrenCategory: UqQuery<ParamGetChildrenCategory, ResultGetChildrenCategory>;
	SearchProductByCategory: UqQuery<ParamSearchProductByCategory, ResultSearchProductByCategory>;
	GetFutureDeliveryTime: UqQuery<ParamGetFutureDeliveryTime, ResultGetFutureDeliveryTime>;
	SearchProduct: UqQuery<ParamSearchProduct, ResultSearchProduct>;
	GetRootCategories: UqQuery<ParamGetRootCategories, ResultGetRootCategories>;
	GetPack: UqQuery<ParamGetPack, ResultGetPack>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SearchPointProduct: UqQuery<ParamSearchPointProduct, ResultSearchPointProduct>;
	GetProductByOrigin: UqQuery<ParamGetProductByOrigin, ResultGetProductByOrigin>;
	GetPointProductMoreBySource: UqQuery<ParamGetPointProductMoreBySource, ResultGetPointProductMoreBySource>;
	GetLotByLotnumber: UqQuery<ParamGetLotByLotnumber, ResultGetLotByLotnumber>;
	GetAvailableProductById: UqQuery<ParamGetAvailableProductById, ResultGetAvailableProductById>;
	GetProductPackByOrigin: UqQuery<ParamGetProductPackByOrigin, ResultGetProductPackByOrigin>;
	GetProductPrices: UqQuery<ParamGetProductPrices, ResultGetProductPrices>;
	GetProductLotNumber: UqQuery<ParamGetProductLotNumber, ResultGetProductLotNumber>;
	AgentPrice: UqMap;
	BrandSalesRegion: UqMap;
	BrandDeliveryTime: UqMap;
	ProductStuff: UqMap;
	PriceX: UqMap;
	ProductChemical: UqMap;
	ProductSalesRegion: UqMap;
	ProductLegallyProhibited: UqMap;
	ProductCache: UqMap;
	ProductProductCategory: UqMap;
	ProductCategoryInclusion: UqMap;
	ProductProductCategoryCache: UqMap;
	ProductMSDSFile: UqMap;
	ProductSpecFile: UqMap;
	ProductSalesRank: UqMap;
	ProductCategoryLeafCache: UqMap;
	COA: UqMap;
	ProductExtention: UqMap;
	ProductDeliveryTime: UqMap;
	ProductEmbargo: UqMap;
	ProductStandardSample: UqMap;
	ProductUserManualFile: UqMap;
	ProductSearchHistory: UqHistory<ParamProductSearchHistory, ResultProductSearchHistory>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.$.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
