import { VCouponManage } from './VCouponManage';
import { CUqBase } from '../CBase';

export class CCouponManage extends CUqBase {

    protected async internalStart(param: any) {
        let { cCoupon } = this.cApp;
        let result = await cCoupon.getValidCardForWebUser();
        this.openVPage(VCouponManage, result);
    }
    /**
     * 可使用的优惠卡
     */
    getValidMusterForWebUser = (params: any) => {
        let { vipCardForWebUser, couponsForWebUser, creditsForWebUser } = params;
        let shift = couponsForWebUser.map((v: any) => v.coupon).concat(creditsForWebUser.map((v: any) => v.coupon));
        return vipCardForWebUser ? [vipCardForWebUser.coupon].concat(shift) : shift;
    }
    /**
     * 获取已过期的优惠卡
     */
    getExpiredMusterForWebUser = async () => {
        let { webuser, 积分商城 } = this.uqs;
        let { currentUser, cCoupon } = this.cApp;
        let expiredMusterForWebUser: any[] = [];
        let couponsMusterForWebUser: any = await webuser.WebUserCoupon.table({ webUser: currentUser });
        let creditsMusterForWebUser: any = await 积分商城.WebUserCredits.table({ webUser: currentUser });
        let vipCardMusterForWebUser: any = await webuser.WebUserVIPCard.obj({ webUser: currentUser });
        if (vipCardMusterForWebUser) {
            let { expiredDate } = vipCardMusterForWebUser;
            if (expiredDate.getTime() < Date.now()) {
                vipCardMusterForWebUser.coupon = await cCoupon.getCouponValidationResult(vipCardMusterForWebUser.vipCardCode);
                expiredMusterForWebUser.push(vipCardMusterForWebUser.coupon);
            }
        }

        if (couponsMusterForWebUser) {
            let result = couponsMusterForWebUser.filter((v: any) => v.expiredDate.getTime() < Date.now());
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let e = result[i];
                    e.coupon = await cCoupon.getCouponValidationResult(e.couponCode);
                }
                expiredMusterForWebUser.push(...result.map((v: any) => v.coupon));
            }
        }

        if (creditsMusterForWebUser) {
            let result = creditsMusterForWebUser.filter((v: any) => v.expiredDate.getTime() < Date.now());
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let e = result[i];
                    e.coupon = await cCoupon.getCouponValidationResult(e.creditsCode);
                }
                expiredMusterForWebUser.push(...result.map((v: any) => v.coupon));
            }
        }

        return expiredMusterForWebUser;
    }

    getCoupons = async (state: any) => {
        let { webuser } = this.uqs;
        let { cCoupon, currentUser } = this.cApp;

        let result;
        switch (state) {
            case 'validCardForWebUser':
                result = await cCoupon.getValidCardForWebUser();
                return this.getValidMusterForWebUser(result);
            case 'usageRecordForWebUser':
                result = await webuser.WebUserCouponUsed.query({ webuser: currentUser });
                return result.ret;
            case 'expiredForWebUser':
                result = await this.getExpiredMusterForWebUser();
                return result;
            default:
                break;
        }
    }
}
