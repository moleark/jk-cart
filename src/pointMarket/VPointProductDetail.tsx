import * as React from 'react';
import { VPage, Page, FA, tv, Form, UiSchema, UiCustom } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { schema, TopicDivision } from './VPointProduct';
import giftPlate from 'images/giftPlate.png';
import { observable } from 'mobx';
import 已下架 from 'images/已下架.png';

export class VPointProductDetail extends VPage<CPointProduct> {
    @observable DetailSource: number;
    async open(param?: any) {
        this.DetailSource = param;
        this.openPage(this.page);
    }

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
            newStockRes: { visible: false },
            pointProductSource: { visible: false },
            // point: { visible: false },
            // imageUrl: { visible: false },
        }
    }

    private renderVDefaultPost = () => {
        return this.controller.renderVDefaultPost();
    }

    protected renderPointProduct = () => {

        let { pointProductsDetail, cApp } = this.controller;
        let { currentUser } = cApp;
        let { product, OffShelf, newStockRes } = pointProductsDetail;
        let OffShelfTip: any = undefined;
        if (OffShelf) OffShelfTip = <div className="position-absolute" style={{ top: 0, left: 0 }}>
            <img src={已下架} alt="" style={{ width: '18vw' }} />
        </div>;
        // let stockDesc: string = newStockRes ? newStockRes.stockStateDesc :'';
        return <>
            {tv(product, (v) => {
                return <div className="w-100 px-4 position-relative">
                    {OffShelfTip}
                    <div title={v.description}><PointProductImage chemicalId={v.imageUrl} className="w-100 h-min-12c" style={{}} /></div>
                    <div className="small">
                        <div className="mt-2">{v.descriptionC}</div>
                        <div className="my-2">{v.grade}</div>
                        {/* <div className="my-2">{v.grade}<span className="float-right text-success font-weight-bolder">{stockDesc}</span></div> */}
                        <div className="row m-0 p-0">
                            <div className="col-5 m-0 p-0">
                                <span className="text-danger h5">{v.point}</span>
                                <small>分</small>
                            </div>
                            {/* <div className="col-7 d-flex justify-content-end align-items-right m-0 p-0">
                                {
                                    !OffShelf && currentUser?.hasCustomer
                                    ? <Form schema={schema} uiSchema={this.uiSchema} formData={pointProductsDetail} className="mr-2" />
                                    : null
                                }
                            </div> */}
                        </div>
                    </div>
                </div>
            })}
        </>
    }

    private page = observer((param: any) => {
        let { pointToExchanging, myEffectivePoints } = this.controller;
        let availablePoints = (myEffectivePoints - pointToExchanging) >= 0 ? (myEffectivePoints - pointToExchanging) : 0;
        let pointsInsuffTip = availablePoints === 0 ? <span className="text-danger small">( <FA name="exclamation-circle" />积分不足 )</span> : null;
        let right = this.controller.renderSelectedLable(this.DetailSource);
        let footer = <div className="d-flex justify-content-between m-2">
            <div className="align-self-center">当前可用:<span className="text-danger h4" >{availablePoints}</span>分 {pointsInsuffTip}</div>
        </div>;
        return <Page header='产品详情' right={right} footer={footer} className="bg-white">
            <div className="">{this.renderPointProduct()}</div>{/* nav-tabs */}
            <div className="d-flex mt-2"><img src={giftPlate} alt="" className="m-auto w-75" /></div>
            {/* {pointProductsDetail.htmlFragment
                ? <div className="mx-2 mt-1">
                    {TopicDivision('产品介绍')}
                    <div dangerouslySetInnerHTML={{ __html: pointProductsDetail.htmlFragment }} className="w-100"></div>
                </div>
                : <>{this.renderVDefaultPost()}</>
            } */}
        </Page>;
    });
}
