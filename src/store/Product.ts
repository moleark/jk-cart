import { GLOABLE } from 'global';
import { observable, makeObservable } from 'mobx';
import moment from 'moment';
import { BoxId } from 'tonva-react';
import { MainBrand, Chemical } from './model';
import { UQs } from 'uq-app';
import { Store } from './store';

export interface InventoryAllocation {
	warehouse: BoxId;
	quantity: number;
	deliveryTimeDescription: string;
}

export interface PackRow {
	pack: BoxId;
	quantity: number;
}

export interface ProductPackRow extends PackRow {
	retail: number;
	vipPrice?: number;
	promotionPrice?: number;
	currency: BoxId;
	inventoryAllocation: InventoryAllocation[];
}

export interface ProductProps {
	id: BoxId; 				// {id: 525, tuid: TuidInner, ui: ƒ, isUndefined: false}
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	brand: BoxId;
	CAS: string; 				// '50525-27-4'
	chemical: BoxId; 			// ReactBoxId {id: 2030, tuid: TuidInner, ui: undefined, isUndefined: false}
	molecularWeight: string; 	//'748.63'
	molecularFomula: string;
	no: string; //				// 'A01102033'
	purity: string; 			// '98%'
	mdlnumber?: string;
	// seq: number;
}

export class Product {
	private uqs: UQs;
	private store: Store;

	id: number;
	@observable.ref props: ProductProps;

	@observable.ref brand: MainBrand;	/* 品牌 */
	@observable.ref chemical: Chemical;	/* 化学属性 */
	@observable favorite: boolean;		/* 是否收藏 */
	@observable warnings: any[] = [];	/* 警示：危化品、夏东季禁运等 */
	@observable extention: any;			/* 基本信息、安全信息 */
	@observable standardSample: any;	/* 标样信息 */
	@observable productCrumbs: any[] = [];	/* 产品目录 */
	@observable descriptionPost: any;	/* 产品描述 */
	@observable.shallow packs: ProductPackRow[];	/* 销售包装 */
	@observable prices: any[];				// 包含价格和折扣信息
	@observable futureDeliveryTimeDescription: string;
	@observable productDocs: any = { msds: false, spec: false, coa: false, um: false };
	// @observable MSDSFiles: any;
	// @observable specFiles: any;
	// @observable data: any;
	@observable discount: any;

	constructor(store: Store, id: number | BoxId) {
		this.uqs = store.uqs;
		this.store = store;
		this.id = typeof id === 'object' ? id.id : id;
	}

	getInventoryAllocation(packId: number): InventoryAllocation[] {
		// return undefined;
		if (this.packs === undefined) return undefined;
		let pack = this.packs.find(v => v.pack.id === packId);
		if (!pack) return undefined;
		return pack.inventoryAllocation;
	}

	async loadDetail() {
		this.discount = 0;
		await this.loadBase();
		await this.loadBrand();
		let promises: PromiseLike<any>[] = [
			this.loadChemical(),
			this.loadFavorite(),
			this.loadPrices(),
			this.loadMSDSFile(),
			this.loadSpecFile(),
			this.loadCOAFile(),
			this.loadUserManualFile(),
			this.loadFDTimeDescription(),
			this.getProductExtention(),
			this.loadDescriptionPost(),
			this.loadProductCrumbs(),
			this.loadStandardSample()
		];
		await Promise.all(promises);
		await this.loadProductWarnings();
	}

	async loadListItem() {
		await this.loadBase();
		await this.loadBrand();
		let promises: PromiseLike<any>[] = [
			this.loadChemical(),
			this.loadFavorite(),
			this.loadPrices(),
			this.loadFDTimeDescription()
		];
		await Promise.all(promises);
	}

	async loadBase() {
		if (this.props) return;
		let { currentSalesRegion } = this.store;
		let ret = await this.uqs.product.GetAvailableProductById.obj({ product: this.id, salesRegion: currentSalesRegion });
		// let ret = await this.uqs.product.ProductX.load(this.id);
		this.props = ret;
	}

	private async loadBrand() {
		if (this.brand) return;
		let ret = await this.uqs.product.Brand.load(this.props?.brand?.id);
		this.brand = ret;
	}

	private async loadChemical() {
		if (this.chemical) return;
		let ret = await this.uqs.product.ProductChemical.obj({ product: this.id });
		this.chemical = ret;
	}

	async loadFavorite() {
		if (this.favorite !== undefined) return;
		let ret = await this.uqs.webuser.myFavorites.obj({ webUser: this.store.currentUser, product: this.id });
		this.favorite = (ret !== undefined);
	}

	/**
	 * 获取产品MSDS文件(是否存在)
	 */
	private async loadMSDSFile() {
		let productMSDSFiles = await this.uqs.product.ProductMSDSFile.table({ product: this.id });
		this.productDocs.msds = productMSDSFiles.length ? true : false;
	}

	/**
	 * 获取产品Spec文件(是否存在)
	 */
	private async loadSpecFile() {
		let specFiles = await this.uqs.product.ProductSpecFile.table({ product: this.id });
		this.productDocs.spec = specFiles.length ? true : false;
	}

	/**
	 * 获取产品COA(是否存在)
	 */
	private async loadCOAFile() {
		let coaFile = await this.uqs.product.getProductLotNumber.table({ product: this.id });
		this.productDocs.coa = coaFile.length ? true : false;
	}

	/**
	 * 获取用户手册(是否存在)
	 */
	private async loadUserManualFile() {
		let userManualFile = await this.uqs.product.ProductUserManualFile.table({ product: this.id });
		this.productDocs.um = userManualFile.length ? true : false;
	}

	private async loadPrices() {
		let { customerDiscount, product, promotion, warehouse } = this.uqs;
		let discount = 0;
		let { currentUser, currentSalesRegion, cart, currentLanguage } = this.store;
		//线上客户是否是线下客户 协议折扣  discount
		if (currentUser) {
			if (currentUser.hasCustomer) {
				let { Discounts } = currentUser?.currentCustomer;
				let discountSetting = Discounts.find((el: any) => el.brand?.id === this.brand?.id);
				if (discountSetting && discountSetting.discount)
					discount = discountSetting.discount;
			};
			/* if (currentUser.hasCustomer) {
				let discountSetting = await customerDiscount.GetDiscount.obj({ brand: this.brand?.id, customer: currentUser?.currentCustomer });
				if (discountSetting && discountSetting.discount)
					discount = discountSetting.discount;
				else {
					if (currentUser.currentCustomer.Organization) {
						discountSetting = await customerDiscount.GetDiscountByOrganization.obj({ brand: this.brand?.id, organization: currentUser.currentCustomer.Organization });
						if (discountSetting && discountSetting.discount) discount = discountSetting.discount;
					}
				}
			} */

			// 协议客户与vip客户不同存
			if (currentUser.webUserVIPCard !== undefined) {
				let brandDiscounts = currentUser.VIPDiscount;
				let brandDiscount = brandDiscounts.find((e: any) => e.brand.id === this.brand?.id);
				// 协议与vip折扣比较 取其大值  (两者不可同存)
				if (brandDiscount && brandDiscount.discount > discount)
					discount = brandDiscount && brandDiscount.discount;
			}
		}

		// let { id: currentSalesRegionId } = currentSalesRegion;
		let prices = await this.getProductPacks();
		this.prices = prices.sort((a, b) => a.retail - b.retail).map(element => {
			let ret: any = {};
			ret.pack = element.pack;
			ret.retail = element.retail;
			if (discount !== 0)
				ret.vipPrice = Math.round(element.retail * (1 - discount));
			ret.currency = currentSalesRegion.currency;
			if (cart) {
				ret.quantity = cart.getQuantity(this.id, element.pack.id)
			}
			return ret;
		});

		let promises: PromiseLike<any>[] = [];
		let promises1: PromiseLike<any>[] = [];
		this.prices.forEach(v => {
			promises.push(promotion.GetPromotionPack.obj({ product: this.id, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
			promises1.push(warehouse.GetInventoryAllocation.table({ product: this.id, pack: v.pack, salesRegion: currentSalesRegion }));
		});
		let results = await Promise.all(promises);
		let results2 = await Promise.all(promises1);

		let newPacks = [];
		for (let i = 0; i < this.prices.length; i++) {
			let inventoryAllocation = results2.find((v: any[]) => {
				let res = v.filter((j: any) => j.pack.id === this.prices[i].pack.id);
				return res.length;
			});
			newPacks.push({ ...this.prices[i], inventoryAllocation: inventoryAllocation })

			let price = this.prices[i];
			let promotion = results[i];
			let discount = promotion && promotion.discount;
			if (discount)
				price.promotionPrice = Math.round((1 - discount) * price.retail);
		}
		this.packs = newPacks;
	}

	async loadPacks(param: any) {
		let { currentSalesRegion } = this.store;
		let { pack, quantity, retail, currency } = param;
		let inventoryAllocation = await this.uqs.warehouse.GetInventoryAllocation.table({ product: this.id, pack: pack, salesRegion: currentSalesRegion });
		this.packs = [{ pack, quantity, retail, currency, inventoryAllocation }];
	}

	private async addProductFavorites(pack?: any) {
		let { currentUser } = this.store;
		let createDate = moment().format('YYYY-MM-DD HH:mm:ss');
		await this.uqs.webuser.myFavorites.add({ webUser: currentUser, product: this.id, arr1: [{ pack: 0, date: createDate }] });
		this.favorite = true;
	}

	private async delProductFavorites(pack?: any) {
		let { currentUser } = this.store;
		await this.uqs.webuser.myFavorites.del({ webUser: currentUser, product: this.id, arr1: [{ pack: 0 }] });
		this.favorite = false;
	}

	getProductPacks = async () => {
		let { product } = this.uqs;
		let { currentSalesRegion } = this.store;
		let { id: currentSalesRegionId } = currentSalesRegion;
		// let pricex2 = await product.PriceX.table({ product: this.id, salesRegion: currentSalesRegionId });
		let pricex = await product.GetProductPrices.table({ product: this.id, salesRegion: currentSalesRegionId });
		return pricex.filter(e => e.discountinued === 0 && e.expireDate > Date.now() && e.salesLevel?.id === 1);
	}

	favoriteOrCancel = async (pack?: any) => {
		await this.loadFavorite();
		if (this.favorite === true) {
			await this.delProductFavorites();
		}
		else {
			await this.addProductFavorites();
		}
	}

	getProductAndDiscount = async (productId: BoxId) => {
		let product = await this.uqs.product.ProductX.load(productId);
		let discount = 0;
		let { currentUser } = this.store;
		if (currentUser.hasCustomer) {
			let discountSetting = await this.uqs.customerDiscount.GetDiscount.obj({ brand: product.brand.id, customer: currentUser.currentCustomer });
			discount = discountSetting && discountSetting.discount;
		}
		return { product: product, discount: discount };
	}

	getProductExtention = async () => {
		if (this.extention) return;
		let extention = await this.uqs.product.ProductExtention.obj({ product: this.id });
		this.extention = extention?.content;
	}

	loadDescriptionPost = async () => {
		if (this.descriptionPost) return;
		let result = await window.fetch(GLOABLE.CONTENTSITE + '/partial/productapplication/' + this.id);
		if (result.ok) {
			let content = await result.text();
			this.descriptionPost = content;
		};
	}

	loadStandardSample = async () => {
		let standardSample: any = await this.uqs.product.Productstandardsample.obj({ product: this.id });
		this.standardSample = standardSample ? JSON.parse(standardSample.content.replace(/\t\n\r*/g, "")) : undefined;
	}

	loadProductCrumbs = async () => {
		let { ProductProductCategory, ProductCategory } = this.uqs.product;
		let arr: any[] = [];
		let getProductCategorys: any[] = await ProductProductCategory.table({ product: this.id });
		if (getProductCategorys.length) {
			let promise: PromiseLike<any>[] = [];
			for (let key of getProductCategorys) {
				promise.push(ProductCategory.load(key?.category));
			};
			let result: any[] = await Promise.all(promise);
			if (result.length) {
				let value: any;
				for (let key of result) {
					let keyArr: any[] = [];
					keyArr.unshift(key.productcategorylanguage.find((el: any) => el.language?.id == GLOABLE.CHINESE.id));
					value = key?.parent;
					while (value) {
						let productCategoryByParent: any = await ProductCategory.load(value);
						if (productCategoryByParent)
							keyArr.unshift(productCategoryByParent?.productcategorylanguage?.find((el: any) => el.language?.id == GLOABLE.CHINESE.id));
						value = productCategoryByParent?.parent;
					};
					arr.push(keyArr);
				};
			};
		};
		this.productCrumbs = arr;
	}

	loadProductWarnings = async () => {
		let warnings: PromiseLike<any>[] = [
			this.getProductWarningSigns(),
			this.getProductEmbargo(),
		];
		let res = await Promise.all(warnings);
		this.warnings = res.filter((el: any) => el);
	};

	/* 产品警示标示 */
	getProductWarningSigns = async () => {
		let JNKRestrictByChemical: any[] = await this.uqs.chemical.ChemicalJNKRestrict.table({ chemical: this.chemical?.chemical });
		if (!JNKRestrictByChemical.length) return;
		let promise: PromiseLike<any>[] = [];
		for (let key of JNKRestrictByChemical) {
			promise.push(this.uqs.chemicalSecurity.JNKRestrict.load(key?.jnkRestrict?.id));
		};
		let result = await Promise.all(promise);
		let warningSign: string = "";
		for (let key of result) {
			if (key) {
				let { no } = key;
				if (no.indexOf('WX') > -1) warningSign = '危化品';
			};
		};
		/* let { jnkRestrict } = JNKRestrictByChemical;
		let jnkRestrictObj = await this.uqs.chemicalSecurity.JNKRestrict.load(jnkRestrict?.id);
		let warningSign: string = "";
		if (jnkRestrictObj) {
			let { no } = jnkRestrictObj;
			if (no.indexOf('WX') > -1) warningSign = '危化品';
		}; */
		return warningSign;
	}

	/* 产品禁运信息 */
	getProductEmbargo = async () => {
		let { currentSalesRegion } = this.store;
		let getProductEmbargo = await this.uqs.product.ProductEmbargo.obj({ product: this.id, salesRegion: currentSalesRegion });
		if (!getProductEmbargo || getProductEmbargo.beginDate > Date.now() || getProductEmbargo.endDate < Date.now()) return;
		let { type, packDescription, endDate } = getProductEmbargo;
		let dateTime = moment(endDate).format("MM月DD日");
		return `${type}产品,${dateTime}后发运(限${packDescription || "1L"}以上包装)`;
	};

	/**
	 * 获取PDF文件流
	 */
	getPDFFileUrl = async (captcha: string) => {
		debugger;
		/*
		let lang = this.currentLanguage ? this.currentLanguage.id : undefined;
		let productId = this.currentProduct ? this.currentProduct.id : undefined;
		// let res = await window.fetch(GLOABLE.CONTENTSITE + `/partial/productpdffile/${captcha}/${32}/${7084}`);
		let res = await window.fetch(GLOABLE.CONTENTSITE + `/partial/productpdffile/${captcha}/${lang}/${productId}`);
		if (res.status === 200) {
			let content = await res.arrayBuffer();
			return content;
		} else {
			return {
				status: res.status,
				msg: res.status !== 412 ? res.statusText : '验证码错误!'
			}
		}
		*/
	}

	/**
	 * 获取验证码
	 */
	getVerifyCode = async () => {
		debugger;
		/*
		let timer = (new Date()).getTime()
		this.verifyCode = GLOABLE.CONTENTSITE + `/partial/captcha/?timer=${timer}`;//'http://dummyimage.com/200x100';
		*/
	}

	private async loadFDTimeDescription() {
		let { currentSalesRegion } = this.store;
		let futureDeliveryTime = await this.uqs.product.ProductDeliveryTime.table({ product: this.id, salesRegion: currentSalesRegion });
		if (!futureDeliveryTime.length) {
			futureDeliveryTime = await this.uqs.product.GetFutureDeliveryTime.table({ product: this.id, salesRegion: currentSalesRegion });
		};
		if (futureDeliveryTime.length > 0) {
			let { minValue, maxValue, unit, deliveryTimeDescription } = futureDeliveryTime[0];
			this.futureDeliveryTimeDescription = minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
		} else {
			this.futureDeliveryTimeDescription = '';
		}
	}

	/*
	getChemicalInfo(product: number|BoxId):any {
		let p = this.getCacheProduct(product);
		let {chemical} = p;
		if (chemical) return chemical;
		if (chemical === null) return null;
		if (chemical as any === '') return null;
		p.chemical = '';
		this.uqs.product.ProductChemical.obj({ product }).then(value => {
			p.chemical = value;
		});
		return;
	}
	*/

	/*
	getInventoryAllocation(product: number|BoxId, pack: number|BoxId): any[] {
		let p = this.getCacheProduct(product);
		let {inventoryAllocation} = p;
		if (inventoryAllocation) return inventoryAllocation;
		if (inventoryAllocation === null) return null;
		if (inventoryAllocation as any === '') return null;
		p.inventoryAllocation = '' as any;
		this.uqs.warehouse.GetInventoryAllocation.table({ product, pack, salesRegion: this.cApp.currentSalesRegion }).then(results => {
			p.inventoryAllocation = results;
		});
	}

	getFutureDeliveryTimeDescription(product: number|BoxId) {
		let p = this.getCacheProduct(product);
		let {futureDeliveryTimeDescription} = p;
		if (futureDeliveryTimeDescription) return futureDeliveryTimeDescription;
		if (futureDeliveryTimeDescription === null) return null;
		if (futureDeliveryTimeDescription === '') return null;
		p.futureDeliveryTimeDescription = '';
		this.uqs.product.GetFutureDeliveryTime.table({ product, salesRegion: this.cApp.currentSalesRegion.id}).then(futureDeliveryTime => {
			let value: string;
			if (futureDeliveryTime.length > 0) {
				let { minValue, maxValue, unit, deliveryTimeDescription } = futureDeliveryTime[0];
				value = minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
			} else {
				value = null;
			}
			p.futureDeliveryTimeDescription = value;
		});
	}

	getPrices(product: BoxId, discount:number): any[] {
		let p = this.getCacheProduct(product);
		let {prices} = p;
		if (prices) return prices;
		if (prices === null) return null;
		if (prices as any === '') return null;
		p.prices = '';
		let { id: productId } = product;
		let { currentSalesRegion, cart, currentLanguage, uqs } = this.cApp;

		uqs.product.PriceX.table({ product: product, salesRegion: currentSalesRegion }).then(pricesResult => {
			let priceSets = pricesResult.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).sort((a, b) => a.retail - b.retail).map(element => {
				let ret: any = {};
				ret.pack = element.pack;
				ret.retail = element.retail;
				if (discount !== 0)
					ret.vipPrice = Math.round(element.retail * (1 - discount));
				ret.currency = currentSalesRegion.currency;
				ret.quantity = cart.getQuantity(productId, element.pack.id)
				return ret;
			});
			let promises: PromiseLike<any>[] = priceSets.map(v => {
				return uqs.promotion.GetPromotionPack.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage });
			})
			Promise.all(promises).then(results => {
				for (let i = 0; i < priceSets.length; i++) {
					let priceSet = priceSets[i];
					let promotion = results[i];
					let discount = promotion && promotion.discount;
					if (discount)
						priceSet.promotionPrice = Math.round((1 - discount) * priceSet.retail);
				}
				p.prices = priceSets;
			});
		});
	}
	*/

	/*
	getInventoryAllocation = async (productId: number, packId: number, salesRegionId: number) => {
		return await this.uqs.warehouse.GetInventoryAllocation.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion });
	}

	getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
		let cacheId = productId + '_' + salesRegionId;
		if (this.futureDeliveryTimeDescriptionContainer[cacheId] === undefined) {
			let futureDeliveryTime = await this.uqs.product.GetFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
			if (futureDeliveryTime.length > 0) {
				let { minValue, maxValue, unit, deliveryTimeDescription } = futureDeliveryTime[0];
				this.futureDeliveryTimeDescriptionContainer[cacheId] = minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
			} else {
				this.futureDeliveryTimeDescriptionContainer[cacheId] = null;
			}
		}
		return this.futureDeliveryTimeDescriptionContainer[cacheId];
	}
	*/

}
/*
export class ProductInCApp extends Product {
	//private cApp: CApp;

	constructor(cApp: CApp, id: number | BoxId)	{
		super(cApp.uqs, id);
		//this.cApp = cApp;
	}
}

export class ProductInStore extends Product {

}
*/
