import * as React from 'react';
import { VPage, Page, Scroller, EasyDate } from "tonva-react";
import { CPointProduct } from './CPointProduct';
import { List } from "tonva-react";
import { observer } from 'mobx-react-lite';
import { renderPointRecord } from './VMyPoint';
import { RevenueExpenditure } from './basicRefer';
import { xs } from 'tools/browser';
import { CrPageHeaderTitle, pageHTitle } from 'tools/pageHeaderTitle';
import { ListTable } from 'tools/listTable';

export class VRevenueExpenditure extends VPage<CPointProduct> {
    private showList: any = [];
    private tipNone: string = '『 无 』';
    async open(param?: any) {
        this.openPage(this.page, { header: param });
    }

    private matchData = (header: string) => {
        let { pagePointHistory, cApp } = this.controller;
        let { POINTHISTORY, SIGNINHISTORY } = RevenueExpenditure;
        switch (header) {
            case POINTHISTORY:
                this.showList = pagePointHistory;
                this.tipNone = '『 未曾拥有过 不曾失去过 』';
                return;
            case SIGNINHISTORY:
                this.showList = cApp.cSignIn.signinPageHistory;
                this.tipNone = '『 从未得到过 开启首签之旅 』';
                return;
            default:
                return;
        }
    }

    protected onScrollBottom = async (scroller: Scroller) => {
        this.showList.more();
    }

    private page = observer((param: any) => {
        let { header } = param;
        let headerT = header;
        this.matchData(header);
        let none = <div className="mt-4 text-secondary d-flex justify-content-center">{this.tipNone}</div>;
        header = CrPageHeaderTitle(header);
        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            {pageHTitle(headerT)}
            <div className="mx-auto">
                {
                    xs 
                        ? <List items={this.showList} item={{ render: renderPointRecord }} none={none} />
                        : this.historyListTable()
                }
            </div>
        </Page>;
    });

    private historyListTable = (): JSX.Element => {
        if (this.showList && this.showList.items && !this.showList.items.length)
            return <div className="my-5 text-secondary d-flex justify-content-center">{this.tipNone}</div>;
        let columns = [{ id: 1, name: '简述' },{ id: 2, name: '日期' },{ id: 3, name: '收支' }];
        let content = <>{
            this.showList && this.showList.items && this.showList.items.map((v: any) => {
                let { id, date, comments, point } = v;
                return <tr className="article-product-list order-wrap-list" key={id}>
                    <td data-title={columns[0].name}>{comments}</td>
                    <td data-title={columns[1].name}><EasyDate date={date} /></td>
                    <td data-title={columns[2].name} className="text-danger font-weight-bolder">{point >= 0 ? '+' : ''}{point}</td>
                </tr>
            })
        }</>;
        return <ListTable columns={columns} content={content} ></ListTable>;
	}
}
