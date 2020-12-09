import { observable } from 'mobx';
import moment from 'moment';
import { CApp } from 'tapp';
import { BoxId } from 'tonva';
import { MainBrand, Chemical } from './model';

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
	// seq: number;
}

export class Product {
	private cApp: CApp;

	id: number;
	@observable.ref props: ProductProps;

	@observable.ref brand: MainBrand;
	@observable.ref chemical: Chemical;
	@observable favorite: boolean;
	@observable.shallow packs: ProductPackRow[];
	@observable prices: any[];				// 包含价格和折扣信息
	@observable futureDeliveryTimeDescription: string;
	@observable MSDSFiles: any;
	@observable specFiles: any;
	@observable data: any;
	@observable discount: any;

	constructor(cApp: CApp, id: number | BoxId) {
		this.cApp = cApp;
		this.id = typeof id === 'object' ? id.id : id;
	}

	getInventoryAllocation(packId: number): InventoryAllocation[] {
		return undefined;
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
			this.loadFDTimeDescription()
		];
		await Promise.all(promises);
	}

	async loadListItem() {
		await this.loadBase();
		await this.loadBrand();
		let promises: PromiseLike<any>[] = [
			this.loadChemical(),
			this.loadFavorite(),
			this.loadPrices(),
		];
		await Promise.all(promises);
	}

	private async loadBase() {
		if (this.props) return;
		let ret = await this.cApp.uqs.product.ProductX.load(this.id);
		this.props = ret;
	}

	private async loadBrand() {
		if (this.brand) return;
		let ret = await this.cApp.uqs.product.Brand.load(this.props.brand);
		this.brand = ret;
	}

	private async loadChemical() {
		if (this.chemical) return;
		let ret = await this.cApp.uqs.product.ProductChemical.obj({ product: this.id });
		this.chemical = ret;
	}

	async loadFavorite() {
		if (this.favorite !== undefined) return;
		let ret = await this.cApp.uqs.webuser.myFavorites.obj({ webUser: this.cApp.currentUser, product: this.id });
		this.favorite = (ret !== undefined);
	}

	/**
	 * 获取产品MSDS文件
	 */
	private async loadMSDSFile() {
		if (this.MSDSFiles) return;
		let productMSDSFiles = await this.cApp.uqs.product.ProductMSDSFile.table({ product: 11 });
		this.MSDSFiles = productMSDSFiles.sort((a: any, b: any) => b.language.id - a.language.id);
	}

	/**
	 * 获取产品Spec文件
	 */
	private async loadSpecFile() {
		if (this.specFiles) return;
		this.specFiles = await this.cApp.uqs.product.ProductSpecFile.table({ product: 11 });
	}

	private async loadPrices() {
		let { customerDiscount, product, promotion, warehouse } = this.cApp.uqs;
		let discount = 0;
		let { currentUser, currentSalesRegion, cart, currentLanguage } = this.cApp;
		//线上客户是否是线下客户 协议折扣  discount
		if (currentUser.hasCustomer) {
			let discountSetting = await customerDiscount.GetDiscount.obj({ brand: this.brand.id, customer: currentUser.currentCustomer });
			if (discountSetting && discountSetting.discount)
				discount = discountSetting.discount;
		}

		// 协议客户与vip客户不同存
		if (currentUser.webUserVIPCard !== undefined) {
			let brandDiscounts = currentUser.VIPDiscount;
			let brandDiscount = brandDiscounts.ret.find((e: any) => e.brand.id === this.brand.id);
			// 协议与vip折扣比较 取其大值  (两者不可同存)
			if (brandDiscount && brandDiscount.discount > discount)
				discount = brandDiscount && brandDiscount.discount;
		}

		let { id: currentSalesRegionId } = currentSalesRegion;
		let prices = await product.PriceX.table({ product: this.id, salesRegion: currentSalesRegionId });

		this.prices = prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).sort((a, b) => a.retail - b.retail).map(element => {
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
		// let promises2: PromiseLike<any>[] = [];/* 收藏夹 暂时不做 */
		this.prices.forEach(v => {
			promises.push(promotion.GetPromotionPack.obj({ product: this.id, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
			promises1.push(warehouse.GetInventoryAllocation.table({ product: this.id, pack: v.pack, salesRegion: currentSalesRegion }));
			// promises2.push(this.cApp.uqs.webuser.myFavorites.obj({ webUser: this.cApp.currentUser, product: this.id, pack: v.pack.id }));
		});
		let results = await Promise.all(promises);
		let results2 = await Promise.all(promises1);
		// let resultsFavorite = await Promise.all(promises2);

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
		let { currentSalesRegion, uqs } = this.cApp;
		let { pack, quantity, retail, currency } = param;
		let inventoryAllocation = await uqs.warehouse.GetInventoryAllocation.table({ product: this.id, pack: pack, salesRegion: currentSalesRegion });
		this.packs = [{ pack, quantity, retail, currency, inventoryAllocation }];
	}

	private async addProductFavorites(pack?: any) {
		let { currentUser } = this.cApp;
		let createDate = moment().format('YYYY-MM-DD HH:mm:ss');
		await this.cApp.uqs.webuser.myFavorites.add({ webUser: currentUser, product: this.id, arr1: [{ pack: 0, date: createDate }] });
		this.favorite = true;
	}

	private async delProductFavorites(pack?: any) {
		let { currentUser } = this.cApp;
		await this.cApp.uqs.webuser.myFavorites.del({ webUser: currentUser, product: this.id, arr1: [{ pack: 0 }] });
		this.favorite = false;
	}

	favoriteOrCancel = async (pack?: any) => {
		await this.cApp.assureLogin();
		await this.loadFavorite();
		if (this.favorite === true) {
			await this.delProductFavorites();
		}
		else {
			await this.addProductFavorites();
		}
	}

	getProductAndDiscount = async (productId: BoxId) => {
		let product = await this.cApp.uqs.product.ProductX.load(productId);
		let discount = 0;
		let { currentUser } = this.cApp;
		if (currentUser.hasCustomer) {
			let discountSetting = await this.cApp.uqs.customerDiscount.GetDiscount.obj({ brand: product.brand.id, customer: currentUser.currentCustomer });
			discount = discountSetting && discountSetting.discount;
		}
		return { product: product, discount: discount };
	}

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
		let { currentSalesRegion, uqs } = this.cApp;
		let futureDeliveryTime = await uqs.product.GetFutureDeliveryTime.table({ product: this.id, salesRegion: currentSalesRegion });
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
