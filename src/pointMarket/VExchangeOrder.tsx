import * as React from 'react';
import { VPage, nav, Page, LMR, FA, tv, List, autoHideTips } from 'tonva';
import { CPointProduct, OrderSource } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { PointProductImage } from 'tools/productImage';
import { GLOABLE } from 'cartenv';
import { randomColor } from 'tools/randomColor';
import { pointIcon } from 'tools/images';
import noStock from 'images/noStock.png';

export class VExchangeOrder extends VPage<CPointProduct> {
    @observable protected shippingAddressIsBlank: boolean = false;
    protected pageDesc: string = OrderSource.EXCHANGEORDER;
    private noStockTip = observable.box();
    async open(param?: any) {
        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product, point, quantity, newStockRes } = pointProduct;
        let noStockUI: JSX.Element = undefined;
        if (newStockRes) noStockUI = <div className="position-absolute w-100 h-100 d-flex" style={{ top: 0, left: 0, background: "rgba(0,0,0,.3)" }}>
            <img src={noStock} alt="" className='w-50 m-auto' />
        </div>;
        if (quantity > 0) {
            return <>
                {tv(product, (v) => {
                    return <div className="w-100 d-flex flex-column mb-4">{/* 20vh  */}
                        <div title={v.description} className="w-100 position-relative" style={{ height: '35vw', border: `2px solid ${randomColor()}` }} >
                            <PointProductImage chemicalId={v.imageUrl} className="w-100 h-100" />
                            {noStockUI}
                        </div>
                        <div className="small w-100">
                            <div className="text-truncate w-100 my-1">{v.descriptionC}</div>
                            <div className="d-flex justify-content-between">
                                {/*  <div>
                                    <FA name='database' className="text-warning" />
                                    <span className="text-danger h5"> {point}</span>
                                </div> */}
                                <div className='d-flex'>
                                    <img src={pointIcon} alt="" style={{ height: 24 }} />
                                    <span className="text-danger h5 m-0 ml-1 align-self-end"> {v.point}</span>
                                </div>
                                <div>*{quantity}</div>
                            </div>
                        </div>
                    </div>
                })}
            </>
        }
    }

    protected onSubmitOwn = async () => {
        let { submitOrder } = this.controller;
        await submitOrder();
    }

    protected onSubmit = async () => {
        let { orderData, cApp, createOrderStocks } = this.controller;
        let { cLottery } = cApp;
        // 必填项验证
        let { shippingContact } = this.pageDesc === OrderSource.EXCHANGEORDER ? orderData : cLottery.prizeOrderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return;
        };
        await createOrderStocks();
        if (this.controller.noJDStock) {this.setNoStockTip(); return;};
        await this.onSubmitOwn();
    }

    private setNoStockTip = () => {
        this.noStockTip.set(<div className="text-center bg-light py-2 text-danger">部分兑换商品已无货，不可兑换。</div>);
    }

    protected renderTipsUI = () => {
        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />
        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        return {
            chevronRight,
            shippingAddressBlankTip
        }
    }

    protected renderContact = () => {
        let { chevronRight, shippingAddressBlankTip } = this.renderTipsUI();
        let { orderData, onSelectShippingContact, cApp } = this.controller;
        let data = this.pageDesc === OrderSource.EXCHANGEORDER ? orderData.shippingContact : cApp.cLottery.prizeOrderData.shippingContact;
        return <div className="px-2">
            <div className="row py-3 bg-white mb-1" onClick={() => onSelectShippingContact()}>
                <div className="col-3 text-muted pr-0">收货地址:</div>
                <div className="col-9">
                    <LMR className="w-100 align-items-center" right={chevronRight}>{tv(data, undefined, undefined, this.nullContact)}</LMR>
                    {shippingAddressBlankTip}
                </div>
            </div>
        </div>
    }

    protected page = observer(() => {
        let { pointProductsSelected, pointToExchanging: pointsSum, noJDStock } = this.controller;
        let header = <div className="w-100 text-center">兑换确认</div>;
        let footer = <div className="d-block">
            {autoHideTips(this.noStockTip)}
            <div className="w-100 px-3 d-flex justify-content-between">
                <div>总计:<span className="text-danger ml-2 mr-1 h2" >{pointsSum}</span>分</div>
                <button type="button" className="btn btn-danger m-1" onClick={this.onSubmit}>确认兑换</button>
            </div>
        </div>;
        if (noJDStock) this.setNoStockTip();

        return <Page header={header} right={<></>} footer={footer}>
            {this.renderContact()}
            <List items={pointProductsSelected} item={{ render: this.renderPointProduct, className: 'w-50 px-3' }}
                className="d-flex flex-wrap bg-transparent mt-2"
            ></List>
        </Page>
    })
}


/**
 * 领取奖品页面
 */
export class VMyPrizeExchangeOrder extends VExchangeOrder {
    @observable shippingAddressIsBlank: boolean = false;
    protected pageDesc: string = OrderSource.PRIZEORDER;

    renderPointProduct = (pointProduct: any) => {
        return <div>11111</div>
    }

    /*  protected onSubmitOwn = async () => {
         let { cLottery } = this.controller.cApp;
         await cLottery.submitOrder();
     } */

    protected page = observer(() => {
        let { cApp } = this.controller;
        let { cLottery } = cApp;
        let footer = <div className="d-block">
            <div className="w-100 px-3 d-flex justify-content-end">
                <button type="button" className="btn btn-danger m-1" onClick={this.onSubmit}>确认领取</button>
            </div>
        </div>;

        return <Page header="奖品领取预览" footer={footer}>
            {this.renderContact()}
            <List items={cLottery.myPrizeLib} item={{ render: this.renderPointProduct }}

            ></List>
        </Page>
    })
}