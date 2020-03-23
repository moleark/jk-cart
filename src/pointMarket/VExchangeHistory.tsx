import * as React from 'react';
import { VPage, Page, EasyDate } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { List } from 'tonva';
import { observer } from 'mobx-react-lite';

export class VExchangeHistory extends VPage<CPointProduct> {

    private exchangeHistory: any[] = [];        /*积分产品列表 */
    async open(param?: any) {
        this.exchangeHistory = param;
        this.openPage(this.page);
    }

    private renderExchangeHistory = (pointProduct: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date } = pointProduct;
        return <div className="p-3 justify-content-between">
            <div className="mr-5" onClick={() => openOrderDetail(id)}><span className="small text-muted">兑换单号: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
    }

    private page = observer(() => {
        return <Page header="兑换历史记录">
            <List items={this.exchangeHistory} item={{ render: this.renderExchangeHistory }} none="暂无记录"></List>
        </Page>;
    });
}