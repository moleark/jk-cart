import * as _ from 'lodash';
import { observable } from 'mobx';
import { Query, tv, BoxId, PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { LoaderProductChemicalWithPrices } from './itemLoader';
import { VProductDelivery } from './VProductDelivery';
import { VCartProuductView, VProductWithPrice, VProuductView, VProductPrice } from './VProductView';
import { VChemicalInfoInCart } from './VChemicalInfo';

class PageProducts extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize, false);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.seq;
    }
}

/**
 *
 */
export class CProduct extends CUqBase {
    pageProducts: PageProducts;

    @observable futureDeliveryTimeDescriptionContainer: { [cacheId: string]: string } = {};
    @observable chemicalInfoContainer: { [productId: number]: any } = {};

    protected async internalStart(param: any) {
        this.searchByKey(param);
    }

    searchByKey(key: string) {
        let { currentSalesRegion } = this.cApp;
        this.pageProducts = new PageProducts(this.uqs.product.SearchProduct);
        this.pageProducts.first({ keyWord: key, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, key);
    }

    async searchByCategory(category: any) {
        let { currentSalesRegion } = this.cApp;
        this.pageProducts = new PageProducts(this.uqs.product.SearchProductByCategory);
        let { productCategoryId, name } = category;
        this.pageProducts.first({ productCategory: productCategoryId, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, name);
    }

    /**
     *
     */
    showProductDetail = async (productId: BoxId | any) => {

        if (productId) {
            let discount = 0, product = productId;
            /*
            product = await this.uqs.product.ProductX.load(productId);
            let { currentUser } = this.cApp;
            if (currentUser.hasCustomer) {
                let discountSetting = await this.uqs.customerDiscount.GetDiscount.obj({ brand: product.brand.id, customer: currentUser.currentCustomer });
                discount = discountSetting && discountSetting.discount;
            }
            */
            let loader = new LoaderProductChemicalWithPrices(this.cApp);
            let productData = await loader.load(productId);
            this.openVPage(VProduct, { productData, product, discount });
        }
    }

    renderProductPrice = (product: BoxId, discount: number) => {
        return this.renderView(VProductPrice, { product: product, discount: discount });
    }

    renderProductWithPrice = (product: BoxId) => {
        return this.renderView(VProductWithPrice, product);
    }

    getProductPrice = async (product: BoxId, salesRegionId: number, discount: number) => {
        let { id: productId } = product;
        let { currentSalesRegion, cart, currentLanguage, uqs } = this.cApp;

        let prices = await uqs.product.PriceX.table({ product: product, salesRegion: salesRegionId });
        let priceSet = prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).sort((a, b) => a.retail - b.retail).map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            if (discount !== 0)
                ret.vipPrice = Math.round(element.retail * (1 - discount));
            ret.currency = currentSalesRegion.currency;
            ret.quantity = cart.getQuantity(productId, element.pack.id)
            return ret;
        });
        let promises: PromiseLike<any>[] = [];
        priceSet.forEach(v => {
            promises.push(uqs.promotion.GetPromotionPack.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
        })
        let results = await Promise.all(promises);

        for (let i = 0; i < priceSet.length; i++) {
            let promotion = results[i];
            let discount = promotion && promotion.discount;
            if (discount)
                priceSet[i].promotionPrice = Math.round((1 - discount) * priceSet[i].retail);
        }
        return priceSet;
    }

    renderDeliveryTime = (pack: BoxId) => {
        return this.renderView(VProductDelivery, pack);
    }

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

    renderChemicalInfoInCart = (product: BoxId) => {
        return this.renderView(VChemicalInfoInCart, product);
    }

    getChemicalInfo = async (productId: number) => {
        if (this.chemicalInfoContainer[productId] === undefined) {
            this.chemicalInfoContainer[productId] = await this.uqs.product.ProductChemical.obj({ product: productId });
        }
    }

    /**
     *
     */
    renderProduct = (product: any) => {
        return this.renderView(VProuductView, product);
    }

    getProductAndDiscount = async (productId: BoxId) => {
        let product = await this.uqs.product.ProductX.load(productId);
        let discount = 0;
        let { currentUser } = this.cApp;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.uqs.customerDiscount.GetDiscount.obj({ brand: product.brand.id, customer: currentUser.currentCustomer });
            discount = discountSetting && discountSetting.discount;
        }
        return { product: product, discount: discount };
    }

    renderCartProduct = (product: BoxId) => {
        return this.renderView(VCartProuductView, product);
    }
}