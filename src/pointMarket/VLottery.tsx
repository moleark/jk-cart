import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page } from 'tonva';
import { CLottery } from './CLottery';
import { true_test, signInIcon, logo, timg1_test } from 'tools/images';
import { PointProductImage } from 'tools/productImage';
import { observable } from 'mobx';
import classNames from 'classnames';


export class VLottery extends VPage<CLottery> {
    @observable currIndex: number;
    @observable winning: any;   /* 中奖的商品 */
    @observable isLottery: boolean = false;
    @observable a: any;
    async open(param?: any) {
        this.openPage(this.page);
    }

    private lottery = () => {/* 抽奖次数减一 */
        this.winning = 3;
        let i = 0;//转到哪个位置
        let count = 0;//转圈初始值
        let totalCount = 9;//转动的总圈数
        let speed = 500;//转圈速度，越大越慢
        let timer: any;
        // let prize = [0, 1, 2, 5, 8, 7, 6, 3];//抽奖轮转顺序  九宫格
        let prize = [0, 1, 2, 3, 4, 5, 6, 7];//抽奖轮转顺序     轮盘
        this.currIndex = undefined;
        this.isLottery = true;
        let roll = () => {
            speed -= 50;//速度衰减
            if (speed <= 10) speed = 10;
            this.currIndex = prize[i];
            i++;
            if (i > prize.length - 1) {//计算转圈次数
                i = 0; count++;
            }
            if (count >= totalCount && i === this.winning) {//满足转圈数和指定位置就停止
                clearTimeout(timer); speed = 500; this.isLottery = false;
            } else {
                timer = setTimeout(roll, speed);//不满足条件时调用定时器
                if (count >= totalCount - 1 || speed <= 50) speed += 100;//最后一圈减速
            }
        }
        roll();
    }

    private renderPrizesBlock = (v: any, index: any) => {
        return <div key={index}
            style={{
                transform: `rotate(${index * 45 - 90}deg)`, top: '27%', left: '27%', width: 0, height: 0, border: "73px solid transparent",
                borderRight: `170px solid ${this.currIndex === index ? '#28a745' : '#A52A2A'}`, transformOrigin: '30% 50%',
            }}
            className="position-absolute">
            <span className="position-absolute" style={{ top: -10, left: 120, transform: 'rotate(90deg)' }}>{v}</span>
        </div>
    }

    private page = observer(() => {
        let { lotteryProducts, remainingNumOfDraws, } = this.controller;
        let header = <div className="w-100 text-center">幸运抽奖</div>;
        lotteryProducts = [1, 2, 3, 4, 5, 6, 7, 8];//九宫格 / 轮盘
        // lotteryProducts.splice(lotteryProducts.length / 2, 0, '开始抽奖'); //九宫格 使用

        return <Page header={header} right={<></>}>

            <div className="position-relative" style={{ background: `url(${timg1_test}) no-repeat`, backgroundSize: 'cover' }}>
                <img style={{ visibility: 'hidden' }} width="100%" src={true_test} alt="" />
                <div className="position-absolute w-100" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                    {/* 抽奖机会 */}
                    <div className="d-flex justify-content-center text-light mt-5 mb-3" >
                        <span className="border border-light rounded px-2 bg-transparent" style={{ padding: '2px 0' }}>
                            剩余 <b className="bg-white p-1 text-danger">{remainingNumOfDraws}</b> 次抽奖机会
                        </span>
                    </div>

                    {/* 抽奖区域 */}
                    <div className=" pb-5 mx-2 rounded-lg"
                        style={{ background: "url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1104137880,798719686&fm=26&gp=0.jpg) no-repeat", backgroundSize: "100%" }}>
                        {/* 抽奖标题 */}
                        <div className="d-flex justify-content-center p-2 pt-3 h3 text-center text-monospace font-weight-bolder">{/* transformOrigin: 'center center', */}
                            <div className=" position-relative" style={{ color: "#cc0000" }}>
                                <span style={{ top: 3, left: -30, transform: 'rotate(-12deg)' }} className="position-absolute">福</span>
                                利放
                                <span style={{ top: 3, right: -30, transform: 'rotate(12deg)' }} className="position-absolute">送</span>
                            </div>
                        </div>

                        {/* 抽奖内容 */}

                        {/* 轮盘 */}
                        <div className="border rounded-circle m-auto w-20c h-20c position-relative overflow-hidden">
                            <div className="border rounded-circle position-absolute w-75 h-75 d-flex justify-content-center align-items-center"
                                style={{ top: '50%', left: '50%', zIndex: 99, transform: 'translate(-50%, -50%)', }}>


                                <button className={classNames('btn btn-primary h-3c align-self-center ', this.isLottery ? 'disabled pr-4' : '')} onClick={() => { if (!this.isLottery && remainingNumOfDraws>0) { this.lottery() } }}>
                                    {this.isLottery ? '抽奖中' : '开始抽奖'}
                                    <span className=" position-relative" style={{ display: this.isLottery ? '' : 'none' }}>
                                        <i className="fa-li fa fa-spinner fa-spin position-absolute" style={{ left: -7 }}></i>
                                    </span>
                                </button>
                            </div>

                            {lotteryProducts.map((v: any, index: number) => {
                                return this.renderPrizesBlock(v, index);
                            })}
                        </div>

                        {/* 九宫格 */}
                        {/* <div className='d-flex flex-wrap px-2'>
                            {lotteryProducts.map((v: any, index: number) => {
                                if (index === 4) {
                                    return <div className="d-flex justify-content-center" key={index} style={{ width: '33.3%' }} >
                                        <button className={classNames('btn btn-primary h-3c align-self-center ', this.isLottery ? 'disabled pr-4' : '')} onClick={() => { if (!this.isLottery) { this.lottery() } }}>
                                            {this.isLottery ? '抽奖中' : '开始抽奖'}
                                            <span className=" position-relative" style={{ display: this.isLottery ? '' : 'none' }}>
                                                <i className="fa-li fa fa-spinner fa-spin position-absolute" style={{ left: -7 }}></i>
                                            </span>
                                        </button>
                                    </div>
                                }
                                return <PointProductImage className={classNames('border', this.currIndex === index ? 'border-success' : '')} key={index} style={{ width: "33.3%" }} chemicalId={v} />
                            })}
                        </div> */}



                    </div>
                </div>
            </div >

            {/* 抽奖成功提示 */}
            {/* <div className="position-fixed d-flex justify-content-center"
                style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, backgroundColor: 'hsla(120,0%,50%,.7)' }}>
                <div className="align-self-center bg-white rounded-lg px-5 pb-5 pt-3 text-center">
                    <div>恭喜您</div>
                    <div>获得-----</div>

                </div>
            </div> */}

        </Page >
    })
}