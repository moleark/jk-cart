import * as React from 'react';
import { VPage, Page, EasyDate, tv, List } from 'tonva-react';
import { CPointProduct } from './CPointProduct';
import { OrderItem } from './pointOrder';
import { PointProductImage } from 'tools/productImage';
import { xs } from 'tools/browser';
const ExchangeState: { [state: string | number]: string } = {
    12: "待发运",
    13: "已发运",
    14: "已完成",
    15: "已取消",
    "canceled": "已取消",
};

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

    exchangeTransportation = async (transportation: any) => {
        let { cApp } = this.controller;
        await cApp.cOrder.openOrderTrans(transportation);
    }

    private renderexchangeItem = (orderItem: OrderItem) => {
        let { product, pack, quantity, point, param } = orderItem;
        let transportation: any;
        if (param?.transportation) {
            let { carrier, waybillNumber } = param.transportation;
            transportation = {transNumber: waybillNumber, expressLogistics: carrier};
        };
        let exchangeTransUI: JSX.Element;
        if (transportation) exchangeTransUI = <div className="text-right" >
            <button onClick={() => { this.exchangeTransportation(transportation) }} className="btn btn-sm btn-outline-primary" >查看物流</button>
        </div>;
        return <>
            {tv(product, (v) => {
                return <div className="row m-1 w-100">
                    <div title={v.description} className="col-4 col-sm-3 col-lg-2 m-0 p-0"><PointProductImage chemicalId={v.imageUrl} className="w-100"  /></div>
                    <div className="col-8 col-sm-9 col-lg-10 small">
                        <div><label>{v.descriptionC}</label></div>
                        <div className="d-flex justify-content-between my-3">
                            <div className="mt-1"><b>{pack ? <>{tv(pack, (c) => <>{c.radioy}{c.unit}</>)}</> : v.grade}</b></div>
                            <div>
                                <span className="text-danger h6">{(point * quantity)}</span>
                                <small className="text-muted">分 ({point} × {quantity})</small>
                            </div>
                        </div>
                        {exchangeTransUI}
                    </div>
                </div>
            })}
        </>;
    }

    private page = (order: any) => {
        let { outWardOrderByJD, openExchangeOrderTrack } = this.controller;
        let { brief, data } = order;
        let { no, date, state } = brief;/* state: "canceled" */
        let { exchangeItems, shippingContact, amount } = data;
        let statestr: string = ExchangeState[state];
        let header: any = <>订单详情: {no} {statestr ? `(${statestr})` : "" }</>
        if (!xs) header = '';
        let UI_CON_state = statestr ? <b className="float-right h5 text-danger">兑换单{statestr}</b> : <></>;
        return <Page header={header}>
            { !xs && <div className="alert alert-info alert-signin mt-3">订单编号 <a href="#" className="alert-link">{no}</a>  {UI_CON_state}</div>}
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
