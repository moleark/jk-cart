import * as React from 'react';

import { View, FA, EasyDate, LMR } from 'tonva';
import { VIPCard } from '../coupon/Coupon';
import { CCouponManage } from './CCouponManage';
import { COUPONBASE } from 'coupon/CCoupon';

export class VCoupon extends View<CCouponManage> {

    protected coupon: any;
    private showDiscountSetting = (vipCardId: VIPCard, event: React.MouseEvent) => {
        event.stopPropagation();
        let { cCoupon } = this.controller.cApp;
        cCoupon.showDiscountSetting(vipCardId);
    }
    render(param: any): JSX.Element {
        this.coupon = param
        let { result, discount, validitydate, isValid, types } = param;

        let couponUi;
        if (result !== 1 || !isValid) {
            let content = <div className="float-right pr-3">
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-secondary' />
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
            </div>;
            let left = <div>
                <span className="text-body"><small>{COUPONBASE[types]['name']}</small></span>
            </div>;
            couponUi = <div className="py-3 pl-3 pr-2 mb-1 alert" style={{ backgroundColor: '#e8eaeb', color: "text-secondary" }}>
                <LMR left={left}>
                    {content}
                </LMR>
            </div>
        } else {
            let tipUI = null;
            if (discount)
                tipUI = <small className="text-success">此{COUPONBASE[types]['name']}全场通用</small>
            else
                tipUI = <small className="text-success" onClick={(event) => this.showDiscountSetting(this.coupon, event)}>查看适用品牌及折扣</small>

            let content = <div className="float-right pr-3">
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div className="float-right">
                    {tipUI}
                </div>
            </div>;

            let left = <div>
                <span className="text-muted"><small>{COUPONBASE[types]['name']}</small></span>
            </div>;

            couponUi = <div className="bg-white py-3 pl-3 pr-2 mb-1 alert alert-primary">
                <LMR left={left}>
                    {content}
                </LMR>
            </div>
        }
        return couponUi;
    }
}

export class VVIPCard extends VCoupon { }

export class VCredits extends VCoupon {
    protected renderCardDescription = (): JSX.Element => {
        return <div className="mr-3 font-weight-bold text-danger"><big>双倍积分</big></div>
    }
}