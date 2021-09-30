import { BoxId } from "tonva-react";
import { observable, computed, makeObservable } from 'mobx';

export class prizeOrder {

    webUser: any;   // OK
    organization: BoxId;
    customer: any;  //OK
    salesRegion: BoxId;   // OK

    shippingContact: BoxId; //OK
    exchangeItems: prizeOrderItem[] = [];

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
                product: oi.product, pack: oi.pack, point: oi.point, quantity: oi.quantity
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

export class prizeOrderItem {
    product: BoxId;
    pack: BoxId;
    quantity: any;
    point: any;
    imageUrl: any;
    description: any;
    descriptionC: any;
    grade: any;

    constructor() {
        makeObservable(this, {
            pack: observable,
            quantity: observable,
            point: observable,
            imageUrl: observable,
            description: observable,
            descriptionC: observable,
            grade: observable,
            subAmount: computed
        });
    }

    get subAmount() {
        return this.quantity * this.point;
    }
}