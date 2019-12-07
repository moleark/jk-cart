import React from "react";
import { VPage, Page, FA } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";
import { GLOABLE } from "configuration";

export class VPlatformOrderPoint extends VPage<CPointProduct> {

    private orderIdInput: HTMLInputElement;
    private couponInput: HTMLInputElement;
    private currentCredits: string;
    @observable tips: string;

    async open(param?: any) {
        this.currentCredits = param;
        this.openPage(this.page);
    }

    private applyCouponOrder = async () => {

        let { applyOrder, applyCoupon, addPlatformOrderPoint } = this.controller;

        let orderId = this.orderIdInput.value;
        let coupon = this.couponInput.value;
        if (!orderId || !coupon) {
            if (!coupon) {
                this.tips = '请填写积分码';
            } else {
                this.tips = '请填写订单号';
            }
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let retOrder = await applyOrder(orderId);
        let retCoupon = await applyCoupon(coupon);
        if (retOrder == 1 && retCoupon == 1) {
            let rtn = await addPlatformOrderPoint(orderId);
            if (rtn == 1) {
                this.tips = "提取成功，积分稍后到账！";
            }
        } else {
            let tip = "";
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
            if (tip === "") {
                switch (retOrder) {
                    case 0:
                        tip += "系统中未找到您输入的订单号，可能的原因是该订单尚未同步到百灵威订单系统，请您耐心等待。";
                        break;
                    default:
                        break;
                }
            }
            this.tips = tip;
        }
        if (this.tips) {
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private page = observer(() => {
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
                    <div className="row">
                        <div className="col-3 text-muted">订单号:</div>
                        <div className="col-9 d-flex pl-0">
                            <input ref={v => this.orderIdInput = v} type="text" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-12">
                            <button className="btn btn-primary w-100" onClick={this.applyCouponOrder}>确认</button>
                        </div>
                    </div>
                    {tipsUI}
                    <div>
                        <ol className="mt-3">
                            <li>录入在第三方平台上采购百灵威产品订单号，可获取额外积分；</li>
                            <li>第三方平台上订单买方必须和当前登录人一致；</li>
                            <li>每个订单号仅限提取一次积分；</li>
                        </ol>
                    </div>
                </div>
            </div>
        </Page >;
    });
}