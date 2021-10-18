import * as React from 'react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, tv, List, LMR, FA, autoHideTips } from "tonva-react";
import { COrder } from './COrder';
import { OrderItem } from './Order';
import { CartPackRow } from '../cart/Cart';
import classNames from 'classnames';
import { GLOABLE } from 'cartenv';

export class VCreateOrder extends VPage<COrder> {

    private useShippingAddress: boolean = true;
    private shippingAddressIsBlank: boolean = false;
    private invoiceAddressIsBlank: boolean = false;
    private invoiceIsBlank: boolean = false;
   
    shippingAddressTip = observable.box();
	invoiceAddressTip = observable.box();
	invoiceTip = observable.box();
    comBininvoiceTip = observable.box();

    fromOrderParam: string;
    orderDraftBrief: any;

    constructor(c: COrder) {
        super(c);

        makeObservable<VCreateOrder, "useShippingAddress" | "shippingAddressIsBlank" | "invoiceAddressIsBlank" | "invoiceIsBlank">(this, {
            useShippingAddress: observable,
            shippingAddressIsBlank: observable,
            invoiceAddressIsBlank: observable,
            invoiceIsBlank: observable,
            fromOrderParam: observable,
            orderDraftBrief: observable
        });
    }

    async open(param: any) {
        let { exOrderContact } = this.controller;
        this.fromOrderParam = param.fromOrderParam;
        this.orderDraftBrief = param.orderDraftBrief;
        await exOrderContact();
        this.openPage(this.page, param);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    private packsRow = (item: CartPackRow, index: number) => {
        let { pack, quantity, retail, price, priceInit } = item;

        let retailUI: any;
        if (price !== retail) {
            retailUI = <del>¥{retail * quantity}</del>;
        }
        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
            <div>{this.controller.cApp.cProduct.renderDeliveryTime(pack)}</div>
        </div>;
    }

    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        let { controller, packsRow } = this;
        return <div>
            <div className="row">
                <div className="col-lg-6 pb-3">{controller.renderOrderItemProduct(product)}</div>
                <div className="col-lg-6">{
                    packs.map((p, index) => {
                        return packsRow(p, index);
                    })
                }</div>
            </div>
        </div>;
    }

    private orderItemKey = (orderItem: OrderItem) => {
        return orderItem.product.id;
    }

    private renderCoupon = observer((param: any) => {
        let { couponAppliedData, hasAnyCoupon, removeCoupon } = this.controller;
        if (couponAppliedData['id'] === undefined) {
            let tip = hasAnyCoupon ? "有可用优惠卡/券，点击使用" : "输入优惠券/积分码";
            return <span className="text-primary">{tip}</span>;
        } else {
            let { code, types } = couponAppliedData;
            let { couponOffsetAmount, couponRemitted, point } = param;
            let offsetUI, remittedUI, noOffsetUI;
            let cancelCouponUI = <div
                className="position-absolute text-primary border text-center border-primary dropdown-menu-right rounded-circle"
                style={{ border: 1, cursor: 'pointer', width: 19, height: 19, lineHeight: 1, top: 5, right: 5 }}
                onClick={(e) => { e.stopPropagation(); removeCoupon(); }}
            >&times;</div>
            if (types === "credits") {
                offsetUI = <div className="d-flex flex-row justify-content-between">
                    <div className="text-muted">积分:</div>
                    <div className="text-right text-danger">{point}<small>分</small></div>
                </div>
            }
            else if (couponOffsetAmount || couponRemitted) {
                if (couponOffsetAmount) {
                    offsetUI = <div className="d-flex flex-row justify-content-between">
                        <div className="text-muted">折扣:</div>
                        <div className="text-right text-danger"><small>¥</small>{couponOffsetAmount.toFixed(2)}</div>
                    </div>
                }
                if (couponRemitted) {
                    remittedUI = <div className="d-flex flex-row justify-content-between">
                        <div className="text-muted">抵扣:</div>
                        <div className="text-right text-danger"><small>¥</small>{couponRemitted.toFixed(2)}</div>
                    </div>
                }
            } else {
                noOffsetUI = <div>谢谢惠顾</div>;
            }
            return <div className="mr-2 position-relative border-primary border px-3 py-1 rounded">
                <div className="text-success">{code.substr(0, 4)} {code.substr(4)}</div>
                {offsetUI}
                {remittedUI}
                {noOffsetUI}
                {cancelCouponUI}
            </div>
        }
    });

    private onSubmit = async () => {
        let { orderData, exOrderContacts, exOrderContact } = this.controller;
        // 必填项验证
        let { shippingContact, invoiceContact, invoiceType, invoiceInfo } = orderData;
        let combinTip: string = "";
        if (!shippingContact) {
            this.shippingAddressTip.set('必须填写收货地址');
            combinTip = "必须填写收货地址;";
            /* this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return; */
        }
        /* if (!invoiceContact) {
            if (this.useShippingAddress) {
                orderData.invoiceContact = shippingContact;
                this.invoiceAddressIsBlank = false;
            } else {
                this.invoiceAddressIsBlank = true;
                setTimeout(() => this.invoiceAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
                return;
            }
        } */
        if (!invoiceContact && !this.useShippingAddress) {
            this.invoiceAddressTip.set('必须填写发票地址');
            combinTip += "必须填写发票地址;";
        };
        console.log('this.useShippingAddress ',this.useShippingAddress );
        
        if (this.useShippingAddress) {
            this.controller.orderData.invoiceContact = shippingContact; this.invoiceAddressTip.set(null);
        };

        if (!exOrderContacts) await exOrderContact();
        let { _shippingContact, _invoiceContact } = this.controller.exOrderContacts;
        let exOrderContactTip: string = "地址缺少手机号或Email,请补全";
        if (!_shippingContact) {
            this.shippingAddressTip.set("收货" + exOrderContactTip);
            combinTip += `收货${exOrderContactTip};`;
        };
        if (!_invoiceContact && !this.useShippingAddress) {
            this.invoiceAddressTip.set("发票" + exOrderContactTip);
            combinTip += `发票${exOrderContactTip};`;
        };
        if (!invoiceType || !invoiceInfo) {
            this.invoiceTip.set('必须填写发票信息');
            combinTip += "必须填写发票信息;";
            /* this.invoiceIsBlank = true;
            setTimeout(() => this.invoiceIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return; */
        };
        if (invoiceType && invoiceInfo) {
            let invoiceInfoO: any = await invoiceInfo.assure();
            let { taxNo, address, telephone, bank, accountNo } = invoiceInfoO.obj;
            let validInvoice = invoiceType.id === 1 ? !taxNo : (!taxNo || !address || !telephone || !bank || !accountNo);
            if (validInvoice) {
                this.invoiceTip.set('您的发票信息不全,请补全发票信息;');
                combinTip += "您的发票信息不全,请补全发票信息;";
            };
        };
        if (combinTip !== "") {
            this.comBininvoiceTip.set(combinTip);
            return;
        };
        await this.controller.submitOrder(this.orderDraftBrief);
    }

    renderTip = (tip:string) => <div className="text-danger small my-2"><FA name="exclamation-circle" /> {tip}</div>;

    private page = observer((param: any) => {
        let { cApp, orderData, exOrderContacts, onSelectShippingContact, onSelectInvoiceContact,
            onInvoiceInfoEdit, onCouponEdit, addToCart, onCancel } = this.controller;
        let { currentUser } = cApp;

        let footer: any;
        if (this.fromOrderParam === "fromOrderDraft") {
            footer = <div className="w-100 d-flex justify-content-center py-2" >
                <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                    onClick={this.onSubmit} >确认</button>
                <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                    onClick={addToCart}>添加到购物车</button>
                <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                    onClick={() => onCancel(this.orderDraftBrief)}>取消</button>
            </div>
        } else
            footer = <div className="w-100 px-3 py-1" style={{ backgroundColor: "#f8f8f8" }}>
                {autoHideTips(this.comBininvoiceTip, <div className="alert alert-danger">{this.comBininvoiceTip.get()}</div>,5000)}
                <div className="d-flex justify-content-left">
                    <div className="text-danger flex-grow-1" style={{ fontSize: '1.8rem' }}><small>¥</small>{orderData.amount}</div>
                    <button type="button"
                        className={classNames('btn', 'w-30', { 'btn-danger': currentUser.allowOrdering, 'btn-secondary': !currentUser.allowOrdering })}
                        onClick={this.onSubmit} disabled={!currentUser.allowOrdering}>提交订单
                </button>
                </div>
            </div>;

        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />;
        let exOrderContactsUI: JSX.Element = <div className="text-danger font-weight-bold small">地址缺少手机号或Email,请补全</div>;
        /* let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.invoiceAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null; */

        let divInvoiceContact: any = null, invoiceExUI: JSX.Element = null;
        if (this.useShippingAddress === false) {
            if (orderData.invoiceContact !== undefined) {
                divInvoiceContact = <div className="col-8 col-sm-10 offset-4 offset-sm-2 d-flex">
                    {tv(orderData.invoiceContact, undefined, undefined, this.nullContact)}
                    <div onClick={onSelectInvoiceContact}>{chevronRight}</div>
                </div>;
                if (!exOrderContacts["_invoiceContact"]) {
                    invoiceExUI = <div className="col-8 col-sm-10 offset-4 offset-sm-2">{exOrderContactsUI}</div>
                }
            } else {
                divInvoiceContact = <div className="col-8 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary"
                        onClick={onSelectInvoiceContact}>选择发票地址</button>
                    {/* {invoiceAddressBlankTip} */}
                    {autoHideTips(this.invoiceAddressTip, this.renderTip(this.invoiceAddressTip.get()))}
                </div>
            }
        }

        let invoiceContactUI = <div className="row py页-3 bg-white mb-1">
            <div className="col-4 col-sm-2 pb-2 text-muted">发票地址:</div>
            <div className="col-8 col-sm-10">
                <div>
                    <label className="cursor-pointer">
                        <input type="checkbox"
                            defaultChecked={this.useShippingAddress}
                            onChange={e => {
                                this.useShippingAddress = e.currentTarget.checked;
                                orderData.invoiceContact = undefined;
                                // this.invoiceAddressIsBlank = false;
                                this.shippingAddressTip.set(null);
                            }} /> 同收货地址
                    </label>
                </div>
            </div>
            {divInvoiceContact}
            {invoiceExUI}
        </div>

        // let invoiceBlankTip = this.invoiceIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票信息</div> : null;
        let invoiceInfoUI = <div className="row py-3 bg-white mb-1" onClick={onInvoiceInfoEdit}>
            <div className="col-4 col-sm-2 pb-2 text-muted">发票信息:</div>
            <div className="col-8 col-sm-10">
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {tv(orderData.invoiceType, (v) => <>{v.description}</>, undefined, () => <span className="text-primary">填写发票信息</span>)}
                    {tv(orderData.invoiceInfo, (v) => <> -- {v.title}</>, undefined, () => <></>)}
                    {/* {invoiceBlankTip} */}
                    {autoHideTips(this.invoiceTip, this.renderTip(this.invoiceTip.get()))}
                </LMR>
            </div>
        </div>

        let freightFeeUI = <></>;
        let freightFeeRemittedUI = <></>;
        if (orderData.freightFee) {
            freightFeeUI = <>
                <div className="col-4 col-sm-2 pb-2 text-muted">运费:</div>
                <div className="col-8 col-sm-10 text-right text-danger"><small>¥</small>{orderData.freightFee}</div>
            </>
            if (orderData.freightFeeRemitted) {
                freightFeeRemittedUI = <>
                    <div className="col-4 col-sm-2 pb-2 text-muted">运费减免:</div>
                    <div className="col-8 col-sm-10 text-right text-danger"><small>¥</small>{orderData.freightFeeRemitted}</div>
                </>
            }
        }

        let couponUI = <div className="row py-3 bg-white mb-1" onClick={onCouponEdit}>
            <div className="col-4 col-sm-2 pb-2 text-muted">优惠卡券:</div>
            <div className="col-8 col-sm-10">
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {React.createElement(this.renderCoupon,
                        {
                            couponOffsetAmount: orderData.couponOffsetAmount,
                            couponRemitted: orderData.couponRemitted,
                            point: orderData.point
                        })}
                </LMR>
            </div>
        </div>

        return <Page header="订单预览" footer={footer}>
            <div className="px-2">
                <div className="row py-3 bg-white mb-1" onClick={onSelectShippingContact}>
                    <div className="col-4 col-sm-2 pb-2 text-muted">收货地址:</div>
                    <div className="col-8 col-sm-10">
                        <LMR className="w-100 align-items-center" right={chevronRight}>
                            {tv(orderData.shippingContact, undefined, undefined, this.nullContact)}
                            {orderData.shippingContact && !exOrderContacts["_shippingContact"] && exOrderContactsUI}
                        </LMR>
                        {/* {shippingAddressBlankTip} */}
                        {autoHideTips(this.shippingAddressTip,this.renderTip(this.shippingAddressTip.get()))}
                    </div>
                </div>
                {invoiceContactUI}
                {invoiceInfoUI}
            </div>
            <List items={orderData.orderItems} item={{ render: this.renderOrderItem, key: this.orderItemKey as any }} />
            <div className="px-2">
                <div className="row py-3 pr-3 bg-white my-1">
                    <div className="col-4 col-sm-2 pb-2 text-muted">商品总额:</div>
                    <div className="col-8 col-sm-10 text-right"><small>¥</small>{orderData.productAmounts}</div>
                    {freightFeeUI}
                    {freightFeeRemittedUI}
                </div >
                {couponUI}
            </div>
            {this.fromOrderParam === 'fromOrderDraft' ? <div className="bg-white p-3 my-1 d-flex justify-content-between">
                <div className="pb-2 text-success">制单人:{cApp.cOrderMaker.renderOrderMaker(orderData.orderMaker.id)}</div>
                <div className="text-danger">总金额:<small className="px-1">¥</small>{orderData.amount}</div>
            </div> : null}
        </Page>
    })
}