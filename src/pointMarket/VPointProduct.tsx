import * as React from 'react';
import { VPage, Page, Form, List, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, FA, Tabs, TabProp, TabCaptionComponent, StringSchema } from 'tonva';
import { CPointProduct } from 'pointMarket/CPointProduct';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { color } from 'order/VMyOrders';
import { randomColor } from 'tools/randomColor';

export const renderHr = () => <div className="flex-fill px-2 text-primary"><hr style={{ backgroundColor: '#007bff', height: 1, border: 'none' }} /></div>;

export const schema = [
    // { name: 'product', type: 'object' } as ObjectSchema,
    // { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'description', type: 'string' } as StringSchema,
    { name: 'descriptionC', type: 'string' } as StringSchema,
    // { name: 'endDate', type: 'string' } as StringSchema,
    { name: 'grade', type: 'string' } as StringSchema,
    { name: 'id', type: 'number' } as NumSchema,
    { name: 'imageUrl', type: 'string' } as StringSchema,
    { name: 'point', type: 'number' } as NumSchema,
    { name: 'quantity', type: 'number' } as NumSchema,
    // { name: 'startDate', type: 'string' } as StringSchema,
];

export class VPointProduct extends VPage<CPointProduct> {
    @observable protected isShowSelectForm: boolean = false;
    @observable protected productIsNull: boolean = false;
    @observable protected pointIsEnough: boolean = false;
    private currentInterval: string;
    private themeName: string = '积分商城';
    private tabs: TabProp[];
    protected none: JSX.Element = <div className="mt-4 text-secondary d-flex justify-content-center">『 暂无可兑换产品 』</div>;
    rankInterval: any = [
        { caption: '1万以下', state: 'below', icon: 'superpowers' },
        { caption: '1万-5万', state: 'firstLevel', icon: 'superpowers ' },
        { caption: '5万-15万', state: 'twoLevel', icon: 'superpowers' },
        { caption: '15万以上', state: 'above', icon: 'superpowers' },
    ];
    async open(param?: any) {
        if (param) {
            this.themeName = param.name ? param.name : param;
            await this.controller.getPointProductByDifferentPlot(param);
        }
        this.openPage(this.page);
    }
    private getTabs = async () => {
        let { pointProducts, getPointsIntervalProducts, openPointProductDetail } = this.controller;
        this.tabs = this.rankInterval.map((v: any) => {
            let { caption, state, icon } = v;
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
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

    private TabCaptionComponent = (label: string, icon: string, color: string) => <div
        className={'py-2 d-flex justify-content-center align-items-center flex-column cursor-pointer ' + color}>
        <small className="px-2 rounded-sm" style={{ border: '1px solid #3CC43C' }}>{label}</small>
    </div>;

    protected renderList = (isToDetail?: boolean) => {
        let { pointProducts, openPointProductDetail } = this.controller;
        return <List items={pointProducts} item={{ render: this.renderPointProduct, onClick: openPointProductDetail, className: 'w-50 px-3' }} none={this.none}
            className={`${pointProducts.length !== 0 ? 'd-flex flex-wrap bg-transparent mt-2' : ''}`}
        ></List>
    }

    private uiSchema: UiSchema = {
        items: {
            // product: { visible: false },
            // pack: { visible: false },
            description: { visible: false },
            descriptionC: { visible: false },
            // endDate: { visible: false },
            grade: { visible: false },
            id: { visible: false },
            imageUrl: { visible: false },
            point: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.controller.onQuantityChanged as any
            } as UiCustom,
            // startDate: { visible: false },
        }
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product, pack, point, imageUrl, description, descriptionC } = pointProduct;
        // if (product) {
        //     return <>
        //         {tv(product, (v) => {
        //             return <div className="w-100 mx-4 d-flex flex-column mb-4">
        //                 <div title={v.description} className="w-100" style={{ height: '130px', border: `2px solid ${randomColor()}` }} ><PointProductImage chemicalId={imageUrl} className="w-100 h-100" /></div>
        //                 {tv(pack, (c) => {
        //                     return <div className="small w-100">
        //                         <div className="m-ng-lookmoretop w-100 my-1">{v.descriptionC}</div>
        //                         <>
        //                             <>
        //                                 <FA name='database' className="text-warning" />
        //                                 <span className="text-danger h5"> {point}</span><small>分</small>
        //                             </>
        //                             {
        //                                 this.isShowSelectForm
        //                                     ? <div className="w-100 d-flex justify-content-end align-items-right mt-1">
        //                                         <Form schema={schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
        //                                     </div>
        //                                     : null
        //                             }
        //                         </>
        //                     </div>
        //                 })}
        //             </div>
        //         })}
        //     </>
        // } else {
        return <div className="w-100 d-flex flex-column mb-4">
            <div title={description} className="w-100" style={{ height: '130px' }} ><PointProductImage chemicalId={imageUrl} className="w-100 h-100" /></div>
            <div className="small w-100">
                <div className="text-truncate w-100">{descriptionC}</div>
                <>
                    {
                        this.isShowSelectForm
                            ? <div className="w-100 d-flex justify-content-between align-items-right mt-1">{/* justify-content-end */}
                                <small className="align-self-center mb-3 text-primary" ><FA name="shopping-bag" size='2x' /></small>
                                <Form schema={schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                            </div>
                            : null
                    }
                    <>
                        <FA name='database' className="text-warning" />
                        <span className="text-danger h5"> {point}</span>{/* <small>分</small> */}
                    </>
                </>
            </div>
        </div>
        // }
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
        let { pointProducts, openPointProductDetail } = this.controller;
        this.getTabs();
        let right = this.controller.renderSelectedLable();
        return <Page header={this.themeName} right={right}>
            {
                this.themeName === '积分商城'
                    ? <Tabs tabs={this.tabs} tabPosition="top" />
                    : <>
                        {/* <div className="text-center w-100 py-2 px-2 text-primary d-flex justify-content-between align-items-center">
                            {renderHr()}{this.themeName}{renderHr()}
                        </div> */}
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
        return <Page header='已选择的产品' right={<></>} footer={footer} >
            <List
                items={pointProductsSelected}
                item={{ render: this.renderPointProduct, className: "w-50 px-3" }}
                none={this.none}
                className="d-flex flex-wrap bg-transparent mt-2"
            />
        </Page >
    })
}