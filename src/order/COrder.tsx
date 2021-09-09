import { observable, makeObservable } from 'mobx';
import { BoxId, Context, env, nav, QueryPager } from 'tonva-react';
import { CApp, CUqBase } from 'tapp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact } from '../customer/CSelectContact';
import { VMyOrders } from './VMyOrders';
import { VOrderDetail } from './VOrderDetail';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { groupByProduct1 } from '../tools/groupByProduct';
import { CartItem, CartPackRow } from '../store';
import { createOrderPriceStrategy, OrderPriceStrategy } from 'coupon/Coupon';
import { Product } from '../store';
import { VContact } from 'customer/VContact';
import { VCity, VCounty, VProvince } from '../customer/VAddress';
import { GLOABLE } from 'global';
import { VInvoiceInfo } from 'customer/VInvoiceInfo';
import { VCoupleAvailable } from 'coupon/VCouponAvailable';
import { VEpecOrderError } from './VEpecOrderError';
import { VOrderTrans } from './VOrderTrans';
import { VError } from '../tools/VError';
import { ActivePushOrder, IActivePushOrder } from './ActivePushOrder';
import { IxOrderMainFee, OrderDetail, IxOrderDetailFee, DxOrderMainState, OrderDetailEx, OrderMain, OrderMainEx } from '../uq-app/uqs/JkOrder/JkOrder';
import _ from 'lodash';
import moment from 'moment';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;

export class COrder extends CUqBase {
    // --todo 废弃
    orderPageStart: number = 1000000000;    /* 订单历史记录分页 pageStart */
    getUserOrders: any[] = [];  /* 获取用户所有订单 */

    orderData: Order = new Order();
    activePushOrder: IActivePushOrder = ActivePushOrder(this.cApp);
    /**
     * 存储已经被应用的卡券，以便在使用后（下单后）将其删除
     */
    couponAppliedData: any = {};

    replyToContactType: string;
    modalTitle: any;
    modalTitleS: { [desc: string]: any } = {
        'contactList': { id: 1, title: '地址管理', preLevel: '' },
        'contactInfo': { id: 2, title: '地址信息', preLevel: 'contactList' },
        'provinceChoice': { id: 3, title: '所在省市', preLevel: 'contactInfo' },
        'cityChoice': { id: 4, title: '所在城市', preLevel: 'provinceChoice' },
        'countyChoice': { id: 5, title: '所在区县', preLevel: 'cityChoice' },
        'invoiceInfo': { id: 6, title: '发票信息', preLevel: '' },
        'validCard': { id: 7, title: '可用优惠', preLevel: '' },
    };

    editContact: any;
    provinces: any[] = [];
    cities: any[] = [];
    counties: any[] = [];
    addressId: any;

    hasAnyCoupon: boolean;
    /**
     * 当前webuser对应的buyeraccount，用来设置订单中的buyeraccount
     */
    buyerAccounts: any[] = [];
    validCardForWebUser: any;

    constructor(cApp: CApp) {
        super(cApp);

        makeObservable(this, {
            orderPageStart: observable,
            getUserOrders: observable,
            activePushOrder: observable,
            orderData: observable,
            couponAppliedData: observable,
            replyToContactType: observable,
            modalTitle: observable,
            modalTitleS: observable,
            editContact: observable,
            provinces: observable,
            cities: observable,
            counties: observable,
            addressId: observable,
            buyerAccounts: observable,
            validCardForWebUser: observable
        });
    }

    protected async internalStart(param: any) {
    }

    initOrderFreightFee = () => {// 运费和运费减免
        this.orderData.freightFee = FREIGHTFEEFIXED;
        if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
            this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
        else
            this.orderData.freightFeeRemitted = 0;
    }

    createOrderFromCart = async (cartItems: CartItem[]) => {
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
            this.orderData.orderItems = cartItems.map(e => {
                let { product, packs } = e;
                var item = new OrderItem(product);
                item.packs = packs.map((v: any) => { return { ...v } }).filter((v: any) => v.quantity > 0 && v.price);
                item.packs.forEach(pk => {
                    pk.priceInit = pk.price;
                })
                return item;
            });

            // 运费和运费减免
            this.initOrderFreightFee();
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
        };
        this.activePushOrder = ActivePushOrder(this.cApp);
        this.openVPage(VCreateOrder);
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


    orderAgain = async (data: any) => {
        let { orderItems } = data;

        orderItems = orderItems.map((el: CartItem) => {
            return {
                product: el.product,
                packs: el.packs,
                $isDeleted: false,
                $isSelected: true,
                createdate: 'undefined'
            }
        })
        // console.log('orderItems', orderItems);
        await this.createOrderFromCart(orderItems)
    }

    /**
     * 提交订单
     */
    submitOrder = async () => {
        let { uqs, store, currentUser } = this.cApp;
        let { order, webuser, customer } = uqs;
        let { orderItems } = this.orderData;
        this.initOrderFreightFee();
        let result: any = await order.Order.save("order", this.orderData.getDataForSave());
        let { id: orderId, no, flow, state } = result;
        await order.Order.action(orderId, flow, state, "submit");

        // 如果使用了coupon/credits，需要将其标记为已使用
        let { id: couponId, types } = this.couponAppliedData;
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

        let param: [{ productId: number, packId: number }] = [] as any;
        orderItems.forEach(e => {
            e.packs.forEach(v => {
                param.push({ productId: e.product.id, packId: v.pack.id })
            })
        });
        store.cart.removeItem(param);
        /* pushOrder 不同客户调用不同的pushOrder */
        // await this.activePushOrder.pushOrder(result);
        /* --------------- epec下单 已整理,中间部分弃用 --------------- */
        // epec客户下单后要求跳转到指定的url
        let epecOrder = this.orderData.getDataForSave2();
        epecOrder.id = orderId;
        epecOrder.no = no;
        epecOrder.type = 1;
        try {
            let rep = await window.fetch(GLOABLE.EPEC.PUSHORDERURL, {
                method: 'post',
                mode:"cors",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(epecOrder)
            });
            let { ok, status } = rep;
            if (ok) {
                let url = await rep.json();
                if (url) {
                    window.location.href = url;
                    return;
                }
            } else {
                switch (status) {
                    case 500:
                        let repContent = await rep.json();
                        this.openVPage(VEpecOrderError, { message: repContent.message });
                        return;
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {

        }
        /* --------------- epec下单 已整理,中间部分弃用 --------------- */
        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    openOrderSuccess(result:any) {
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    };

    openEpecOrderError(message:any) {
        this.openVPage(VEpecOrderError, { message: message });
    };

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
            this.initOrderFreightFee();
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
                let res = await order.Order.mySheets(undefined, 1, -20);
                return res.map((el: any) => { return { ...el, state: "processing" } });
            case 'completed':
                let result2:any = await this.searchMyOrders({state: "12"});
                return result2.items;
            case 'shipped':
                let result1:any = await this.searchMyOrders({state: "13"});
                return result1.items;
            case 'all':
                let result:any = await this.searchMyOrders({});
                return result.items;
            default:
                break;
        }
    }

    searchMyOrders = async (param:any) => {
        let { firstSize, pageSize, keyWord, state } = param;
        let { currentUser } = this.cApp;
        let result = new QueryPager<any>(this.uqs.order.SearchOrders, pageSize || 100000000, firstSize || 100000000);
        await result.first({
            keyWord: keyWord || undefined, state: state || undefined,
            customer: currentUser?.currentCustomer
        });
        return result;
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

    openOrderDetail = async (orderId: number, state: string) => {
        if (state === "processing") {
            let order = await this.uqs.order.Order.getSheet(orderId);
            let { brief, data } = order;
            if (this.user?.id !== brief?.user) {
                this.openVPage(VError);return;
            };
            let { orderItems } = data;
            let orderItemsGrouped = groupByProduct1(orderItems);
            data.orderItems = orderItemsGrouped;
            this.openVPage(VOrderDetail, order);
        } else {
            let { currentUser, store } = this.cApp;
            let { currentSalesRegion } = store;
            let { id: salesRegionId } = currentSalesRegion;
            let { JkOrder, customer, common, product:productx, deliver } = this.uqs
            let order: any = { brief: {}, data: { orderItems: [], comments: undefined } };
            /* 第一项是 main， 第二项是 detail */
            let getOrderDetail = await JkOrder.IDDetailGet<OrderMain, OrderDetail>({
                id: orderId,
                main: JkOrder.OrderMain,
                detail: JkOrder.OrderDetail,
            });
            let getOrderMainEx: any[] = await JkOrder.ID<OrderMainEx>({
                IDX: JkOrder.OrderMainEx,
                id: orderId,
            });
            if (!getOrderDetail[0].length || !getOrderDetail[1].length) {
                this.openVPage(VError);return;
            };
            let getOrderMainState: any[] = await JkOrder.ID<DxOrderMainState>({
                IDX: JkOrder.DxOrderMainState,
                id: orderId,
            });
            let mainArr: any[] = getOrderDetail[0];
            if (mainArr.length) {
                let { id, no, createDate: date, sumAmount: amount, shippingContact, invoiceContact, invoiceInfo, invoiceType } = mainArr[0] as any;
                let { state } = getOrderMainState[0] || { state: undefined };
                shippingContact = customer.Contact.boxId(shippingContact);
                invoiceContact = customer.Contact.boxId(invoiceContact);
                invoiceInfo = customer.InvoiceInfo.boxId(invoiceInfo);
                invoiceType = common.InvoiceType.boxId(invoiceType);
                let currency = common.Currency.boxId(5);
                let promise1: PromiseLike<any>[] = [shippingContact, invoiceContact, invoiceInfo, invoiceType, currency];
                await Promise.all(promise1);
                /* 数据库date与前端时间偏移量为8小时 */
                date = moment(date).utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
                order.brief = { id: id, no: no, state: state, date: date };
                _.assign(order.data, {
                    couponOffsetAmount: 0, couponRemitted: 0, salesRegion: { id: 1 },
                    currency: currency, webUser: currentUser, amount: amount,
                    shippingContact: shippingContact, invoiceContact: invoiceContact,
                    invoiceInfo: invoiceInfo, invoiceType: invoiceType,
                    comments: getOrderMainEx[0]?.commentsAboutDeliver
                });
                let orderItemsn: any[] = [];
                if (getOrderDetail[1].length) {
                    let promise: PromiseLike<any>[] = [];
                    getOrderDetail[1].forEach((el: any) => {
                        let { product } = el;
                        el.product = productx.ProductX.boxId(product);
                        promise.push(el.product);
                        promise.push(productx.GetProductPrices.table({ product: product, salesRegion: salesRegionId }).then((data: any) => el.pricex = data || []));
                        promise.push(deliver.GetOrderDetailTransportation.obj({ orderDetail: id }).then((data: any) => el.transportation = data || undefined));
                    });
                    await Promise.all(promise);
                    orderItemsn = getOrderDetail[1].map((el: any) => {
                        let { product, item, price, quantity, id, pricex } = el as any;
                        let { pack } = pricex?.find((o: any) => o.pack?.id === item) || { pack: item };
                        let param: any = { id: id, transportation: el.transportation };
                        return { param: param, pack: pack, price: price, product: product, quantity: quantity, currency: undefined };
                    });
                };
                /* Fee(页面暂时不展示,后期实现) */
                // let getFreightFee = await JkOrder.IX<IxOrderMainFee>({
                //     IX:JkOrder.IxOrderMainFee,
                //     ix: [31198536],
                // });
                // let freightFee: any, freightFeeRemitted:any;
                // if (getFreightFee.length) {
                //     let { xi, fee } = getFreightFee[0];
                //     freightFee = xi; freightFeeRemitted = -1 * fee;
                // };
                _.assign(order.data, {
                    orderItems: groupByProduct1(orderItemsn),
                    // freightFee: freightFee || 12,
                    // freightFeeRemitted: freightFeeRemitted || 0,
                });
            };
            this.openVPage(VOrderDetail, order);
        }
    }
    /* 物流信息 orderTransportation 此表废弃,不使用数据 */
    inteLogistics = async (items: any[], orderId: number) => {
        if (!items.length || !orderId) return [];
        let promise: PromiseLike<any>[] = [];
        items.forEach((el: any, index: number) => {
            promise.push(this.getOrderTransportation(orderId, index + 1));
        });
        let res = await Promise.all(promise);
        return res.filter((v: any) => v);
    }

    getOrderTransportation = async (orderId: number, row: number) => {
        return await this.uqs.order.orderTransportation.obj({ order: orderId, row: row });
    };

    getOrderTrackByTransNum = async (transCompany: string, transNumber: number | string) => {
        let param = { code: transCompany, no: transNumber };
        let res = await fetch(GLOABLE.LOGISTIC.ORDERTRANS, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(param)
        });
        if (!res.ok) return;
        return await res.json();
    }

    openOrderTrans = async (orderTrans: any) => {
        let { transNumber, expressLogistics } = orderTrans;
        /* 入驻的快递（可查物流） */
        let settledTrans: any = [
            { transCompany: "Y", transCompanyId: 1, transCompanyIdTest: 25 },
            { transCompany: "ST", transCompanyId: 22, transCompanyIdTest: 21 },
        ];
        let currTransBoxId: any = settledTrans.find((v: any) =>
            (env.testing === true ? v.transCompanyIdTest : v.transCompanyId) === expressLogistics?.id);
        if (currTransBoxId) {
            let { transCompany } = currTransBoxId;
            let orderTrackRult = await this.getOrderTrackByTransNum(transCompany, transNumber);
            orderTrans.orderTrackRult = orderTrackRult?.response;
        };
        this.openVPage(VOrderTrans, orderTrans);
    };

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    renderOrderItemProduct = (product: Product) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    onContactSelected = (contact: BoxId) => {
        if (this.replyToContactType === 'shippingContact') this.orderData.shippingContact = contact;
        if (this.replyToContactType === 'invoiceContact') this.orderData.invoiceContact = contact;
        this.modalTitle = '';
    }

    /**
     * 打开地址编辑界面
     */
    onEditContact = async (userContact: BoxId) => {
        let userContactId = userContact.id;
        let contact = await this.uqs.customer.Contact.load(userContactId);
        contact.isDefault = false;
        this.editContact = contact;
        this.modalTitle = 'contactInfo';
    }

    renderModelContent = (param?: any) => {
        if (this.modalTitle === 'contactList') return this.renderContentList();
        if (this.modalTitle === 'contactInfo') return this.onNewContact();
        if (this.modalTitle === 'provinceChoice') return this.pickProvince();
        if (this.modalTitle === 'cityChoice') return this.pickCity();
        if (this.modalTitle === 'countyChoice') return this.pickCounty();
        if (this.modalTitle === 'invoiceInfo') return this.renderInvoice();
        if (this.modalTitle === 'validCard') return this.renderValidCard();
    }

    renderContentList = () => {
        return this.cApp.cSelectInvoiceContact.renderContentList('createOrder');
        // return this.renderView(VContactList);
    }

    getValidCardForWebUser = async () => {
        let { cCoupon } = this.cApp;
        this.validCardForWebUser = await cCoupon.getValidCardForWebUser();
        this.modalTitle = 'validCard';
    }

    showModelCardDiscount = async (vipCard: any) => {
        await this.cApp.cCoupon.showModelCardDiscount(vipCard);
    }
    /* 选择发票信息 */
    saveInvoiceInfo = async (invoice: any) => {
        let newInvoice: any = await this.cApp.cInvoiceInfo.saveInvoiceInfoData(invoice);
        this.orderData.invoiceType = newInvoice.invoiceType;
        this.orderData.invoiceInfo = newInvoice.invoiceInfo;
        this.modalTitle = '';
    }
    /* 选择优惠券 */
    applySelectedCoupon = async (coupon: string) => {
        if (!coupon)
            return "请输入您的优惠卡/券号";
        else {
            let { cCoupon } = this.cApp;
            let couponRet = await cCoupon.applyCoupon1(coupon);
            if (couponRet) {
                await this.applyCoupon(couponRet);
                this.modalTitle = '';
            };
            return cCoupon.applyTip(couponRet);
        }
    }

    renderValidCard = () => {
        return this.renderView(VCoupleAvailable, this.validCardForWebUser);
    }

    renderInvoice = () => {
        let { invoiceType, invoiceInfo } = this.orderData;
        let origInvoice = {
            invoiceType: invoiceType,
            invoiceInfo: invoiceInfo,
        };
        return this.renderView(VInvoiceInfo, { origInvoice: origInvoice });
    }

    /**
     * 打开地址新建界面
     */
    onNewContact = () => {
        return this.renderView(VContact, { contact: this.editContact });
    }

    pickAddress = async (context?: Context, name?: string, value?: number): Promise<number> => {
        this.provinces = await this.cApp.cAddress.getCountryProvince(GLOABLE.CHINA);
        this.modalTitle = 'provinceChoice';
        return this.addressId;
    }

    pickProvince = () => {
        return this.renderView(VProvince, { provinces: this.provinces });
    }

    pickCity = () => {
        return this.renderView(VCity, { cities: this.cities });
    }

    pickCounty = () => {
        return this.renderView(VCounty, { counties: this.counties });
    }

    saveAddress = async (countryId: number, provinceId: number, cityId?: number, countyId?: number): Promise<any> => {
        let { Address } = this.uqs.common;
        let newAddress = await Address.save(undefined, { country: countryId, province: provinceId, city: cityId, county: countyId });
        let addressId = newAddress && Address.boxId(newAddress.id);
        this.modalTitle = 'contactInfo';
        this.addressId = addressId;
    }

    saveContact = async (contact: any) => {
        let { cSelectShippingContact, cSelectInvoiceContact } = this.cApp;
        let contactBox: any;
        if (this.replyToContactType === 'shippingContact')
            contactBox = await cSelectShippingContact.saveContactData(contact);
        if (this.replyToContactType === 'invoiceContact')
            contactBox = await cSelectInvoiceContact.saveContactData(contact);
        this.onContactSelected(contactBox);
    }
}
