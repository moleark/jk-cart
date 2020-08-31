import * as React from 'react';
import { VPage, Page, nav, List, FA, DropdownActions, DropdownAction, EasyDate } from "tonva";
import { CPointProduct, topicClump } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { VPointRule } from './VPointRule';
import { PointProductImage } from 'tools/productImage';
import classNames from 'classnames';
import { logo_pointShop, signInIcon, exChangeIcon, topicMap, 三角底纹1, 三角底纹2 } from 'tools/images';

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
        return <div className={`text-center mx-3 mb-2 ${width}`} onClick={() => action()}>
            {/* <label> */}
            {/* <FA name={icon} className={`mt-2 ${facolor}`} size={sizeN} /> */}
            <img src={icon} alt="" className="w-2c" />
            <div className={`text-light small`}>{name}</div>
            {/* </label> */}
        </div>
    }

    private recommendOrHot = (name: string, more: any, toWhere: any, theme?: string, imgArr?: any, action?: any) => {
        return <div className="mt-2 pt-1" style={{ zIndex: 9 }}>
            <h6 className='d-flex justify-content-between align-content-center bg-transparent'>
                <span className={classNames(theme ? theme : '', 'h6')} style={{ color: theme ? theme : '' }}>{name}</span>
                <span style={{ color: '#808080' }} className="pl-2" onClick={() => more(name)} ><small >更多 </small><FA name='angle-right' /></span>
            </h6>
            <List className="d-flex justify-content-between w-100 bg-transparent"
                items={imgArr.slice(0, 3)}
                item={{
                    render: (v: any) => <PointProductImage chemicalId={v.imageUrl ? v.imageUrl : '1'} className="w-100 px-1 bg-transparent" />,
                    onClick: (v) => toWhere(v),
                    className: "col-4 p-0 bg-transparent"
                }}
                none='暂无产品' />
        </div>
    }

    private page = observer(() => {
        let { myEffectivePoints, myPointTobeExpired, myTotalPoints, pointProductGenre, newPointProducts, hotPointProducts,
            openExchangeHistory, openRevenueExpenditure, openPointProduct, openPointSign, openPointProductDetail } = this.controller;
        var date = new Date();
        let dateYear = date.getFullYear();

        let nowPoint = myPointTobeExpired;
        let nowPointTip = nowPoint > 0 ?
            <div className="alert alert-warning py-0 w-100 small" role="alert">
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

        // let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 无任何类型 』</div>

        return <Page header="积分管理" right={right} className="h-100 bg-white">
            <div className="position-relative">
                <div className="position-absolute w-100">{nowPointTip}</div>
                <div className="d-flex flex-column py-4 px-1"
                    style={{ background: `url(${topicMap}) no-repeat`, backgroundSize: '100%' }}>
                    <div className="ml-2 text-light">
                        <div className="d-flex align-items-center position-relative">
                            <img src={logo_pointShop} alt="img" className="w-2c position-absolute" style={{ top: -12, left: 10 }} />
                            {/* <img className="App-logo h-3c position-absolute"
                                src="/static/media/logo.ee7cd8ed.svg"
                                alt="img" style={{ top: -10, left: -10, filter: 'grayscale(80%)' }} /> */}
                        </div>
                        <i className="ml-5 font-weight-bolder small">J&amp;K Chemical</i>
                    </div>
                    < div className="d-flex align-items-center mx-4 mt-4  text-light justify-content-lg-between" >
                        <div className="text-black pb-2 ">
                            <small>当前</small> <span className="h3">{myEffectivePoints}</span> <small>分可用</small>
                            <br />
                            <p className="mt-2">{myTotalPoints > 0 ? <small>总分: {myTotalPoints}</small> : null}</p>
                        </div>
                        <div className="d-flex justify-content-end" style={{ flex: 1 }}>
                            {this.pointblock("签到", openPointSign, signInIcon, "text-danger")}
                            {this.pointblock("兑换", openPointProduct, exChangeIcon, "text-danger")}
                        </div>
                    </div>
                </div>
                {/* 签到 & 兑换 */}
                {/* <div className="d-flex justify-content-around bg-white mx-4 cursor-pointer position-absolute px-3 rounded-lg"
                    style={{ transform: "translateY(-2.5rem)", left: 0, right: 0, background: 'linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.001)' }}>
                    {this.pointblock("签到", openPointSign, 签到, "text-danger")}
                    {this.pointblock("兑换", openPointProduct, 兑换, "text-danger")}
                </div> */}
            </div>
            <div className="pt-3">
                {/* 产品类别 */}
                {
                    pointProductGenre.length
                        ? <div>
                            {/* style={{ background: `url(${三角底纹1}) no-repeat scroll bottom right`, backgroundSize: '10%', }} */}
                            <List className="d-flex flex-wrap py-2 text-center mx-4 bg-transparent"
                                items={pointProductGenre}
                                item={{ render: this.renderGenreItem, onClick: (v) => openPointProduct(v), className: 'w-25 bg-transparent' }} />
                            <p className="d-flex m-0 justify-content-end mr-4"><img src={三角底纹1} alt="" className="h-1c" /></p>
                        </div>
                        : null
                }
                {/* 新品推荐 热门产品 */}
                <div className='px-4 bg-transparent position-relative' style={{ background: `url(${三角底纹2}) no-repeat 3% 60% `, backgroundSize: '50px' }}>
                    {newPointProducts.length ? this.recommendOrHot(topicClump.newRecommend, openPointProduct, openPointProductDetail, undefined, newPointProducts) : null}
                    {hotPointProducts.length ? this.recommendOrHot(topicClump.hotProduct, openPointProduct, openPointProductDetail, undefined, hotPointProducts) : null}
                </div>
            </div>
        </Page >;
    });

    private renderGenreItem = (item: any) => {
        let { name, imageUrl } = item;
        return <div>
            <label className="w-100 d-flex flex-column justify-content-center">
                {
                    imageUrl
                        ? <div className="m-auto"><PointProductImage chemicalId={imageUrl ? imageUrl : ':0-0268.png'} className="w-2c" /></div>
                        // ? <div className="w-25 m-auto"><PointProductImage chemicalId={imageUrl ? imageUrl : ':0-0268.png'} className="w-100" /></div>
                        : <FA name="leaf" className='mt-2 text-success mb-2' size='lg' />
                }
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