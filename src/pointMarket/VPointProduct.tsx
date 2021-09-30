import * as React from 'react';
import { VPage, Page, Form, List, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, FA, Tabs, TabProp, TabCaptionComponent, StringSchema } from "tonva-react";
import { CPointProduct, PointProductDetailLevel } from 'pointMarket/CPointProduct';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { makeObservable, observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { color } from 'order/VMyOrders';
import { randomColor } from 'tools/randomColor';
import { pointIcon, triangleShadingO } from 'tools/images';

export const renderHr = (HRCL?: any, HRST?: any) => {
    let styleObj = HRST ? HRST : { backgroundColor: '#007bff' };
    return <div className={`flex-fill ${HRCL ? HRCL : 'px-2 text-primary'}`}><hr style={{ height: 1, border: 'none', ...styleObj }} /></div>
};

export const TopicDivision = (topic: any, CL?: any, ST?: any, HRCL?: any, HRST?: any) => {
    return <div className={`text-center w-100 py-2 ${CL ? CL : 'px-2 text-primary'} d-flex justify-content-between align-items-center`} style={ST}>
        {renderHr(HRCL, HRST)}{topic}{renderHr(HRCL, HRST)}
    </div>
}


export const schema = [
    { name: 'product', type: 'object' } as ObjectSchema,
    // { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'quantity', type: 'number' } as NumSchema,
    // { name: 'point', type: 'number' } as NumSchema,
    // { name: 'imageUrl', type: 'string' } as StringSchema,
    { name: 'newStockRes', type: 'object' } as ObjectSchema,
    { name: 'pointProductSource', type: 'object' } as ObjectSchema,
];

export class VPointProduct extends VPage<CPointProduct> {
    protected isShowSelectForm: boolean = false;
    protected productIsNull: boolean = false;
    protected pointIsEnough: boolean = false;
    private currentInterval: string;
    private tabs: TabProp[];
    protected none: JSX.Element = <div className="my-4 text-secondary d-flex justify-content-center">『 暂无可兑换产品 』</div>;
    rankInterval: any = [
        { caption: '1万以下', state: 'below', icon: 'superpowers', borderC: '#2c93ad' },
        { caption: '1-5万', state: 'firstLevel', icon: 'superpowers', borderC: '#3CC43C' },
        { caption: '5-15万', state: 'twoLevel', icon: 'superpowers', borderC: '#7c1e5e' },
        { caption: '15万以上', state: 'above', icon: 'superpowers', borderC: '#0e2c8c' },
    ];

    constructor(c: CPointProduct) {
        super(c);

        makeObservable<VPointProduct, "isShowSelectForm" | "productIsNull" | "pointIsEnough">(this, {
            isShowSelectForm: observable,
            productIsNull: observable,
            pointIsEnough: observable,
        });
    }

    async open(param?: any) {
        this.openPage(this.page);
    }
    private getTabs = async () => {
        let { pointProducts, getPointsIntervalProducts } = this.controller;
        this.tabs = this.rankInterval.map((v: any) => {
            let { caption, state, icon, borderC } = v;
            return {
                name: caption,
                // caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                caption: (selected: boolean) => this.TabCaptionComponent(caption, icon, borderC, (selected ? '#ffffff' : 'transparent')),
                content: () => {
                    return <>{this.renderList()}</>
                },
                isSelected: this.currentInterval === state,
                load: async () => {
                    this.currentInterval = state;
                    pointProducts = await getPointsIntervalProducts(this.currentInterval);
                }
            };
        });
    }

    private TabCaptionComponent = (label: string, icon: string, borderC: string, color: string) => <div
        className={'py-2 d-flex justify-content-center align-items-center flex-column cursor-pointer '}>
        <small className="w-4c text-center rounded-sm font-weight-bold" style={{ color: borderC, border: `1px solid ${borderC}`, background: color }}>{label}</small>
    </div>;

    protected renderList = (isToDetail?: boolean) => {
        let { pointProducts, openPointProductDetail } = this.controller;
        return <div style={{ background: `url(${triangleShadingO}) no-repeat 99% 230px,url(${triangleShadingO}) no-repeat 1% 480px`, backgroundSize: '2.5%' }}>
            <List items={pointProducts} item={{ render: this.renderPointProduct, onClick: (v)=>{openPointProductDetail(v,PointProductDetailLevel.INDIRECT)}, className: 'w-50 px-3 bg-transparent' }} none={this.none}
                className={`${pointProducts.length !== 0 ? 'd-flex flex-wrap bg-transparent mt-2' : ''}`}
            ></List>
        </div>
    }

    private uiSchema: UiSchema = {
        items: {
            product: { visible: false },
            // pack: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center w-2c',
                WidgetClass: MinusPlusWidget,
                onChanged: this.controller.onQuantityChanged as any
            } as UiCustom,
            newStockRes: { visible: false },
            pointProductSource: { visible: false },
            // point: { visible: false },
            // imageUrl: { visible: false },
        }
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product } = pointProduct;
        return <>
            {tv(product, (v) => {
                return <div className="w-100 d-flex flex-column mb-4">{/* height: 20vh  */}
                    <div title={v.description} className="w-100" style={{ height: '35vw' }} ><PointProductImage chemicalId={v.imageUrl} className="w-100 h-100" style={{border:`2px solid ${randomColor()}`}} /></div>
                    <div className="small w-100">
                        <div className="text-truncate w-100">{v.descriptionC}</div>
                        <>
                            {
                                this.isShowSelectForm
                                    ? <div className="w-100 d-flex justify-content-between align-items-right mt-1">{/* justify-content-end */}
                                        <small className="align-self-center mb-3 text-primary" ><FA name="shopping-bag" size='2x' /></small>
                                        <Form schema={schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                                    </div>
                                    : null
                            }
                            <div className='d-flex'>
                                {/* <FA name='database' className="text-warning" /> */}
                                <img src={pointIcon} alt="" style={{ height: 24 }} />
                                <span className="text-danger h5 m-0 ml-1 align-self-end"> {v.point}</span>{/* <small>分</small> */}
                            </div>
                        </>
                    </div>
                </div>
            })}
        </>
    }

    protected openExchangeOrder = async () => {
        // 未选择产品
        let { pointToExchanging, myEffectivePoints } = this.controller;

        if (pointToExchanging < 1) {
            this.productIsNull = true;
            this.pointIsEnough = false;
            setTimeout(() => this.productIsNull = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        // 积分不足
        if (pointToExchanging > myEffectivePoints) {
            this.productIsNull = false;
            this.pointIsEnough = true;
            setTimeout(() => this.pointIsEnough = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        this.controller.openExchangeOrder();
    }

    protected getRelatedUI = () => {
        let { pointToExchanging, myEffectivePoints } = this.controller;
        let productIsNullTip = this.productIsNull ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" />未选择产品</div>
            : null;
        let pointIsEnoughTip = this.pointIsEnough ?
            <div className="text-danger small m-0 p-0"><FA name="exclamation-circle" />积分不足<br />剩余{myEffectivePoints}分</div>
            : null;

        let footer = <div className="d-block">
            <div className="w-100 px-3 d-flex justify-content-between">
                <div>总计:<span className="text-danger ml-2 mr-1 h2" >{pointToExchanging}</span>分</div>
                <div>{productIsNullTip}{pointIsEnoughTip}</div>
                <button type="button" className="btn btn-danger m-1" onClick={this.openExchangeOrder}>去兑换</button>
            </div>
        </div>;
        return footer;
    }

    protected page = observer(() => {
        this.getTabs();
        let right = this.controller.renderSelectedLable(PointProductDetailLevel.DIRECT);
        let {themeName: ThemeName } = this.controller;
        let themeName = ThemeName === '积分商城' ? ThemeName : (ThemeName.name ? ThemeName.name : ThemeName);
        return <Page header={themeName} right={right}>
            {
                themeName === '积分商城'
                    ? <Tabs tabs={this.tabs} tabPosition="top" size="lg" />
                    : <>
                        {/* {TopicDivision(this.themeName)} */}
                        {this.renderList()}
                    </>
            }
        </Page >;
    });
}

/**
 * 已选择的兑换产品列表
 */
export class VSelectedPointProduct extends VPointProduct {
    isShowSelectForm: boolean = true;
    protected none: JSX.Element = <div className="mt-4 text-secondary d-flex justify-content-center">『 已清空您所选择的产品 』</div>;
    async open(param?: any) {
        this.openPage(this.page);
    }

    page = observer(() => {
        let { pointProductsSelected, clearSelectedPointsProducts } = this.controller;
        let footer = this.getRelatedUI();

        // let right = <div className="mr-2" onClick={clearSelectedPointsProducts}><FA name="trash-o" className='text-light' /></div>;
        // let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 已清空您所选择的产品 』</div>;
        return <Page header='已选择兑换产品' right={<></>} footer={footer} >
            <List
                items={pointProductsSelected}
                item={{ render: this.renderPointProduct, className: "w-50 px-3" }}
                none={this.none}
                className="d-flex flex-wrap bg-transparent mt-2"
            />
        </Page >
    })
}