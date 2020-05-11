import * as React from 'react';
import { VPage, FA, Page, List, LMR, tv, EasyDate } from 'tonva';
import { CCoupon } from './CCoupon';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VVIPCard, VCredits } from './VVIPCard';
import { GLOABLE } from 'cartenv';

export class VCoupleAvailable extends VPage<CCoupon> {

    private vipCardForWebUser: any;
    private coupons: any[];

    @observable tips: string;
    async open(param: any) {
        this.vipCardForWebUser = param.vipCardForWebUser;
        this.coupons = param.couponsForWebUser.map((v: any) => v.coupon).concat(param.creditsForWebUser.map((v: any) => v.coupon));
        this.openPage(this.page);
    }

    /**
     * 应用选择的vipcard等 
     */
    private applySelectedCoupon = async (coupon: string) => {
        let ret = await this.controller.applyCoupon(coupon);
        switch (ret) {
            case -1:
                this.tips = '对不起，当前服务器繁忙，请稍后再试。';
                break;
            case 1:
                this.tips = '有效';
                break;
            case 0:
                this.tips = "无此优惠券，请重新输入或与您的专属销售人员联系确认优惠码是否正确。";
                break;
            case 2:
                this.tips = '优惠券已过期或作废，请重新输入或与您的专属销售人员联系。';
                break;
            case 3:
            case 5:
                this.tips = '优惠券无效，请重新输入或与您的专属销售人员联系。';
                break;
            case 6:
                this.tips = '不允许使用本人优惠券！';
                break;
            case 4:
                this.tips = '该优惠券已经被使用过了，不允许重复使用。';
                break;
            default:
                break;
        }
        if (this.tips)
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
    }

    private renderCoupon = (coupon: any) => {
        let { result, code, types } = coupon;
        if (result === 1) {
            let content = types === 'coupon' ? this.renderVm(VVIPCard, coupon) : this.renderVm(VCredits, coupon)
            return <div className="d-block">
                <div className="px-2 bg-white" onClick={() => this.applySelectedCoupon(code)}>
                    {content}
                </div>
            </div>
        } else
            return null;
    }

    /*
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
    */

    private page = () => {

        let vipCardUI;
        if (this.vipCardForWebUser) {
            let { coupon } = this.vipCardForWebUser;
            vipCardUI = <div onClick={() => this.applySelectedCoupon(coupon.code)}>{this.renderVm(VVIPCard, coupon)}</div>
        }

        return <Page header="可用优惠">
            <div className="px-2 bg-white">
                {vipCardUI}
            </div>
            <List items={this.coupons} item={{ render: this.renderCoupon }} none={null}></List>
        </Page>
    }
}