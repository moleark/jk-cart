import { List, LMR, Scroller, VPage } from "tonva-react";
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
        let {
            product, item, quantity, price, amount
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
        return <LMR className="px-3 py-3" right={right}>
            <div>
                product: {product} item: {item} quantity: {quantity} price: {price} amount: {amount}
            </div>
            <div>
                deliver: {deliver} return:{deliverReturn}                
            </div>
        </LMR>;
    }

    private onClickReturn = (row: ReturnGetCustomerReturnable$page) => {
        alert('退货 ' + row.product);
    }
}
