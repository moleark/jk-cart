import { CUqBase } from '../CBase';
import { VCouponEdit } from './VCouponEdit';
import { VSharedCoupon } from './VSharedCoupon';
import { BoxId } from 'tonva';

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
        let { currentCustomer } = this.cApp.currentUser;
        return await this.uqs.salesTask.IsCanUseCoupon.submit({ code: coupon, customer: currentCustomer && currentCustomer.id });
    }

    protected async internalStart(param: any) {
        this.openVPage(VCouponEdit);
    }

    showSharedCoupon = async (param: any) => {
        let { coupon, productids } = param;

        let couponValidationResult = await this.getCouponValidationResult(coupon);
        let products: any;
        if (productids) {
            let { ProductX } = this.uqs.product;
            // let promises: PromiseLike<void>[] = productids.split('-').map((v: any) => ProductX.boxId(v).assure());
            let promises: PromiseLike<void>[] = productids.split('-').map((v: any) => ProductX.load(v));
            products = await Promise.all(promises);
        }
        this.openVPage(VSharedCoupon, { couponValidationResult, products });
    }

    async showProductDetail(product: BoxId) {
        let { cProduct } = this.cApp;
        await cProduct.showProductDetail(product);
    }

    renderProduct = (product: any) => {
        let { cProduct } = this.cApp;
        return cProduct.renderProduct(product);
    }
}