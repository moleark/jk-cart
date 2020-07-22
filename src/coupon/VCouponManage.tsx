import * as React from 'react';
import { VPage, Page, LMR, FA, List, TabProp, TabCaptionComponent, Tabs, Scroller, QueryPager } from 'tonva';
import { observer } from 'mobx-react';
import { VCoupon, VCredits, VVIPCard, VCouponUsed } from './VVIPCard';
import { observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { color } from 'order/VMyOrders';
import { CCoupon } from './CCoupon';

export class VCouponManage extends VPage<CCoupon> {

    private couponInput: HTMLInputElement;
    @observable private coupons: QueryPager<any>;
    private currentStatus: string;
    private tabs: TabProp[];
    oss: any = [
        { caption: '可使用', state: 'validCardForWebUser', icon: 'free-code-camp', toolTip: '亲，您现没有可用的优惠券呦！' },
        { caption: '已使用', state: 'usageRecordForWebUser', icon: 'cc-amex', toolTip: '亲，您还未使用过任何优惠券,快去使用噢！' },
        { caption: '已过期', state: 'expiredForWebUser', icon: 'ravelry', toolTip: '亲，您还没已过期的优惠券！' },
    ];

    @observable tips: string;
    async open(param: any) {
        let { getValidMusterForWebUser } = this.controller;
        this.coupons = getValidMusterForWebUser(param);
        this.openPage(this.page);
    }

    private getTabs = async () => {
        let { getCoupons } = this.controller;
        this.tabs = this.oss.map((v: any) => {
            let { caption, state, icon, toolTip } = v;
            let none = <div className="mt-4 text-secondary d-flex justify-content-center">{`『 ${toolTip} 』`}</div>
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return <List items={this.coupons} item={{ render: this.renderCoupon }} none={none} />
                },
                isSelected: this.currentStatus === state,
                load: async () => {
                    this.currentStatus = state;
                    this.coupons = await getCoupons(this.currentStatus);
                }
            };
        });
    }

    /**
     * 领取优惠卡
     */
    private receiveCoupon = async () => {
        let { receiveCoupon, getCoupons, couponExchange } = this.controller;
        let coupon = this.couponInput.value;
        this.couponInput.value = '';
        couponExchange = true;
        await this.applySelectedCoupon(coupon);
        await receiveCoupon(coupon);
        // this.currentStatus = this.oss[0].state;
        // this.coupons = await getCoupons(this.currentStatus);
    }

    /**
     * 优惠卡展示
     */
    private renderCoupon = (coupon: any) => {
        let { types, discount, conductReveal } = coupon;
        let content = null;
        if (types === "coupon")
            content = discount ? this.renderVm(VCoupon, coupon) : this.renderVm(VVIPCard, coupon);
        else if (types === "credits")
            content = this.renderVm(VCredits, coupon);
        else if (types === 'vipcard') {
            content = this.renderVm(VVIPCard, coupon);
        }
        if (conductReveal) {
            content = this.renderVm(VCouponUsed, coupon);
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
        let { showDiscountSetting } = this.controller;
        let { result } = coupon;
        if (result === 1)
            showDiscountSetting(coupon);
    }

    private applySelectedCoupon = async (coupon: string) => {
        let { applySelectedCoupon } = this.controller;
        this.tips = await applySelectedCoupon(coupon);
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
    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        this.coupons.more();
    }

    private page = observer(() => {
        this.getTabs();
        let right = <button className="btn btn-primary w-100" onClick={this.receiveCoupon}>领取</button>
        return <Page header="优惠卡券" onScrollBottom={this.onScrollBottom}>
            <div className="px-2 py-3">
                <LMR right={right}>
                    <input ref={v => this.couponInput = v} type="number" placeholder="输入领取优惠卡券号码" className="form-control"></input>
                </LMR>
                {React.createElement(this.tipsUI)}
                <div className="mt-2">
                    <Tabs tabs={this.tabs} tabPosition="top" />
                </div>
            </div >
        </Page>
    })
}