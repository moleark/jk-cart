import { FA, List, LMR, Scroller, VPage } from "tonva-react";
import { renderPackX } from "uq-app";
import { ReturnGetCustomerReturnable$page } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";

export class VMockReturn extends VPage<CTrial> {
    header() {return '模拟退货';}
    content() {
        return <div>
            <List items={this.controller.customerReturnablePager} item={{render: this.renderItem}} />
        </div>
    }

    protected async onPageScrollBottom(scroller: Scroller) {
        this.controller.customerReturnablePager.more();
    }

    private renderItem = (row: ReturnGetCustomerReturnable$page, index: number) => {
        let {JkProduct, JkOrder} = this.controller.uqs;
        let {ProductX} = JkProduct;
        let PackX = ProductX.div('packx');
        let lastRow = this.controller.customerReturnablePager.items[index-1];
        let lastMain = lastRow?.main;
        let {
            main, product, item, quantity, price, amount
            , deliver, deliverDone, deliverTime, deliverReturn, deliverReturnDone
        } = row;
        deliverReturn = deliverReturn ?? 0;
        let right:any;
        if (deliver > deliverReturn) {
            right = <button 
                className="btn btn-sm btn-outline-info align-self-start"
                onClick={() => this.onClickReturn(row)}>
                退货
            </button>;
        }
        let orderHeader:any;
        if (main !== lastMain) {
            orderHeader = <div className="mt-3 px-2 py-2 border-bottom">
                <FA className="me-2 text-success" name="file-text-o" size="lg" />
                {JkOrder.IDRender(main)}
            </div>;
        }
        return <div className="d-block bg-light">
            {orderHeader}
            <LMR className="px-3 py-3 bg-white" right={right}>
                <div>{ProductX.tv(product)}</div>
                <div>{PackX.tv(item, renderPackX)}</div>
                <div>
                    数量<span className="fs-5 text-primary ms-2 me-5">{deliver - deliverReturn}</span>
                    {deliverReturn>0 && <>
                        <small className="text-muted me-2">订单</small>{quantity}
                        <small className="text-muted ms-3 me-2">已退</small>{deliverReturn}
                    </>}
                </div>
                <div>
                    price: {price} &nbsp; amount: {amount} 
                </div>
            </LMR>
        </div>;
    }

    private onClickReturn = (row: ReturnGetCustomerReturnable$page) => {
        this.controller.showOrderReturn(this.controller.mockCustomer, row.main);
    }
}
