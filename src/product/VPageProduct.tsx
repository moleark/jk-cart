/* eslint-disable */
import * as React from 'react';
import {
    tv, VPage, Page, Form, ItemSchema, NumSchema, UiSchema,
    ObjectSchema, RowContext, UiCustom, FormField, List, Ax
} from 'tonva-react';
import { CProduct } from './CProduct';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow, Product } from '../store';
import { ProductImage } from 'tools/productImage';
import { renderPropItem, renderBrand } from './renders';
import { xs } from 'tools/browser';
import { pdfIcon } from 'tools/images';
import { VFavorite, VPrice } from './views';
import classNames from 'classnames';
import { TopicDivision } from 'pointMarket/VPointProduct';
import { observable, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import { productPropIsValid } from 'product';

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

const SymbolSrcs: any[] = [
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

const basicInfoKey = [
    // { insideKey: "MF", webKey: "MF" },
    // { insideKey: "MW", webKey: "MW" },
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
    { insideKey: "EINECS", webKey: "EC No." },
];
const securityInfoKey = [
    { insideKey: "SpecialRequirement", webKey: "存储条件" },
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

export class VPageProduct extends VPage<CProduct> {
    //private productBox: BoxId;
    //private discount: number;
    p: boolean = false;

    constructor(c: CProduct) {
        super(c);

        makeObservable(this, {
            p: observable
        });
    }

    async open(param: any) {
        //let { productData, product, discount } = param;
        //let { getProductSpecFile, getProductMSDSFile } = this.controller;
        //let page = xs ? this.page : this.lpage;
        this.openPage(observer(() => {
            let { cApp, product } = this.controller;
            let { id } = product;
            /* let CurrentUA = browser.versions.mobile;
            let productPdfM = CurrentUA && (productMSDSFiles.length || productSpecFiles.length) ? true : false; */
            let header: any, cartLabel: any;

            if (xs) {
                header = cApp.cHome.renderSearchHeader();
                cartLabel = cApp.renderCartLabel();
            }
            /* let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
            viewProduct.model = product; */

            return <Page header={header} right={cartLabel} className="bg-white">
                <section className="container mt-lg-2 product-sigle-page">
                    <div className="row">
                        {this.renderProduct(product)}
                        <div className="d-block d-sm-none px-2 ml-2 my-3 w-100" style={{ lineHeight: 1.8 }}>
                            {TopicDivision('产品资料')}
                            {this.material(product, true)}
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
        let { extention, descriptionPost, productCrumbs, standardSample } = product;
        let basicInfoUI: JSX.Element, securityInfoUI: JSX.Element, descriptionPostUI: JSX.Element,
            productCrumbsUI: JSX.Element, standardSampleUI: JSX.Element;
        if (extention) {
            extention = JSON.parse(extention.replace(/(\t|\n|\r)*/g, ""));
            let allContent = Object.keys(extention).map((el: any) => {
                if (!extention[el] && extention[el].replace(/\s*/g, '') == 'N/A') return;
                if (el === 'TSCA') {
                    let TSCAs: { [typeNum: number]: string } = { 0: '', 1: "是", 2: "否" };
                    extention[el] = TSCAs[extention[el]] || "";
                };
                if (el === 'Hazard') {
                    extention[el] = SymbolSrcs.map((o: any, ind: number) => {
                        if (extention[el].indexOf(o.name) > -1) {
                            return <img key={ind} className="w-3c mr-1" src={"/images/security/" + o.src} alt="" />;
                        }
                        return '';
                    });
                };
                return el;
            }).filter((el: any) => extention[el]);
            let basicInfos: any[] = basicInfoKey.filter((v: any) => allContent.find((i: any) => v.insideKey === i));
            let securityInfos: any[] = securityInfoKey.filter((v: any) => allContent.find((i: any) => v.insideKey === i));
            let tableInfo = (data: any[]) => {
                if (data.length === 0) return;
                return <table className="product-table w-100">
                    <tbody>
                        {data.map((v: any, index: number) => {
                            let value = extention[v.insideKey];
                            if (!value) return null;
                            return <tr key={index}><th className="w-50">{v.webKey}</th><td className="w-50">{value}</td></tr>
                        })}
                    </tbody>
                </table>
            };
            if (basicInfos.length) {
                basicInfoUI = <>
                    <div className="accordion background-grey mt-lg-1">
                        <div className="w-100 btn text-left collapsed" data-toggle="collapse" data-target="#description1"
                            role="button" aria-expanded="false" aria-controls="description1">
                            基本信息&emsp;<i className="fa fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className="container mt-lg-2 collapse show" id="description1">
                        {tableInfo(basicInfos.slice(0, 6))}
                        <div className="container collapse px-0" id="description2">
                            {tableInfo(basicInfos.slice(6))}
                        </div>
                        {
                            basicInfos.length > 6
                                ? <p className="text-right">
                                    <a className="btn text-left collapsed" onClick={() => this.p = !this.p}
                                        data-toggle="collapse" href="#description2" role="button" aria-expanded="false" aria-controls="description2">
                                        {!this.p ? '更多' : '收起'} <i className={`fa ${!this.p ? 'fa-angle-right' : 'fa-angle-up'}`} aria-hidden="true"></i>
                                    </a>
                                </p> : null
                        }
                    </div>
                </>;
            };
            if (securityInfos.length) {
                securityInfoUI = <>
                    <div className="accordion background-grey mt-lg-1">
                        <a className="w-100 btn text-left collapsed" data-toggle="collapse" href="#description4"
                            role="button" aria-expanded="false" aria-controls="jk" target="_blank">
                            安全信息&emsp;<i className="fa fa-chevron-down"></i>
                        </a>
                    </div>
                    <div className="container mt-lg-2 mb-lg-2 collapse show" id="description4">
                        {tableInfo(securityInfos)}
                    </div>
                </>;
            };
        };
        if (descriptionPost) {
            descriptionPostUI = <>
                <div className="accordion background-grey mt-lg-1">
                    <a className="w-100 btn text-left collapsed" data-toggle="collapse" href="#descriptionpost"
                        role="button" aria-expanded="false" aria-controls="jk" target="_blank">
                        产品描述&emsp;<i className="fa fa-chevron-down"></i>
                    </a>
                </div>
                <div dangerouslySetInnerHTML={{ __html: descriptionPost || "" }}
                    className="container mt-lg-2 mb-lg-2 collapse show" id="descriptionpost">
                </div>
            </>;
        };
        if (standardSample) {
            let type = standardSample.components.some((el: any) => el?.matrix || el?.unit) ? "Set Components" : "Analytes";
            let thead = type === "Analytes" ? ["英文名称", "中文名称", "CAS", "目标浓度"] : ["产品编号", "英文名称", "中文名称", "浓度", "单位"];
            standardSampleUI = <>
                <div className="accordion background-grey mt-lg-1">
                    <a className="w-100 btn text-left collapsed" data-toggle="collapse" href="#standardSample"
                        role="button" aria-expanded="false" aria-controls="jk" target="_blank">
                        组分&emsp;<i className="fa fa-chevron-down"></i>
                    </a>
                </div>
                <div className="container mt-lg-2 mb-lg-2 collapse show" id="standardSample">
                    <table className="w-100 text-break standardSampleTable">
                        <thead>
                            <tr className={classNames("border-bottom", type === "Analytes" ? "analytes" : "components")}>
                                {thead.map((el: any) => { return <th key={el}>{el}</th> })}
                            </tr>
                        </thead>
                        <tbody>
                            {standardSample.components.map((el: any, index: number) => {
                                let { origin, description, descriptionC: descriptionCC, descriptionc, cas, concentration, matrix, unit } = el;
                                let descriptionC = descriptionCC || descriptionc;
                                let tds: JSX.Element;
                                if (type === "Analytes") {
                                    tds = <><td data-title="英文名称">{description}</td>
                                        <td data-title="中文名称">{descriptionC}</td>
                                        <td data-title="CAS">{cas}</td>
                                        <td data-title="目标浓度">{concentration}</td></>;
                                } else {
                                    tds = <><td className="" data-title="产品编号"><Ax style={{ color: "#781515" }} href={`/search/${origin}?type=2`}>{origin}</Ax></td>
                                        <td className="" data-title="英文名称">{description}</td>
                                        <td className="" data-title="中文名称">{descriptionC}</td>
                                        <td className="" data-title="浓度">{matrix}</td>
                                        <td className="w-min-3c" data-title="单位">{unit}</td></>;
                                };
                                return <tr key={index} className="py-2 border-bottom">{tds}</tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </>;
        };
        if (productCrumbs.length && productCrumbs.some((el: any[]) => el.length)) {
            productCrumbsUI = <><div className="mt-lg-1">
                <div className="bg-nobackground-one">产品分类</div>
            </div>
                <div className="mt-lg-1">
                    {productCrumbs.map((v: any[], index: number) => {
                        if (!v.length) return;
                        return <div key={index}>
                            <Ax className="mint" href={"/product-catalog"}>产品分类</Ax> <span style={{ color: "#a5a8ab" }}>/</span>
                            {v.map((el: any, i: number) => {
                                return <span key={el.name}>
                                    &nbsp;<Ax className="mint" href={"/product-catalog/" + el.owner}>{el.name}</Ax>&nbsp;
                                    {i !== v.length - 1 ? <span style={{ color: "#a5a8ab" }}>/</span> : ""}</span>
                            })}
                        </div>
                    })}
                </div>
            </>;
        };

        return <div className="col-lg-12 mt-lg-2 product-container">{/* col-lg-9 */}
            {basicInfoUI}
            {descriptionPostUI}
            {standardSampleUI}
            {securityInfoUI}
            {productCrumbsUI}
        </div>
    }

    private material = (product: Product, showMob?: boolean) => {
        let { id, productDocs } = product;
        let Materials = [
            { id: 1, name: "化学品安全技术说明书（SDS）", type: "msds" },
            { id: 2, name: "技术规格说明书（Specifications）", type: "spec" },
            { id: 3, name: "质检报告 (COA)", type: "coa" },
            { id: 4, name: "用户手册（UserManual）", type: "um" },
        ];
        let effectArr: any[] = Materials.filter((el: any) => productDocs[el.type]);
        return <div className={classNames('', !showMob ? 'd-none d-sm-block' : 'd-block d-sm-none')} >{/* left-below */}
            {
                effectArr.map((v: any) => {
                    return <Ax key={v.name} href={'/product/mscu/' + v.type + '/' + id}>
                        <div className="mint" >{v.name}</div>
                    </Ax>
                })
            }
        </div>
    }

    private renderProduct = (product: Product) => {
        let { id, brand, props, chemical, warnings } = product;
        console.log('props',props);
        console.log('chemical',chemical);
        
        let { description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl, mdlnumber, gradeCN } = props;
        let eName = <div className="py-2"><strong dangerouslySetInnerHTML={{ __html: description || '' }}></strong></div>;
        let cName: any;
        descriptionC = descriptionC + (productPropIsValid(purity) ? " , " + purity : "") + (productPropIsValid(gradeCN) ? " , " + gradeCN : "");
        if (descriptionC !== description) {
            cName = <div dangerouslySetInnerHTML={{ __html: descriptionC || '' }}></div>;
        }
        return <>
            <div className="col-lg-4 ">
                <div className="">
                    <div className="border px-1">
                        <ProductImage chemicalId={imageUrl} className="w-100 mb-2" />
                    </div>
                    <div className="d-none d-sm-block">{this.material(product)}</div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="details">
                    {eName}
                    {cName}
                    <div className="row mx-3">
                        {renderPropItem('产品编号', origin, "font-weight-bold")}
                        {renderPropItem('CAS', <Ax href={`/search/${CAS || chemical.CAS}`} className="text-primary">{CAS || chemical.CAS}</Ax>, "font-weight-bold")}
                        {renderPropItem('纯度', purity || chemical.purity)}
                        {renderPropItem('分子式', molecularFomula || chemical.molecularFomula)}
                        {renderPropItem('分子量', molecularWeight || chemical.molecularWeight)}
                        {renderBrand(brand)}
                        {renderPropItem('MDL', (mdlnumber || chemical.mdlnumber) ? <Ax href={`/search/${mdlnumber || chemical.mdlnumber}`} className="text-primary">{mdlnumber || chemical.mdlnumber}</Ax> : null)}
                    </div>
                    <div className="text-danger row mx-3">{
                        warnings.map((el: any) => {
                            return <div key={el} className="col-sm-6">{el}</div>;
                        })
                    }</div>
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
        await cApp.store.cart.changeQuantity(product, pack, value, price, retail, currency);
        /*
        let { cCart } = cApp;
        if (value > 0)
            await cCart.add(product, pack, value, price, retail, currency);
        else
            await cCart.removeItem([{ productId: product.id, packId: pack.id }]);
        */
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

    // private dealWithPDF = (fileName: string) => {
    //     let shiftArr = fileName ? fileName.replace(/\.pdf/ig, '').split('_') : [];
    //     let lang = shiftArr[1];
    //     let caption = languageCaptions[lang];
    //     if (!caption) caption = languageCaptions['CN'];
    //     return caption;
    // }

    // private renderPDF = (content: any) => {
    //     let { fileName } = content;
    //     let language = this.dealWithPDF(fileName);
    //     let { ToVerifyPdf, product } = this.controller;
    //     return <div className="mx-2 d-flex flex-column text-center" onClick={() => { ToVerifyPdf({ content, product }) }}>
    //         <img src={pdfIcon} alt="" style={{ width: 24 }} />
    //         <div className="small">{language}</div>
    //     </div>
    // }

    // private renderProductMaterial = () => {
    //     let { MSDSFiles, specFiles, data } = this.controller.product;
    //     let MaterialArr = [
    //         { type: '化学品安全技术说明书(SDS)', content: MSDSFiles },
    //         { type: '技术规格说明书(SPEC)', content: specFiles }
    //     ];

    //     let renderListItemPDF = (Material: any, index: number) => {
    //         let { type, content } = Material;
    //         if (content.length) {
    //             /* return <div className="d-flex pt-2 border-bottom">
    //                 <div className="w-3c align-self-center mr-2 mb-2" >{type}</div>
    //                 <List items={content} item={{ render: this.renderPDF, className: 'px-2 border-left' }} className="d-flex bg-light mb-1" />
    //             </div> */
    //             return <>
    //                 <div className="accordion background-grey w-100" style={{ background: '#F2F2F2' }}>
    //                     <a className="w-100 btn text-left collapsed" data-toggle="collapse" href={`#description${index}`} role="button" aria-expanded="false" aria-controls="jk" target="_blank">
    //                         {type}&emsp;<i className="fa fa-chevron-down"></i>
    //                     </a>
    //                 </div>
    //                 <div className="container collapse show w-100 pt-2 px-0 border border-top-0" id={`description${index}`}>
    //                     <List items={content} item={{ render: this.renderPDF, className: 'px-2' }} className="d-flex bg-light mb-1" />
    //                 </div>
    //             </>
    //         } else {
    //             return null;
    //         }
    //     };
    //     return <List items={MaterialArr} item={{ render: renderListItemPDF, className: "d-block pb-2" }} />;
    // }
}
