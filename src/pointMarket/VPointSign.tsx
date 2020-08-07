import * as React from 'react';
import { VPage, Page, List, FA } from 'tonva';
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { renderPointRecord } from './VMyPoint';
import { GLOABLE } from 'cartenv';

export class VPointSign extends VPage<CPointProduct> {
    @observable showTips: any = "none";
    private signinval: any = 3;

    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer((param: any) => {
        let { IsSignin, signinPageHistory } = this.controller;

        let getSignpoint: any;
        (IsSignin == 0)
            ? getSignpoint = <span style={{ borderRadius: "22px", background: "linear-gradient(to right,#ccc, #5CACEE)", border: '2px solid #eee' }} className="text-center  py-2  text-white" onClick={this.handleChange}>领取积分</span>
            : getSignpoint = <span style={{ borderRadius: "22px", background: "linear-gradient(to right,rgb(253, 83, 60), rgb(252, 117, 69))", border: '2px solid rgb(255,192,120)' }} className="text-center  py-2  text-white" >已领取积分</span>;

        let none = <div className="d-flex justify-content-center text-center text-secondary mt-4 ">『 从未得到过 开启首签之旅 』</div>;
        return <Page header="签到领积分">
            <div className="text-center " style={{ position: "relative", background: "linear-gradient(rgb(253, 98, 52), rgb(250, 51, 82))", padding: '3rem' }}>
                <div className="d-flex justify-content-center" style={{ flexDirection: 'column', margin: '0 4rem' }}>
                    <h2 style={{ color: 'rgb(255,192,120)' }} className="mb-3">
                        <FA name='diamond' /> <span className="text-light"><small>x</small> {this.signinval}</span>
                    </h2>
                    {getSignpoint}
                </div>
                <div className="text-center text-white small w-100 p-1 alert alert-warning text-muted" style={{
                    position: "absolute", top: 0, left: 0, display: this.showTips
                }}>已签到领取 积分+{this.signinval}</div>
            </div>

            <div className="text-center my-1 p-1  bg-white" style={{ borderBottom: ".5px solid #ccc" }}>签到积分详情</div>
            <List items={signinPageHistory} item={{ render: renderPointRecord }} none={none} />
        </Page >;
    });

    protected handleChange = async () => {
        let { addSigninSheet, getSigninHistory } = this.controller;

        //添加积分
        await addSigninSheet(47, this.signinval);
        await getSigninHistory()
        //刷新积分
        // await getPointHistory();

        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }
}