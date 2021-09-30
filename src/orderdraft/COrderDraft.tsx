import { makeObservable, observable } from 'mobx';
import { CUqBase } from '../CBase';
import { VNotYOrder } from './VNotYOrder';
import { groupByProduct } from 'tools/groupByProduct';
import { Order, OrderItem } from 'order/Order';
import { LoaderProductChemicalWithPrices } from 'product/itemLoader';
import { CApp } from 'CApp';
const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;
export class COrderDraft extends CUqBase {
    orderData: Order = new Order();
    buyerAccounts: any[] = [];
    hasAnyCoupon: boolean;
    orderDraft: any;

    constructor(cApp: CApp) {
        super(cApp);

        makeObservable(this, {
            orderData: observable,
            hasAnyCoupon: observable,
            orderDraft: observable,
            buyerAccounts: observable
        });
    }

    protected async internalStart() { }

    showSharedOrder = async (param: any) => {
        let orderdraftid = param;
        let { uqs, cMe } = this.cApp;
        this.orderDraft = await uqs.orderDraft.OrderDraft.getSheet(orderdraftid);
        if (!this.isLogined) {
            cMe.showLogin();
            if (this.isLogined)
                this.renderOrderDraft()
        } else {
            this.renderOrderDraft()
        }
    }

    renderOrderDraft = async () => {
        let { brief, data } = this.orderDraft;
        let { currentUser, uqs, cCoupon, currentSalesRegion } = this.cApp;
        if (data.webUser.id === currentUser.id) {
            let { coupon } = data;
            let { id: couponId } = coupon;
            let result = await uqs.salesTask.Coupon.load(couponId);
            let { code: couponCode } = result;
            // 自动领取积分券
            cCoupon.autoDrawCouponBase(couponCode)
            let { orderItems } = data;
            let orderItemsGrouped = groupByProduct(orderItems);
            data.orderItems = orderItemsGrouped;

            this.orderData.webUser = currentUser.id;
            this.orderData.salesRegion = currentSalesRegion.id;
            this.orderData.comments = data.comments;
            this.orderData.orderMaker = data.orderMaker;
            this.orderData.currency = data.currency;

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

            let orderData = this.orderData;
            this.cApp.cOrder.renderOrderDraft({ orderData, orderDraftBrief: brief });

            // this.openVPage(VCreateOrder, { orderDraft: 1 });
        }
        else
            this.openVPage(VNotYOrder, brief)
    }
}