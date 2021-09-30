import * as React from 'react';
import { VPage, Page, EasyDate } from "tonva-react";
import { CPointProduct } from './CPointProduct';
import { tv, List } from "tonva-react";
import { OrderItem } from './pointOrder';
import { PointProductImage } from 'tools/productImage';

const OrderState: { [state: string]: string } = {
    '$':'$',
    'matching':'matching',
    'shipping':'配送中',
    'canceled':'此订单已取消',
}

export class VExchangeHistoryDetail extends VPage<CPointProduct> {

    async open(order: any) {

        this.openPage(this.page, order);
    }

    private renderexchangeItem = (orderItem: OrderItem) => {
        let { product, pack, quantity, point } = orderItem;
        return <>
            {tv(product, (v) => {
                return <div className="row m-1 w-100">
                    <div title={v.description} className="col-4 m-0 p-0"><PointProductImage chemicalId={v.imageUrl} className="w-100" style={{maxHeight:"23vw"}} /></div>
                    <div className="col-8 small">
                        <div><label>{v.descriptionC}</label></div>
                        <div className="d-flex justify-content-between my-3">
                            <div className="mt-1"><b>{pack ? <>{tv(pack, (c) => <>{c.radioy}{c.unit}</>)}</> : v.grade}</b></div>
                            <div>
                                <span className="text-danger h6">{(point * quantity)}</span>
                                <small className="text-muted">分 ({point} × {quantity})</small>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>;
    }

    private page = (order: any) => {
        let { outWardOrderByJD, openExchangeOrderTrack } = this.controller;
        let { brief, data } = order;
        let { no, date,state } = brief;
        let { exchangeItems, shippingContact, amount } = data;
        let orderState: string = state === 'canceled' ? '此订单已取消' : ''; // OrderState[state || '$'];
        let header = <>订单详情: {no}</>;
        let OrderTrackBtn: any;
        if (outWardOrderByJD)
            OrderTrackBtn = <div className="bg-white p-3 my-1 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={openExchangeOrderTrack}>查看物流</button>
            </div>;
        return <Page header={header}>
            <List items={exchangeItems} item={{ render: this.renderexchangeItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">收货地址:</div>
                <div className="col-9">{tv(shippingContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white p-3 my-1 d-flex justify-content-between">
                <strong>{ orderState }</strong>
                <span className="text-danger font-weight-bold">总积分: {amount}</span>
            </div>
            {OrderTrackBtn}
        </Page>
    }
}
