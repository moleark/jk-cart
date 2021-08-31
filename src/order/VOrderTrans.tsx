/* eslint-disable */
import * as React from 'react';
import { Page, tv, VPage } from "tonva-react";
import { COrder } from './COrder';
import { xs } from 'tools/browser';
import classNames from 'classnames';
import moment from 'moment';

export class VOrderTrans extends VPage<COrder> {

    async open(orderTrans: any) {
        document.documentElement.scrollIntoView();
        this.openPage(this.page, orderTrans);
    }

    private page = (orderTrans: any) => {
        let { transNumber, orderTrackRult, expressLogistics } = orderTrans;
        let orderTrackUI: JSX.Element;
        if (orderTrackRult) {
            let { result, time:resTime, remark:resRemark, steps } = orderTrackRult;
            let { step } = steps;
            if (!step?.length) { step = [{ time: resTime || Date.now(), remark: "查无结果" }]; };
            orderTrackUI = <ul className="list-unstyled mt-2">
                {step.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
                .map((el: any, index: number) => {
                    if (!el) return;
                    let { time, remark } = el;
                    let ina = index === 0 ? "start" : (index !== step.length - 1 ? "" : "end");
                    let dYear = moment(time).format("YYYY.MM.DD");
                    let dTime = moment(time).format("HH:mm");
                    return <li key={index} className={classNames("d-flex m-0 step", ina)}>
                        <div className="datetime">{dYear}<br />{dTime}</div>
                        <div className="step-icon"></div>
                        <div className="text col-8 pr-0">{remark}</div>
                    </li>
                })}
            </ul>;
        } else {
            orderTrackUI = <div className="text-secondary p-3">暂无结果,请自行查询</div>
        };
        let header: any;
        if (xs) header = <>订单跟踪</>;
        return <Page header={header} footer={<></>}>
            {!xs && <h1 className="mt-4 mb-3 text-center">订单跟踪</h1>}
            <div className="result-body rounded-sm pt-3" style={{ background: "#f5f5f5" }}>
                <div className="row mx-0 justify-content-between p-2 pb-3 border-bottom">
                    <span className="col-12 col-sm-6"><span className="rz-user-select">发运方式：</span><strong>{tv(expressLogistics, (v: any) => <>{v.name}</>)}</strong></span>
                    <span className="col-12 col-sm-6"><span className="rz-user-select">快递单号：</span><strong>{transNumber}</strong></span>
                </div>
                {orderTrackUI}
            </div>
        </Page>
    }
}