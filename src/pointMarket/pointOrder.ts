import { BoxId } from 'tonva';
import { observable, computed } from 'mobx';

export class pointOrder {

    webUser: any;   // OK
    organization: BoxId;
    customer: any;  //OK
    salesRegion: BoxId;   // OK

    @observable shippingContact: BoxId; //OK
    @observable exchangeItems: OrderItem[] = [];

    @computed get amount() {
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
    @observable pack: BoxId;
    @observable quantity: any;
    @observable point: any;
    @computed get subAmount() {
        return this.quantity * this.point;
    }
}