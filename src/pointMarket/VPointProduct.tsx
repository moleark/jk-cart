import * as React from 'react';
import { CPointProduct } from 'pointMarket/CPointProduct';
import {
    VPage, Page, Form, List, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, FA, Tabs, TabProp, autoHideTips, nav, Ax
} from 'tonva';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { observable } from 'mobx';
//import { GLOABLE } from 'cartenv';
//import { color } from 'order/VMyOrders';
import { randomColor } from 'tools/randomColor';
import { pointIcon, triangleShadingO } from 'tools/images';
import { topicClumps } from './CPointProduct';
import { xs } from '../tools/browser';
import classNames from 'classnames';

export const renderHr = (HRCL?: any, HRST?: any) => {
    let styleObj = HRST ? HRST : { backgroundColor: '#007bff' };
    return <div className={`flex-fill ${HRCL ? HRCL : 'px-2 text-primary'}`}>
        <hr style={{ height: 1, border: 'none', ...styleObj }} />
    </div>
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
];

export class VPointProduct extends VPage<CPointProduct> {
    @observable protected isShowSelectForm: boolean = false;
    @observable Gengres: any[] = [];
    //@observable protected productIsNull: boolean = false;
    //@observable protected pointIsEnough: boolean = false;
    protected productIsNull = observable.box(false);
    protected pointIsEnough = observable.box(false);
    private currentInterval: string;
    private themeName: string = '积分商城';
    private tabs: TabProp[];
    protected none: JSX.Element = <div className="my-4 text-secondary d-flex justify-content-center">『 暂无可兑换产品 』</div>;
    rankInterval: any = [
        { caption: '1万以下', state: 'below', icon: 'superpowers', borderC: '#2c93ad' },
        { caption: '1-5万', state: 'firstLevel', icon: 'superpowers', borderC: '#3CC43C' },
        { caption: '5-15万', state: 'twoLevel', icon: 'superpowers', borderC: '#7c1e5e' },
        { caption: '15万以上', state: 'above', icon: 'superpowers', borderC: '#0e2c8c' },
    ];

    header() {
        return this.isWebNav === true ? <div>{this.themeName}</div> : this.themeName;
    }

    right() {
        let right = this.controller.renderSelectedLable();
        return <>{right}</>;
    }

    init(param?:any) {
        if (param) this.themeName = param?.name;
        let { pointProductGenre } = this.controller;
        this.Gengres = [{ id: null, name: "商城首页" },{ id: 5002, name: "积分商城" }, ...pointProductGenre, ...Object.values(topicClumps)];
        
    };

    content() {
        return <this.page />;
    }

    /* async open(param?: any) {
        if (param) {
            this.themeName = param.name ? param.name : param;
            await this.controller.getPointProductByDifferentPlot(param);
        }
        this.openPage(this.page);
    } */
    private getTabs = async () => {
        let { getPointsIntervalProducts } = this.controller;
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
                    this.controller.pointProducts = await getPointsIntervalProducts(this.currentInterval);
                }
            };
        });
    }

    private TabCaptionComponent = (label: string, icon: string, borderC: string, color: string) => <div
        className={'py-2 d-flex justify-content-center align-items-center flex-column cursor-pointer '}>
        <small className="w-4c text-center rounded-sm font-weight-bold" style={{ color: borderC, border: `1px solid ${borderC}`, background: color }}>{label}</small>
    </div>;

    protected renderList = (isToDetail?: boolean) => {
        let { pointProducts } = this.controller;
        return <div style={{ background: `url(${triangleShadingO}) no-repeat 99% 230px,url(${triangleShadingO}) no-repeat 1% 480px`, backgroundSize: '2.5%' }}>
            <List items={pointProducts} item={{
                render: this.renderPointProduct,
                className: 'col-6 col-md-4 col-lg-3 px-3 bg-transparent'
            }} none={this.none}
                className={`${pointProducts.length !== 0 ? 'row mx-0 mt-2 bg-transparent' : ''}`}
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
            // point: { visible: false },
            // imageUrl: { visible: false },
        }
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product } = pointProduct;
        return <>
            {tv(product, (v) => {
                let cProductUI: JSX.Element = <><div title={v.description} className={classNames("w-100 cus-height", this.isShowSelectForm ? "z-height" : "")}>
                    <PointProductImage chemicalId={v.imageUrl} className="w-100 h-100" style={{ border: `2px solid ${randomColor()}` }} />
                </div>
                    <div className="small w-100">
                        <div className="text-truncate w-100">{v.descriptionC}</div>
                        <>
                            {
                                this.isShowSelectForm
                                    ? <div className="w-100 d-flex justify-content-between align-items-right mt-1">
                                        <small className="align-self-center mb-3 text-primary" ><FA name="shopping-bag" size='2x' /></small>
                                        <Form schema={schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                                    </div>
                                    : null
                            }
                            <div className='d-flex'>
                                <img src={pointIcon} alt="" style={{ height: 24 }} />
                                <span className="text-danger h5 m-0 ml-1 align-self-end"> {v.point}</span>
                            </div>
                        </>
                    </div></>;
                let ProductUI: JSX.Element = this.isShowSelectForm ? cProductUI : <Ax href={"/pointshop/product/" + v.id} >{cProductUI}</Ax>;
                return <div className="w-100 d-flex flex-column mb-4">
                   {ProductUI}
                </div>
            })}
        </>
    }

    protected openExchangeOrder = async () => {
        // 未选择产品
        let { pointToExchanging, myEffectivePoints } = this.controller;

        if (pointToExchanging < 1) {
            this.productIsNull.set(true);
            this.pointIsEnough.set(false);
            //setTimeout(() => this.productIsNull = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        // 积分不足
        if (pointToExchanging > myEffectivePoints) {
            this.productIsNull.set(false);
            this.pointIsEnough.set(true);
            //setTimeout(() => this.pointIsEnough = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        this.controller.openExchangeOrder();
    }

    protected getRelatedUI = () => {
        let { pointToExchanging, myEffectivePoints } = this.controller;
        /*
        let productIsNullTip = this.productIsNull ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" />未选择产品</div>
            : null;
        let pointIsEnoughTip = this.pointIsEnough ?
            <div className="text-danger small m-0 p-0"><FA name="exclamation-circle" />积分不足<br />剩余{myEffectivePoints}分</div>
            : null;
        */
        let footer = <div className="d-block">
            <div className="w-100 px-3 d-flex justify-content-between">
                <div>总计:<span className="text-danger ml-2 mr-1 h2" >{pointToExchanging}</span>分</div>
                <div>
                    {/*productIsNullTip*/autoHideTips(this.productIsNull, <div className="text-danger small my-2"><FA name="exclamation-circle" />未选择产品</div>)}
                    {/*pointIsEnoughTip*/autoHideTips(this.pointIsEnough, <div className="text-danger small m-0 p-0"><FA name="exclamation-circle" />积分不足<br />剩余{myEffectivePoints}分</div>)}
                </div>
                <button type="button" className="btn btn-danger m-1" style={{backgroundColor:'#dc3545'}} onClick={this.openExchangeOrder}>去兑换</button>
            </div>
        </div>;
        return footer;
    }

    protected page = observer(() => {
        this.getTabs();
        return <div className="row mx-0 mt-1">
            <div className="col-md-3 d-none d-md-block py-0 py-md-2 mb-0 mb-md-4">
                {this.controller.renderShopSideBar()}
            </div>
            <div className="col-md-9 px-0 px-md-1">
                {
                    this.themeName === '积分商城'
                        ? <Tabs tabs={this.tabs} tabPosition="top" size="lg" />
                        : <>
                            {/* {TopicDivision(this.themeName)} */}
                            {this.renderList()}
                        </>
                }
            </div>
        </div>
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
        let { pointProductsSelected } = this.controller;
        let footer = this.getRelatedUI();

        // let right = <div className="mr-2" onClick={clearSelectedPointsProducts}><FA name="trash-o" className='text-light' /></div>;
        // let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 已清空您所选择的产品 』</div>;
        return <Page header='已选择兑换产品' right={<></>} footer={footer} >
            <List
                items={pointProductsSelected}
                item={{
                    render: this.renderPointProduct,
                    className: 'col-6 col-md-4 col-lg-3 px-3 bg-transparent'
                    // className: "w-50 px-3"
                }}
                none={this.none}
                className='row mx-0 mt-2 bg-transparent'
            // className="d-flex flex-wrap bg-transparent mt-2"
            />
        </Page >
    })
}