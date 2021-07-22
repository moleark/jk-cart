import { GLOABLE } from "global";
import { observable } from "mobx";
import { CApp } from "tapp";

export interface IActivePushOrder {
    pushOrder(orderRes: any, param?: any): Promise<void>;
}

export function acPushOrder(cApp: CApp): IActivePushOrder {
    let toPushOrder = new SubOrder(cApp);
    let type = toPushOrder.agtCustomerType;
    switch (type) {
        case "EPEC":
            return new SubOrderEpec(cApp);
        default:
            return new SubOrder(cApp);
    };
}

export class SubOrder {
    cApp: CApp;
    @observable isToSuccessPage: boolean = true;
    constructor(res: any) {
        this.cApp = res;
    }

    get agtCustomerType() {
        if (!this.cApp.currentUser) return;
        let type: string;
        let { epecUser } = this.cApp.currentUser;
        if (epecUser) type = 'EPEC';
        return type;
    };

    get maxAmountBol() {
        return this.maxAmount();
    };

    protected maxAmount = (): boolean => { return true };

    pushOrder = async (orderRes: any, param?: any) => { };
};

export class SubOrderEpec extends SubOrder {

    maxAmount = () => {
        return this.cApp.cOrder.orderData.amount <= 500000;
    };

    pushOrder = async (orderRes: any, param?: any) => {
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
                    this.isToSuccessPage = false;
                    return;
                };
            } else {
                switch (status) {
                    case 500:
                        let repContent = await rep.json();
                        param.action(repContent.message);
                        this.isToSuccessPage = false;
                        // this.openVPage(VEpecOrderError, { message: repContent.message });
                        return;
                    default:
                        break;
                }
            }
        } catch (error) {

        }
    };
}
