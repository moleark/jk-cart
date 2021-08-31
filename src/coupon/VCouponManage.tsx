import * as React from 'react';
import { VPage, Page, LMR, FA, List, TabProp, TabCaptionComponent, Tabs, Scroller, QueryPager, autoHideTips } from "tonva-react";
import { observer } from 'mobx-react';
import { VCoupon, VCredits, VVIPCard, VCouponUsed } from './VVIPCard';
import { observable } from 'mobx';
import { color } from 'order/VMyOrders';
import { CCoupon } from './CCoupon';
import { xs } from '../tools/browser';
import { CrPageHeaderTitle, pageHTitle } from 'tools/pageHeaderTitle';
import { Modal } from 'antd';
import { VModelCardDiscount } from './VModelCardDiscount';

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

	//@observable tips: string;
	private tips = observable.box();
    async open(param: any) {
        this.openPage(this.page);
    }

    private getTabs = async () => {
        let { getCoupons } = this.controller;
        this.tabs = this.oss.map((v: any) => {
            let { caption, state, icon, toolTip } = v;
            let none = <div className="my-4 text-secondary d-flex justify-content-center">{`『 ${toolTip} 』`}</div>
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return <List items={this.coupons} item={{render: this.renderCoupon, className: 'col-lg-6 border rounded px-0'}} className='row mx-0 bg-light mt-2' none={none} />
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
        let { drawCoupon, getCouponValidationResult, applyTip } = this.controller;
		let coupon = this.couponInput.value;
		let tips: string;
        if (!coupon)
            tips = "请输入您的优惠卡/券号";
        else {
            this.couponInput.value = '';

            let validationResult = await getCouponValidationResult(coupon);
            let { result } = validationResult;
            if (result === 1) {
                await drawCoupon(validationResult);
                tips = '领取成功！';
            } else {
                tips = applyTip(result);
            }
		}
		this.tips.set(tips);
		/*
        if (this.tips) {
        //    setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
		}
		*/
        // setTimeout(() => this.controller.closePage(), 500);
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
        let { showDiscountSetting,showModelCardDiscount } = this.controller;
        let { result, types } = coupon;
        if (result === 1 && types !== 'credits') {
            if (xs) showDiscountSetting(coupon);
            else showModelCardDiscount(coupon);
        }
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
        if (this.currentStatus !== "validCardForWebUser")
            this.coupons.more();
    }

    private page = observer(() => {
        this.getTabs();
        let right = <button className="btn btn-primary w-4c" onClick={this.receiveCoupon}>领取</button>
        let header = CrPageHeaderTitle('卡券管理');
        return <Page header={header}>
            <div className="row mx-0">
                <div className="col-lg-3 d-none d-lg-block">
                    {this.controller.cApp.cMe.renderMeSideBar()}
                </div>
                <div className="col-lg-9 px-0 mx-auto" style={{ maxWidth: !xs ? 800 : 'none' }}>
                    {pageHTitle(<div className="text-left px-2">卡券管理</div>)}
                    <div className="px-2 py-3 mb-5 mx-auto" style={{maxWidth:990}}>
                        <LMR right={right}>
                            <input ref={v => this.couponInput = v} type="number" placeholder="输入领取优惠卡券号码" className="form-control"></input>
                        </LMR>
                        {/*React.createElement(this.tipsUI)*/}
                        {autoHideTips(this.tips)}
                        <div className="mt-2 reset-z-header-boxS">
                            <Tabs tabs={this.tabs} tabPosition="top" tabBg='bg-light' />
                        </div>
                    </div >
                    {this.controller.renderModelCardDiscount()}
                </div>
            </div>
        </Page>
    })
}