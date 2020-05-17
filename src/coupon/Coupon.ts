import { UQs } from '../uqs';
import { Tuid, BoxId } from 'tonva';
import { Order } from 'order/Order';

export class CouponBase {

    constructor(protected id: BoxId, private code: number, expiredDate: Date, private isValid: boolean) {
        this.expiredDate = new Date(expiredDate);
    }

    protected expiredDate: Date;

    // let { result: validationResult, id, code, discount, preferential, validitydate, isValid, types, discountSetting } = coupon;
    getCodeShow() {
        let codeShow = String(this.code);
        let p1 = codeShow.substr(0, 4);
        let p2 = codeShow.substr(4);
        return p1 + ' ' + p2;
    }

    isAvaliable() {
        return this.isValid && this.expiredDate.getTime() > Date.now()
    }
}

export interface OrderPriceStrategy {

    applyTo(order: Order, uqs: UQs): Promise<void>;
}

export function createOrderPriceStrategy(couponData: any): OrderPriceStrategy {
    let { id, code, discount, preferential, validitydate, isValid, types, discountSetting } = couponData;
    switch (types) {
        case "coupon":
            return new Coupon(id, code, validitydate, isValid, discount, preferential);
            break;
        case "coupon_sale":
            return new CouponSale(id, code, validitydate, isValid, discount, preferential);
            break;
        case "vipcard":
            return new VIPCard(id, code, validitydate, isValid, discountSetting);
            break;
        case "credits":
            return new Credits(id, code, validitydate, isValid);
            break;
        default:
            break;
    }
}

export class Coupon extends CouponBase implements OrderPriceStrategy {

    constructor(protected id: BoxId, code: number, expiredDate: Date, isValid: boolean, protected discount: number, protected preferential: number) {
        super(id, code, expiredDate, isValid);
    }
    async applyTo(orderData: Order, uqs: UQs) {
        orderData.coupon = this.id
        if (this.isAvaliable()) {
            if (this.discount) {
                let { orderItems } = orderData;
                let { AgentPrice } = uqs.product;
                if (orderItems !== undefined && orderItems.length > 0) {
                    // 获取每个明细中产品的agentprice;
                    let promises: PromiseLike<any>[] = [];
                    orderItems.forEach((e: any) => {
                        promises.push(AgentPrice.table({ product: e.product.id, salesRegion: orderData.salesRegion.id }));
                    });
                    let agentPrices = await Promise.all(promises);

                    if (agentPrices && agentPrices.length > 0) {
                        let couponOffsetAmount = 0;
                        for (let i = 0; i < orderItems.length; i++) {
                            let oi = orderItems[i];
                            let { product, packs } = oi;

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
                                let discountPrice = Math.round(Math.max(agentPrice.agentPrice, pk.retail * (1 - this.discount)));
                                // 最终价格取折扣价格和显示的价格（可能会有市场活动价)中较低者
                                pk.price = Math.round(Math.min(pk.price, discountPrice));
                                couponOffsetAmount += Math.round(pk.quantity * (pk.retail - pk.price) * -1);
                            };
                        };
                        orderData.couponOffsetAmount = Math.round(couponOffsetAmount);
                    };
                }
            }

            if (this.preferential) {
                orderData.couponRemitted = this.preferential * -1;
            }
        }
    }


}

export class CouponSale extends Coupon implements OrderPriceStrategy {

    async applyTo(orderData: Order, uqs: UQs) {
        orderData.coupon = this.id
        if (this.isAvaliable()) {
            if (this.discount) {
                let { orderItems } = orderData;
                if (orderItems !== undefined && orderItems.length > 0) {
                    let couponOffsetAmount = 0;
                    for (let i = 0; i < orderItems.length; i++) {
                        let oi = orderItems[i];
                        let { product, packs } = oi;

                        for (let j = 0; j < packs.length; j++) {
                            let pk = packs[j];
                            // 最终价格取折扣价格和显示的价格（可能会有市场活动价)中较低者
                            pk.price = Math.round(Math.min(pk.price, pk.retail * (1 - this.discount)));
                            couponOffsetAmount += Math.round(pk.quantity * (pk.retail - pk.price) * -1);
                        };
                    };
                    orderData.couponOffsetAmount = Math.round(couponOffsetAmount);
                }
            }

            if (this.preferential) {
                orderData.couponRemitted = this.preferential * -1;
            }
        }
    }
}

export class VIPCard extends CouponBase implements OrderPriceStrategy {

    constructor(protected id: BoxId, code: number, expiredDate: Date, isValid: boolean, private discountSetting: any[]) {
        super(id, code, expiredDate, isValid);
    }
    async applyTo(orderData: Order, uqs: UQs) {
        orderData.coupon = this.id
        if (this.isAvaliable() && this.discountSetting && this.discountSetting.length > 0) {
            let { orderItems } = orderData;
            if (orderItems !== undefined && orderItems.length > 0) {
                let couponOffsetAmount = 0;
                for (let i = 0; i < orderItems.length; i++) {
                    let oi = orderItems[i];
                    let { product, packs } = oi;
                    // 获取明细中产品的VIP卡折扣
                    let thisDiscountSetting = this.discountSetting.find((e: any) => Tuid.equ(e.brand, product.obj.brand));
                    let discount = (thisDiscountSetting && thisDiscountSetting.discount) || 0;

                    for (let j = 0; j < packs.length; j++) {
                        let pk = packs[j];
                        // 最终价格取折扣价格和显示的价格（可能会有市场活动价)中较低者
                        pk.price = Math.round(Math.min(pk.price, pk.retail * (1 - discount)));
                        couponOffsetAmount += Math.round(pk.quantity * (pk.retail - pk.price) * -1);
                    };
                };
                orderData.couponOffsetAmount = Math.round(couponOffsetAmount);
            }
        }
    }


}


export class Credits extends CouponBase implements OrderPriceStrategy {
    async applyTo(orderData: Order, uqs: UQs) {
        orderData.point = Math.round(orderData.productAmount * 2);
    }
}