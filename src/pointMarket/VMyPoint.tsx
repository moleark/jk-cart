import * as React from 'react';
import { VPage, Page, nav, List, FA, DropdownActions, DropdownAction, EasyDate, tv } from "tonva";
import { CPointProduct, PointProductDetailLevel, topicClump } from "./CPointProduct";
import { observer } from 'mobx-react-lite';
import { VPointRule } from './VPointRule';
import { PointProductImage } from 'tools/productImage';
import classNames from 'classnames';
import { logo_pointShop, signInIcon, exChangeIcon, homeTopicMap, triangleShadingO, triangleShadingT } from 'tools/images';
import { RevenueExpenditure } from './basicRefer';
import { randomColor } from 'tools/randomColor';

export class VMyPoint extends VPage<CPointProduct> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    content() {
        return <this.page />;
    }

    header() {
        return '';
    }

    /**
     * 积分规则页面
     */
    private pointRules = () => nav.push(<VPointRule />);

    /* 积分详情页面 
    private getPointHistory = async () => {
        this.controller.pointDetails();
    }*/

    private pointblock = (name: any, action: any, icon: any, width?: any) => {
        return <div className={`text-center mx-2 mb-2 ${width}`} onClick={() => action()}>
            <img src={icon} alt="" className="w-2c h-2c" />
            <div className={`text-light small`}>{name}</div>
        </div>
    }

    private recommendOrHot = (name: string, more: any, toWhere: any, theme?: string, imgArr?: any, action?: any) => {
        let pointProductImage = (pointProduct: any, index: any) => {
            let { product } = pointProduct;
            let clm = index !== 0 ? (index === 1 ? 'justify-content-center' : 'justify-content-end') : '';
            return <div className={`d-flex align-items-center ${clm}`}>{tv(product, (v) => {
                return <PointProductImage chemicalId={v.imageUrl} className="bg-transparent p-0" style={{ width: '91.6%', height: '23vw', border: `2px solid ${randomColor()}` }} />
            })
            }</div>
        }
        return <div className="mb-4" style={{ zIndex: 9 }}>
            <h6 className='d-flex justify-content-between align-content-end bg-transparent '>
                <small className={classNames(theme ? theme : '', 'align-self-end')} style={{ color: theme ? theme : '' }}>{name}</small>
                <span style={{ color: '#808080' }} className="pl-2" onClick={() => more(name)} ><small >更多 </small><FA name='angle-right' /></span>
            </h6>
            <List className="d-flex w-100 bg-transparent justify-content-between"
                items={imgArr.slice(0, 3)}
                item={{
                    render: pointProductImage, //(v: any) => <PointProductImage chemicalId={v.imageUrl ? v.imageUrl : '1'} className="w-100 px-1 bg-transparent" style={{border:`2px solid ${randomColor()}`}} />,
                    onClick: (v) => toWhere(v, PointProductDetailLevel.DIRECT),
                    className: "col-4 p-0 bg-transparent"
                }}
                none='暂无产品' />
        </div>
    }

    private page = observer(() => {
        let { myEffectivePoints, myPointTobeExpired, myTotalPoints, pointProductGenre, newPointProducts, hotPointProducts,isLogined,
            openExchangeHistory, openRevenueExpenditure, openPointProduct, openPointProductDetail, cApp, showPointDoubt } = this.controller;
        let { openPointSign } = cApp.cSignIn;
        var date = new Date();
        let dateYear = date.getFullYear();

        let nowPoint = myPointTobeExpired;
        let nowPointTip = nowPoint > 0 ?
            <div className="alert alert-warning py-0 w-100 small rounded-0 m-0" role="alert">
                <span className="text-muted">友情提示: 将有{nowPoint}积分于{dateYear}-12-31过期</span>
            </div>
            : null;

        let actions: DropdownAction[] = [
            {
                icon: 'get-pocket',
                caption: RevenueExpenditure.POINTHISTORY,
                action: () => openRevenueExpenditure(RevenueExpenditure.POINTHISTORY)
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
        let right = <DropdownActions className="align-self-center mr-1 bg-transparent border-0 text-light" icon="navicon" actions={actions} />;

        let none = <div className="mt-4 text-secondary d-flex justify-content-center">『 无任何类型 』</div>
        let pointShowUI: any;
        if (!isLogined) pointShowUI = <div className="align-self-center">您尚未登录</div>;
        else pointShowUI = <div>
                            <div><small>当前</small> <span className="h5">{myEffectivePoints}</span> <small>分可用</small></div>
                            <div className="mt-2">
                                {myTotalPoints > 0 ? <small className="mr-2">总分: {myTotalPoints}</small> : null}
                                <span className="small" onClick={() => showPointDoubt()}><span className="small">对积分有疑问?</span></span>
                            </div>
                        </div>

        return <>
            {/* return <Page header="积分商城" right={right} className="h-100 bg-white"> */}
            <>{nowPointTip}</>
            <div className="position-relative">
                <div className="position-absolute" style={{top:12,right:0}}>{ right }</div>
                <div className="d-flex flex-column pb-4 w-100" style={{ background: `url(${homeTopicMap}) no-repeat`, backgroundSize: '100% 100%' }}>
                    {/* <>{nowPointTip}</> */}
                    <img src={logo_pointShop} alt="img" className="w-8c mt-4 ml-4 mb-3" />
                    <div className="d-flex mx-3 mt-2 ml-4 text-light justify-content-between">
                        {pointShowUI}
                        <div className="d-flex justify-content-end mt-1" style={{ flex: 1 }}>
                            {this.pointblock("签到", openPointSign, signInIcon)}
                            {this.pointblock("兑换", openPointProduct, exChangeIcon)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-3">
                {/* 产品类别 */}
                {
                    pointProductGenre.length
                        ? <div>
                            {/* style={{ background: `url(${triangleShadingO}) no-repeat scroll bottom right`, backgroundSize: '10%', }} */}
                            <List className="d-flex flex-wrap pt-2 text-center px-2 bg-transparent justify-content-between"
                                items={pointProductGenre}
                                item={{ render: this.renderGenreItem, onClick: (v) => openPointProduct(v), className: 'w-25 bg-transparent' }} none={none} />
                            <p className="d-flex m-0 justify-content-end pr-1"><img src={triangleShadingO} alt="" className="h-3c" /></p>
                        </div>
                        : null
                }
                {/* 新品推荐 热门产品 */}
                <div className='mb-2 px-4 bg-transparent position-relative' style={{ background: `url(${triangleShadingT}) no-repeat 2% 50% `, backgroundSize: '38px' }}>
                    {newPointProducts.length ? this.recommendOrHot(topicClump.newRecommend, openPointProduct, openPointProductDetail, undefined, newPointProducts) : null}
                    {hotPointProducts.length ? this.recommendOrHot(topicClump.hotProduct, openPointProduct, openPointProductDetail, undefined, hotPointProducts) : null}
                </div>
            </div>
        </>;
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