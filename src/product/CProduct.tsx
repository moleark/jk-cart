import * as React from 'react';
import * as _ from 'lodash';
import { observable } from 'mobx';
import { Query, tv, BoxId, Map } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import classNames from 'classnames';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
//import { CCartApp } from '../CCartApp';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { LoaderProductChemicalWithPrices } from './itemLoader';
import { ProductImage } from '../tools/productImage';
import { VProductDelivery } from './VProductDelivery';
import { VCartProuductView, VProductPrice } from './VProductView';
import { VChemicalInfo } from './VChemicalInfo';

class PageProducts extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
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
    //    cApp: CApp;
    pageProducts: PageProducts;

    @observable futureDeliveryTimeDescriptionContainer: { [cacheId: string]: string } = {};
    @observable chemicalInfoContainer: { [productId: number]: any } = {};

    protected async internalStart(param: any) {
        this.searchByKey(param);
    }

    searchByKey(key: string) {
        let { currentSalesRegion } = this.cApp;
        //let searchProductQuery = cUqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(this.uqs.product.SearchProduct);
        this.pageProducts.first({ keyWord: key, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, key);
    }

    async searchByCategory(category: any) {
        let { currentSalesRegion } = this.cApp;
        //let searchProductQuery = .query("searchProductByCategory");
        this.pageProducts = new PageProducts(this.uqs.product.SearchProductByCategory);
        let { productCategoryId, name } = category;
        this.pageProducts.first({ productCategory: productCategoryId, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, name);
    }

    showProductDetail = async (product: BoxId) => {

        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let productData = await loader.load(product.id);
        this.openVPage(VProduct, { productData, product });
    }

    renderProductPrice = (product: BoxId) => {
        return this.renderView(VProductPrice, product);
    }

    getProductPrice = async (productId: number, salesRegionId: number) => {
        return await this.uqs.product.PriceX.table({ product: productId, salesRegion: salesRegionId });
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

    renderChemicalInfo = (product: BoxId) => {
        return this.renderView(VChemicalInfo, product);
    }

    getChemicalInfo = async (productId: number) => {
        if (this.chemicalInfoContainer[productId] === undefined) {
            this.chemicalInfoContainer[productId] = await this.uqs.product.ProductChemical.obj({ product: productId });
        }
    }

    renderCartProduct = (product: BoxId) => {
        return this.renderView(VCartProuductView, product);
    }
}

export function renderBrand(brand: any) {
    return productPropItem('品牌', brand.name);
}

export function productPropItem(caption: string, value: any, captionClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
    let valClass = captionClass ? classNames(captionClass) : "";
    return <>
        <div className={classNames("col-6 col-sm-2 pr-0 small", capClass)}> {caption}</div>
        <div className={classNames("col-6 col-sm-4", valClass)}>{value}</div>
    </>;
}

export function renderProduct(product: any) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
    return <div className="d-block mb-4 px-3">
        <div className="py-2">
            <div><strong>{description}</strong></div>
            <div>{descriptionC}</div>
        </div>
        <div className="row">
            <div className="col-3">
                <ProductImage chemicalId={imageUrl} className="w-100" />
            </div>
            <div className="col-9">
                <div className="row">
                    {productPropItem('CAS', CAS)}
                    {productPropItem('产品编号', origin)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
    </div>
}