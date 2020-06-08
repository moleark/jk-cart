import * as React from 'react';
import { CCoupon, COUPONBASE } from './CCoupon';
import { View, FA, EasyDate, LMR, tv } from 'tonva';
import { VIPCard } from './Coupon';

function getTips(result: number, types: string, code: string) {
    let invalidTip = `${COUPONBASE[types]['name']}【${code}】无效，请与您的专属销售人员联系。`;
    switch (result) {
        case 0:
            invalidTip = `${COUPONBASE[types]['name']}【${code}】不存在，请与您的专属销售人员联系。`;
            break;
        case 2:
            invalidTip = `该${COUPONBASE[types]['name']}【${code}】已失效，请与您的专属销售人员联系。`;
            break;
        case 4:
            invalidTip = `该${COUPONBASE[types]['name']}【${code}】已经使用过，不可重复领用。`;
            break;
        case 6:
            invalidTip = `您不能领用自己发出的${COUPONBASE[types]['name']}【${code}】。`;
            break;
        default:
            break;
    }
    return invalidTip;
}

export class VCoupon extends View<CCoupon> {

    protected coupon: any;
    protected renderRight = (): JSX.Element => {
        return null;
    }

    protected renderCardDescription = (): JSX.Element => {
        let { discount, vipCardType } = this.coupon;
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
        return cardDescription;
    }

    protected getCodeShow = (code: number) => {
        let codeShow = String(code);
        let p1 = codeShow.substr(0, 4);
        let p2 = codeShow.substr(4);
        codeShow = p1 + ' ' + p2;
    }

    render(param: any): JSX.Element {
        this.coupon = param
        let { result, id, code, discount, preferential, validitydate, isValid, types, vipCardType } = param;

        let couponUi;
        if (result !== 1 || !isValid) {
            // this.controller.cApp.currentCouponCode = undefined;
            couponUi = <div className="alert alert-primary my-1" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {getTips(result, types, code)}
            </div>
        } else {
            // this.controller.cApp.currentCouponCode = code;
            /*
            let bcenter: any;
            if (preferential)
                bcenter = <div className="text-muted"><small>优惠：<span className="mx-3">￥{preferential}</span></small></div>;
            */

            let content = <div className="float-right pr-3">
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />{this.getCodeShow(code)}
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div><small className="text-success">此{COUPONBASE[types]['name']}全场通用</small></div>
            </div>;

            let left = <div>
                <span className="text-muted"><small>{COUPONBASE[types]['name']}</small></span>
                {this.renderCardDescription()}
            </div>;

            couponUi = <div className="bg-white py-3 pl-3 pr-2 mb-1">
                <LMR left={left} right={this.renderRight()}>
                    {content}
                </LMR>
            </div>
        }
        return couponUi;
    }
}

export class VVIPCard extends VCoupon {

    private showDiscountSetting = (vipCardId: VIPCard, event: React.MouseEvent) => {
        event.stopPropagation();
        this.controller.showDiscountSetting(vipCardId);
    }

    protected renderRight = (): JSX.Element => {
        return <span className="ml-3 my-3" onClick={(event) => this.showDiscountSetting(this.coupon, event)}>
            <FA name="chevron-right" className="corsor-pointer"></FA>
        </span>;
    }
}

export class VCredits extends VCoupon {


    protected renderCardDescription = (): JSX.Element => {
        return <div className="mr-3 font-weight-bold text-danger"><big>双倍积分</big></div>
    }

    /*
    render(param: any): JSX.Element {
        let { coupon, onClick } = param;
        this.coupon = coupon;
        let { result, id, code, discount, preferential, validitydate, isValid, types } = param;

        let couponUi;
        if (result !== 1 || !isValid) {
            // this.controller.cApp.currentCreditCode = undefined;
            couponUi = <div className="alert alert-primary my-1" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {getTips(result, types, code)}
            </div>
        } else {
            // this.controller.cApp.currentCreditCode = code;
            let content = <div onClick={() => onClick(code)}>
                <div className="pb-1">
                    <FA name='th-large' className='mr-1 text-warning' />{this.getCodeShow(code)}
                    <small className="ml-3">有效期：<EasyDate date={validitydate} /></small>
                </div>
                <div><small className="text-success">此{cardTypeName[types]}全场通用</small></div>
            </div>;

            let left = <div onClick={() => onClick(code)}>
                <span className="text-muted"><small>{cardTypeName[types]}</small></span>
                {this.renderCardDescription()}
            </div>;

            couponUi = <div className="bg-white p-3 mb-1">
                <LMR left={left}>
                    {content}
                </LMR>
            </div>
        }
        return couponUi;
    }
    */
}