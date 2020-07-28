import * as React from 'react';
import { VPage, Page, List, EasyTime, LMR, FA, } from 'tonva';
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { divide } from 'lodash';
import moment from 'moment';

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

        /*if (IsSignin == 0) {
            getSignpoint = <span style={{ borderRadius: "25%/48%", background: "#ccc" }} className="text-center py-2 px-2 mb-2  text-default " onClick={this.handleChange}>
                领取积分
          </span>
          } else {
            getSignpoint = <span style={{ borderRadius: "25%/48%", background: "#D8BFD8" }} className="text-center px-3 py-2 mb-2  text-default sign" >
                已领取积分
          </span>;
        }*/
        let header = <span>签到领积分</span>
        let none = <div className="d-flex justify-content-center text-center text-secondary mt-4 ">『 从未得到过 开启首签之旅 』</div>;
        return <Page header={header}>
            <div className="text-center " style={{ position: "relative", background: "linear-gradient(rgb(253, 98, 52), rgb(250, 51, 82))", padding: '3rem' }}>
                <div className="d-flex justify-content-center" style={{ flexDirection: 'column', margin: '0 4rem' }}>
                    <h2 style={{ color: 'rgb(255,192,120)' }} className="mb-3">
                        <FA name='diamond' /> <span className="text-light"><small>x</small>  {this.signinval}</span>
                    </h2>
                    {getSignpoint}
                </div>
                <div className="text-center text-white small w-100 p-1 alert alert-warning text-muted" style={{
                    position: "absolute", top: 0, left: 0, display: this.showTips
                }}>已签到领取 积分+{this.signinval}</div>

                {/* <div className="text-center text-white small p-2" style={{
                    position: "absolute", left: "66%", top: "70%", transform: "translate(-1rem,-50%)", borderRadius: "25%/48%",
                    width: '36%', backgroundColor: '#909090', display: this.showTips
                }}>已签到领取 积分+{this.signinval}</div> */}
            </div>
            {/* <div className="text-center pt-4 pb-4  " style={{ position: "relative", background: "linear-gradient(rgba(223, 128, 28, 0.5), rgba(150, 83, 117, 0.5))" }}>
                {getSignpoint}
                <div className="text-center text-white small p-2" style={{
                    position: "absolute", left: "66%", top: "70%", transform: "translate(-1rem,-50%)", borderRadius: "25%/48%",
                    width: '36%', backgroundColor: '#909090', display: this.showTips
                }}>已签到领取 积分+{this.signinval}</div>
            </div> */}

            <div className="text-center my-1 p-1  bg-white" style={{ borderBottom: ".5px solid #ccc" }}>签到积分详情</div>
            {/* {signinPageHistory.items && signinPageHistory.items.length > 0 && <List items={signinPageHistory} item={{ render: this.renderItem }} />} */}
            <List items={signinPageHistory} item={{ render: this.renderItem }} none={none} />


        </Page >;
    });

    private renderItem = (item: any) => {
        let { comments, point, date } = item;
        let generateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        return <div className="d-flex w-100 justify-content-between align-content-center px-3 py-2">
            <div>
                <div className="text-muted"><small><b>{comments}</b></small></div>
                <div style={{ fontSize: "40%" }} className="text-muted">{generateDate}</div>
                {/* <div style={{ fontSize: "40%" }} className="text-muted"><EasyTime date={date}></EasyTime></div> */}
            </div>
            <div className="d-table h-100">
                <div className="font-weight-bolder h-100 d-table-cell align-middle" style={{ color: "#ff0000" }}>+{point}</div>
            </div>
        </div>

        // let left = <div className="small text-muted"><b>{comments}</b></div>
        // let right = <div className="small"><EasyTime date={date}></EasyTime></div>
        // let contents = <div className="text-danger text-center pl-5 small">+{point}</div>
        // return <LMR left={left} right={right} className="d-flex px-3 py-2">{contents}</LMR>
        /* return <div className="w-100 d-flex flex-column px-3 py-2">
            <div className="d-flex justify-content-between">
                <div className="text-muted"><small><b>{comments}</b></small></div>
                <div style={{ color: "red" }}><small>+{point}</small></div>
                <div className="float-right" style={{ width: "4rem" }}><small><EasyTime date={date}></EasyTime></small></div>
            </div>
        </div > */

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


