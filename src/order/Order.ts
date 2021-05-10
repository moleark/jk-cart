import { BoxId } from 'tonva-react';
import { observable, computed, makeObservable } from 'mobx';
import { Product, CartPackRow } from '../store';

export class Order {
    webUser: number;
    organization: BoxId;
    customer: any;

    shippingContact: BoxId;
    invoiceContact: BoxId;
    invoiceType: BoxId;
    invoiceInfo: BoxId;
    orderItems: OrderItem[] = [];

    freightFee: number;
    freightFeeRemitted: number;

    constructor() {
        makeObservable(this, {
            shippingContact: observable,
            invoiceContact: observable,
            invoiceType: observable,
            invoiceInfo: observable,
            orderItems: observable,
            freightFee: observable,
            freightFeeRemitted: observable,
            amount: computed,
            productAmount: computed,
            coupon: observable,
            couponOffsetAmount: observable,
            couponRemitted: observable,
            point: observable
        });
    }

    /*
    @computed get amount() {
        return parseFloat((this.orderItems.reduce((pv, cv) => (pv + cv.subAmount), 0) +
            (this.freightFee ? this.freightFee : 0) +
            (this.freightFeeRemitted ? this.freightFeeRemitted : 0) +
            (this.couponOffsetAmount ? this.couponOffsetAmount : 0) +
            (this.couponRemitted ? this.couponRemitted : 0)).toFixed(2));
    };
    */
    /**
     * 总金额
     */
    get amount() {
        return parseFloat((this.orderItems.reduce((pv, cv) => (pv + cv.subAmount), 0) +
            (this.freightFee ? this.freightFee : 0) +
            (this.freightFeeRemitted ? this.freightFeeRemitted : 0)).toFixed(2));
    }
    // @computed get productAmount() {
    //     return parseFloat(this.orderItems.reduce((pv, cv) => pv + cv.subAmount, 0).toFixed(2));
    // };
    /**
     * 商品总额(未应用券的价格) -----> 已修 应用目录价计算(总额恒定)
     */
    get productAmount() {
        return parseFloat(this.orderItems.reduce((pv, cv) => pv + cv.subListAmount, 0).toFixed(2));
    }
    currency: BoxId;
    coupon: BoxId;
    couponOffsetAmount: number;
    couponRemitted: number;
    point: number;
    comments: string;
    salesRegion: BoxId;

    getDataForSave() {
        let orderItems: any[] = [];
        this.orderItems.forEach(oi => {
            oi.packs.forEach(pk => {
                this.currency = pk.currency;
                orderItems.push({
                    product: oi.product, pack: pk.pack, price: pk.price, quantity: pk.quantity
                    , subAmount: pk.quantity * pk.price, retail: pk.retail
                })
            })
        });
        return {
            webUser: this.webUser,
            organization: this.organization,
            customer: this.customer,
            shippingContact: this.shippingContact,
            invoiceContact: this.invoiceContact,
            invoiceType: this.invoiceType,
            invoiceInfo: this.invoiceInfo,
            amount: this.amount,
            currency: this.currency,
            freightFee: this.freightFee,
            freightFeeRemitted: this.freightFeeRemitted,
            coupon: this.coupon,
            couponOffsetAmount: this.couponOffsetAmount,
            couponRemitted: this.couponRemitted,
            point: this.point,
            comments: this.comments,
            orderitems: orderItems, // 前面的必须是小写的orderitems
            salesRegion: this.salesRegion,
        }
    }

    /**
     * 
     */
    getDataForSave2(): any {
        let orderItems: any[] = [];
        this.orderItems.forEach(oi => {
            oi.packs.forEach(pk => {
                this.currency = pk.currency;
                orderItems.push({
                    product: oi.product.id, pack: pk.pack.id, price: pk.price, quantity: pk.quantity
                    , subAmount: pk.quantity * pk.price, retail: pk.retail
                })
            })
        });
        return {
            webUser: this.webUser,
            organization: this.organization?.id,
            customer: this.customer?.id,
            shippingContact: this.shippingContact?.id,
            invoiceContact: this.invoiceContact?.id,
            invoiceType: this.invoiceType?.id,
            invoiceInfo: this.invoiceInfo?.id,
            amount: this.amount,
            currency: this.currency,
            freightFee: this.freightFee,
            freightFeeRemitted: this.freightFeeRemitted,
            coupon: this.coupon,
            couponOffsetAmount: this.couponOffsetAmount,
            couponRemitted: this.couponRemitted,
            point: this.point,
            comments: this.comments,
            orderitems: orderItems, // 前面的必须是小写的orderitems
            salesRegion: this.salesRegion?.id,
        }
    }
}

export class OrderItem {
    product: Product;
    packs: CartPackRow[];
    get subAmount() {
        return this.packs.reduce((p, c) => {
            return p + c.price * c.quantity
        }, 0);
    }
    get subListAmount() {
        return this.packs.reduce((p, c) => {
            return p + c.retail * c.quantity
        }, 0);
    }

    constructor(product: Product) {
        makeObservable(this, {
            packs: observable,
            subAmount: computed,
            subListAmount: computed
        });

        this.product = product;
    }
}