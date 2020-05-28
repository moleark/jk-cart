import * as React from 'react';
import { CCoupon } from './CCoupon';
import { VPage, Page, List } from 'tonva';
import { observer } from 'mobx-react';
import { VCoupon, VVIPCard, VCredits } from './VVIPCard';
import { VCoupleAvailable } from './VCouponAvailable';

export class VSharedCoupon extends VPage<CCoupon> {

    private products: any[] = [];
    async open(param: any) {
        this.products = param.products || [];
        this.openPage(this.page);
    }

    private drawCouponUI = observer(() => {
        let { sharedCouponValidationResult } = this.controller;
        if (sharedCouponValidationResult.result !== 1)
            return null;
        let { couponDrawed, loginWhenDrawCoupon } = this.controller;
        if (couponDrawed)
            return <div className="alert alert-info w-100 small text-center">已领取</div>
        else
            return <button className="btn btn-primary w-100" onClick={() => loginWhenDrawCoupon(sharedCouponValidationResult)}>领取</button>
    })

    private renderCouponBase = (sharedCouponValidationResult: any) => {
        let { types } = sharedCouponValidationResult;
        switch (types) {
            case 'coupon':
                return <>{this.renderVm(VCoupon, sharedCouponValidationResult)}</>;
                break;
            case 'credits':
                return <>{this.renderVm(VCredits, sharedCouponValidationResult)}</>;
                break;
            case 'vipcard':
                return <>{this.renderVm(VVIPCard, sharedCouponValidationResult)}</>;
                break
            default:
                break;
        }
    }

    private page = observer(() => {
        let { renderProduct, cApp, sharedCouponValidationResult } = this.controller;

        let { cCart } = cApp;
        let cart = cCart.renderCartLabel();
        return <Page header="与您分享" right={cart}>
            {this.renderCouponBase(sharedCouponValidationResult)}
            {React.createElement(this.drawCouponUI)}
            <List items={this.products} item={{ render: renderProduct, className: "mb-1" }} none={null} />
        </Page>
    })
}