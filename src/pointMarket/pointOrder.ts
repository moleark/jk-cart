import { BoxId } from "tonva-react";
import { observable, computed, makeObservable } from 'mobx';

export class pointOrder {

    webUser: any;   // OK
    organization: BoxId;
    customer: any;  //OK
    salesRegion: BoxId;   // OK

    shippingContact: BoxId; //OK
    exchangeItems: OrderItem[] = [];

    constructor() {
        makeObservable(this, {
            shippingContact: observable,
            exchangeItems: observable,
            amount: computed
        });
    }

    get amount() {
        return this.exchangeItems.reduce((pv, cv) => (pv + cv.subAmount), 0);
    };

    getDataForSave() {
        let exchangeItems: any[] = [];
        this.exchangeItems.forEach(oi => {
            exchangeItems.push({
                product: oi.product, point: oi.point, quantity: oi.quantity //, pack: oi.pack,
                , subAmount: oi.quantity * oi.point
            })
        });
        return {
            webUser: this.webUser,
            organization: this.organization,
            customer: this.customer,
            shippingContact: this.shippingContact,
            amount: this.amount,
            exchangeitems: exchangeItems, // 前面的必须是小写的
            salesRegion: this.salesRegion
        }
    }
}

export class OrderItem {
    product: BoxId;
    pack: BoxId;
    quantity: any;
    point: any;

    constructor() {
        makeObservable(this, {
            pack: observable,
            quantity: observable,
            point: observable,
            subAmount: computed
        });
    }

    get subAmount() {
        return this.quantity * this.point;
    }
}