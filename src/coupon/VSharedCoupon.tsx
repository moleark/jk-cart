import * as React from 'react';
import { CCoupon } from './CCoupon';
import { VPage, Page, BoxId, List, tv, FA, EasyDate, LMR } from 'tonva';

export class VSharedCoupon extends VPage<CCoupon> {

    private couponValidationResult: any;
    private products: any[] = [];
    async open(param: any) {
        this.couponValidationResult = param.couponValidationResult;
        this.products = param.products || [];
        this.openPage(this.page);
    }

    private showProductDetail = async (product: any) => {
        await this.controller.showProductDetail(product);
    }

    private page = () => {
        let { result, id, code, discount, preferential, validitydate, isValid } = this.couponValidationResult;

        let couponUi;
        if (result !== 1 || !isValid) {
            this.controller.cApp.currentCouponCode = undefined;
            couponUi = <div className="alert alert-primary my-1" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                优惠券【{code}】无效，请与您的专属销售人员联系。
            </div>
        } else {
            this.controller.cApp.currentCouponCode = code;
            let codeShow = String(code);
            let p1 = codeShow.substr(0, 4);
            let p2 = codeShow.substr(4);
            codeShow = p1 + ' ' + p2;

            let aleft = <div><FA name='th-large' className='my-2 mr-3 text-warning' />{codeShow}</div>;
            let bcenter: any;
            if (preferential)
                bcenter = <div className="text-muted"><small>优惠：<span className="mx-3">￥{preferential}</span></small></div>;

            let right = <div>
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />{codeShow}
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div><small className="text-success">此优惠券也可用于订购其他产品</small></div>
            </div>;

            let left: any;
            if (typeof discount === 'number') {
                let discountShow: any;
                discountShow = (1 - discount) * 10;
                left = <div>
                    <div className="mr-3 font-weight-bold text-danger"><big>{discountShow === 10 ? '无折扣' : <>{discountShow.toFixed(1)} 折</>}</big></div>
                    {discountShow === 10 ? null : <span className="text-muted"><small>结算时自动扣减</small></span>}
                </div>;
            }

            couponUi = <div className="bg-white p-3 mb-1">
                <LMR left={left} right={right}>
                </LMR>
            </div>
        }

        let { renderProduct, cApp } = this.controller;
        let { cCart } = cApp;
        let cart = cCart.renderCartLabel();
        return <Page header="与您分享" right={cart}>
            {couponUi}
            <List items={this.products} item={{ render: renderProduct, className: "mb-1" }} none={null} />
        </Page>
    }
}