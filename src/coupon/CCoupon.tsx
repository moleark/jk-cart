import { CUqBase } from '../CBase';
import { VSharedCoupon } from './VSharedCoupon';
import { BoxId, nav, User, QueryPager, Tuid } from 'tonva';
import { observable } from 'mobx';
import { VCoupleAvailable } from './VCouponAvailable';
import { VVIPCardDiscount } from './VVIPCardDiscount';

export class CCoupon extends CUqBase {

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

    protected async internalStart(param: any) {
        let { currentUser, uqs } = this.cApp;
        let { webuser, 积分商城 } = uqs;
        let { WebUserVIPCard, WebUserCoupon } = webuser;
        let { id: currentUserId } = currentUser;
        let vipCardForWebUser: any = await WebUserVIPCard.obj({ webUser: currentUserId });
        if (vipCardForWebUser) {
            let { expiredDate, vipCardCode } = vipCardForWebUser
            if (expiredDate.getTime() > Date.now()) {
                vipCardForWebUser.coupon = await this.getCouponValidationResult(vipCardCode)
            }
        }

        let couponsForWebUser: any[] = await WebUserCoupon.table({ webUser: currentUserId });
        let validCouponsForWebUser: any[] = [];
        if (couponsForWebUser) {
            validCouponsForWebUser = couponsForWebUser.filter(v => v.expiredDate.getTime() > Date.now());
            if (validCouponsForWebUser.length > 0) {
                for (let i = 0; i < validCouponsForWebUser.length; i++) {
                    let e = validCouponsForWebUser[i];
                    e.coupon = await this.getCouponValidationResult(e.couponCode);
                }
            }
        }

        let creditsForWebUser: any[] = await 积分商城.WebUserCredits.table({ webUser: currentUserId });
        let validCreditsForWebUser: any[] = [];
        if (creditsForWebUser) {
            validCreditsForWebUser = creditsForWebUser.filter(v => v.expiredDate.getTime() > Date.now());
            if (validCreditsForWebUser.length > 0) {
                for (let i = 0; i < validCreditsForWebUser.length; i++) {
                    let e = validCreditsForWebUser[i];
                    e.coupon = await this.getCouponValidationResult(e.creditsCode);
                }
            }
        }
        this.openVPage(VCoupleAvailable, {
            'vipCardForWebUser': vipCardForWebUser,
            'couponsForWebUser': validCouponsForWebUser,
            'creditsForWebUser': validCreditsForWebUser
        });
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
        let { id: currentUserId } = currentUser;
        if (result === 1 && currentUserId) {
            this.drawCoupon(this.sharedCouponValidationResult);
        }
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

        let loginCallback = async (user: User) => {
            let { cApp } = this;
            await cApp.currentUser.setUser(user);
            await cApp.loginCallBack(user);
            this.closePage(1);
            let { code } = credits;
            this.sharedCouponValidationResult = await this.getCouponValidationResult(code);
            let { result } = this.sharedCouponValidationResult;
            if (result === 1) {
                await this.drawCoupon(this.sharedCouponValidationResult);
            }
        };
        if (!this.isLogined)
            nav.showLogin(loginCallback, true);
    }

    private drawCoupon = async (credits: any) => {
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

    async showProductDetail(product: BoxId) {
        let { cProduct } = this.cApp;
        await cProduct.showProductDetail(product);
    }

    renderProduct = (product: any) => {
        let { cProduct } = this.cApp;
        return cProduct.renderProductWithPrice(product);
    }
}