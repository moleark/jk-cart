import * as React from 'react';
import { VPage, Page, DropdownAction, DropdownActions, FA, nav } from 'tonva';
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { signViceMap, signTopicMap, Homemadelogo, logo } from 'tools/images';
import { CSignIn } from './CSignIn';
import { RevenueExpenditure } from './basicRefer';
import classNames from 'classnames';
import moment from 'moment';

export const daysAndMultipleByWelfare = [
    { id: 1, days: 7, multiple: 2 },
    { id: 2, days: 15, multiple: 3 },
    { id: 3, days: 30, multiple: 4 },
    { id: 4, days: 180, multiple: 5 },
    { id: 5, days: 365, multiple: 6 }
];

export class VPointSign extends VPage<CSignIn> {
    @observable showTips: any = "none";
    rulesNum: number = 0;
    async open(param?: any) {
        this.openPage(this.page);
    }

    private renderRule = (rulesNum: any, ruleContent: any) => {
        return <div key={rulesNum} className=" mb-3 d-flex" style={{ boxShadow: "0px 1px 3px #333333", borderRadius: "8px" }}>
            <span className="h4 m-0 p-2  align-self-center" style={{ borderRight: '1px dashed #cccccc' }}>
                {String(rulesNum).padStart(2, '0')}
            </span>
            <div className="initialism modal-title flex-fill p-2  align-self-center">{ruleContent}</div>
        </div>
    }

    private demandBlock = (name: string, icon: string, color: string, action: any) => {
        return <div onClick={action} className="w-25 text-center p-2" style={{ color }}>
            <FA name={icon} size="2x" />
            <div className="small">{name}</div>
        </div>
    }

    private page = observer((param: any) => {
        let { IsSignin, signinval, signinConsecutiveDays, openRevenueExpenditure, cApp } = this.controller;
        let { cLottery } = cApp;
        let date = moment().format('YYYY-MM-DD').split('-');
        let timer = `${date[0]} 年 ${date[1]} 月 ${date[2]} 日 `;

        // if (IsSignin) this.handleChange();
        let actions: DropdownAction[] = [
            {
                icon: 'get-pocket',
                caption: RevenueExpenditure.SIGNINHISTORY,
                action: () => openRevenueExpenditure(RevenueExpenditure.SIGNINHISTORY)
            }
        ];
        let right = <DropdownActions className="align-self-center mr-1" icon="navicon" actions={actions} />;

        return <Page header='签到' right={right}>
            <div className="text-center text-light px-5 pt-5"
                style={{ background: `url(${signTopicMap}) no-repeat`, backgroundSize: "100% 100%" }}>
                {/* <div className="rounded-circle mx-auto"
                    style={{ background: 'linear-gradient(#FCF4F3 15%, #EFDCD4, #CC9287, #C17162, #A93338, #A52230)', padding: '.8rem', width: '10rem', height: '10rem' }}>
                    <div className="w-100 h-100 rounded-circle pt-3" style={{ background: "#A52230" }}>
                        <div className="small pt-2">已连续签到</div>
                        <div className="d-flex align-items-end justify-content-center">
                            <span className="font-weight-bolder display-4">{signinConsecutiveDays} </span>
                            <span className="mb-1 pb-2 ml-1"> 天</span>
                        </div>
                    </div>
                </div> */}
                <div className="pb-5">
                    <div className="h4">{timer}</div>
                    <div className="my-4 h5">今日已签到</div>
                    <div className="pt-3">
                        <span className="bg-white px-3 py-1 font-weight-bolder" style={{ borderRadius: "25px", color: 'rgb(165,34,48)' }}>本次签到获取{signinval}分</span>
                    </div>
                </div>
                {/* <div className="rounded-circle mx-auto w-12c h-12c"
                    style={{ background: 'linear-gradient(#FCF4F3 15%, #EFDCD4, #CC9287, #C17162, #A93338, #A52230)', padding: '.8rem' }}>
                    <div className="w-100 h-100 rounded-circle pt-3" style={{ background: "#A52230" }}>
                        <div className="pt-4">已连续签到</div>
                        <div className="d-flex align-items-end justify-content-center">
                            <span className="font-weight-bolder display-4">{signinConsecutiveDays} </span>
                            <span className="mb-1 pb-2 ml-1"> 天</span>
                        </div>
                    </div>
                </div>
                <div className="small" style={{ transform: 'translateY(-30px)' }}>
                    <span className="bg-white px-3 py-1 font-weight-bolder" style={{ borderRadius: "25px", color: 'rgb(165,34,48)' }}>本次签到获取{signinval}分</span>
                    <div className="small mt-2">连续签到30天，可获得1次抽奖机会</div>
                </div> */}
            </div>
            <div className="w-100 p-5 mt-4 d-flex justify-content-center flex-column" >
                <img src={Homemadelogo} alt="" className="w-100 mx-auto" style={{ opacity: .1, transform: 'skew(-10deg, 0deg)' }} />
            </div>

            {/* 抽奖 */}
            {/* <div style={{ background: `url(${signViceMap})`, backgroundSize: "100%" }} className="h-20c">
                <div className="mx-5 mt-2 py-1 d-flex justify-content-center flex-wrap" style={{ boxShadow: "0px 1px 3px #333333", borderRadius: "8px" }}>
                    {this.demandBlock('抽奖', 'life-ring', '#CD6600', cLottery.openLotteryProduct)}
                </div>
            </div> */}

            {/* 签到规则 */}
            {/* <div className="pt-4 px-4 mt-4">
                <p className="text-center mb-4"><span style={{ borderRadius: "22px", background: "#D56F2B" }} className="text-center py-2 px-3 text-white">签到规则</span></p>
                {this.renderRule(1, '连续签到30天，可获得1次抽奖机会')}
                {this.renderRule(2, '若累计签到中断,则重新计算签到天数。')}
            </div> */}

            {/* <small style={{ color: 'rgb(255,192,120)' }} >连续签到{welfare.days}天，可获得{welfare.multiple}倍的积分奖励</small> */}
            {/* 签到获取提示 */}
            {/* <div className="text-left small w-100 pt-1 pl-2 position-absolute text-body"
                style={{ top: 0, left: 0, display: this.showTips }}>本次签到获取{signinval}分</div> */}
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
