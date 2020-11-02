import { CUqBase } from '../tapp/CBase';
import { VSharedCoupon } from './VSharedCoupon';
import { BoxId, nav, User, QueryPager, Tuid } from 'tonva';
import { observable } from 'mobx';
import { VCoupleAvailable } from './VCouponAvailable';
import { VVIPCardDiscount } from './VVIPCardDiscount';
import { VCoupon, VCredits, VVIPCard } from './VVIPCard';
import { VCouponManage } from './VCouponManage';

export const COUPONBASE: any = {
    'coupon': { 'name': '优惠券', 'view': VCoupon },
    'credits': { 'name': '积分券', 'view': VCredits },
    'vipcard': { 'name': 'VIP卡', 'view': VVIPCard }
}


const couponTips:{[key:number]: string} = {
	"-1": '对不起，当前服务器繁忙，请稍后再试。',
	"1": '有效',
	"0": "无此优惠券，请重新输入或与您的专属销售人员联系确认优惠码是否正确。",
	"2": '优惠券已过期或作废，请重新输入或与您的专属销售人员联系。',
	"3": '优惠券无效，请重新输入或与您的专属销售人员联系。',
	"5": '优惠券无效，请重新输入或与您的专属销售人员联系。',
	"6": '不允许使用本人优惠券！',
	"4": '该优惠券已经被使用过了，不允许重复使用。',
}

export class CCoupon extends CUqBase {
    isOpenMyCouponManage: boolean = false;
    @observable couponDrawed: boolean;
    @observable sharedCouponValidationResult: any;
    couponPager: QueryPager<any>;

    applyCoupon = async (coupon: string) => {
        let validationResult = await this.getCouponValidationResult(coupon);
        let { result: rtn, id, types } = validationResult;
        if (rtn === 1) {
            if (types === 'vipcard' || types === 'coupon') {
                validationResult.discountSetting = await this.getCouponDiscountSetting(types, id);
            }
            this.returnCall(validationResult);
            this.closePage();
        }
        return rtn;
    }

    getCouponValidationResult = async (coupon: string) => {
        let { currentUser } = this.cApp;
        return await this.uqs.salesTask.IsCanUseCoupon.submit({ code: coupon, webUser: currentUser && currentUser.id });
    }

    /**
     * 优惠卡券管理界面
     */
    openMyCouponManage = async () => {
        this.isOpenMyCouponManage = true;
        this.openVPage(VCouponManage);
    }

    /**
     * 获取不同状态下的优惠卡券
     */
    getCoupons = async (state: any) => {
        let { webuser } = this.uqs;
        let { currentUser } = this.cApp;
        let result;
        switch (state) {
            case 'validCardForWebUser':
                result = await this.getValidCardForWebUser();
                return this.getValidMusterForWebUser(result);
            case 'usageRecordForWebUser':
                result = new QueryPager<any>(webuser.getMyUsedCoupon, 10, 10);
                await result.first({ webUser: currentUser });
                return result;
            case 'expiredForWebUser':
                result = new QueryPager<any>(webuser.getMyExpiredCoupon, 10, 10);
                await result.first({ webUser: currentUser });
                return result;
            default:
                break;
        }
    }

    /**
     * 可使用的优惠卡
     */
    getValidMusterForWebUser = (params: any) => {
        let { vipCardForWebUser, couponsForWebUser, creditsForWebUser } = params;
        let shift = couponsForWebUser.map((v: any) => v.coupon).concat(creditsForWebUser.map((v: any) => v.coupon));
        let validMuster = vipCardForWebUser ? [vipCardForWebUser.coupon].concat(shift) : shift;
        let finalValidMuster = validMuster.filter((v: any) => v.result === 1);
        return finalValidMuster;
    }

    /**
     * 获取已过期的优惠卡
     */
    /* getExpiredMusterForWebUser = async () => {
        let { webuser, 积分商城 } = this.uqs;
        let { currentUser } = this.cApp;
        let expiredMusterForWebUser: any[] = [];
        let couponsMusterForWebUser: any = await webuser.WebUserCoupon.table({ webUser: currentUser });
        let creditsMusterForWebUser: any = await 积分商城.WebUserCredits.table({ webUser: currentUser });
        let vipCardMusterForWebUser: any = await webuser.WebUserVIPCard.obj({ webUser: currentUser });
        if (vipCardMusterForWebUser) {
            let { expiredDate } = vipCardMusterForWebUser;
            if (expiredDate.getTime() < Date.now()) {
                vipCardMusterForWebUser.coupon = await this.getCouponValidationResult(vipCardMusterForWebUser.vipCardCode);
                expiredMusterForWebUser.push(vipCardMusterForWebUser.coupon);
            }
        }

        if (couponsMusterForWebUser) {
            let result = couponsMusterForWebUser.filter((v: any) => v.expiredDate.getTime() < Date.now());
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let e = result[i];
                    e.coupon = await this.getCouponValidationResult(e.couponCode);
                }
                expiredMusterForWebUser.push(...result.map((v: any) => v.coupon));
            }
        }

        if (creditsMusterForWebUser) {
            let result = creditsMusterForWebUser.filter((v: any) => v.expiredDate.getTime() < Date.now());


            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let e = result[i];
                    e.coupon = await this.getCouponValidationResult(e.creditsCode);
                }
                expiredMusterForWebUser.push(...result.map((v: any) => v.coupon));
            }
        }
        // expiredMusterForWebUser.forEach((el: any) => el.conductReveal = true);
        return expiredMusterForWebUser;
    }
 */

    /**
     * 获取用户有效的优惠券/vip卡
     */
    getValidCardForWebUser = async () => {
        let { currentUser } = this.cApp;
        let { id: currentUserId } = currentUser;

        let validVIPCardForWebUser = await this.getValidVipCardForWebUser(currentUserId);
        if (validVIPCardForWebUser) {
            validVIPCardForWebUser.coupon = await this.getCouponValidationResult(validVIPCardForWebUser.vipCardCode)
        }

        let validCouponsForWebUser = await this.getValidCouponsForWebUser(currentUserId);
        if (validCouponsForWebUser.length > 0) {
            for (let i = 0; i < validCouponsForWebUser.length; i++) {
                let e = validCouponsForWebUser[i];
                e.coupon = await this.getCouponValidationResult(e.couponCode);
            }
        }

        let validCreditsForWebUser = await this.getValidCreditsForWebUser(currentUserId);
        if (validCreditsForWebUser.length > 0) {
            for (let i = 0; i < validCreditsForWebUser.length; i++) {
                let e = validCreditsForWebUser[i];
                e.coupon = await this.getCouponValidationResult(e.creditsCode);
            }
        }

        return {
            'vipCardForWebUser': validVIPCardForWebUser,
            'couponsForWebUser': validCouponsForWebUser,
            'creditsForWebUser': validCreditsForWebUser
        }
    }

    protected async internalStart(param: any) {
        let result = await this.getValidCardForWebUser();

        this.openVPage(VCoupleAvailable, result);
    }

    /**
     * （在订单上）应用coupon
     * @param coupon 
     */
    applySelectedCoupon = async (coupon: string) => {
        if (!coupon)
            return "请输入您的优惠卡/券号";
        else {
            let ret = await this.applyCoupon(coupon);
            return this.applyTip(ret);
        }
    }

    applyTip = (ret: any) => {
		return couponTips[ret];
		/*
        switch (ret) {
            case -1:
                return '对不起，当前服务器繁忙，请稍后再试。';
            case 1:
                return '有效';
            case 0:
                return "无此优惠券，请重新输入或与您的专属销售人员联系确认优惠码是否正确。";
            case 2:
                return '优惠券已过期或作废，请重新输入或与您的专属销售人员联系。';
            case 3:
            case 5:
                return '优惠券无效，请重新输入或与您的专属销售人员联系。';
            case 6:
                return '不允许使用本人优惠券！';
            case 4:
                return '该优惠券已经被使用过了，不允许重复使用。';
            default:
                break;
        }*/
    }

    /**
     * 
     * @param currentUserId 
     */
    getValidVipCardForWebUser = async (currentUserId: number): Promise<any> => {
        let { uqs } = this.cApp;
        let { webuser } = uqs;
        let { WebUserVIPCard } = webuser;
        let vipCardForWebUser: any = await WebUserVIPCard.obj({ webUser: currentUserId });
        if (vipCardForWebUser) {
            let { expiredDate } = vipCardForWebUser
            if (expiredDate.getTime() > Date.now()) {
                return vipCardForWebUser;
            }
        }
    }

    /**
     * 
     * @param currentUserId 
     */
    getValidCouponsForWebUser = async (currentUserId: number): Promise<any[]> => {
        let { uqs } = this.cApp;
        let { webuser } = uqs;
        let { WebUserCoupon } = webuser;
        let couponsForWebUser: any[] = await WebUserCoupon.table({ webUser: currentUserId });
        let validCouponsForWebUser: any[] = [];
        if (couponsForWebUser) {
            validCouponsForWebUser = couponsForWebUser.filter(v => v.expiredDate.getTime() > Date.now());
        }
        return validCouponsForWebUser;
    }

    /**
     * 
     * @param currentUserId 
     */
    getValidCreditsForWebUser = async (currentUserId: number): Promise<any[]> => {
        let { uqs } = this.cApp;
        let { 积分商城 } = uqs;
        let creditsForWebUser: any[] = await 积分商城.WebUserCredits.table({ webUser: currentUserId });
        let validCreditsForWebUser: any[] = [];
        if (creditsForWebUser) {
            validCreditsForWebUser = creditsForWebUser.filter(v => v.expiredDate.getTime() > Date.now());
        }
        return validCreditsForWebUser;
    }

    /**
     * 显示VIP卡的品牌折扣明细 
     * @param coupon 
     */
    showDiscountSetting = async (vipCard: any) => {
        let { types, id } = vipCard;
        vipCard.discountSetting = await this.getCouponDiscountSetting(types, id);
        this.openVPage(VVIPCardDiscount, vipCard);
    }
    /**
     * 获取卡券的有效折扣  
     */
    getValidDiscounts = async (types: string, id: number) => {
        return await this.getCouponDiscountSetting(types, id);
    }

    private getCouponDiscountSetting = async (types: string, couponId: number) => {
        if (types === 'vipcard' || types === 'coupon') {
            return await this.uqs.salesTask.VIPCardDiscount.table({ coupon: couponId });
        }
    }

    /**
     * 领取VIP卡 
     */
    showSharedVIPCard = async (param: any) => {
        let { vipcard: vipCardCode, productids } = param;
        await this.autoDrawCouponBase(vipCardCode);
        let products = this.getProducts(productids);
        this.openVPage(VSharedCoupon, { products });
    }

    /**
     * 领取优惠券 
     */
    showSharedCoupon = async (param: any) => {
        let { coupon, productids } = param;
        await this.autoDrawCouponBase(coupon);
        let products = this.getProducts(productids);
        this.openVPage(VSharedCoupon, { products });
    }

    /**
     * 领取积分码 
     */
    showSharedCredits = async (param: any) => {
        let { credits, productids } = param;
        await this.autoDrawCouponBase(credits);
        let products = this.getProducts(productids);
        this.openVPage(VSharedCoupon, { products });
    }

    private autoDrawCouponBase = async (couponBaseCode: string) => {

        this.couponDrawed = false;
        this.sharedCouponValidationResult = await this.getCouponValidationResult(couponBaseCode);
        let { result } = this.sharedCouponValidationResult;

        // 自动领取积分券
        let { currentUser } = this.cApp;
        let { id: currentUserId, allowOrdering } = currentUser;
        if (result === 1 && currentUserId && allowOrdering)
            await this.drawCoupon(this.sharedCouponValidationResult);
    }

    private getProducts = (productids: string) => {
        let products: any;
        if (productids) {
            let { ProductX } = this.uqs.product;
            let productidArray = productids.split('-').filter((v: any) => /^\d{1,10}$/.test(v));
            products = productidArray.map((v: any) => ProductX.boxId(v));
        }
        return products;
    }

    loginWhenDrawCoupon = async (credits: any) => {
        let { cApp } = this;
        let { cMe, currentUser } = cApp;
        let { code } = credits;
        this.sharedCouponValidationResult = await this.getCouponValidationResult(code);
        let { result } = this.sharedCouponValidationResult;
        let allowCurrentUser = async () => {
            if (result === 1) {
                if (!currentUser.allowOrdering) {
                    cMe.toPersonalAccountInfo(async () => await this.drawCoupon(this.sharedCouponValidationResult));
                } else {
                    await this.drawCoupon(this.sharedCouponValidationResult);
                }
            }
        }

		await this.cApp.assureLogin();
		await allowCurrentUser();
		/*
        let loginCallback = async (user: User) => {
            await cApp.currentUser.setUser(user);
            await cApp.loginCallBack(user);
            this.closePage(1);
            await allowCurrentUser();
        };
        if (!this.isLogined)
            nav.showLogin(loginCallback, true);
        else {
            await allowCurrentUser();
		}
		*/
    }

    drawCoupon = async (credits: any) => {
        let { uqs, cApp } = this;
        let { currentUser } = cApp;
        let { id: currentUserId } = currentUser;
        let { 积分商城, webuser } = uqs;
        let { result, id: creditsId, code, validitydate, types } = credits;
        if (result !== 1)
            return;
        switch (types) {
            case 'credits':
                let drawedResult = await 积分商城.WebUserCredits.obj({ webUser: currentUserId, credits: creditsId });
                if (!drawedResult) {
                    let now = new Date();

                    await 积分商城.WebUserCredits.add({
                        webUser: currentUserId,
                        arr1: [{
                            credits: creditsId,
                            creditsCode: code,
                            createDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                            expiredDate: validitydate
                        }]
                    })
                }
                break;
            case 'coupon':
                let drawedResult3 = await webuser.WebUserCoupon.obj({ webUser: currentUserId, coupon: creditsId });
                if (!drawedResult3) {
                    let now = new Date();
                    await webuser.WebUserCoupon.add({
                        webUser: currentUserId,
                        coupon: creditsId,
                        arr1: [{
                            couponType: 1,
                            couponCode: code,
                            createDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                            expiredDate: validitydate,
                        }]
                    })
                }
                break;
            case 'vipcard':
                let drawedResult2 = await webuser.WebUserVIPCard.obj({ webUser: currentUserId, vipCard: creditsId });
                if (!drawedResult2) {
                    let now = new Date();
                    await this.uqs.webuser.WebUserVIPCard.add({
                        webUser: currentUserId,
                        vipCard: creditsId,
                        arr1: [{
                            vipCardType: 1,
                            createDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                            expiredDate: validitydate,
                            vipCardCode: code
                        }]
                    })
                }
                break;
            default:
                break;
        }
        this.couponDrawed = true;
    }

    async showProductDetail(product: number) {
        let { cProduct } = this.cApp;
        await cProduct.showProductDetail(product);
    }

    renderProduct = (product: any) => {
        let { cProduct } = this.cApp;
        return cProduct.renderProductWithPrice(product);
    }
}