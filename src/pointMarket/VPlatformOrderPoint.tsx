import React from "react";
import { VPage, Page, FA, List, tv, LMR } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";
import { GLOABLE } from "cartenv";
import { VReceivePointSuccess } from "./VReceivePointSuccess";

export class VPlatformOrderPoint extends VPage<CPointProduct> {

    private couponInput: HTMLInputElement;
    private currentCredits: string;
    @observable tips: string;

    async open(param?: any) {
        this.currentCredits = param;
        this.openPage(this.page);
    }

    private openPlatformOrderPoint = async () => {
        this.controller.openPointDrawing();
    }

    private tryApplyCoupon = async () => {

        this.tips = "";
        let coupon = this.couponInput.value;
        if (!coupon) {
            this.tips = '请填写积分码';
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let options = {
            onlyRequired: true,
            caption: "第一次领取积分",
            note: <>
                请提供信息，以便自动为您最近的内部订单积分。
            </>,
            actionButton: {
                value: "确定",
                action: this.applyCoupon
            }
        };
        let { userInfoCompletedChecking } = this.controller;
        if (userInfoCompletedChecking(options)) {
            await this.applyCoupon();
        }
    }

    private applyCoupon = async () => {

        let { IsCouponCanUse, getLastPlatformOrder, receivePoint, addUsedCoupon, refreshMypoint } = this.controller;

        let coupon = this.couponInput.value;
        coupon = coupon.replace(' ', '');
        let retCoupon = await IsCouponCanUse(coupon);
        let tip = "";
        if (retCoupon !== 1) {
            switch (retCoupon) {
                case -1:
                    tip = '对不起，当前服务器繁忙，请稍后再试。';
                    break;
                case 0:
                case 2:
                case 4:
                case 6:
                    tip = '您输入的积分码无效，请重新输入！';
                    break;
                case 3:
                case 5:
                    tip = '您输入的积分码无效，请重新输入或与您的专属销售人员联系！';
                    break;
                case 100:
                    tip = '您已经使用过该积分码了，不可重复使用。'
                default:
                    break;
            }
            this.tips = tip;
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let lastPlatformOrderId = await getLastPlatformOrder();
        if (lastPlatformOrderId) {
            let rtn = await receivePoint(lastPlatformOrderId);
            if (rtn === 1) {
                this.controller.platformOrder = [];
                tip = "提取成功，积分稍后到账！";
                await refreshMypoint();
            }
        } else {
            // 无可用订单,保存积分码
            let Crtn = await addUsedCoupon();
            tip = "积分码已记录，此积分码会在下次产生内部订单时自动使用。";
        }
        this.closePage();
        this.openVPage(VReceivePointSuccess, tip);
    }

    private renderPlatformOrder = (PlatformOrder: any, index: number) => {
        let { description, price, quantity, radioy, unit } = PlatformOrder;
        return <div className="row">
            <div className="col-12"><label>{description}</label></div>
            <div className="col-12 d-flex justify-content-between">
                <div className="mt-1"><b>{radioy}{unit}</b></div>
                <div className="col-6 text-right">
                    <span className="text-danger h6">{(price * quantity)}</span>
                    <small className="text-muted"> ({price} × {quantity})</small>
                </div>
            </div>
        </div>
    }

    private page = observer(() => {
        let { platformOrder } = this.controller;
        let tipsUI;
        if (this.tips) {
            tipsUI = <div className="alert alert-primary" role="alert">
                <FA name="smile-o" className="text-warning mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }

        return <Page header="领取积分" right={null}>
            <div>
                <div className="px-2 bg-white">
                    <div className="row py-2">
                        <div className="col-3 text-muted pr">积分码:</div>
                        <div className="col-9 d-flex pl-0">
                            <input ref={v => this.couponInput = v} type="text" className="form-control" value={this.currentCredits}></input>
                        </div>
                    </div>
                    {
                        platformOrder.length > 0 &&
                        <div className="my-2 small">
                            <div>可用订单:</div>
                            <List items={platformOrder} item={{ render: this.renderPlatformOrder }} none="系统中暂无可用订单"></List>
                        </div>
                    }
                    <div className="row py-2">
                        <div className="col-12">
                            <button className="btn btn-primary w-100" onClick={this.tryApplyCoupon}>确认</button>
                        </div>
                    </div>
                    {tipsUI}
                    <div className="pt-2 pb-3">
                        <ol className="mr-3 small">
                            <li>输入积分码，可获取可用订单获取的额外积分；</li>
                            <li>暂无可用订单(平台订单尚未导入百灵威订单系统)的情况下，系统会记录您输入的积分码，待订单导入后获取额外积分；</li>
                            <li>每个订单仅限提取一次积分。</li>
                        </ol>
                    </div>
                </div>
            </div>
        </Page >;
    });
}