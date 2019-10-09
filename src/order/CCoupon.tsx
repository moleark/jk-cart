//import { Controller, Action } from 'tonva';
//import { CCartApp } from 'CCartApp';
import { CUqBase } from '../CBase';
import { VCouponEdit } from './VCouponEdit';

export class CCoupon extends CUqBase {

    applyCoupon = async (coupon: string) => {

        let { currentCustomer } = this.cApp.currentUser;
        let validationResult = await this.uqs.salesTask.IsCanUseCoupon.submit({ code: coupon, customer: currentCustomer && currentCustomer.id });
        let rtn = validationResult.result;
        if (rtn === 1) {
            this.returnCall(validationResult);
            this.closePage();
        }
        return rtn;
    }

    protected async internalStart(param: any) {
        this.openVPage(VCouponEdit);
    }
}