import * as React from 'react';
import { VPage, Page, Form, List, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, FA, Tabs, TabProp, TabCaptionComponent } from 'tonva';
import { CPointProduct } from 'pointMarket/CPointProduct';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { color } from 'order/VMyOrders';

export class VPointProduct extends VPage<CPointProduct> {

    @observable private productIsNull: boolean = false;
    @observable private pointIsEnough: boolean = false;
    private currentInterval: string;
    private tabs: TabProp[];
    rankInterval: any = [
        { caption: '1万以下', state: 'below', icon: 'superpowers' },
        { caption: '1万-5万', state: 'firstLevel', icon: 'superpowers ' },
        { caption: '5万-15万', state: 'twoLevel', icon: 'superpowers' },
        { caption: '15万以上', state: 'above', icon: 'superpowers' },
    ];
    async open(param?: any) {
        this.openPage(this.page);
    }
    private getTabs = async () => {
        let { getPointsIntervalProducts, pointProducts } = this.controller;
        this.tabs = this.rankInterval.map((v: any) => {
            let { caption, state, icon } = v;
            let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 暂无可兑换产品 』</div>
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return <List items={pointProducts} item={{ render: this.renderPointProduct }} none={none}></List>
                },
                isSelected: this.currentInterval === state,
                load: async () => {
                    this.currentInterval = state;
                    pointProducts = await getPointsIntervalProducts(this.currentInterval);
                }
            };
        });
    }

    private schema = [
        { name: 'product', type: 'object' } as ObjectSchema,
        // { name: 'pack', type: 'object' } as ObjectSchema,
        { name: 'quantity', type: 'number' } as NumSchema,
        // { name: 'point', type: 'number' } as NumSchema,
        // { name: 'imageUrl', type: 'object' } as ObjectSchema,
    ];

    private uiSchema: UiSchema = {
        items: {
            product: { visible: false },
            // pack: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.controller.onQuantityChanged as any
            } as UiCustom,
            // point: { visible: false },
            // imageUrl: { visible: false }
        }
    }

    private renderPointProduct = (pointProduct: any, index: number) => {
        let { product } = pointProduct;
        // if (product) {
        return <>
            {tv(product, (v) => {
                return <div className="row m-1 w-100">
                    <div title={v.description} className="col-4 m-0 p-0"><PointProductImage chemicalId={v.imageUrl} className="w-100" /></div>
                    <div className="col-8 small">
                        <div>{v.descriptionC}</div>
                        <div className="my-2">{v.grade}</div>
                        {/* <div className="my-2">{c.radioy}{c.unit}</div> */}
                        <div className="row m-0 p-0">
                            <div className="col-5 m-0 p-0">
                                <span className="text-danger h5">{v.point}</span>
                                <small>分</small>
                            </div>
                            <div className="col-7 d-flex justify-content-end align-items-right m-0 p-0">
                                <Form schema={this.schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
        // } else {
        //     return <div className="row m-1 w-100">
        //         <div title={description} className="col-4 m-0 p-0"><PointProductImage chemicalId={imageUrl} className="w-100" /></div>
        //         <div className="col-8 small">
        //             <div>{descriptionC}</div>
        //             <div className="my-2">{grade}</div>
        //             <div className="row m-0 p-0">
        //                 <div className="col-5 m-0 p-0">
        //                     <span className="text-danger h5">{point}</span>
        //                     <small>分</small>
        //                 </div>
        //                 <div className="col-7 d-flex justify-content-end align-items-right m-0 p-0">
        //                     <Form schema={this.schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // }
    }

    private openExchangeOrder = async () => {
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

    private page = observer(() => {
        let { pointToExchanging, myEffectivePoints } = this.controller;
        this.getTabs();
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
        return <Page header="积分商城" footer={footer}>
            <>
                <Tabs tabs={this.tabs} tabPosition="top" />
                {/* <List items={pointProducts} item={{ render: this.renderPointProduct }} none="暂无可兑换产品"></List> */}
            </>
        </Page>;
    });
}