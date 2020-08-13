import * as React from 'react';
import { VPage, Page, nav, List, FA, DropdownActions, DropdownAction, EasyDate } from "tonva";
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { VPointRule } from './VPointRule';
import { PointProductImage } from 'tools/productImage';
import classNames from 'classnames';

export class VMyPoint extends VPage<CPointProduct> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    /**
     * 积分规则页面
     */
    private pointRules = () => nav.push(<VPointRule />);

    /* 积分详情页面 
    private getPointHistory = async () => {
        this.controller.pointDetails();
    }*/

    /**
     * 签到
     */
    /* private openPointSign = async (name?: string) => {
        // await this.controller.isSignined();   是否签到 
        await this.controller.openPointSign()
    } */

    private pointblock = (name: any, action: any, icon: any, facolor: any, width?: any, size?: any) => {
        let sizeN = size ? size : '2x';
        return <div className={`text-center ${width ? width : 'flex-fill'}`} onClick={() => action()}>
            <label>
                <FA name={icon} className={`mt-2 ${facolor}`} size={sizeN} />
                <div className={`text-dark ${size === 'lg' ? 'small' : ''}`}>{name}</div>
            </label>
        </div>
    }

    private recommendOrHot = (name: string, more: any, theme?: string, imgArr?: any, action?: any) => {
        return <div className="bg-white mt-2 p-3">
            <h6 className='d-flex justify-content-between align-content-center'>
                <span className={classNames(theme ? theme : '')} style={{ color: theme ? theme : '' }}>{name}</span>
                <span style={{ color: '#808080' }} className="pl-2" onClick={() => more(name)} ><small >更多 </small><FA name='angle-right' /></span>
            </h6>
            <List className="d-flex justify-content-between bg-white" items={imgArr} item={{ render: (v: any) => <div key={v} className="w-8c"><PointProductImage chemicalId={v.imageUrl} className="w-100" /></div> }} none='无' />
            {/* <div className="d-flex justify-content-between bg-white">
                {
                    imgArr.map((v: any) => (<div key={v} className="w-8c"><PointProductImage chemicalId={v.imageUrl} className="w-100" /></div>))
                }
            </div> */}
        </div>
    }

    private page = observer(() => {
        let { myEffectivePoints, myPointTobeExpired, myTotalPoints, pointProductGenre, pointProducts,
            openExchangeHistory, openRevenueExpenditure, openPointProduct, openPointSign } = this.controller;
        var date = new Date();
        let dateYear = date.getFullYear();

        let nowPoint = myPointTobeExpired;
        let nowPointTip = nowPoint > 0 ?
            <div className="alert alert-warning py-0 w-100" role="alert">
                <span className="text-muted">友情提示: 将有{nowPoint}积分于{dateYear}-12-31过期</span>
            </div>
            : null;

        let actions: DropdownAction[] = [
            {
                icon: 'get-pocket',
                caption: '收支明细',
                action: () => openRevenueExpenditure('收支明细')
            },
            {
                icon: 'history',
                caption: '兑换记录',
                action: openExchangeHistory
            },
            {
                icon: 'book',
                caption: '积分规则',
                action: this.pointRules
            }
        ];
        let right = <DropdownActions className="align-self-center mr-1" icon="navicon" actions={actions} />;

        let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 无任何类型 』</div>

        return <Page header="积分管理" right={right}>
            <div className="position-relative">
                <div className="position-absolute w-100">{nowPointTip}</div>
                <div className="d-flex flex-column py-4" style={{ background: "linear-gradient(rgba(23,184,184,.5),rgba(23,162,184,.5),rgba(23,106,184,.5))", borderRadius: " 0 0 5px 5px" }}>
                    < div className="d-flex flex-column align-items-center mt-3 mb-4" >
                        <div className="text-black text-center pb-2">
                            <small>当前</small> <span className="h2">{myEffectivePoints}</span> <small>分可用</small>
                            <br />
                            {myTotalPoints > 0 ? <small>总分: {myTotalPoints}</small> : null}
                        </div>
                    </div>
                </div>
                {/* 签到 & 兑换 */}
                <div className="d-flex justify-content-around m-auto bg-white w-75 cursor-pointer position-absolute px-3 rounded-lg"
                    style={{ boxShadow: "2px 2px 8px #333333", transform: "translateY(-2.5rem)", left: 0, right: 0 }}>
                    {this.pointblock("签到", openPointSign, "calendar", "text-danger")}
                    {this.pointblock("兑换", openPointProduct, "gift", "text-danger")}
                </div>
            </div>
            <div style={{ background: '#eee' }} className="pt-5">
                {/* 产品类别 */}
                <List className="d-flex flex-wrap bg-white py-2 px-3 text-center"
                    items={pointProductGenre}
                    item={{ render: this.renderGenreItem, onClick: (v) => openPointProduct(v), className: 'w-25' }}
                    none={none} />
                {/* <div className="d-flex flex-wrap bg-white py-2 px-3">
                     {
                        pointProductGenre.map((v: any) => {
                            return <span className="w-25" key={v.id}>{this.pointblock(v.name, this.openPointProduct, "leaf", "text-success", 'w-100', 'lg')}</span>
                        })
                    }
                </div> */}
                {/* 新品推荐 热门产品 */}
                <>
                    {this.recommendOrHot('新品推荐', openPointProduct, '#436EEE', pointProducts.slice(0, 3))}
                    {this.recommendOrHot('热门产品', openPointProduct, '#436EEE', pointProducts.slice(6, 9))}
                </>
            </div>
        </Page >;
    });

    private renderGenreItem = (item: any) => {
        let { name } = item;
        return <div>
            <label className="w-100">
                <FA name="leaf" className='mt-2 text-success' size='lg' />
                <div className='text-dark small'>{name}</div>
            </label>
        </div>
    }
}

export function renderPointRecord(item: any) {
    let { comments, point, date } = item;
    return <div className="d-flex w-100 justify-content-between align-content-center small px-3 py-2">
        <div>
            <div className="text-muted">{comments}</div>
            <div className="text-muted small"><EasyDate date={date} /></div>
        </div>
        <div className="d-table h-100">
            <div className="font-weight-bolder h-100 d-table-cell align-middle text-danger">{point >= 0 ? '+' : ''}{point}</div>
        </div>
    </div>
}

