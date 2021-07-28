import { GLOABLE } from "global";
import { CApp } from "tapp";

export interface IActivePushOrder {
    maxAmount: boolean;
    pushOrder(orderRes: any): Promise<void>;
}

export function ActivePushOrder(cApp: CApp): IActivePushOrder {
    let type: any = cApp.currentUser?.agtCustomerType;
    switch (type) {
        case "EPEC":
            return new PushOrderEpec(cApp);
        default:
            return new PushOrder(cApp);
    };
}

export class PushOrder {
    cApp: CApp;
    constructor(res: any) {
        this.cApp = res;
    }

    get maxAmount() { return true };

    pushOrder = async (orderRes: any) => {
        this.cApp.cOrder.openOrderSuccess(orderRes);
    };
};

export class PushOrderEpec extends PushOrder {

    get maxAmount() { return this.cApp.cOrder.orderData.amount <= 500000; };

    pushOrder = async (orderRes: any) => {
        // epec客户下单后要求跳转到指定的url
        let { id: orderId, no } = orderRes;
        let epecOrder = this.cApp.cOrder.orderData.getDataForSave2();
        epecOrder.id = orderId;
        epecOrder.no = no;
        epecOrder.type = 1;
        try {
            let rep = await window.fetch(GLOABLE.EPEC.PUSHORDERURL, {
                method: 'post',
                mode: "cors",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(epecOrder)
            });
            let { ok, status } = rep;
            if (ok) {
                let url = await rep.json();
                if (url) {
                    window.location.href = url;
                    return;
                };
            } else {
                switch (status) {
                    case 500:
                        let repContent = await rep.json();
                        this.cApp.cOrder.openEpecOrderError(repContent.message);
                        return;
                    default:
                        break;
                }
            }
        } catch (error) {

        };
        this.cApp.cOrder.openOrderSuccess(orderRes);
    };
}
