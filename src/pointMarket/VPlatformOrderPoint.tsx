import React from "react";
import { VPage, Page, FA, List, tv, LMR } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";
import { GLOABLE } from "configuration";

export class VPlatformOrderPoint extends VPage<CPointProduct> {

    private couponInput: HTMLInputElement;
    private currentCredits: string;
    @observable tips: string;

    async open(param?: any) {
        this.currentCredits = param;


        this.openPage(this.page);
    }

    private openPlatformOrderPoint = async () => {
        this.controller.openPlatformOrderPoint();
    }

    private applyCouponOrder = async () => {

        let { applyOrder, applyCoupon, addPlatformOrderPoint, addUsedCoupon } = this.controller;

        let coupon = this.couponInput.value;
        if (!coupon) {
            if (!coupon) {
                this.tips = '请填写积分码';
            }
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let retCoupon = await applyCoupon(coupon);
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
                default:
                    break;
            }
        } else {
            let retOrder = await applyOrder();

            if (retOrder !== 0) {
                let rtn = await addPlatformOrderPoint(retOrder);
                if (rtn == 1) {
                    tip = "提取成功，积分稍后到账！";
                    this.openPlatformOrderPoint();
                }
            } else {
                tip = "积分码已记录,此积分码会在下次生成订单时自动使用";
            }
            // 不论有无订单,都保存积分码
            let Crtn = await addUsedCoupon();
        }

        this.tips = tip;
        if (this.tips) {
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private renderPlatformOrder = (PlatformOrder: any, index: number) => {
        let { platformOrderId, description, descriptionC, price, quantity, radioy, unit, subAmount } = PlatformOrder;
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
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }

        return <Page header="提取平台订单积分" right={null}>
            <div>
                <div className="px-2 bg-white">
                    <div className="row py-2">
                        <div className="col-3 text-muted pr">积分码:</div>
                        <div className="col-9 d-flex pl-0">
                            <input ref={v => this.couponInput = v} type="text" className="form-control" value={this.currentCredits}></input>
                        </div>
                    </div>
                    <div className="my-2 small">
                        <div>可用订单:</div>
                        <List items={platformOrder} item={{ render: this.renderPlatformOrder }} none="系统中暂无可用订单号"></List>
                    </div>
                    <div className="row py-2">
                        <div className="col-12">
                            <button className="btn btn-primary w-100" onClick={this.applyCouponOrder}>确认</button>
                        </div>
                    </div>
                    {tipsUI}
                    <div>
                        <ol className="my-3 small">
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