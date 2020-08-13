import * as React from 'react';
import { View, tv, FormField, ObjectSchema, NumSchema, UiSchema, UiCustom, RowContext, BoxId, Form, ItemSchema, ArrSchema, UiArr } from 'tonva';
import { CProduct } from './CProduct';
import { ProductImage } from 'tools/productImage';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from 'tools';
import { observable } from 'mobx';
import classNames from 'classnames';
import { VProductFavorateLabel } from 'customer/VProductFavorateLabel';
import { Link } from 'react-router-dom';

export class VCartProuductView extends View<CProduct> {

    render(param: any): JSX.Element {
        return <>{tv(param, this.renderCartProduct)}</>;
    }


    private renderCartProduct = (product: any) => {
        let { id, brand, description, descriptionC, origin, imageUrl } = product;

        return <div className="row d-flex mb-3 px-2">
            <div className="col-12">
                <div className="py-2">
                    <strong>{description}</strong>
                </div>
                <div className="pb-2">
                    <strong>{descriptionC}</strong>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ProductImage chemicalId={imageUrl} className="w-4c h-4c" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {productPropItem('编号', origin)}
                            {this.controller.renderChemicalInfoInCart(product)}
                            {tv(brand, renderBrand)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };
}

/**
 *
 */
export class VProuductView extends View<CProduct> {

    @observable product: any;
    @observable discount: number;

    render(product: BoxId): JSX.Element {
        return <this.renderProduct productBox={product} />;
    }

    private async getProudct(product: BoxId) {
        if (this.product === undefined) {
            let ret = await this.controller.getProductAndDiscount(product);
            this.product = ret.product;
            this.discount = ret.discount;
        }
    }

    private renderProduct = observer((param: any) => {
        let { productBox } = param;
        this.getProudct(productBox);
        if (!this.product)
            return null;
        let { renderChemicalInfoInCart, renderFavoritesLabel } = this.controller;
        let { id, brand, description, descriptionC, origin, imageUrl, isValid } = this.product;
        return <div className="d-block mb-4 px-3">
            <div className="d-flex py-2">
                <div>
                    <div><strong>{description}</strong></div>
                    <div>{descriptionC}</div>
                </div>
                <div>
                    {renderFavoritesLabel(id)}
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {productPropItem('产品编号', origin)}
                        {renderChemicalInfoInCart(productBox)}
                        {tv(brand, renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    })
}

/**
 * 显示产品包装价格，配合CProduct.renderProductPrice使用
 * 需要的参数product必须是BoxId(或者object?)
 */
export class VProductPrice extends View<CProduct> {

    private schema: ItemSchema[] = [
        { name: 'pack', type: 'object' } as ObjectSchema,
        { name: 'quantity', type: 'number' } as NumSchema,
        { name: 'retail', type: 'number' } as NumSchema,
        { name: 'vipPrice', type: 'number' } as NumSchema,
        { name: 'promotionPrice', type: 'number' } as NumSchema,
        { name: 'currency', type: 'string' },
    ];

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp } = this.controller;
        let { cart } = cApp;
        if (value > 0)
            await cart.add(this.product, pack, value, price, retail, currency);
        else
            await cart.removeFromCart([{ productId: this.product.id, packId: pack.id }]);
    }

    private uiSchema: UiSchema = {
        items: {
            pack: { visible: false },
            retail: { visible: false },
            vipPrice: { visible: false },
            promotionPrice: { visible: false },
            currency: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.onQuantityChanged as any
            } as UiCustom
        }
    }

    @observable private prices: any;
    private initPrices = async (product: BoxId, salesRegionId: number, discount: number) => {
        if (this.prices === undefined)
            this.prices = await this.controller.getProductPrice(product, salesRegionId, discount);
    }

    private renderPrice(item: any) {
        let { pack, retail, vipPrice, promotionPrice } = item;
        let right = null;
        if (retail) {
            let price: number = this.minPrice(vipPrice, promotionPrice);
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <Form schema={this.schema} uiSchema={this.uiSchema} formData={item} />
                </div>
            </div >
        } else {
            right = <small>请询价</small>
        }
        return right;
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    private product: BoxId;
    render(param: any): JSX.Element {
        let { product, discount } = param;
        this.product = product;
        let { currentSalesRegion } = this.controller.cApp;
        return <this.content product={product} SalesRegionId={currentSalesRegion} discount={discount} />;
    }

    private content = observer((param?: any) => {
        let priceUI;
        let { product, SalesRegionId, discount } = param;

        let { renderDeliveryTime } = this.controller;
        this.initPrices(product, SalesRegionId, discount);
        if (this.prices && this.prices.length > 0) {
            priceUI = this.prices.map((v: any, index: number) => {
                let { pack, retail } = v;
                if (retail) {
                    return <div className="px-2" key={pack.id}>
                        <div className="row">
                            <div className="col-6">
                                <div><b>{tv(pack)}</b></div>
                                <div>{renderDeliveryTime(pack)}</div>
                            </div>
                            <div className="col-6">
                                {this.renderPrice(v)}
                            </div>
                        </div>
                    </div>;
                } else {
                    return <small>请询价</small>
                }
            });
        }
        return <>
            {priceUI}
        </>;
    })
}

export class VProductWithPrice extends View<CProduct> {
    @observable product: any;
    @observable discount: number;

    render(product: BoxId): JSX.Element {
        return <this.renderProduct productBox={product} />;
    }

    private async getProudct(product: BoxId) {
        if (this.product === undefined) {
            let ret = await this.controller.getProductAndDiscount(product);
            this.product = ret.product;
            this.discount = ret.discount;
        }
    }

    private renderProduct = observer((param: any) => {
        let { productBox } = param;
        this.getProudct(productBox);
        if (!this.product)
            return null;
        let { renderChemicalInfoInCart, renderProductPrice } = this.controller;
        let { id, brand, description, descriptionC, origin, imageUrl } = this.product;
        return <div className="d-block mb-2 px-3">
            <div className="py-2">
                <div><strong>{description}</strong></div>
                <div>{descriptionC}</div>
            </div>
            <div className="row py-2">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {productPropItem('产品编号', origin)}
                        {renderChemicalInfoInCart(productBox)}
                        {tv(brand, renderBrand)}
                    </div>
                </div>
            </div>
            <div className="border-top pt-2">
                {renderProductPrice(productBox, this.discount)}
            </div>
        </div>
    })
    /*
    render(product: BoxId): JSX.Element {
        let { renderProduct, renderProductPrice } = this.controller;
        return <div className="d-flex flex-column">
            <div>{renderProduct(product)}</div>
            <div className="p-2 border-top">{renderProductPrice(product, 1)}</div>
        </div>
    }
    */
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
/**
 * 产品未售提示UI
 */
export function unsoldProductsUI(discountinued: number) {
    if (discountinued && discountinued === 1)
        return <div onClick={(e: any) => e.stopPropagation()} className='w-100 carousel-control-prev'><b className="alert-primary alert">该产品已下架！</b></div>
    else
        return <></>
}
/**
 * 显示产品信息（不包含包装价格），特定于参数包含相关的CAS/Purity等信息），现应用于产品列表
 * @param product
 */
/* export function renderProduct(product: any) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl, discountinued } = product;
    return <div className="d-block mb-4 px-3 bg-white">
        <div className="py-2">
            <div className="mr-3"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
        </div>
        <div className="row">
            <div className="col-3">
                <ProductImage chemicalId={imageUrl} className="w-100" />
            </div>
            <div className="col-9">
                <div className="row">
                    {productPropItem('产品编号', origin)}
                    {productPropItem('CAS', CAS)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
        {unsoldProductsUI(discountinued)}
    </div>
} */

export class VProuductView2 extends View<CProduct> {

    @observable product: any;
    @observable discount: number;

    render(product: any): JSX.Element {
        return <this.renderProduct product={product} />;
    }

    private renderProduct = observer((param: any) => {
        let { product } = param;
        let { renderFavoritesLabel } = this.controller;
        let { id, brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl, discountinued } = product;
        return <div className="d-block mb-4 px-3 bg-white">
            <div className="py-2">
                <div className="mr-3"><strong>{description}</strong></div>
                <div>{descriptionC}</div>
                <div>
                    {renderFavoritesLabel(id)}
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {productPropItem('产品编号', origin)}
                        {productPropItem('CAS', CAS)}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {tv(brand, renderBrand)}
                    </div>
                </div>
            </div>
            {unsoldProductsUI(discountinued)}
        </div>
    })
}

/**
 * 收藏列表（有收藏与取消功能）
 */
/* export class VProductCarryFavorites extends View<CProduct>{
    render(param: any): JSX.Element {
        let { product } = param;
        return <div className='position-relative'>
            {renderProduct(product)}
            <div className='position-absolute' style={{ top: 20, right: -10 }}>
                {this.renderVm(VProductFavorateLabel, product.id)}
            </div>
        </div>
    }
} */