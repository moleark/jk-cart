import * as React from 'react';
import { VPage, Page, FA, tv, Form, UiSchema, UiCustom } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { PointProductImage } from 'tools/productImage';
import { MinusPlusWidget } from 'tools';
import { schema } from './VPointProduct';

export class VPointProductDetail extends VPage<CPointProduct> {
    async open(param?: any) {
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
            // point: { visible: false },
            // imageUrl: { visible: false },
        }
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product } = pointProduct;
        return <>
            {tv(product, (v) => {
                return <div className="w-100 px-4">
                    <div title={v.description}><PointProductImage chemicalId={v.imageUrl} className="w-100" /></div>
                    <div className="small">
                        <div className="mt-2">{v.descriptionC}</div>
                        <div className="my-2">{v.grade}</div>
                        <div className="row m-0 p-0">
                            <div className="col-5 m-0 p-0">
                                <span className="text-danger h5">{v.point}</span>
                                <small>分</small>
                            </div>
                            <div className="col-7 d-flex justify-content-end align-items-right m-0 p-0">
                                <Form schema={schema} uiSchema={this.uiSchema} formData={pointProduct} className="mr-2" />
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
    }

    private page = observer((param: any) => {
        let { pointToExchanging, myEffectivePoints, pointProductsDetail } = this.controller;
        let availablePoints = (myEffectivePoints - pointToExchanging) >= 0 ? (myEffectivePoints - pointToExchanging) : 0;
        let pointsInsuffTip = availablePoints === 0 ? <span className="text-danger small">( <FA name="exclamation-circle" />积分不足 )</span> : null;
        let right = this.controller.renderSelectedLable();
        let footer = <div className="d-flex justify-content-between m-2">
            <div className="align-self-center">当前可用:<span className="text-danger h4" >{availablePoints}</span>分 {pointsInsuffTip}</div>
        </div>;

        return <Page header='产品详情' right={right} footer={footer}>
            <div className="nav-tabs">{this.renderPointProduct(pointProductsDetail)}</div>
            {/* html片段 */}
            <div dangerouslySetInnerHTML={{ __html: pointProductsDetail.htmlFragment ? pointProductsDetail.htmlFragment : '' }} className="w-100"></div>
        </Page>;
    });
}
