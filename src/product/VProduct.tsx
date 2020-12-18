import * as React from 'react';
import { CProduct } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, NumSchema, UiSchema, Field,
    ObjectSchema, RowContext, UiCustom, FormField, BoxId, FA, List
} from 'tonva';
import { tv } from 'tonva';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow } from './Product';
import { ViewMainSubs, MainProductChemical } from 'mainSubs';
import { ProductImage } from 'tools/productImage';
import { productPropItem, renderBrand } from './VProductView';
import { VProductFavorateLabel } from 'customer/VProductFavorateLabel';
import { pdfIcon } from 'tools/images';
import { TopicDivision } from 'pointMarket/VPointProduct';
import { browser } from 'tools/browser';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },
    { name: 'quantity', type: 'number' } as NumSchema,
    { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
    { name: 'futureDeliveryTimeDescription', type: 'string' }
];

export class VProduct extends VPage<CProduct> {
    private productBox: BoxId;
    private discount: number;

    async open(param: any) {
        let { productData, product, discount } = param;
        let { getProductSpecFile, getProductMSDSFile } = this.controller;
        this.productBox = product;
        this.discount = discount;
        // await getProductMSDSFile(product);
        // await getProductSpecFile(product);
        this.openPage(this.page, productData);
    }

    private renderProduct = (product: MainProductChemical) => {

        let { id, brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
            <div className="row mt-3">
                <div className="col-12 col-sm-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-12 col-sm-9">
                    <div className="row mx-3">
                        {productPropItem('产品编号', origin, "font-weight-bold")}
                        {productPropItem('CAS', CAS, "font-weight-bold")}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
            {this.controller.renderFavoritesLabel(id)}
        </div>
        // { this.renderVm(VProductFavirateLabel, this.productBox) }
    }

    private arrTemplet = (item: ProductPackRow) => {
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
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center"><FormField name="quantity" /></div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        return <div className="px-2">
            <div className="row">
                <div className="col-6">
                    <div><b>{tv(pack)}</b></div>
                    <div>{this.controller.renderDeliveryTime(pack)}</div>
                </div>
                <div className="col-6">
                    {right}
                </div>
            </div>
        </div>;
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp } = this.controller;
        let { cart } = cApp;
        if (value > 0)
            await cart.add(this.productBox, pack, value, price, retail, currency, '');
        else
            await cart.removeFromCart([{ productId: this.productBox.id, packId: pack.id }]);
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
        items: {
            quantity: {
                widget: 'custom',
                className: 'text-center',
                WidgetClass: MinusPlusWidget as any,
                onChanged: this.onQuantityChanged
            } as UiCustom
        },
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="mx-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private dealWithPDF = (fileName: string) => {
        let shiftArr = fileName ? fileName.replace(/\.pdf/ig, '').split('_') : [];
        switch (shiftArr[1]) {
            case 'DE':
                return '德文';
            case 'EN':
                return '英文';
            case 'EN-US':
                return '英美';
            case 'CN':
                return '中文';
            default:
                return '中文';
        }
    }

    private renderPDF = (content: any) => {
        let { fileName } = content;
        let language = this.dealWithPDF(fileName);
        let { ToVerifyPdf } = this.controller;
        return <div className="mx-2 d-flex flex-column text-center" onClick={() => { ToVerifyPdf({ content, product: this.productBox }) }}>
            <img src={pdfIcon} alt="" style={{ width: 24 }} />
            <div className="small">{language}</div>
        </div>
    }

    renderListItemPDF = (Material: any) => {
        let { type, content } = Material;
        if (content.length) {
            return <div className="d-flex pt-2 border-bottom">
                <div className="w-3c align-self-center mr-2 mb-2" >{type}</div>
                <List items={content} item={{ render: this.renderPDF, className: 'px-2 border-left' }} className="d-flex bg-light mb-1" />
            </div>
        } else {
            return null;
        }
    }

    renderProductMaterial = () => {
        let { productMSDSFiles, productSpecFiles } = this.controller;
        let MaterialArr = [{ type: 'MSDS', content: productMSDSFiles }, { type: 'SPEC', content: productSpecFiles }];//COA EUM
        return <>
            <List items={MaterialArr} item={{ render: this.renderListItemPDF }} />
        </>
    }

    private page = (product: any) => {

        let { cApp, productMSDSFiles, productSpecFiles } = this.controller;
        /* let CurrentUA = browser.versions.mobile;
        let productPdfM = CurrentUA && (productMSDSFiles.length || productSpecFiles.length) ? true : false; */

        let header = cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        if (true) {
            let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
            viewProduct.model = product;

            return <Page header={header} right={cartLabel}>
                <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
                {/* {
                    productPdfM
                        ? <div className="py-2 px-3 bg-light">
                            {TopicDivision('产品资料')}
                            <div>{this.renderProductMaterial()}</div>
                        </div>
                        : null
                } */}
            </Page>
        } else {
            /*
            下面的做法大概不行，因为嵌套的层次较深，且都是observer的，上层observable的变化会嵌套执行下层的代码，而下层代码的render
            会操作数据库，得不偿失（和React的可能还不一样，React只会更新必要的html，不会再执行查询DB的操作）
            */
            let { controller, productBox } = this;
            let { renderProductWithPrice } = controller;
            return <Page header={header} right={cartLabel}>
                <div className="px-2 py-2 bg-white mb-3">
                    {renderProductWithPrice(productBox)}
                </div>
            </Page>
        }
    }
}