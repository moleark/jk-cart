import * as React from 'react';
import { CCoupon } from './CCoupon';
import { VPage, Page, List, FA, EasyDate, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { VVIPCard } from './VVIPCard';

export class VSharedCoupon extends VPage<CCoupon> {

    private couponValidationResult: any;
    private products: any[] = [];
    async open(param: any) {
        this.couponValidationResult = param.couponValidationResult;
        this.products = param.products || [];
        this.openPage(this.page);
    }

    private drawCouponUI = observer(() => {
        if (this.couponValidationResult.result !== 1)
            return null;
        let { couponDrawed, loginWhenDrawCoupon } = this.controller;
        if (couponDrawed)
            return <div className="alert alert-info w-100 small text-center">已领取</div>
        else
            return <button className="btn btn-primary w-100" onClick={() => loginWhenDrawCoupon(this.couponValidationResult)}>领取</button>
    })

    private page = () => {
        let { renderProduct, cApp } = this.controller;
        let { cCart } = cApp;
        let cart = cCart.renderCartLabel();
        return <Page header="与您分享" right={cart}>
            {this.renderVm(VVIPCard, this.couponValidationResult)}
            {React.createElement(this.drawCouponUI)}
            <List items={this.products} item={{ render: renderProduct, className: "mb-1" }} none={null} />
        </Page>
    }
}