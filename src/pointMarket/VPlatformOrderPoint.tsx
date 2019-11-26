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
            if (!orderId) {
                this.tips = '请填写合同号';
            } else {
                this.tips = '请填写积分码';
            }
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let retOrder = await applyOrder(orderId);
        let retCoupon = await applyCoupon(coupon);
        if (retOrder == 1 && retCoupon == 1) {
            let rtn = await addPlatformOrderPoint(orderId, coupon);
            if (rtn == 1) {
                this.tips = "提取成功,积分稍后到账";
            }
        } else {
            let tip = "";
            switch (retCoupon) {
                case -1:
                    tip = '对不起，当前服务器繁忙，请稍后再试。';
                    break;
                case 1:
                    tip = '积分码有效';
                    break;
                case 0:
                case 2:
                case 4:
                case 6:
                    tip = '积分码无效';
                    break;
                case 3:
                    tip = '这是其他人的独享积分码';
                    break;
                case 5:
                    tip = '积分码的创建人不是您的专属销售';
                    break;
                default:
                    break;
            }
            switch (retOrder) {
                case 1:
                    tip += '，合同号有效';
                    break;
                case 0:
                    tip += "，合同号无效。";
                    break;
                default:
                    break;
            }
            tip += "请重新输入或与您的专属销售人员联系。";
            this.tips = tip;
        }
        if (this.tips) {
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private page = observer(() => {
        let tipsUI = <div className="noneMassage"></div>;
        if (this.tips) {
            tipsUI = <div className="alert alert-primary" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }

        return <Page header="提取其它平台积分" right={null}>
            <div>
                <div className="px-2 bg-white">
                    <div className="row py-2">
                        <div className="col-3 text-muted pr">积分码:</div>
                        <div className="col-9 d-flex pl-0">
                            <input ref={v => this.couponInput = v} type="text" className="form-control" value={this.currentCredits}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 text-muted">合同号:</div>
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
                        <ul className="point-remarks mt-3">
                            <li>此界面录入其它平台百灵威产品订单号</li>
                            <li>平台订单号的买方必须和当前登录人一致</li>
                            <li>每个合同号只能提取一次积分</li>
                            <li>合同总金额小数部分将被舍弃</li>
                            {/* <li>增加积分=合同总金额*积分码倍数</li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </Page >;
    });
}