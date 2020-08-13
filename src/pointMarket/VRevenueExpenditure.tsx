import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { List } from 'tonva';
import { observer } from 'mobx-react-lite';
// import moment from 'moment';
import { renderPointRecord } from './VMyPoint';

export class VRevenueExpenditure extends VPage<CPointProduct> {
    private showList: any = [];
    private tipNone: string = '『 无 』';
    async open(param?: any) {
        this.openPage(this.page, { header: param });
    }

    /* private renderItem = (item: any) => {
        let { date, comments, point } = item;
        let generateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        return <div className="d-flex w-100 justify-content-between align-content-center px-3 py-2">
            <div>
                <div className="text-muted"><small><b>{comments}</b></small></div>
                <div style={{ fontSize: "40%" }} className="text-muted">{generateDate}</div>
                <div style={{ fontSize: "40%" }} className="text-muted"><EasyDate date={date}></EasyDate></div>
            </div>
            <div className="d-table h-100">
                <div className="font-weight-bolder h-100 d-table-cell align-middle" style={{ color: "#ff0000" }}>{point >= 0 ? '+' : ''}{point}</div>
            </div>
        </div>
    } */

    private matchData = (header: string) => {
        let { pagePointHistory, signinPageHistory } = this.controller;
        switch (header) {
            case '收支明细':
                this.showList = pagePointHistory;
                this.tipNone = '『 未曾拥有过 不曾失去过 』';
                return;
            case '签到明细':
                this.showList = signinPageHistory;
                this.tipNone = '『 从未得到过 开启首签之旅 』';
                return;
            default:
                return;
        }
    }

    private page = observer((param: any) => {
        let { header } = param;
        this.matchData(header);
        let none = <div className="mt-4 text-secondary d-flex justify-content-center">{this.tipNone}</div>;

        return <Page header={header}>
            <List items={this.showList} item={{ render: renderPointRecord }} none={none} />
        </Page>;
    });
}
