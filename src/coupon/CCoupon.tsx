import { CUqBase } from '../CBase';
import { VCouponEdit } from './VCouponEdit';
import { VSharedCoupon } from './VSharedCoupon';
import { BoxId } from 'tonva';
import { VSharedCredit } from './VSharedCredit';

export class CCoupon extends CUqBase {

    applyCoupon = async (coupon: string) => {
        let validationResult = await this.getCouponValidationResult(coupon);
        let rtn = validationResult.result;
        if (rtn === 1) {
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
        this.openVPage(VCouponEdit);
    }

    /**
     * 
     */
    showSharedCoupon = async (param: any) => {
        let { coupon, productids } = param;

        let couponValidationResult = await this.getCouponValidationResult(coupon);
        let products: any;
        if (productids) {
            let { ProductX } = this.uqs.product;
            let productidArray = productids.split('-').filter((v: any) => /^\d{1,10}$/.test(v));
            // let promises: PromiseLike<void>[] = productidArray.map((v: any) => ProductX.load(v));
            // products = await Promise.all(promises);
            products = productidArray.map((v: any) => ProductX.boxId(v));
        }
        this.openVPage(VSharedCoupon, { couponValidationResult, products });
    }

    showSharedCredits = async (param: any) => {
        let { credits, productids } = param;

        let creditsValidationResult = await this.getCouponValidationResult(credits);
        let products: any;
        if (productids) {
            let { ProductX } = this.uqs.product;
            let productidArray = productids.split('-').filter((v: any) => /^\d{1,10}$/.test(v));
            // let promises: PromiseLike<void>[] = productidArray.map((v: any) => ProductX.load(v));
            // products = await Promise.all(promises);
            products = productidArray.map((v: any) => ProductX.boxId(v));
        }
        this.openVPage(VSharedCredit, { creditsValidationResult, products });
    }

    async showProductDetail(product: BoxId) {
        let { cProduct } = this.cApp;
        await cProduct.showProductDetail(product);
    }

    renderProduct = (product: any) => {
        let { cProduct } = this.cApp;
        // return cProduct.renderProduct(product);
        return cProduct.renderProductWithPrice(product);
    }
}