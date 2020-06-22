import * as React from 'react';
import { VPage, Page, List, EasyTime, LMR, } from 'tonva';
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { divide } from 'lodash';

export class VPointSign extends VPage<CPointProduct> {
    @observable showTips: any = "none";
    private signinval: any = 3;

    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer((param: any) => {
        let { IsSignin, signinPageHistory } = this.controller;

        let getSignpoint: any
        (IsSignin == 0) ? getSignpoint = <span style={{ borderRadius: "25%/48%", background: "#ccc" }} className="text-center py-2 px-2 mb-2  text-default " onClick={this.handleChange}>
            领取积分
          </span> : getSignpoint = <span style={{ borderRadius: "25%/48%", background: "rgb(215, 116, 173)" }} className="text-center px-3 py-2 mb-2  text-white" >
                已领取积分
           </span>;
        /*if (IsSignin == 0) {
            getSignpoint = <span style={{ borderRadius: "25%/48%", background: "#ccc" }} className="text-center py-2 px-2 mb-2  text-default " onClick={this.handleChange}>
                领取积分
          </span>
          } else {
            getSignpoint = <span style={{ borderRadius: "25%/48%", background: "#D8BFD8" }} className="text-center px-3 py-2 mb-2  text-default sign" >
                已领取积分
          </span>;
        }*/
        let header = <span className="small">签到领积分</span>
        return <Page header={header}>
            <div className="text-center pt-4 pb-4  " style={{ position: "relative", background: "linear-gradient(rgba(223, 128, 28, 0.5), rgba(150, 83, 117, 0.5))" }}>
                {getSignpoint}
                <div className="text-center text-white small p-2" style={{
                    position: "absolute", left: "66%", top: "70%", transform: "translate(-1rem,-50%)", borderRadius: "25%/48%",
                    width: '36%', backgroundColor: '#909090', display: this.showTips
                }}>已签到领取 积分+{this.signinval}</div>
            </div>

            <div className="text-center p-1 small bg-white" style={{ borderBottom: ".5px solid #ccc" }}>签到积分详情</div>
            {signinPageHistory.items && signinPageHistory.items.length > 0 && <List items={signinPageHistory} item={{ render: this.renderItem }} />}


        </Page >;
    });

    private renderItem = (item: any) => {
        let { comments, point, date } = item;

        let left = <div className="small text-muted"><b>{comments}</b></div>
        let right = <div className="small"><EasyTime date={date}></EasyTime></div>
        let contents = <div className="text-danger text-center pl-5 small">+{point}</div>
        return <LMR left={left} right={right} className="d-flex px-3 py-2">{contents}</LMR>
        /* return <div className="w-100 d-flex flex-column px-3 py-2">
             <div className="d-flex justify-content-between">
                 <div className="text-muted"><small><b>{comments}</b></small></div>
                 <div className="ml-4 pl-4" style={{ color: "red" }}><small>+{point}</small></div>
                 <div><small><EasyTime date={date}></EasyTime></small></div>
             </div>
         </div >*/

    }

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
        }, 1000);
    }

}


