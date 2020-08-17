import * as React from 'react';
import { VPage, Page, EasyDate, FA, tv, Form, ObjectSchema, NumSchema, UiSchema, UiCustom } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { List } from 'tonva';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';

export class VPointProductDetail extends VPage<CPointProduct> {
    async open(param?: any) {
        this.openPage(this.page, { pointProduct: param });
    }
    private schema = [
        { name: 'product', type: 'object' } as ObjectSchema,
        { name: 'pack', type: 'object' } as ObjectSchema,
        { name: 'quantity', type: 'number' } as NumSchema,
        { name: 'point', type: 'number' } as NumSchema,
        { name: 'imageUrl', type: 'object' } as ObjectSchema,
    ];

    private uiSchema: UiSchema = {
        items: {
            product: { visible: false },
            pack: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.controller.onQuantityChanged as any
            } as UiCustom,
            point: { visible: false },
            imageUrl: { visible: false }
        }
    }
    
    protected renderPointProduct = (pointProduct: any) => {
        let { product, pack, point, imageUrl } = pointProduct;
        return <>
            {tv(product, (v) => {
                return <div className="w-100 px-4">
                    <div title={v.description}><PointProductImage chemicalId={imageUrl} className="w-100" /></div>
                    {tv(pack, (c) => {
                        return <div className="small">
                            <div className="mt-2">{v.descriptionC}</div>
                            <div className="my-2">{c.radioy}{c.unit}</div>
                            <div className="row m-0 p-0">
                                <div className="col-5 m-0 p-0">
                                    <span className="text-danger h5">{point}</span>
                                    <small>分</small>
                                </div>
                                <div className="col-7 d-flex justify-content-end align-items-right m-0 p-0">
                                    <Form schema={this.schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            })}
        </>
    }

    private page = observer((param: any) => {
        let { pointProduct } = param;
        let { pointToExchanging, myEffectivePoints } = this.controller;
        let right = this.controller.renderSelectedLable();
        let availablePoints = (myEffectivePoints - pointToExchanging) >= 0 ? (myEffectivePoints - pointToExchanging) : 0;
        let pointsInsuffTip = availablePoints === 0 ? <span className="text-danger small"><FA name="exclamation-circle" />( 积分不足 )</span> : null;
        let footer = <div className="d-flex justify-content-between m-2">
            <div className="align-self-center">当前可用:<span className="text-danger h4" >{availablePoints}</span>分 {pointsInsuffTip}</div>
        </div>;

        return <Page header='产品详情' right={right} footer={footer}>
            <div className="nav-tabs">{this.renderPointProduct(pointProduct)}</div>
            <div className="text-danger m-2">贴文 待开发</div>
        </Page>;
    });
}
