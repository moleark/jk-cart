import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { COrder } from './COrder';
import { xs } from '../tools/browser';

export class OrderSuccess extends VPage<COrder> {

    async open(orderCreateResult: any) {

        this.openPage(this.page, orderCreateResult);
    }

    private page = (orderCreateResult: any) => {
        let header: any;
        if (xs) {
            header='下单成功'
        }
        return <Page header={header}>
            <div style={{textAlign: "center",paddingTop:"150px"}}>
                <p>下单成功，感谢您对百灵威的厚爱!<br/>
                订单编号:<span className="mint">{orderCreateResult.no}</span><br />
                我们会加紧处理，请注意查收短信。</p>
                <img src="images/shoppingcart.png" alt="" className="w-min-12c py-5 col-5 col-sm-4 " />
            </div>
        </Page>
        /* return <Page header="下单成功" back="close">
            <div className="py-4 px-3 bg-white mb-3 d-flex">
                <FA name="list-alt" className="text-success mr-3" size="4x" />
                <div>
                    <p className="text-primary"><span className="h4">下单成功！</span></p>
                    <p className="">
                        订单: <span className="h5 text-info">{orderCreateResult.no}</span><br /><br />
                        <span className="text-muted">我们会加紧处理，请注意查收短信。</span>
                    </p>
                </div>
            </div>
        </Page> */
    }
}