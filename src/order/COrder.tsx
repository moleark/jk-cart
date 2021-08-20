import { observable } from 'mobx';
import { BoxId, Tuid } from 'tonva';
import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact } from '../customer/CSelectContact';
import { VMyOrders } from './VMyOrders';
import { VOrderDetail } from './VOrderDetail';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { groupByProduct } from '../tools/groupByProduct';
import { CartItem2, CartPackRow } from '../cart/Cart';
import { createOrderPriceStrategy, OrderPriceStrategy } from 'coupon/Coupon';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;

export class COrder extends CUqBase {
    @observable orderData: Order = new Order();
    /**
     * 存储已经被应用的卡券，以便在使用后（下单后）将其删除
     */
    @observable couponAppliedData: any = {};
    hasAnyCoupon: boolean;
    /**
     * 当前webuser对应的buyeraccount，用来设置订单中的buyeraccount
     */
    @observable buyerAccounts: any[] = [];

    protected async internalStart(param: any) {
    }

    renderOrderDraft = async (param: any) => {
        let { orderData, orderDraftBrief } = param
        let { cCoupon } = this.cApp;
        this.orderData = orderData;
        let { sharedCouponValidationResult } = cCoupon;
        if (sharedCouponValidationResult) {
            let { result, types, id } = sharedCouponValidationResult;
            if (result === 1) {
                if (types === "vipcard" || types === "coupon") {
                    sharedCouponValidationResult.discountSetting = await cCoupon.getValidDiscounts(types, id);
                }
                this.applyCoupon(sharedCouponValidationResult);
            }
        }
        this.openVPage(VCreateOrder, { fromOrderParam: "fromOrderDraft", orderDraftBrief });
    }

    createOrderFromCart = async (cartItems: CartItem2[]) => {
        let { cApp, uqs } = this;
        let { currentUser, currentSalesRegion, cCoupon } = cApp;
        this.orderData.webUser = currentUser.id;
        this.orderData.salesRegion = currentSalesRegion.id;
        this.removeCoupon();
        this.hasAnyCoupon = await this.hasCoupons();

        let buyerAccountQResult = await uqs.webuser.WebUserBuyerAccount.query({ webUser: currentUser.id })
        if (buyerAccountQResult) {
            this.buyerAccounts = buyerAccountQResult.ret;
            if (this.buyerAccounts && this.buyerAccounts.length === 1) {
                this.orderData.customer = this.buyerAccounts[0].buyerAccount;
            }
        }

        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = await this.getDefaultShippingContact();
        }

        if (this.orderData.invoiceContact === undefined) {
            this.orderData.invoiceContact = await this.getDefaultInvoiceContact();
        }

        if (this.orderData.invoiceType === undefined) {
            this.orderData.invoiceType = await this.getDefaultInvoiceType();
        }

        if (this.orderData.invoiceInfo === undefined) {
            this.orderData.invoiceInfo = await this.getDefaultInvoiceInfo();
        }

        if (cartItems !== undefined && cartItems.length > 0) {
            this.orderData.currency = cartItems[0].packs[0].currency;
            this.orderData.orderItems = cartItems.map((e: any) => {
                var item = new OrderItem();
                item.product = e.product;
                item.packs = e.packs.map((v: any) => { return { ...v } }).filter((v: any) => v.quantity > 0 && v.price);
                item.packs.forEach((pk) => {
                    pk.priceInit = pk.price;
                })
                return item;
            });

            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
            else
                this.orderData.freightFeeRemitted = 0;
        }

        /*
        let currentCode = currentCouponCode || currentCreditCode;
        if (currentCode) {
            let coupon = await cCoupon.getCouponValidationResult(currentCode);
            if (coupon.result === 1)
                this.applyCoupon(coupon);
            else {
                this.cApp.currentCouponCode = undefined;
                this.cApp.currentCreditCode = undefined;
            }
        }
        */
        // 如果当前webuser有VIP卡，默认下单时使用其VIP卡
        let { webUserVIPCard } = currentUser;
        if (webUserVIPCard !== undefined) {
            let coupon = await cCoupon.getCouponValidationResult(
                webUserVIPCard.vipCardCode.toString()
            );
            let { result, types, id } = coupon;
            if (result === 1) {
                if (types === "vipcard" || types === "coupon") {
                    coupon.discountSetting = await cCoupon.getValidDiscounts(types, id);
                }
                this.applyCoupon(coupon);
            }
        }
        this.openVPage(VCreateOrder, { fromOrderParam: "fromCart" });
    }

    private defaultSetting: any;
    private async getDefaultSetting() {
        if (this.defaultSetting) return this.defaultSetting;
        let { currentUser } = this.cApp;
        return this.defaultSetting = await currentUser.getSetting() || {};
    }

    private contact0: BoxId;
    private async getContact(): Promise<BoxId> {
        if (this.contact0 === null) return;
        if (this.contact0 !== undefined) return this.contact0;
        let { currentUser } = this.cApp;
        let contactArr = await currentUser.getContacts();
        if (contactArr === undefined || contactArr.length === 0) {
            this.contact0 = null;
            return;
        }
        return this.contact0 = contactArr[0].contact;
    }

    private async getDefaultShippingContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.shippingContact || await this.getContact();
    }

    private async getDefaultInvoiceContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceContact || await this.getContact();
    }

    private async getDefaultInvoiceType() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceType;
    }

    private async getDefaultInvoiceInfo() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceInfo;
    }

    /**
     * 提交订单
     */
    submitOrder = async (orderDraftId: any) => {
        let { uqs, cart, currentUser } = this.cApp;
        let { order, webuser, customer, orderDraft } = uqs;
        let { orderItems } = this.orderData;

        let result: any = await order.Order.save("order", this.orderData.getDataForSave());
        let { id: orderId, flow, state, no } = result;
        await order.Order.action(orderId, flow, state, "submit");

        // 如果使用了coupon/credits，需要将其标记为已使用
        let { id: couponId, code, types } = this.couponAppliedData;
        if (couponId) {
            let nowDate = new Date();
            let usedDate = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
            switch (types) {
                case 'coupon':
                    if (currentUser.hasCustomer) {
                        let customerId = currentUser.currentCustomer.id;
                        customer.CustomerCoupon.del({ customer: customerId, coupon: couponId, arr1: [{ couponType: 1 }] });
                        customer.CustomerCouponUsed.add({ customer: customerId, arr1: [{ coupon: couponId, usedDate: usedDate }] });
                    } else {
                        webuser.WebUserCoupon.del({ webUser: currentUser.id, coupon: couponId, arr1: [{ couponType: 1 }] });
                        webuser.WebUserCouponUsed.add({ webUser: currentUser.id, arr1: [{ coupon: couponId, usedDate: usedDate }] });
                    };
                    break;
                case 'credits':
                    if (currentUser.hasCustomer) {
                        let customerId = currentUser.currentCustomer.id;
                        customer.CustomerCredits.del({ customer: customerId, arr1: [{ credits: couponId }] });
                        customer.CustomerCreditsUsed.add({ customer: customerId, credits: couponId, arr1: [{ saleOrderItem: no, usedDate: usedDate }] });
                    } else {
                        webuser.WebUserCredits.del({ webUser: currentUser.id, arr1: [{ credits: couponId }] });
                        webuser.WebUserCreditsUsed.add({ webUser: currentUser.id, credits: couponId, arr1: [{ saleOrder: no, usedDate: usedDate }] });
                    };
                    break;
                default:
                    break;
            }
        }

        // 保存订单确认状态
        if (orderDraftId) {
            let { id } = orderDraftId;
            let orderDraftData = await uqs.orderDraft.OrderDraft.getSheet(id);
            let { id: draftorderId, flow: draftFlow, state: draftState } = orderDraftData.brief;
            await orderDraft.OrderDraft.action(draftorderId, draftFlow, draftState, "Pass");
            this.closePage();
        } else {
            let param: [{ productId: number, packId: number }] = [] as any;
            orderItems.forEach(e => {
                e.packs.forEach(v => {
                    param.push({ productId: e.product.id, packId: v.pack.id })
                })
            });
            cart.removeFromCart(param);
        }
        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    onSelectShippingContact = async () => {
        let cSelect = this.newC(CSelectShippingContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.shippingContact = contactBox;
    }

    onSelectInvoiceContact = async () => {
        let cSelect = this.newC(CSelectInvoiceContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.invoiceContact = contactBox;
    }

    /**
     * 打开输入或选择使用卡券界面
     */
    onCouponEdit = async () => {
        let { cCoupon } = this.cApp;
        let coupon = await cCoupon.call<any>(this.orderData.coupon);
        if (coupon) {
            await this.applyCoupon(coupon);
        }
    }

    private hasCoupons = async (): Promise<boolean> => {
         let { /* cCoupon, */ currentUser } = this.cApp;
        // let { id: currentUserId } = currentUser;
        let getValidCredits = await currentUser.getValidCredits();
        if (getValidCredits && getValidCredits.length > 0)
            return true;
        let validCoupons = await currentUser.getValidCoupons();
        // let validCoupons = await cCoupon.getValidCouponsForWebUser(currentUserId);
        if (validCoupons && validCoupons.length > 0)
            return true;
        /* let validCredits = await cCoupon.getValidCreditsForWebUser(currentUserId);
        if (validCredits && validCoupons.length > 0)
            return true; */
        return false;
    }

    /**
     * 使用优惠券后计算折扣金额和抵扣额
     */
    applyCoupon = async (coupon: any) => {

        this.removeCoupon();
        let { result: validationResult, validitydate, isValid } = coupon;
        if (validationResult === 1 && isValid === 1 && new Date(validitydate).getTime() > Date.now()) {
            this.couponAppliedData = coupon;
            let orderPriceStrategy: OrderPriceStrategy = createOrderPriceStrategy(coupon);
            orderPriceStrategy.applyTo(this.orderData, this.uqs);
            /*
            this.orderData.coupon = id;
            if (types === "coupon" || types === "vipcard") {
                // if (discount) {
                // 仍兼容原来统一折扣的模式
                if ((discountSetting && discountSetting.length > 0) || discount) {
                    let { orderData, uqs, cApp } = this;
                    let { orderItems } = orderData;
                    let { AgentPrice } = uqs.product;
                    if (orderItems !== undefined && orderItems.length > 0) {
                        // 获取每个明细中产品的agentprice;
                        let promises: PromiseLike<any>[] = [];
                        orderItems.forEach(e => {
                            promises.push(AgentPrice.table({ product: e.product.id, salesRegion: cApp.currentSalesRegion.id }));
                        });
                        let agentPrices = await Promise.all(promises);

                        if (agentPrices && agentPrices.length > 0) {
                            let couponOffsetAmount = 0;
                            for (let i = 0; i < orderItems.length; i++) {
                                let oi = orderItems[i];
                                let { product, packs } = oi;
                                // 获取明细中产品的优惠券/VIP卡折扣
                                if (discountSetting) {
                                    let thisDiscountSetting = discountSetting.find((e: any) => Tuid.equ(e.brand, product.obj.brand));
                                    discount = (thisDiscountSetting && thisDiscountSetting.discount) || discount || 0;
                                }

                                let eachProductAgentPrice = agentPrices[i];
                                for (let j = 0; j < packs.length; j++) {
                                    let pk = packs[j];
                                    let agentPrice: any = eachProductAgentPrice.find(
                                        (p: any) => p.product.id === product.id &&
                                            p.pack.id === pk.pack.id &&
                                            p.discountinued === 0 &&
                                            p.expireDate > Date.now());
                                    if (!agentPrice) break;

                                    // 折扣价格取agentPrice和折扣价格中较高者
                                    let discountPrice = Math.round(Math.max(agentPrice.agentPrice, pk.retail * (1 - discount)));
                                    // pk.price = Math.round(Math.max(agentPrice.agentPrice, pk.retail * (1 - discount)));
                                    // 最终价格取折扣价格和显示的价格（可能会有市场活动价)中较低者
                                    pk.price = Math.round(Math.min(pk.price, discountPrice));
                                    couponOffsetAmount += Math.round(pk.quantity * (pk.retail - pk.price) * -1);
                                };
                            };
                            this.orderData.couponOffsetAmount = Math.round(couponOffsetAmount);
                        };
                    }
                }
                if (preferential) {
                    this.orderData.couponRemitted = preferential * -1;
                }
                // 运费和运费减免
                this.orderData.freightFee = FREIGHTFEEFIXED;
                if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                    this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
            }

            if (types === "credits") {
                this.orderData.point = Math.round(this.orderData.productAmount * 2);
            }
            */
            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
            else
                this.orderData.freightFeeRemitted = 0;
        }
    }

    /**
     * 删除优惠券
     */
    removeCoupon = () => {
        this.orderData.coupon = undefined;
        this.couponAppliedData = {};
        this.orderData.couponOffsetAmount = 0;
        this.orderData.couponRemitted = 0;
        this.orderData.point = 0;
        this.orderData.orderItems.forEach((e: OrderItem) => e.packs.forEach((v: CartPackRow) => v.price = v.priceInit));
    }

    /*
    * 打开我的订单列表（在“我的”界面使用）
    */
    openMyOrders = async (state: string) => {

        this.openVPage(VMyOrders, state);
    }

    /**
     * 根据状态读取我的订单
     */
    getMyOrders = async (state: string) => {
        let { order } = this.uqs;
        switch (state) {
            case 'pendingpayment':
                return await order.GetPendingPayment.table(undefined);
            case 'processing':
                return await order.Order.mySheets(undefined, 1, -20);
            case 'completed':
                return await order.Order.mySheets("#", 1, -20)
            case 'all':
                let promises: PromiseLike<any>[] = [];
                promises.push(order.Order.mySheets(undefined, 1, -20));
                promises.push(order.Order.mySheets("#", 1, -20));
                let presult = await Promise.all(promises);
                return presult[0].concat(presult[1]).sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
            default:
                break;
        }
    }

    /**
     * 打开发票信息编辑界面
     */
    onInvoiceInfoEdit = async () => {
        let cInvoiceInfo = this.newC(CInvoiceInfo); // new CInvoiceInfo(this.cApp, undefined, true);
        let { invoiceType, invoiceInfo } = this.orderData;
        let origInvoice = {
            invoiceType: invoiceType,
            invoiceInfo: invoiceInfo,
        }
        let newInvoice = await cInvoiceInfo.call<any>(origInvoice, true);
        this.orderData.invoiceType = newInvoice.invoiceType;
        this.orderData.invoiceInfo = newInvoice.invoiceInfo;
    }

    openOrderDetail = async (orderId: number) => {

        let order = await this.uqs.order.Order.getSheet(orderId);
        let { data } = order;
        let { orderItems } = data;
        let orderItemsGrouped = groupByProduct(orderItems);
        data.orderItems = orderItemsGrouped;
        this.openVPage(VOrderDetail, order);
    }

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    /**
     * 取消订单草案
     * @param orderDraftId 
     */
    onCancel = async (orderDraftId: any) => {
        let { uqs } = this.cApp;
        let { orderDraft } = uqs;
        // 保存订单状态
        let { id } = orderDraftId;
        let orderDraftData = await uqs.orderDraft.OrderDraft.getSheet(id);
        let { id: orderId, flow, state } = orderDraftData.brief;
        await orderDraft.OrderDraft.action(orderId, flow, state, "Cancel");
        this.closePage()
    }

    /**
     * 添加到购物车，修改产品信息
     */
    addToCart = async () => {
        let { cApp, orderData, removeCoupon } = this;
        let { cart } = cApp;
        removeCoupon();
        orderData.orderItems.forEach(async (v) => {
            v.packs.map(async (e) => {
                let { quantity, retail, price, pack, currency } = e;
                let { id: currencyId } = currency;
                await cart.addIncremental(v.product, pack, quantity, price, retail, currencyId);
            })
        })
        this.closePage()
        this.cApp.cCart.start();
    }
}