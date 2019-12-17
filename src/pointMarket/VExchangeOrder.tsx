import * as React from 'react';
import { VPage, nav, Page, LMR, FA, tv, List } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { PointProductImage } from 'tools/productImage';
import { GLOABLE } from 'cartenv';

export class VExchangeOrder extends VPage<CPointProduct> {
    @observable private shippingAddressIsBlank: boolean = false;

    async open(param?: any) {
        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    private renderPointProduct = (pointProduct: any, index: number) => {
        let { product, pack, quantity, point, imageUrl } = pointProduct;
        if (quantity > 0) {
            return <>
                {tv(product, (v) => {
                    return <div className="row m-1 w-100">
                        <div title={v.description} className="col-4 m-0 p-0"><PointProductImage chemicalId={imageUrl} className="w-100" /></div>
                        {tv(pack, (c) => {
                            return <div className="col-8 small">
                                <div>{v.descriptionC}</div>
                                <div className="d-flex justify-content-between my-3">
                                    <div className="mt-1"><b>{c.radioy}{c.unit}</b></div>
                                    <div>
                                        <span className="text-danger h5">{(point * quantity)}</span>
                                        <small className="text-muted">分 ({point} × {quantity})</small>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </>;
        }
    }

    private onSubmit = async () => {
        let { orderData } = this.controller;
        // 必填项验证
        let { shippingContact } = orderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        this.controller.submitOrder();
    }

    private page = observer(() => {
        let { pointProductsSelected, pointsSum, orderData, onSelectShippingContact } = this.controller;
        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />
        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;

        let footer = <div className="d-block">
            <div className="w-100 px-3 d-flex justify-content-between">
                <div>总计:<span className="text-danger ml-2 mr-1 h2" >{pointsSum}</span>分</div>
                <button type="button" className="btn btn-danger m-1" onClick={this.onSubmit}>确认兑换</button>
            </div>
        </div>;

        return <Page header="确认兑换信息" footer={footer}>
            <div className="px-2">
                <div className="row py-3 bg-white mb-1" onClick={onSelectShippingContact}>
                    <div className="col-3 text-muted pr-0">收货地址:</div>
                    <div className="col-9 col-sm-10">
                        <LMR className="w-100 align-items-center" right={chevronRight}>{tv(orderData.shippingContact, undefined, undefined, this.nullContact)}</LMR>
                        {shippingAddressBlankTip}
                    </div>
                </div>
            </div>
            <List items={pointProductsSelected} item={{ render: this.renderPointProduct }} ></List>
        </Page>
    })
}