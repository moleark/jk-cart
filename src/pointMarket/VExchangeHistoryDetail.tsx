import * as React from 'react';
import { VPage, Page, EasyDate } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { tv, List } from 'tonva';
import { OrderItem } from './pointOrder';
import { PointProductImage } from 'tools/productImage';
import { xs } from 'tools/browser';

export class VExchangeHistoryDetail extends VPage<CPointProduct> {

    async open(order: any) {

        this.openPage(this.page, order);
    }

    private renderexchangeItem = (orderItem: OrderItem) => {
        let { product, pack, quantity, point } = orderItem;
        return <>
            {tv(product, (v) => {
                return <div className="row m-1 w-100">
                    <div title={v.description} className="col-4 m-0 p-0"><PointProductImage chemicalId={v.imageUrl} className="w-100"  /></div>
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
        let { brief, data } = order;
        let { no, date } = brief;
        let { exchangeItems, shippingContact, amount } = data;

        let header:any = <>订单详情: {no}</>
        if (!xs) header = '';
        return <Page header={header}>
            { !xs && <div className="alert alert-info alert-signin mt-3">订单编号 <a href="#" className="alert-link">{no}</a></div>}
            <List items={exchangeItems} item={{ render: this.renderexchangeItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">收货地址:</div>
                <div className="col-9">{tv(shippingContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white p-3 my-1 text-right">
                <span className="text-danger font-weight-bold">总积分: {amount}</span>
            </div>
        </Page>
    }
}
