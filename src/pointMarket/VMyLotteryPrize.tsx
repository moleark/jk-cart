import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, FA, List } from 'tonva';
import { CLottery } from './CLottery';

export class VMyLotteryPrize extends VPage<CLottery> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private renderMyPrize = (myPrize: any) => {
        return <div>1111</div>
    }

    private page = observer(() => {
        let { myPrizeLib, openMyPrizeOrder } = this.controller;
        let footer = <div className="w-100 px-3 d-flex justify-content-end">
            <button type="button" className="btn btn-danger m-1" onClick={openMyPrizeOrder}>领取奖品</button>
        </div>

        return <Page header='我的奖品' footer={footer}>
            <List items={myPrizeLib} item={{ render: this.renderMyPrize }} none='无' />
        </Page >
    })
}