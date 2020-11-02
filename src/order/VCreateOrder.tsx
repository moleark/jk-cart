import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, tv, List, LMR, FA, autoHideTips } from 'tonva';
import { COrder } from './COrder';
import { OrderItem } from './Order';
import { CartPackRow } from '../cart/Cart';
import classNames from 'classnames';
//import { GLOABLE } from 'cartenv';

export class VCreateOrder extends VPage<COrder> {

    @observable private useShippingAddress: boolean = true;
    //@observable private shippingAddressIsBlank: boolean = false;
    //@observable private invoiceAddressIsBlank: boolean = false;
	//@observable private invoiceIsBlank: boolean = false;
	private shippingAddressTip = observable.box();
	private invoiceAddressTip = observable.box();
	private invoiceTip = observable.box();

    async open(param: any) {
        this.openPage(this.page);
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
            <div>{this.controller.renderDeliveryTime(pack)}</div>
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

    private onBuyerAccountChanged = () => {

    }

    private renderBuyerAccount = (item: any) => {
        let { buyerAccount } = item;
        return <div>{tv(buyerAccount, (v) => {
            let { id, description, organization } = v;
            return <>{description}{tv(organization, (o) => {
                return <>{o.name}</>
            }, undefined, () => null)}</>
        })}</div>
    }

    private renderBuyerAccounts = observer(() => {
        let { buyerAccounts } = this.controller;
        if (!buyerAccounts || buyerAccounts.length === 0) return null;
        return <div className="row py-3 bg-white mb-1">
            <div className="col-4 col-sm-2 pb-2 text-muted">订单账号:</div>
            <div className="col-8 col-sm-10">
                <List items={buyerAccounts} item={{ render: this.renderBuyerAccount, onSelect: this.onBuyerAccountChanged }}></List>
            </div>
        </div>
    })

    private onSubmit = async () => {
        let { orderData } = this.controller;
        // 必填项验证
		let { shippingContact, invoiceContact, invoiceType, invoiceInfo } = orderData;
		let renderTip = (tip:string) => <div className="text-danger small my-2"><FA name="exclamation-circle" /> {tip}</div>;
        if (!shippingContact) {
			this.shippingAddressTip.set(renderTip('必须填写收货地址'));
            //this.shippingAddressIsBlank = true;
            //setTimeout(() => this.shippingAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        if (!invoiceContact) {
            if (this.useShippingAddress) {
				orderData.invoiceContact = shippingContact; //contactBox;
				this.invoiceAddressTip.set(null);
                //this.invoiceAddressIsBlank = false;
            } else {
                //this.invoiceAddressIsBlank = true;
				//setTimeout(() => this.invoiceAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
				this.invoiceAddressTip.set(renderTip('必须填写发票地址'));
                return;
            }
        }
        if (!invoiceType || !invoiceInfo) {
            //this.invoiceIsBlank = true;
			//setTimeout(() => this.invoiceIsBlank = false, GLOABLE.TIPDISPLAYTIME);
			this.invoiceTip.set(renderTip('必须填写发票信息'));
            return;
        }

        this.controller.submitOrder();
    }

    private page = observer(() => {

        let { cApp, orderData, onSelectShippingContact, onSelectInvoiceContact, onInvoiceInfoEdit, onCouponEdit } = this.controller;
		let { currentUser } = cApp;
		let { allowOrdering } = currentUser;
        let footer = <div className="w-100 px-3 py-1" style={{ backgroundColor: "#f8f8f8" }}>
            <div className="d-flex justify-content-left">
                <div className="text-danger flex-grow-1" style={{ fontSize: '1.8rem' }}><small>¥</small>{orderData.amount}</div>
                <button type="button"
                    className={classNames('btn', 'w-30', { 'btn-danger': allowOrdering, 'btn-secondary': !allowOrdering })}
                    onClick={this.onSubmit} disabled={!allowOrdering}>提交订单
                </button>
            </div>
        </div>;

        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />
		/*
        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.invoiceAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null;
		*/
        let divInvoiceContact: any = null;
        if (this.useShippingAddress === false) {
            if (orderData.invoiceContact !== undefined) {
                divInvoiceContact = <div className="col-8 col-sm-10 offset-4 offset-sm-2 d-flex">
                    {tv(orderData.invoiceContact, undefined, undefined, this.nullContact)}
                    <div>{chevronRight}</div>
                </div>
            } else {
                divInvoiceContact = <div className="col-8 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary"
                        onClick={onSelectInvoiceContact}>选择发票地址</button>
                    {/*invoiceAddressBlankTip*/}
					{autoHideTips(this.invoiceAddressTip)}
                </div>
            }
		}
		
		let labeled = (label:string, content:JSX.Element, contentClass?:string):JSX.Element => {
            return <>
				<div className="col-4 col-sm-2 pb-2 text-muted">{label}</div>
            	<div className={classNames('col-8 col-sm-10', contentClass)}>{content}</div>
			</>;
		};
		let renderPrice = (price:number, className?:string) => {
			return <span className={classNames('text-right', className)}><small>¥</small>{price}</span>;
		}

        let invoiceContactUI = <div className="row py-3 bg-white mb-1">
			{labeled('发票地址:', <label className="cursor-pointer">
				<input type="checkbox"
					defaultChecked={this.useShippingAddress}
					onChange={e => {
						this.useShippingAddress = e.currentTarget.checked;
						orderData.invoiceContact = undefined;
						//this.invoiceAddressIsBlank = false;
						this.shippingAddressTip.set(null);
					}} /> 同收货地址
			</label>)}
            {divInvoiceContact}
        </div>
		/*
		            <div className="col-4 col-sm-2 pb-2 text-muted">发票地址:</div>
					<div className="col-8 col-sm-10">
						<div>
							<label className="cursor-pointer">
								<input type="checkbox"
									defaultChecked={this.useShippingAddress}
									onChange={e => {
										this.useShippingAddress = e.currentTarget.checked;
										orderData.invoiceContact = undefined;
										//this.invoiceAddressIsBlank = false;
										this.shippingAddressTip.set(null);
									}} /> 同收货地址
							</label>
						</div>
					</div>
		*/

        //let invoiceBlankTip = this.invoiceIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票信息</div> : null;
        let invoiceInfoUI = <div className="row py-3 bg-white mb-1" onClick={onInvoiceInfoEdit}>
            {labeled('发票信息:',
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {tv(orderData.invoiceType, (v) => <>{v.description}</>, undefined, () => <span className="text-primary">填写发票信息</span>)}
                    {tv(orderData.invoiceInfo, (v) => <> -- {v.title}</>, undefined, () => <></>)}
                    {/*invoiceBlankTip*/}
					{autoHideTips(this.invoiceTip)}
                </LMR>)}
        </div>

        let freightFeeUI = <></>;
		let freightFeeRemittedUI = <></>;
		let {freightFee, freightFeeRemitted} = orderData;
        if (freightFee) {
            freightFeeUI = labeled('运费:', renderPrice(freightFee, 'text-danger'));
            if (freightFeeRemitted) {
                freightFeeRemittedUI = labeled('运费减免:', renderPrice(freightFeeRemitted, 'text-danger'));
            }
        }

        let couponUI = <div className="row py-3 bg-white mb-1" onClick={onCouponEdit}>
			{labeled('优惠卡券:', 
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {React.createElement(this.renderCoupon,
                        {
                            couponOffsetAmount: orderData.couponOffsetAmount,
                            couponRemitted: orderData.couponRemitted,
                            point: orderData.point
                        })}
                </LMR>)}
        </div>;

        return <Page header="订单预览" footer={footer}>
            <div className="px-2">
                <div className="row py-3 bg-white mb-1" onClick={onSelectShippingContact}>
					{labeled('收货地址:',
						<>
                        <LMR className="w-100 align-items-center" right={chevronRight}>
                            {tv(orderData.shippingContact, undefined, undefined, this.nullContact)}
                        </LMR>
                        {/*shippingAddressBlankTip*/}
						{autoHideTips(this.shippingAddressTip)}
                    </>)}
                </div>
                {invoiceContactUI}
                {invoiceInfoUI}
            </div>
            <List items={orderData.orderItems} item={{ render: this.renderOrderItem, key: this.orderItemKey as any }} />
            <div className="px-2">
                <div className="row py-3 pr-3 bg-white my-1">
					{labeled('商品总额:', renderPrice(orderData.productAmount))}
                    {freightFeeUI}
                    {freightFeeRemittedUI}
                </div >
                {couponUI}
            </div>
        </Page>
    })
}