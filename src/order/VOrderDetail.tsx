/* eslint-disable */
import * as React from 'react';
import { VPage, Page, BoxId, EasyDate, Ax, Tuid, nav } from 'tonva';
import { COrder } from './COrder';
import { tv } from 'tonva';
import { List } from 'tonva';
import { OrderItem } from './Order';
import { xs } from '../tools/browser';
import classNames from 'classnames';
//import { CartItem } from '../cart/Cart';
import { observable } from 'mobx';

export class VOrderDetail extends VPage<COrder> {
    @observable orderTrans: any[] = [];
    
    async open(order: any) {

        this.openPage(this.page, order);
    }


    private packsRow = (item: any, index: number) => {
        let { pack, quantity, price, currency } = item;

        return <div key={index} className={classNames('px-2 py-2', index !== 0 ? 'border-top' : '')}>
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
        </div>;
    }

    againCreatOrder = async (initialData: OrderItem[]) => {
		/*
        let { uqs, currentSalesRegion, cCart } = this.controller.cApp;
        let { product: p } = uqs;
        let { PriceX } = p;
        let promises: PromiseLike<void>[] = [];
        initialData.forEach((e: any) => e.packs.forEach((v: any) => {
            promises.push(PriceX.obj({ product: e.product, pack: v.pack, salesRegion: currentSalesRegion }))
        }));
        let prices: any[] = await Promise.all(promises);
        let orderData: CartItem[] = [];
        let productPromises: Promise<any>[] = [];
        for (let key of initialData) {
            let { product, packs } = key;
            let filtPacksByProductId = prices.filter((v: any) => Tuid.equ(v.product, product) && v.discountinued === 0 && v.expireDate > Date.now());
            if (!filtPacksByProductId.length) continue;
            for (let i of packs) {
                let findPack = filtPacksByProductId.find((v: any) => Tuid.equ(v.pack, i.pack));
                if (!findPack) continue;
                product = this.controller.cApp.getProduct(product.id);
                productPromises.push(product.loadListItem());
                orderData.push({
                    product: product,
                    packs: [{ pack: i.pack, quantity: i.quantity || 1, price: findPack.retail, retail: findPack.retail, currency: findPack.salesRegion?.obj?.currency }],
                    $isSelected: true,
                    $isDeleted: false,
                    createdate: Date.now()
                })
            };
        };
        await Promise.all(productPromises);
        orderData.forEach((v: any) => {
            let newPrices: any[] = v.product?.prices || [];
            let findPack = newPrices.find((i: any) => Tuid.equ(i.pack, v.packs[0].pack));
            if (findPack) {
                let { vipPrice, promotionPrice } = findPack;
                v.packs[0].price = this.minPrice(vipPrice, promotionPrice) || v.packs[0].price;
            };
        });
        cCart.againOrderCart(orderData);
		*/
		await this.controller.cApp.store.cart.againCreatOrder(initialData);
        nav.navigate('/cart');
    }

    private renderOrderItem = (orderItem: OrderItem, index: number) => {
        let { product, packs } = orderItem;
        let { id } = product;
        let { controller, packsRow } = this;
        let getOrderTrans = this.orderTrans.find((v: any) => v.row === (index + 1));
        let orderTransUI: JSX.Element;
        if (getOrderTrans) orderTransUI = <span className="cursor-pointer text-info font-weight-bold"
            onClick={() => controller.openOrderTrans(getOrderTrans)} >物流信息</span>;
        return <div className="row my-1 w-100 mx-0">
            <div className="col-lg-6 pb-3">{controller.renderOrderItemProduct(product)}</div>
            <div className="col-lg-6">{
                packs.map((p, index) => {
                    return packsRow(p, index);
                })
            }</div>
            <div className="text-right w-100 px-3">
                {orderTransUI}
                <Ax className="mx-2 text-info font-weight-bold" href={'/product/mscu/MSDS/' + id}>SDS</Ax>
                <div className="btn btn-sm btn-info float-left float-lg-right"
                    style={{ background: "#17a2b8" }} onClick={() => { this.againCreatOrder([orderItem]) }}>
                    立即购买
                </div>
            </div>
        </div>
    }

    private page = (order: any) => {

        let { brief, data } = order;
        let { id, no, state, description, date } = brief;
        let { orderItems, currency, shippingContact, invoiceContact, invoiceType, invoiceInfo, amount, comments, couponOffsetAmount, couponRemitted
            , freightFee, freightFeeRemitted, orderTrans } = data;
        this.orderTrans = orderTrans;
        let couponUI;
        if (couponOffsetAmount || couponRemitted) {
            let offsetUI, remittedUI;
            if (couponOffsetAmount) {
                offsetUI = <div className="d-flex flex-row justify-content-between">
                    <div className="text-muted">折扣:</div>
                    <div className="text-right text-danger"><small>¥</small>{couponOffsetAmount}</div>
                </div>
            }
            if (couponRemitted) {
                remittedUI = <div className="d-flex flex-row justify-content-between">
                    <div className="text-muted">抵扣:</div>
                    <div className="text-right text-danger"><small>¥</small>{couponRemitted}</div>
                </div>
            }
            couponUI = <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">优惠券:</div>
                <div className="col-9">
                    {offsetUI}
                    {remittedUI}
                </div>
            </div>
        }

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
        let orderAgainUI = <div className="px-3 py-2 border-bottom" style={{userSelect: "none"}}>
            <span className="align-middle">您若想购买订单中所有产品,请 </span>
            <button className="btn btn-sm btn-secondary cursor-pointer" title='可直接下单再次购买订单中产品'
                style={{ background: "#6c757d" }}
                onClick={() => { this.againCreatOrder(orderItems) }}>立即下单</button>
            {/* <button className="btn btn-primary w-50" onClick={async () => { this.controller.orderAgain(order.data) }}>再次下单</button> */}
        </div>

        let commentsUI = comments ? <div className="bg-white row no-gutters p-3 my-1">
            <div className="col-3 text-muted">备注:</div>
            <div className="col-9">{comments}</div>
        </div> : null;

        let header: any
        if (xs) header = <>订单详情: {no}</>            //orderAgainUI
        return <Page header={header} footer={<></>}>
            {!xs && <div className="alert alert-info alert-signin mt-3">订单编号 {no}</div>}
            {orderAgainUI}
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">收货地址:</div>
                <div className="col-9">{tv(shippingContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票地址:</div>
                <div className="col-9">{tv(invoiceContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票信息:</div>
                <div className="col-9">{invoiceTemplate(invoiceType, invoiceInfo)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费:</div>
                <div className="col-9">{freightFeeUI}{freightFeeRemittedUI}</div>
            </div>
            {couponUI}
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            {commentsUI}
            <div className="bg-white p-3 my-1 text-right">
                <span className="text-danger font-weight-bold">总金额: {amount}{tv(currency)}</span>
            </div>
        </Page>
    }
}

function invoiceTemplate(invoiceType: BoxId, invoiceInfo: BoxId): JSX.Element {
    return <>
        {tv(invoiceType, invoiceTypeUI, undefined, () => <></>)}<br />
        {tv(invoiceInfo, invoiceInfoUI, undefined, () => <></>)}
    </>
}

function invoiceTypeUI(values: any) {
    let { id, description } = values;
    return <>{description}</>;
}

function invoiceInfoUI(values: any) {
    let { id, title, taxNo, address, telephone, bank, accountNo } = values;
    return <>{title}</>;
}