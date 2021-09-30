import * as React from 'react';
import { VPage, Page, List } from "tonva-react";
import { CPointProduct } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { makeObservable, observable } from 'mobx';
import classNames from 'classnames';
import moment from 'moment';

export class VExchangeOrderTrack extends VPage<CPointProduct> {
    orderTrack: any[] = [];
    
    constructor(c: CPointProduct) {
        super(c);
        makeObservable(this, {
            orderTrack: observable
        });
    }

    async open(param?: any) {
        if (param) {
            let { orderTrack } = param;
            this.orderTrack = orderTrack;
        };
        this.openPage(this.page);
    }

    private renderOrderTrack = () => {
        if (!this.orderTrack.length) return <div className="text-center my-5 py-4">暂无物流信息</div>;
        let rwOrderTrackContent = (content:string) => {
            let res = content.match(/[1][3,4,5,6,7,8,9][0-9]{9}/);
            let result = content;
            if (res) result = `${content.slice(0,res['index'])}<span style="color:#fd7306">${res[0]}</span>${content.slice(res['index'] + 11, content.length)}`;
            return result;
        };

        let rwOrderTrackMsgTime = (msgTime: string, showCur: boolean) => {
            return <><span className={classNames(showCur ? 'h6 font-weight-bolder' : '')}>{moment(msgTime).format('MM-DD')}</span><br /><span>{moment(msgTime).format('HH:mm')}</span></>;
        };

        return <div className="bg-light rounded-lg py-2 px-3">
            <ul className="status-list list-unstyled pl-5 pt-4">
                {   this.orderTrack.sort((a: any, b: any) => new Date(b.msgTime).valueOf() - new Date(a.msgTime).valueOf()).map((v: any, index: number) => {
                    return <li className={classNames('position-relative pb-4 mt-1 mb-2', index === 0 ? 'text-dark font-weight-bolder' : 'text-muted small')}
                        key={index} style={{ borderLeft: '1px solid #d9d9d9' }}>
                        <div className="px-2 pb-1 position-absolute small text-right" style={{ left: index === 0 ? -62 : -52, top: -18 }}>
                            {rwOrderTrackMsgTime(v.msgTime, index === 0 ? true : false)}</div>
                        <div className="px-2" dangerouslySetInnerHTML={{ __html: `${rwOrderTrackContent(v.content)}` }}></div>
                    </li>
                })}
            </ul>
        </div>;
    };

    private page = observer(() => {
        return <Page header='物流信息'>
            <div className="p-2">{this.renderOrderTrack()}</div>
        </Page>
    });
};