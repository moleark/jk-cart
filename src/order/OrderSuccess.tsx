import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COrder } from './COrder';

export class OrderSuccess extends VPage<COrder> {

    async open(orderCreateResult: any) {

        this.openPage(this.page, orderCreateResult);
    }

    private page = (orderCreateResult: any) => {
        return <Page header="下单成功" back="close">
            <div className="p-3 bg-white mb-3">
                <div className="mb-3">下单成功，感谢您对百灵威的厚爱！</div>
                <p className="">
                    订单编号: <span className="h5 text-info">{orderCreateResult.no}</span><br /><br />
                    我们将立刻处理您的订单，请注意查收到货短信。
                </p>
            </div>
        </Page>
    }
}