import * as React from 'react';
import { COrderDraft } from './COrderDraft';
import { VPage, Page, List, FA, tv, LMR, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { OrderItem } from '../order/Order';

export class VOrderDraftdetail extends VPage<COrderDraft> {

    @observable private useShippingAddress: boolean = true;
    @observable private shippingAddressIsBlank: boolean = false;
    @observable private invoiceAddressIsBlank: boolean = false;
    @observable private invoiceIsBlank: boolean = false;
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private packsRow = (item: any, index: number) => {
        let { pack, quantity, price, currency } = item;

        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack.obj, v => v.radioy)}{tv(pack.obj, v => v.unit)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
        </div>;
    }
    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        let { controller, packsRow } = this;
        return <div>
            <div className="row p-1 my-1">
                <div className="col-lg-6 pb-3">{controller.renderOrderItemProduct(product)}</div>
                <div className="col-lg-6">{
                    packs.map((p, index) => {
                        return packsRow(p, index);
                    })
                }</div>
            </div>
        </div>;
    }
    // private renderCoupon = observer((param: any) => {
    //     let { couponAppliedData, hasAnyCoupon, removeCoupon } = this.controller.cApp.cOrder;
    //     if (couponAppliedData['id'] === undefined) {
    //         let tip = hasAnyCoupon ? "有可用优惠卡/券，点击使用" : "输入优惠券/积分码";
    //         return <span className="text-primary">{tip}</span>;
    //     } else {
    //         let { code, types } = couponAppliedData;
    //         let { couponOffsetAmount, couponRemitted, point } = param;
    //         let offsetUI, remittedUI, noOffsetUI;
    //         let cancelCouponUI = <div
    //             className="position-absolute text-primary border text-center border-primary dropdown-menu-right rounded-circle"
    //             style={{ border: 1, cursor: 'pointer', width: 19, height: 19, lineHeight: 1, top: 5, right: 5 }}
    //             onClick={(e) => { e.stopPropagation(); removeCoupon(); }}
    //         >&times;</div>
    //         if (types === "credits") {
    //             offsetUI = <div className="d-flex flex-row justify-content-between">
    //                 <div className="text-muted">积分:</div>
    //                 <div className="text-right text-danger">{point}<small>分</small></div>
    //             </div>
    //         }
    //         else if (couponOffsetAmount || couponRemitted) {
    //             if (couponOffsetAmount) {
    //                 offsetUI = <div className="d-flex flex-row justify-content-between">
    //                     <div className="text-muted">折扣:</div>
    //                     <div className="text-right text-danger"><small>¥</small>{couponOffsetAmount.toFixed(2)}</div>
    //                 </div>
    //             }
    //             if (couponRemitted) {
    //                 remittedUI = <div className="d-flex flex-row justify-content-between">
    //                     <div className="text-muted">抵扣:</div>
    //                     <div className="text-right text-danger"><small>¥</small>{couponRemitted.toFixed(2)}</div>
    //                 </div>
    //             }
    //         } else {
    //             noOffsetUI = <div>谢谢惠顾</div>;
    //         }
    //         return <div className="mr-2 position-relative border-primary border px-3 py-1 rounded">
    //             <div className="text-success">{code.substr(0, 4)} {code.substr(4)}</div>
    //             {offsetUI}
    //             {remittedUI}
    //             {noOffsetUI}
    //             {cancelCouponUI}
    //         </div>
    //     }
    // });


    private page = observer((order: any) => {

        let { brief, data } = order;
        let { id, no, state, description, date, user } = brief;
        let { orderItems, currency, shippingContact, invoiceContact, invoiceType, invoiceInfo, amount, couponOffsetAmount, couponRemitted
            , freightFee, freightFeeRemitted, point, productAmount } = data;

        let { cApp } = this.controller;
        let { onSelectShippingContact, onSelectInvoiceContact, onInvoiceInfoEdit, onCouponEdit } = cApp.cOrder;
        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />;
        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.invoiceAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null;
        let divInvoiceContact: any = null;
        if (this.useShippingAddress === false) {
            if (invoiceContact !== undefined) {
                divInvoiceContact = <div className="col-8 col-sm-10 offset-4 offset-sm-2 d-flex">
                    <div>{tv(invoiceContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                    <div className='small'>{tv(invoiceContact.obj.address, undefined, undefined)}{tv(invoiceContact, (v) => v.addressString)}</div>
                    <div>{chevronRight}</div>
                </div>
            } else {
                divInvoiceContact = <div className="col-8 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary"
                        onClick={onSelectInvoiceContact}>选择发票地址</button>
                    {invoiceAddressBlankTip}
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
                                invoiceContact = undefined;
                                this.invoiceAddressIsBlank = false;
                            }} /> 同收货地址
                    </label>
                </div>
            </div>
            {divInvoiceContact}
        </div>
        let invoiceBlankTip = this.invoiceIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票信息</div> : null;
        let invoiceInfoUI = <div className="row py-3 bg-white mb-1" onClick={onInvoiceInfoEdit}>
            <div className="col-4 col-sm-2 pb-2 text-muted">发票信息:</div>
            <div className="col-8 col-sm-10">
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {tv(invoiceType, (v) => <>{v.description}</>, undefined, () => <span className="text-primary">填写发票信息</span>)}
                    {tv(invoiceInfo, (v) => <> -- {v.title}</>, undefined, () => <></>)}
                    {invoiceBlankTip}
                </LMR>
            </div>
        </div>
        let freightFeeUI, freightFeeRemittedUI;
        if (freightFee) {
            freightFeeUI = <>
                <div className="text-right text-danger"><small>¥</small>{freightFee}</div>
            </>
            if (freightFeeRemitted) {
                freightFeeRemittedUI = <>
                    <div className="text-right text-danger"><small>¥</small>{freightFeeRemitted}(减免)</div>
                </>
            }
        }

        let couponUI = <div className="row py-3 bg-white mb-1" onClick={onCouponEdit}>
            <div className="col-4 col-sm-2 pb-2 text-muted">优惠卡券:</div>
            <div className="col-8 col-sm-10">
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {/* {React.createElement(this.renderCoupon,
                        {
                            couponOffsetAmount: couponOffsetAmount,
                            couponRemitted: couponRemitted,
                            point: point
                        })} */}
                </LMR>
            </div>
        </div>

        let draftName = <> {cApp.cWebUser.renderWebuserName(user)}</>;

        let footer = <div className="w-100 d-flex justify-content-center py-2" >
            <button type="button" className="btn btn-primary mx-1 my-1 px-3"
            >确认</button>
            <button type="button" className="btn btn-primary mx-1 my-1 px-3"
            >取消</button>
        </div>
        return <Page header='分享来的订单' footer={footer}>
            <div className="bg-white row no-gutters p-3 my-1" onClick={onSelectShippingContact}>
                <div className="col-3 text-muted">收货地址:</div>
                <div className="col-9">
                    <div>{tv(shippingContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                    <div className='small'>{tv(shippingContact.obj.address, undefined, undefined)}{tv(shippingContact, (v) => v.addressString)}</div>
                </div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1" onClick={onSelectInvoiceContact}>
                <div className="col-3 text-muted">发票地址:</div>
                <div className="col-9">
                    <div>{tv(invoiceContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                    <div className='small'>{tv(invoiceContact.obj.address, undefined, undefined)}{tv(invoiceContact, (v) => v.addressString)}</div>
                </div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票信息:</div>
                {tv(invoiceType, (v) => <>{v.description}</>, undefined, () => <span className="text-primary">填写发票信息</span>)}
                {tv(invoiceInfo, (v) => <> -- {v.title}</>, undefined, () => <></>)}
            </div>
            {/* <div className="px-2">
                <div className="row py-3 bg-white mb-1" onClick={onSelectShippingContact}>
                    <div className="col-4 col-sm-2 pb-2 text-muted">收货地址:</div>
                    <div className="col-8 col-sm-10">
                        <LMR className="w-100 align-items-center" right={chevronRight}>
                            <div>{tv(shippingContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                            <div className='small'>{tv(shippingContact.obj.address, undefined, undefined)}{tv(shippingContact, (v) => v.addressString)}</div>
                        </LMR>
                        {shippingAddressBlankTip}
                    </div>
                </div>
                {invoiceContactUI}
                {invoiceInfoUI}
            </div> */}
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费:</div>
                <div className="col-9">{freightFeeUI}{freightFeeRemittedUI}</div>
            </div>
            {couponUI}
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white p-3 my-1 d-flex justify-content-between">
                <span className='text-success'>制单人:{draftName}</span>
                <span className="text-danger font-weight-bold">总金额: {amount}{tv(currency)}</span>
            </div>
        </Page>
    })
}