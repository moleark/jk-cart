/* eslint-disable */
import * as React from 'react';
import {
    tv, VPage, Page, Form, ItemSchema, NumSchema, UiSchema,
    ObjectSchema, RowContext, UiCustom, FormField, List, Ax
} from 'tonva';
import { CProduct } from './CProduct';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow, Product } from '../model';
import { ProductImage } from 'tools/productImage';
import { renderPropItem, renderBrand } from './renders';
import { xs } from 'tools/browser';
import { pdfIcon } from 'tools/images';
import { VFavorite, VPrice } from './views';
import classNames from 'classnames';
import { TopicDivision } from 'pointMarket/VPointProduct';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

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

export const languageCaptions: { [language: string]: string } = {
    'DE': '德文',
    'EN': '英文',
    'EN-US': '美式英文',
    'CN': '中文',
}

const SymbolSrcs:any[] = [
    { name: "LK", src: "GHS02.gif" },
    { name: "LM", src: "GSH04.gif" },
    { name: "LN", src: "GHS07.gif" },
    { name: "LO", src: "GHS03.gif" },
    { name: "LP", src: "GHS05.gif" },
    { name: "LQ", src: "GHS09.gif" },
    { name: "LR", src: "GHS01.gif" },
    { name: "LS", src: "GHS06.gif" },
    { name: "LT", src: "GHS08.gif" },
];

export class VPageProduct extends VPage<CProduct> {
    //private productBox: BoxId;
    //private discount: number;
    @observable p: boolean = false;

    async open(param: any) {
        //let { productData, product, discount } = param;
        //let { getProductSpecFile, getProductMSDSFile } = this.controller;
        //let page = xs ? this.page : this.lpage;
        this.openPage(observer(() => {
            let { cApp, product, openMaterial } = this.controller;
            let { MSDSFiles, specFiles, data, id } = product;
            /* let CurrentUA = browser.versions.mobile;
            let productPdfM = CurrentUA && (productMSDSFiles.length || productSpecFiles.length) ? true : false; */
            let header: any, cartLabel: any, material: any;

            if (xs) {
                header = cApp.cHome.renderSearchHeader();
                cartLabel = cApp.cCart.renderCartLabel();
                material = <div className="col-lg-9 mt-lg-2 mb-lg-2">
                    {this.renderProductMaterial()}
                </div>;
            }
            /* let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
            viewProduct.model = product; */

            return <Page header={header} right={cartLabel} className="bg-white">
                <section className="container mt-lg-2 product-sigle-page">
                    <div className="row">
                        {this.renderProduct(product)}
                        <div className="d-block d-sm-none px-2 ml-2 my-3 w-100" style={{ lineHeight: 1.8 }}>
                            {TopicDivision('产品资料')}
                            {this.material(id, true)}
                        </div>
                        {this.renderAssistInfo(product)}
                    </div>
                </section>
            </Page>;
            //} else {
            /*
            下面的做法大概不行，因为嵌套的层次较深，且都是observer的，上层observable的变化会嵌套执行下层的代码，而下层代码的render
            会操作数据库，得不偿失（和React的可能还不一样，React只会更新必要的html，不会再执行查询DB的操作）
            */
            /*
             let { controller, productBox } = this;
             let { renderProductWithPrice } = controller;
             return <Page header={header} right={cartLabel}>
                 <div className="px-2 py-2 bg-white mb-3">
                     {renderProductWithPrice(productBox)}
                 </div>
             </Page>
             */
            //}
        }));
    }

    /*
    private lpage = () => {
        //let { renderHeader, renderFooter } = this.controller.cApp;
        let {product} = this.controller;
        let {data} = product;
           return <Page>
             <section className="container mt-lg-2 product-sigle-page">
                    <div className="row">
                        {this.renderProduct(data.main, data.subs)}
                    </div>
                </section>
        </Page>
    }
    */

    /*
    render(param: any) {

        return <this.page />;
    }
    */
    renderAssistInfo = (product: Product) => {
        let basicInfoKey = [
            { insideKey: "MF", webKey: "MF" },
            { insideKey: "MW", webKey: "MW" },
            { insideKey: "Synonymity", webKey: "英文别名" },
            { insideKey: "SynonymityC", webKey: "中文别名" },
            { insideKey: "MP", webKey: "MP" },
            { insideKey: "BP", webKey: "BP" },
            { insideKey: "FP", webKey: "FP" },
            { insideKey: "Density", webKey: "Density" },
            { insideKey: "n20D", webKey: "n20D" },
            { insideKey: "[a]20D", webKey: "[a]20D" },
            { insideKey: "pH", webKey: "pH" },
            { insideKey: "MDL", webKey: "MDL编码" },
            { insideKey: "Beilstein", webKey: "Reaxys-RN (Beilstein)" },
            { insideKey: "Merck", webKey: "Merck Index" },
            { insideKey: "ECNo", webKey: "EC No." },
            { insideKey: "EINECS", webKey: "EINECS" },
        ];
        let securityInfoKey = [
            { insideKey: "Hazard", webKey: "Symbol" },
            { insideKey: "RiskSign", webKey: "Signal Word" },
            { insideKey: "HValue", webKey: "Hazard Statements" },
            { insideKey: "PValue", webKey: "Precautionary Statements" },
            { insideKey: "UN", webKey: "UN" },
            { insideKey: "HazardClass", webKey: "Hazard Class" },
            { insideKey: "subrisk", webKey: "SubRisk" },
            { insideKey: "PackingG", webKey: "Packing Group" },
            { insideKey: "WGK", webKey: "WGK Germany" },
            { insideKey: "RTECS", webKey: "RTECS" },
            { insideKey: "TSCA", webKey: "TSCA" },
        ];


        let { extention } = product;
        if (!extention) return;
        let { content } = extention;
        content = content ? JSON.parse(content) : undefined;
        let allContent = Object.keys(content);
        let arr1 = basicInfoKey.filter((v: any) =>  allContent.find((i: any) => v.insideKey === i));
        let arr2 = securityInfoKey.filter((v: any) => allContent.find((i: any) => v.insideKey === i));
        let tableInfo = (data: any[]) => {
            if (data.length === 0 && !content) return;
            return <table className="product-table w-100">
                <tbody>
                    {data.map((v: any, index: number) => {
                        let value = content[v.insideKey];
                        if (!value) return null;
                        if (v.insideKey === 'Hazard') {
                            value = SymbolSrcs.map((o: any) => {
                                if (value.indexOf(o.name) > -1) {
                                    return <img className="w-3c mr-1" src={"/images/security/" + o.src} alt="" />;
                                }
                                return '';
                            });
                        };
                        return <tr key={index}><th className="w-50">{v.webKey}</th><td className="w-50">{value}</td></tr>
                    })}
                </tbody>
            </table> 
        }
        
        return <div className="col-lg-12 mt-lg-2">{/* col-lg-9 */}
            {
                arr1.length ?
                <div className="accordion background-grey mt-lg-1">
                    <div className="w-100 btn text-left collapsed" data-toggle="collapse" data-target="#description1"
                    role="button" aria-expanded="false" aria-controls="description1">
                    基本信息&emsp;<i className="fa fa-chevron-down"></i>
                    </div>
                    </div>
                    :null
            }
            <div className="container mt-lg-2 collapse show" id="description1">
                {tableInfo(arr1.slice(0,6))}
                <div className="container collapse px-0" id="description2">
                    {tableInfo(arr1.slice(6))}
                </div>
                {
                    arr1.length > 6
                        ?<p className="text-right"> 
                            <a className="btn text-left collapsed" onClick={() => this.p = !this.p }
                                data-toggle="collapse" href="#description2" role="button" aria-expanded="false" aria-controls="description2">
                                {!this.p ?'更多':'收起'} <i className={`fa ${!this.p ? 'fa-angle-right':'fa-angle-up'}`} aria-hidden="true"></i>
                            </a>
                        </p> : null
                }
            </div>
            {
                arr2.length ?
                <div className="accordion background-grey mt-lg-1">
                    <a className="w-100 btn text-left collapsed" data-toggle="collapse" href="#description4"
                    role="button" aria-expanded="false" aria-controls="jk" target="_blank">
                    安全信息&emsp;<i className="fa fa-chevron-down"></i>
                    </a>
                    </div>
                    :null
            }
            <div className="container mt-lg-2 mb-lg-2 collapse show" id="description4">
                {tableInfo(arr2)}
            </div>
            {/* <div className="mt-lg-1">
                <div className="bg-nobackground-one">产品分类</div>
            </div>
            <div className="mt-lg-1">
                <Ax className="mint" href={"/product-catalog/" + 1}>有机化学</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>分子砌块</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>含氮化合物</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>氰或晴</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>材料化学</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>高分子化学</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>单体</Ax>,
                <Ax className="mint" href={"/product-catalog/" + 1}>乙烯类单体</Ax>
            </div> */}
        </div>
    }

    private material = (id: any, showMob?: boolean) => {
        let Materials = [
            { id: 1, name: "化学品安全技术说明书（SDS）", type: "msds" },
            { id: 2, name: "技术规格说明书（Specifications）", type: "spec" },
            { id: 3, name: "质检报告 (COA)", type: "coa" },
        ];
        return <div className={classNames('', !showMob ? 'd-none d-sm-block' : 'd-block d-sm-none')} >{/* left-below */}
            {
                Materials.map((v: any) => {
                    return <Ax key={v.name} href={'/product/mscu/' + v.type + '/' + id}>
                        <div className="mint" >{v.name}</div>
                    </Ax>
                })
            }
        </div>
    }

    private renderProduct = (product: Product) => {
        let { id, brand, props, chemical } = product;
        let { description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = props;
        let eName = <div className="py-2"><strong dangerouslySetInnerHTML={{__html:description|| ''}}></strong></div>;
        let cName: any;
        if (descriptionC !== description) {
            cName = <div dangerouslySetInnerHTML={{__html:descriptionC || ''}}></div>;
        }
        imageUrl = imageUrl || props.chemical.toString();
        return <>
            <div className="col-lg-4 ">
                <div className="">
                    <div className="border px-1">
                        <ProductImage chemicalId={imageUrl} className="w-100 mb-2" />
                    </div>
                    <div className="d-none d-sm-block">{this.material(id)}</div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="details">
                    {eName}
                    {cName}
                    <div className="row mx-3">
                        {renderPropItem('产品编号', origin, "font-weight-bold")}
                        {renderPropItem('CAS', CAS || chemical.CAS, "font-weight-bold")}
                        {renderPropItem('纯度', purity || chemical.purity)}
                        {renderPropItem('分子式', molecularFomula || chemical.molecularFomula)}
                        {renderPropItem('分子量', molecularWeight || chemical.molecularWeight)}
                        {renderBrand(brand)}
                    </div>
                </div>
                {this.renderVm(VFavorite, { product })}
                {this.renderVm(VPrice, product)}
            </div>
        </>

        // return <div className="mb-3 px-2">
        //     {eName}
        //     {cName}
        //     <div className="row mt-3">
        //         <div className="col-12 col-sm-3">
        //             <ProductImage chemicalId={imageUrl} className="w-100" />
        //         </div>
        //         <div className="col-12 col-sm-9">
        //             <div className="row mx-3">
        //                 {renderPropItem('产品编号', origin, "font-weight-bold")}
        //                 {renderPropItem('CAS', CAS, "font-weight-bold")}
        //                 {renderPropItem('纯度', purity)}
        //                 {renderPropItem('分子式', molecularFomula)}
        //                 {renderPropItem('分子量', molecularWeight)}
        //                 {renderBrand(brand)}
        //             </div>
        //         </div>
        //     </div>
        //     {this.renderVm(VFavorite, { product })/*this.controller.renderFavoritesLabel(product)*/}
        //     {this.renderVm(VPrice, product) /*renderProductPrice(product, discount)*/}
        // </div>;
        /*
        let NewProductPropItem = (caption: string, value: any, captionClass?: string,isSplit?:boolean) => {
            if (value === null || value === undefined || value === '0') return null;
            let Class = captionClass ? classNames(captionClass) : "";
            let Split = isSplit === undefined || isSplit  ? ' | ' : '';
            return <span className={classNames(Class)}>{Split} {caption}：{value}</span>
        }
        return <>
            <div className="col-lg-4 product-left-card ">
                <div className="preview">
                    <ProductImage chemicalId={imageUrl} className="border" />
                    <div className="left-below display-desktop mt-1">
                        {this.renderProductMaterial()}
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="details">
                    <h5 className="product-title">{description} <b><br />{descriptionC}</b></h5>
                    <p>
                        {NewProductPropItem('产品编号',origin,'',false)}
                        {NewProductPropItem('CAS',CAS)}
                        {NewProductPropItem('纯度',purity)}
                        {NewProductPropItem('分子式',molecularFomula)}
                        {NewProductPropItem('分子式',molecularWeight)}
                        {NewProductPropItem('品牌',brand.name)}
                    </p>
                    {false && <p>产品编号：{origin} | CAS： {CAS} { brand ? `|  品牌：${brand.name}`:''}</p> }
                </div>
                {this.controller.renderFavoritesLabel(id)}
                <div className="mt-lg-2">
                    {packs.map((v: any) => <div key={v.pack.id}>{this.renderPack(v)}</div> )}
                </div>
            </div>
        </>
        */
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
                <div className="col-4 p-0">
                    <div><b>{tv(pack)}</b></div>
                    <div>{this.controller.renderDeliveryTime(pack)}</div>
                </div>
                <div className="col-8 p-0">
                    {right}
                </div>
            </div>
        </div>;
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp, product } = this.controller;
        let { cart } = cApp;
        if (value > 0)
            await cart.add(product, pack, value, price, retail, currency);
        else
            await cart.removeItem([{ productId: product.id, packId: pack.id }]);
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
        let lang = shiftArr[1];
        let caption = languageCaptions[lang];
        if (!caption) caption = languageCaptions['CN'];
        return caption;
    }

    private renderPDF = (content: any) => {
        let { fileName } = content;
        let language = this.dealWithPDF(fileName);
        let { ToVerifyPdf, product } = this.controller;
        return <div className="mx-2 d-flex flex-column text-center" onClick={() => { ToVerifyPdf({ content, product }) }}>
            <img src={pdfIcon} alt="" style={{ width: 24 }} />
            <div className="small">{language}</div>
        </div>
    }

    private renderProductMaterial = () => {
        let { MSDSFiles, specFiles, data } = this.controller.product;
        let MaterialArr = [
            { type: '化学品安全技术说明书(SDS)', content: MSDSFiles },
            { type: '技术规格说明书(SPEC)', content: specFiles }
        ];

        let renderListItemPDF = (Material: any, index: number) => {
            let { type, content } = Material;
            if (content.length) {
                /* return <div className="d-flex pt-2 border-bottom">
                    <div className="w-3c align-self-center mr-2 mb-2" >{type}</div>
                    <List items={content} item={{ render: this.renderPDF, className: 'px-2 border-left' }} className="d-flex bg-light mb-1" />
                </div> */
                return <>
                    <div className="accordion background-grey w-100" style={{ background: '#F2F2F2' }}>
                        <a className="w-100 btn text-left collapsed" data-toggle="collapse" href={`#description${index}`} role="button" aria-expanded="false" aria-controls="jk" target="_blank">
                            {type}&emsp;<i className="fa fa-chevron-down"></i>
                        </a>
                    </div>
                    <div className="container collapse show w-100 pt-2 px-0 border border-top-0" id={`description${index}`}>
                        <List items={content} item={{ render: this.renderPDF, className: 'px-2' }} className="d-flex bg-light mb-1" />
                    </div>
                </>
            } else {
                return null;
            }
        };
        return <List items={MaterialArr} item={{ render: renderListItemPDF, className: "d-block pb-2" }} />;
    }
}
