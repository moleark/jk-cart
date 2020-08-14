import * as React from 'react';
import { VPage, Page, DropdownAction, DropdownActions, } from 'tonva';
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { GLOABLE } from 'cartenv';

export const daysAndMultipleByWelfare = [
    { days: 7, multiple: 2 },
    { days: 15, multiple: 3 },
    { days: 30, multiple: 4 },
    { days: 180, multiple: 5 },
    { days: 365, multiple: 6 }
];

export class VPointSign extends VPage<CPointProduct> {
    @observable showTips: any = "none";

    async open(param?: any) {
        this.openPage(this.page, { welfare: param });
    }

    private page = observer((param: any) => {
        let { welfare } = param;
        let { IsSignin, signinval, signinConsecutiveDays, openRevenueExpenditure } = this.controller;
        if (IsSignin) this.handleChange();

        let actions: DropdownAction[] = [
            {
                icon: 'get-pocket',
                caption: '签到明细',
                action: () => openRevenueExpenditure('签到明细')
            }
        ];
        let right = <DropdownActions className="align-self-center mr-1" icon="navicon" actions={actions} />;

        return <Page header='签到领积分' right={right}>
            <div className="text-center position-relative" style={{ background: "linear-gradient(rgb(253, 98, 52), rgb(250, 51, 82))", padding: '3rem' }}>
                <>
                    <div className="mb-3 text-light">已连续<b className="h4"> {signinConsecutiveDays} </b>天签到 </div>
                    <small style={{ color: 'rgb(255,192,120)' }} >连续签到{welfare.days}天，可获得{welfare.multiple}倍的积分奖励</small>
                    {/* <small style={{ color: 'rgb(255,192,120)' }} >连续签到30天，可获得1次抽奖机会</small> */}
                </>
                <div className="text-left small w-100 pt-1 pl-2 position-absolute" style={{
                    top: 0, left: 0, display: this.showTips
                }}>本次签到获取{signinval}分</div>
            </div>
            {/* 抽奖区 */}
            {/* <div className="text-center border-bottom mt-2">抽奖区</div> */}
        </Page >;

        /* return <Page header='签到领积分' right={right}>
            <div className="text-center " style={{ position: "relative", background: "linear-gradient(rgb(253, 98, 52), rgb(250, 51, 82))", padding: '3rem' }}>
                <div className="d-flex justify-content-center" style={{ flexDirection: 'column', margin: '0 4rem' }}>
                    <h2 style={{ color: 'rgb(255,192,120)' }} className="mb-3">
                        <FA name='diamond' /> <span className="text-light"><small>x</small> {this.signinval}</span>
                    </h2>
                    {getSignpoint}
                </div>
                <div className="text-center text-white small w-100 p-1 alert alert-warning text-muted" style={{
                    position: "absolute", top: 0, left: 0, display: this.showTips
                }}>本次签到获取{this.signinval}分</div>
            </div>
            // <div className="text-center my-1 p-1  bg-white" style={{ borderBottom: ".5px solid #ccc" }}>签到积分详情</div>
            // <List items={signinPageHistory} item={{ render: renderPointRecord }} none={none} />
        </Page >; */
    })


    protected handleChange = async () => {
        this.showTips = "";
        if (!this.showTips)
            setTimeout(() => { this.showTips = "none"; this.controller.IsSignin = false }, GLOABLE.TIPDISPLAYTIME);
    }
}
