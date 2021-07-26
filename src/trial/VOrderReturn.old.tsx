import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { FA, InputCheckBox, InputNumber, List, LMR, Page, uqStringify, VPage } from "tonva-react";
import { renderPackX } from "uq-app";
import { OrderMain, ResultGetCustomerOrderReturn, ReturnGetCustomerOrderReturnDetail } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";

class DetailNumber {
    detail: ReturnGetCustomerOrderReturnDetail;
    visible: boolean = false;
    hasError: boolean = false;
    nRet: number = 0;
    constructor(detail: ReturnGetCustomerOrderReturnDetail) {
        this.detail = detail;
        makeObservable(this, {
            nRet: observable,
            visible: observable,
        });
    }
}

class MOrderReturn {
    buttonDisabled: boolean = true;
    main: OrderMain;
    detail: DetailNumber[];
    constructor(params: ResultGetCustomerOrderReturn) {
        this.main = params.main[0];
        this.detail = (params.detail as any[]).map(v => new DetailNumber(v));
        makeObservable(this, {
            buttonDisabled: observable,
            selectDetail: action,
            refreshButtonDisable: action,
        });
    }

    getRetrunDetails(): {orderDetail:ReturnGetCustomerOrderReturnDetail, retQuantity:number}[] {
        return this.detail.filter(v => v.nRet > 0).map(v => ({
            orderDetail: v.detail,
            retQuantity: v.nRet
        }));
    }

    selectDetail(isSelected: boolean, detailNum: DetailNumber) {
        detailNum.visible = isSelected;
        detailNum.nRet = isSelected? detailNum.detail.quantity : 0;
        this.refreshButtonDisable();
    }

    refreshButtonDisable() {
        for (let d of this.detail) {
            let {visible, nRet, hasError} = d;
            if (visible === true && (hasError === true || !(nRet > 0))) {
                this.buttonDisabled = true;
                return;
            }
        }
        this.buttonDisabled = false;
    }
}

export class VOrderReturn extends VPage<CTrial> {
    private mOrderReturn: MOrderReturn;
    init(params: any) { this.mOrderReturn = new MOrderReturn(params);}
    header() {return '退货'}
    content() {
        let {main, detail} = this.mOrderReturn;
        return <div>
            <div className="px-3 py-3">
                <FA className="me-3 text-success" name="file-text-o" size="2x" />
                {uqStringify(main)}
            </div>
            <div className="text-warning bg-white px-3 pt-3 pb-1 border-bottom">请点选退货条目</div>
            <List items={detail} item={{render: this.renderDetail}} />
            <div className="p-3">
                {
                    React.createElement(observer(() => {
                        let {buttonDisabled} = this.mOrderReturn;
                        return <button className="btn btn-outline-primary"
                            disabled={buttonDisabled}
                            onClick={this.onNext}>下一步</button>;
                    }))
                
                }
            </div>
        </div>
    }

    private onNext = () => {
        let d = this.mOrderReturn.getRetrunDetails();
        this.openVPage(VOrderReturnReady, d);
    }

    private renderDetail = (detailNum:DetailNumber, index:number) => {
        let {JkProduct} = this.controller.uqs;
        let {ProductX} = JkProduct;
        let PackX = ProductX.div('packx');
        let {detail, visible, nRet} = detailNum;
        let {
            main, product, item, quantity, price, amount
            , deliver, deliverDone, deliverTime, deliverReturn, deliverReturnDone
        } = detail;
        deliverReturn = deliverReturn ?? 0;
        let returnable = quantity - deliverReturn;
        let defaultReturn = 1;
        return <div className="bg-white">
            <label className="p-3">
                <InputCheckBox 
                    className="form-check-input p-2"
                    onValueChange={(v, p, ruleMessage) => this.onSelectChanged(v, detailNum)}
                    disabled={!(deliver > deliverReturn)} />
            </label>
            <div className="py-3 pe-3">
                <div>{ProductX.tv(product)}</div>
                <div>{PackX.tv(item, renderPackX)}</div>
                <div>
                    数量<span className="fs-5 text-primary ms-2 me-5">{returnable}</span>
                    {
                        deliverReturn>0 && <>
                            <small className="text-muted me-2">订单</small>{quantity}
                            <small className="text-muted me-2 ms-3">已退</small>{deliverReturn}
                        </>
                    }
                </div>
                <div>
                    price: {price} &nbsp; amount: {amount} 
                </div>
                {
                    visible && <div className="py-3">
                        <span className="text-muted me-3">退货数量</span>
                        <InputNumber onValueChange={(v, p, ruleMessage) => this.onValueChange(v, p, ruleMessage, detailNum)}
                            required={true} requiredFlagElement={null}
                            className="form-control w-8c d-inline text-right"
                            defaultValue={defaultReturn}
                            max={returnable}
                            min={0} />
                    </div>
                }
            </div>
        </div>;
    }

    private onValueChange(value:any, p:any, ruleMessage:string, detailNum:DetailNumber) {
        detailNum.nRet = value;
        if (ruleMessage) {
            detailNum.hasError = true;
        }
        else {
            detailNum.hasError = false;
        }
        this.mOrderReturn.refreshButtonDisable();
    }

    private onSelectChanged = (isSelected: boolean, detailNum: DetailNumber) => {
        this.mOrderReturn.selectDetail(isSelected, detailNum);
    }
}

class VOrderReturnReady extends VPage<CTrial> {
    private returnDetail: {orderDetail:ReturnGetCustomerOrderReturnDetail, retQuantity:number}[];
    init(params: any) { this.returnDetail = params; }
    header() {return '确认退货'}
    content() {
        return <div>
            <List items={this.returnDetail} item={{render: this.renderDetail}} />
            <div className="p-3 d-flex justify-content-between">
                <button className="btn btn-primary" onClick={this.applyReturn}>
                    提交退货申请
                </button>
                <button className="btn btn-outline-info" onClick={() => this.closePage()}>
                    <FA name="angle-left" className="me-2" />上一步
                </button>
            </div>
        </div>;
    }

    private applyReturn = async () => {
        let data: {
            orderDetail: number;
            quantity: number;
        }[] = this.returnDetail.filter(v => v.retQuantity > 0).map(v => ({
            orderDetail: v.orderDetail.id,
            quantity: v.retQuantity
        }));
        await this.controller.applyReturn(data);
        this.closePage(3);
        this.openPageElement(<Page header="退货申请提交成功" back="close">
            <div className="p-3">退货申请提交成功</div>
        </Page>);
    }

    private renderDetail = (row:{orderDetail:ReturnGetCustomerOrderReturnDetail, retQuantity:number}, index:number) => {
        let {JkProduct} = this.controller.uqs;
        let {ProductX} = JkProduct;
        let PackX = ProductX.div('packx');
        let {orderDetail, retQuantity} = row;
        let {
            main, product, item, quantity, price, amount
            , deliver, deliverDone, deliverTime, deliverReturn, deliverReturnDone
        } = orderDetail;
        deliverReturn = deliverReturn ?? 0;
        return <div className="d-block bg-white py-3 px-3">
            <div>{ProductX.tv(product)}</div>
            <div>{PackX.tv(item, renderPackX)}</div>
            <div>
                退货数量<span className="fs-5 text-primary ms-2 me-5">{retQuantity}</span>
                <small className="text-muted ms-3 me-2">订单: </small>{deliver}
                {deliverReturn>0 && <><small className="text-muted ms-3 me-2">已退</small>{deliverReturn}</>}
            </div>
            <div>
                price: {price} &nbsp; amount: {amount} 
            </div>
        </div>;
    }
}
