import * as React from 'react';
import { CCoupon } from './CCoupon';
import { View, FA, EasyDate, LMR, tv } from 'tonva';
import { observer } from 'mobx-react';

const cardTypeName: any = { 'coupon': '优惠券', 'credits': '积分券', 'vipcard': 'VIP卡' }

export class VVIPCard extends View<CCoupon> {

    private showDiscountSetting = (vipCardId: number, event: React.MouseEvent) => {
        event.preventDefault();
        this.controller.showDiscountSetting(vipCardId);
    }

    render(param: any): JSX.Element {
        let { result, id, code, discount, preferential, validitydate, isValid, types, vipCardType } = param;

        let couponUi;
        if ((result !== 1 || !isValid) && types === 'coupon') {
            // this.controller.cApp.currentCouponCode = undefined;
            let invalidTip = `${cardTypeName[types]}【${code}】无效，请与您的专属销售人员联系。`;
            switch (result) {
                case 4:
                    invalidTip = `${cardTypeName[types]}【${code}】不可重复领用。`;
                    break;
                case 6:
                    invalidTip = `您不能领用自己发出的${cardTypeName[types]}【${code}】。`;
                    break;
                default:
                    break;
            }
            couponUi = <div className="alert alert-primary my-1" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {invalidTip}
            </div>
        } else {
            // this.controller.cApp.currentCouponCode = code;
            let codeShow = String(code);
            let p1 = codeShow.substr(0, 4);
            let p2 = codeShow.substr(4);
            codeShow = p1 + ' ' + p2;

            let aleft = <div><FA name='th-large' className='my-2 mr-3 text-warning' />{codeShow}</div>;
            let bcenter: any;
            if (preferential)
                bcenter = <div className="text-muted"><small>优惠：<span className="mx-3">￥{preferential}</span></small></div>;

            let content = <div className="float-right">
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />{codeShow}
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div><small className="text-success">此{cardTypeName[types]}全场通用</small></div>
            </div>;

            let cardDescription: any;
            if (typeof discount === 'number') {
                if (discount !== 0) {
                    let discountShow: any;
                    discountShow = (1 - discount) * 10;
                    cardDescription = <div className="mr-3 font-weight-bold text-danger"><big>{discountShow === 10 ? '无折扣' : <>{discountShow.toFixed(1)} 折</>}</big></div>
                } else {
                    if (vipCardType) {
                        cardDescription = <div className="mr-3 font-weight-bold text-danger"><big>{tv(vipCardType, v => v.name)}</big></div>
                    }
                }
            }
            let left = <div>
                <span className="text-muted"><small>{cardTypeName[types]}</small></span>
                {cardDescription}
            </div>;

            let right = <span className="ml-3 my-3" onClick={(event) => this.showDiscountSetting(id, event)}>
                <FA name="chevron-right" className="corsor-pointer"></FA>
            </span>;

            couponUi = <div className="bg-white py-3 pl-3 mb-1">
                <LMR left={left} right={right}>
                    {content}
                </LMR>
            </div>
        }
        return couponUi;
    }
}

export class VCredits extends View<CCoupon> {

    render(param: any): JSX.Element {
        let { result, id, code, discount, preferential, validitydate, isValid } = param;

        let couponUi;
        if (result !== 1 || !isValid) {
            // this.controller.cApp.currentCreditCode = undefined;
            couponUi = <div className="alert alert-primary my-1" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                积分券【{code}】无效，请与您的专属销售人员联系。
            </div>
        } else {
            // this.controller.cApp.currentCreditCode = code;
            let codeShow = String(code);
            let p1 = codeShow.substr(0, 4);
            let p2 = codeShow.substr(4);
            codeShow = p1 + ' ' + p2;

            let right = <div>
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />{codeShow}
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div><small className="text-success">此积分券全场通用</small></div>
            </div>;

            let left = <div>
                <span className="text-muted"><small>积分券</small></span>
                <div className="mr-3 font-weight-bold text-danger"><big>双倍积分</big></div>
            </div>;

            couponUi = <div className="bg-white p-3 mb-1">
                <LMR left={left} right={right}>
                </LMR>
            </div>
        }
        return couponUi;
    }
}