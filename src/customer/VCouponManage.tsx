import * as React from 'react';
import { VPage, Page, BoxId, LMR, FA, List, TabProp, TabCaptionComponent, Tabs } from 'tonva';
import { observer } from 'mobx-react';
import { VCoupon, VCredits, VVIPCard } from './VCouponCard';
import { observable } from 'mobx';
import { CCouponManage } from './CCouponManage';
import { GLOABLE } from 'cartenv';
import { color } from 'order/VMyOrders';

export class VCouponManage extends VPage<CCouponManage> {
    private couponInput: HTMLInputElement;
    private coupons: any[];
    private currentStatus: string;
    private tabs: TabProp[];
    @observable tips: string;
    async open(param: any) {
        let { getValidMusterForWebUser } = this.controller;
        this.coupons = getValidMusterForWebUser(param);
        this.openPage(this.page);
    }

    /**
     * 领取优惠卡
     */
    private receiveCoupon = async () => {
        let { cApp } = this.controller;
        let { cCoupon } = cApp;
        let coupon = this.couponInput.value;
        this.couponInput.value = '';
        await this.applySelectedCoupon(coupon);
        await cCoupon.receiveCoupon(coupon);
    }
    /**
     * 优惠卡展示
     */
    private renderCoupon = (coupon: any) => {
        let { types, discount } = coupon;
        let content = null;
        if (types === "coupon")
            content = discount ? this.renderVm(VCoupon, coupon) : this.renderVm(VVIPCard, coupon);
        else if (types === "credits")
            content = this.renderVm(VCredits, coupon);
        else if (types === 'vipcard') {
            content = this.renderVm(VVIPCard, coupon);
        }

        return <div className="d-block">
            <div className="px-2 bg-white mt-1" onClick={() => { this.CouponViewOrUse(coupon) }}>
                {content}
            </div>
        </div>
    }

    /**
     * 折扣明细或使用记录
     */
    private CouponViewOrUse = (coupon: any) => {
        let { cCoupon } = this.controller.cApp;
        let { result } = coupon;
        if (result === 1)
            cCoupon.showDiscountSetting(coupon);
    }

    private applySelectedCoupon = async (coupon: string) => {
        let { cCoupon } = this.controller.cApp;
        this.tips = await cCoupon.applySelectedCoupon(coupon);
        if (this.tips)
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
    }

    private tipsUI = observer(() => {
        let tipsUI = <></>;
        if (this.tips) {
            tipsUI = <div className="alert alert-primary" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }
        return tipsUI;
    })

    private page = () => {
        let oss = [
            { caption: '可使用', state: 'validCardForWebUser', icon: 'free-code-camp' },
            { caption: '使用记录', state: 'usageRecordForWebUser', icon: 'cc-amex' },
            { caption: '已过期', state: 'expiredForWebUser', icon: 'ravelry' },
        ];
        this.tabs = oss.map(v => {
            let { caption, state, icon } = v;
            let none = <div className="mt-4 text-secondary d-flex justify-content-center">{`『 无${caption}${state === 'usageRecordForWebUser' ? '' : '的优惠卡券'} 』`}</div>
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return <List items={this.coupons} item={{ render: this.renderCoupon }} none={none} />
                },
                isSelected: this.currentStatus === state,
                load: async () => {
                    this.currentStatus = state;
                    this.coupons = await this.controller.getCoupons(this.currentStatus);
                }
            };
        });

        let right = <button className="btn btn-primary w-100" onClick={this.receiveCoupon}>领取</button>
        return <Page header="优惠券">
            <div className="px-2 py-3">
                <LMR right={right}>
                    <input ref={v => this.couponInput = v} type="number" placeholder="输入领取优惠卡券编码" className="form-control"></input>
                </LMR>
                {React.createElement(this.tipsUI)}
                <div className="mt-2">
                    <Tabs tabs={this.tabs} tabPosition="top" />
                </div>
            </div >
        </Page>
    }
}