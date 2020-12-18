import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { nav, BoxId } from 'tonva';
import { VNotYOrder } from './VNotYOrder';
import { groupByProduct } from 'tools/groupByProduct';
// import { VOrderDraftDetail } from './VOrderDraftDetail';
import { Order, OrderItem } from 'order/Order';
import { CSelectShippingContact, CSelectInvoiceContact } from 'customer/CSelectContact';
import { CInvoiceInfo } from 'customer/CInvoiceInfo';
import { LoaderProductChemicalWithPrices } from 'product/itemLoader';
import { OrderPriceStrategy, createOrderPriceStrategy } from 'coupon/Coupon';
import { CartPackRow } from 'cart/Cart';
import { OrderSuccess } from 'order/OrderSuccess'
import { VCreateOrder } from 'order/VCreateOrder';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;
export class COrderDraft extends CUqBase {
    @observable orderData: Order = new Order();
    @observable buyerAccounts: any[] = [];
    @observable couponAppliedData: any = {};
    @observable hasAnyCoupon: boolean;
    @observable brief: any;
    protected async internalStart() { }

    showSharedOrder = async (param: any) => {
        let { coupon, orderdraftid } = param
        let { currentUser, uqs, cCoupon, currentSalesRegion } = this.cApp;
        let draftOrder = await this.uqs.orderDraft.OrderDraft.getSheet(orderdraftid);

        let { brief, data } = draftOrder;
        this.brief = brief;
        if (data.webUser.id === currentUser.id) {
            // 自动领取积分券
            cCoupon.autoDrawCouponBase(coupon)
            let { orderItems } = data;
            let orderItemsGrouped = groupByProduct(orderItems);
            data.orderItems = orderItemsGrouped;

            this.orderData.webUser = currentUser.id;
            this.orderData.salesRegion = currentSalesRegion.id;
            this.orderData.comments = data.comments;
            this.orderData.orderMaker = data.orderMaker;
            this.orderData.currency = data.currency;
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
                this.orderData.shippingContact = data.shippingContact;
            }

            if (this.orderData.invoiceContact === undefined) {
                this.orderData.invoiceContact = data.invoiceContact;
            }

            if (this.orderData.invoiceType === undefined) {
                this.orderData.invoiceType = data.invoiceType;
            }

            if (this.orderData.invoiceInfo === undefined) {
                this.orderData.invoiceInfo = data.invoiceInfo;
            }

            if (data.orderItems !== undefined && data.orderItems.length > 0) {
                this.orderData.currency = data.orderItems[0].packs[0].currency;
                let promises: PromiseLike<any>[] = [];
                let loader = new LoaderProductChemicalWithPrices(this.cApp);
                data.orderItems.forEach((e: any) => promises.push(loader.load(e.product.id)));
                let productData: any = await Promise.all(promises);

                let newProductData: any = [];
                productData.forEach((val: any) => {
                    newProductData.push(...val.subs)
                });

                this.orderData.orderItems = data.orderItems.map((e: any) => {
                    var item = new OrderItem();
                    item.product = e.product;
                    item.packs = e.packs.map((v: any) => {
                        let newretail = newProductData.find((e: any) => {
                            return v.pack.id === e.pack.id;
                        });
                        return { ...v, retail: newretail ? newretail.retail : undefined, currency: data.currency }
                    }).filter((v: any) => v.quantity > 0 && v.price && v.retail);
                    item.packs.forEach((pk) => {
                        pk.priceInit = pk.price;
                    });
                    return item
                });
                //     // 运费和运费减免
                this.orderData.freightFee = FREIGHTFEEFIXED;
                if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                    this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
                else
                    this.orderData.freightFeeRemitted = 0;
            }

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

            this.openVPage(VCreateOrder, { orderDraft: 1 });
        }
        else
            this.openVPage(VNotYOrder)
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
     * 打开发票信息编辑界面 
     */
    onInvoiceInfoEdit = async () => {
        let cInvoiceInfo = this.newC(CInvoiceInfo);
        let { invoiceType, invoiceInfo } = this.orderData;
        let origInvoice = {
            invoiceType: invoiceType,
            invoiceInfo: invoiceInfo,
        }
        let newInvoice = await cInvoiceInfo.call<any>(origInvoice, true);
        this.orderData.invoiceType = newInvoice.invoiceType;
        this.orderData.invoiceInfo = newInvoice.invoiceInfo;
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
        let { cCoupon, currentUser } = this.cApp;
        let { id: currentUserId } = currentUser;
        if (await cCoupon.getValidCreditsForWebUser(currentUserId))
            return true;
        let validCoupons = await cCoupon.getValidCouponsForWebUser(currentUserId);
        if (validCoupons && validCoupons.length > 0)
            return true;
        let validCredits = await cCoupon.getValidCreditsForWebUser(currentUserId);
        if (validCredits && validCoupons.length > 0)
            return true;
        return false;
    }

    /**
     * 使用优惠券后计算折扣金额和抵扣额
     */
    private applyCoupon = async (coupon: any) => {
        this.removeCoupon();
        let { result: validationResult, validitydate, isValid } = coupon;
        if (validationResult === 1 && isValid === 1 && new Date(validitydate).getTime() > Date.now()) {
            this.couponAppliedData = coupon;
            let orderPriceStrategy: OrderPriceStrategy = createOrderPriceStrategy(coupon);
            orderPriceStrategy.applyTo(this.orderData, this.uqs);

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

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    /**
     * 提交订单
     */
    submitOrder = async () => {
        let { uqs, currentUser } = this.cApp;
        let { order, webuser, 积分商城, orderDraft } = uqs;

        let result: any = await order.Order.save("order", this.orderData.getDataForSave());
        let { id: orderId, flow, state } = result;
        await order.Order.action(orderId, flow, state, "submit");

        // 保存订单确认状态
        // let { id } = this.brief;
        // let orderData = await uqs.orderDraft.OrderDraft.getSheet(id);
        let { id: draftorderId, flow: draftFlow, state: draftState } = this.brief;
        await orderDraft.OrderDraft.action(draftorderId, draftFlow, draftState, "Pass");
        // 如果使用了coupon/credits，需要将其标记为已使用
        console.log('00', draftorderId)
        let { id: couponId, code, types } = this.couponAppliedData;
        if (couponId) {
            let nowDate = new Date();
            let usedDate = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
            switch (types) {
                case 'coupon':
                    webuser.WebUserCoupon.del({ webUser: currentUser.id, coupon: couponId, arr1: [{ couponType: 1 }] });
                    webuser.WebUserCouponUsed.add({ webUser: currentUser.id, arr1: [{ coupon: couponId, usedDate: usedDate }] });
                    break;
                case 'credits':
                    积分商城.WebUserCredits.del({ webUser: currentUser.id, arr1: [{ credits: couponId }] });
                    积分商城.WebUserCreditsUsed.add({ webUser: currentUser.id, arr1: [{ credits: couponId, usedDate: usedDate }] });
                    break;
                default:
                    break;
            }
        }

        // 打开下单成功显示界面
        this.closePage()
        nav.popTo(this.cApp.topKey);
        // this.openVPage(OrderSuccess, result);
    }

    /**
     * 取消
     */
    onCancel = async () => {
        let { uqs } = this.cApp;
        let { orderDraft } = uqs;
        let { id } = this.brief
        let orderData = await uqs.orderDraft.OrderDraft.getSheet(id);
        let { id: orderId, flow, state } = orderData.brief;
        await orderDraft.OrderDraft.action(orderId, flow, state, "Cancel");
        this.closePage()
    }

    /**
     * 添加到购物车，修改产品信息
     */
    toCartPage = async () => {
        let { cApp, orderData, removeCoupon } = this;
        let { cart } = cApp;
        removeCoupon();
        orderData.orderItems.forEach(async (v) => {
            v.packs.map(async (e) => {
                let source = 0;
                let { quantity, retail, price, pack, currency } = e;
                let { id } = currency;
                let currencyId = id
                await cart.add(v.product, pack, quantity, price, retail, currencyId, source);
            })
        })
        this.closePage()
        this.cApp.cCart.start();
    }
}