import * as React from 'react';
/*
import { CCoupon } from './CCoupon';
import { VPage, Page, List } from 'tonva-react';
import { observer } from 'mobx-react';
import { VCredits } from './VVIPCard';
export class VSharedCredit extends VPage<CCoupon> {

    private products: any[] = [];
    async open(param: any) {
        this.products = param.products || [];
        this.openPage(this.page);
    }

    private drawCreditsUI = observer(() => {
        let { sharedCouponValidationResult } = this.controller;
        if (sharedCouponValidationResult.result !== 1)
            return null;
        let { couponDrawed, loginWhenDrawCoupon } = this.controller;
        if (couponDrawed)
            return <div className="alert alert-info w-100 small text-center">已领取</div>
        else
            return <button className="btn btn-primary w-100" onClick={() => loginWhenDrawCoupon(sharedCouponValidationResult)}>领取</button>
    })

    private page = observer(() => {
        let { renderProduct, cApp, sharedCouponValidationResult } = this.controller;

        let { cCart } = cApp;
        let cart = cCart.renderCartLabel();
        return <Page header="与您分享" right={cart}>
            {this.renderVm(VCredits, sharedCouponValidationResult)}
            {React.createElement(this.drawCreditsUI)}
            <List items={this.products} item={{ render: renderProduct, className: "mb-1" }} none={null} />
        </Page>
    })
}
*/