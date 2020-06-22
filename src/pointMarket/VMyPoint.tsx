import * as React from 'react';
import { VPage, Page, nav, List, tv, EasyTime, FA, IconText } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { VPointRule } from './VPointRule';

export class VMyPoint extends VPage<CPointProduct> {
    @observable private openMyPointList: boolean = false;

    async open(param?: any) {
        this.openPage(this.page);
    }
    /*积分兑换*/
    private openPointProduct = async () => {
        this.controller.openPointProduct();
    }

    /* 积分兑换记录页面 */
    private openExchangeHistory = async () => {
        this.controller.openExchangeHistory();
    }

    /**
     * 打开领取积分界面 
     */
    private openPointDrawing = async () => {
        this.controller.openPointDrawing();
    }
    /* 积分规则页面 */
    private pointRules = () => nav.push(<VPointRule />);

    /* 积分详情页面 
    private getPointHistory = async () => {
        this.controller.pointDetails();
    }*/

    /*签到*/
    private openPointSign = async () => {
        // await this.controller.isSignined();       /* 是否签到 */
        await this.controller.openPointSign()
    }

    private page = observer(() => {
        let { myEffectivePoints, myPointTobeExpired, myTotalPoints, pagePointHistory, IsSignin } = this.controller;
        var date = new Date();
        let dateYear = date.getFullYear();

        let nowPoint = myPointTobeExpired;
        let nowPointTip = nowPoint > 0 ?
            <div className="alert alert-warning m-2" role="alert">
                <span className="text-muted">友情提示: 将有{nowPoint}积分于{dateYear}-12-31过期</span>
            </div>
            : null;

        let right = <div className="align-self-center mr-1 ">
            <div className="px-2" onClick={this.pointRules}>
                <label> <FA name="info" className="px-2 small" /><small>积分规则</small></label>
            </div>
        </div>

        let showsign: any;
        if (IsSignin == 0) {
            showsign = <div className=" mt-2 py-2 px-4 bg-white text-muted lsign" style={{ borderRadius: "25%/48%" }} onClick={this.openPointSign} >
                <FA name="pencil" className="mr-2 mb-2" />签到
            </div>;
        } else {
            showsign = <div className=" mt-2 py-2 px-4" style={{ borderRadius: "25%/48%", background: "#6495ED" }} onClick={this.openPointSign}>
                <FA name="pencil" className="mr-2 mb-2" />已签到
            </div>;
        }

        return <Page header="积分管理" right={right} headerClassName="bg-primary">
            <div className="bg-white">
                <div className="d-flex flex-column py-4" style={{ background: "linear-gradient(rgba(23,184,184,.5),rgba(23,162,184,.5),rgba(23,106,184,.5))", borderRadius: " 0 0 5px 5px" }}>
                    < div className="d-flex flex-column align-items-center mt-3 mb-4" >
                        <div className="text-black text-center pb-2">
                            <small>当前</small> <span className="h2">{myEffectivePoints}</span> <small>分可用</small>
                            <br />
                            {myTotalPoints > 0 ? <small>总分: {myTotalPoints}</small> : null}
                        </div>
                        <div className="text-white text-center " >
                            {showsign}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between my-2 px-3 bg-white w-100">
                    {this.pointblock("领取积分", this.openPointDrawing, "get-pocket", "text-info", " #ccc")}
                    {this.pointblock("积分兑换", this.openPointProduct, "exchange", "text-success", " #99CCFF")}
                    {this.pointblock("兑换记录", this.openExchangeHistory, "history", "text-info", " #EEae0e")}
                </div>
                <p className="text-center mt-2 pb-1 small bg-white" style={{ borderBottom: ".5px solid #ccc" }}>积分收支明细</p>
                {pagePointHistory.items && pagePointHistory.items.length > 0 && <List items={pagePointHistory} item={{ render: this.renderItem }} />}
                {nowPointTip}
            </div>
        </Page >;
    });

    private pointblock = (name: any, action: any, icon: any, facolor: any, bgcolor: any) => {
        facolor = "fa-2x mt-2 " + facolor
        return <div className="text-center px-4 py-2" style={{ background: bgcolor, borderRadius: "5px", transform: "translate(0,-2rem)" }} onClick={action}>
            <label className=" text-white">
                <FA name={icon} className={facolor} />
                <div>{name}</div>
            </label>
        </div>
    }

    private renderItem = (item: any) => {
        let { date, comments, point } = item;
        return <div className="d-flex w-100 justify-content-between px-3 py-2">
            <div className="text-muted"><small><b>{comments}</b></small></div>
            <div className="text-info w-50 d-flex justify-content-between">
                <div className="ml-3" style={{ color: "pink" }}>{point}</div>
                <div><small><EasyTime date={date}></EasyTime></small></div>
            </div>
        </div>

        /* return <div className="row px-3 py-2 d-flex">
             <div className="col-xs-6 col-md-6"><small><b>{comments}</b></small></div>
             <div className="col-xs-6 col-md-6 w-100 d-flex justify-content-between">
                 <div className="" ><small>{tv(customer, v => v.name)}</small></div>
                 <div className="" ><small><EasyDate date={date}></EasyDate></small></div>
             </div>
         </div>
        */
        /*
            let left=<div className="w-40">订单：{comments}</div>
            let right= <div className="float-right" ><EasyDate date={date}></EasyDate></div> 
            let content= <div className="text-center px-1" >{tv(customer,v=> v.name)}</div>
            return <LMR className="cursor-pointer w-100 px-3" 
               left={ left } right={right}> {content}
           </LMR>;
       */

        /*          
         return <div className="w-100 d-flex justify-content-between">
            <div className=""><b>订单:{comments}</b></div>
            <div className="mx-3 " >{tv(customer,v=> v.name)}</div>
            <div className="w-30 float-right" ><EasyDate date={date}></EasyDate></div>
         </div>
        */


    }
}
