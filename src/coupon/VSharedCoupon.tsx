import * as React from 'react';
import { CCoupon, COUPONBASE } from './CCoupon';
import { VPage, Page, List, FA } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VCoupon, VCredits, VVIPCard } from './VVIPCard';

export class VSharedCoupon extends VPage<CCoupon> {

    @observable tipsAfterDawed: string;
    private products: any[] = [];
    async open(param: any) {
        this.products = param.products || [];
        if (this.products.length === 0) {
            this.tipsAfterDawed = `3秒后将跳到首页，开始您的购物之旅。`
        } else {
            this.tipsAfterDawed = "您可以点击以下产品开始您的购物之旅。"
        }
        this.openPage(this.page);
    }

    private drawCouponUI = observer(() => {
        let { sharedCouponValidationResult } = this.controller;
        if (sharedCouponValidationResult.result !== 1)
            return null;
        let { couponDrawed, loginWhenDrawCoupon } = this.controller;
        if (couponDrawed) {
            if (this.products.length === 0) {
                this.countDown();
            }
            return React.createElement(this.showTips)
        }
        else {
            return <button className="btn btn-primary w-100"
                onClick={() => loginWhenDrawCoupon(sharedCouponValidationResult)}>领取</button>
        }
    })

    private countDown = () => {
        let waitingSeconds = 3;
        setInterval(() => {
            this.tipsAfterDawed = `${waitingSeconds}秒后将跳到首页，开始您的购物之旅。`
            if (waitingSeconds === 0) {
                this.backPage();
            }
            waitingSeconds--;
        }, 1000)
    }

    private showTips = observer(() => {
        return <div className="alert alert-info w-100 text-center">
            领取成功<br />
            <small>{this.tipsAfterDawed}</small>
        </div>
    })

    private renderCouponBase = (sharedCouponValidationResult: any) => {
        let { types, discount } = sharedCouponValidationResult;
        // return <>{this.renderVm(COUPONBASE[types]['view'], sharedCouponValidationResult)}</>;
        switch (types) {
            case 'coupon':
                if (discount)
                    return <>{this.renderVm(VCoupon, sharedCouponValidationResult)}</>;
                else
                    return <>{this.renderVm(VVIPCard, sharedCouponValidationResult)}</>;
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

    private onProductClick = async (product: any) => {
        await this.controller.showProductDetail(product.id);
    }

    private page = observer(() => {
        let { renderProduct, cApp, sharedCouponValidationResult } = this.controller;

        let { cCart } = cApp;
        let cart = cCart.renderCartLabel();
        return <Page header="与您分享" right={cart}>
            <div className="alert alert-warning m-0 py-2"><FA name="exclamation-circle" /> 领取的卡券可在&Prime;卡券管理&Prime;中查阅。</div>
            {this.renderCouponBase(sharedCouponValidationResult)}
            {React.createElement(this.drawCouponUI)}
            <List items={this.products} item={{ render: renderProduct, onClick: this.onProductClick, className: "mb-1" }} none={null} />
        </Page>
    })
}