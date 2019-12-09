import * as React from 'react';
import { VPage, Page, Prop, IconText, PropGrid, LMR, List, tv, EasyDate, nav, DropdownActions, DropdownAction, FA } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { VPointRule } from './VPointRule';

export class VMyPoint extends VPage<CPointProduct> {
    @observable private openMyPointList: boolean = false;

    async open(param?: any) {
        this.openPage(this.page);
    }

    private openPointProduct = async () => {
        this.controller.openPointProduct();
    }
    private openExchangeHistory = async () => {
        this.controller.openExchangeHistory();
    }
    private openPlatformOrderPoint = async () => {
        this.controller.openPlatformOrderPoint();
    }

    private pointRules = () => nav.push(<VPointRule />);

    private page = observer(() => {
        let { myPointSum, myPointInvalid } = this.controller;
        var date = new Date();
        let dateYear = date.getFullYear();

        let point = myPointSum;
        let nowPoint = myPointInvalid;
        let nowPointTip = nowPoint > 0 ?
            <div className="alert alert-warning m-2" role="alert">
                <span className="text-muted">友情提示: 将有{nowPoint}积分于{dateYear}-12-31过期</span>
            </div>
            : null;
        let actions: DropdownAction[] = [
            {
                icon: 'get-pocket',
                caption: '领取积分',
                action: this.openPlatformOrderPoint
            },
            {
                icon: 'history',
                caption: '积分兑换历史',
                action: this.openExchangeHistory
            },
            {
                icon: 'book',
                caption: '积分规则',
                action: this.pointRules
            }
        ];
        let right = <DropdownActions className="align-self-center mr-1" icon="navicon" actions={actions} />;
        return <Page header="积分管理" right={right}>
            <div className="bg-white h-100">
                <div className="d-flex flex-column align-items-center py-5 point-main-top">
                    <div className="text-white">
                        <small>当前</small> <span className="h2">{point}</span> <small>分</small>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-light" onClick={this.openPointProduct}>
                            <label className="m-0 p-0">积分兑换</label>
                        </button>
                    </div>
                </div>
                {nowPointTip}
            </div>
        </Page >;
    });
}
