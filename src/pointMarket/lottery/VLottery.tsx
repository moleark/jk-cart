import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, FA } from 'tonva-react';
import { CLottery } from './CLottery';
import { PointProductImage } from 'tools/productImage';
import { observable, makeObservable } from 'mobx';
import classNames from 'classnames';

export class VLottery extends VPage<CLottery> {
    currIndex: number;
    winning: any;   /* 中奖的商品 */
    isLottery: boolean = false;
    lotterySuccess: boolean = false;
    aDeg: any = 0;/* 轮盘转到度数 */
    prize = [0, 1, 2, 5, 8, 7, 6, 3];//抽奖轮转顺序  九宫格

    constructor(c: CLottery) {
        super(c);

        makeObservable(this, {
            currIndex: observable,
            winning: observable,
            isLottery: observable,
            lotterySuccess: observable,
            aDeg: observable
        });
    }

    // prize = [0, 1, 2, 3, 4, 5, 6, 7];//抽奖轮转顺序     轮盘
    async open(param?: any) {
        // console.log(await this.controller.cApp.uqs.积分商城);
        this.openPage(this.page);
    }

    private lottery = async () => {
        let { lotteryProducts, productsLib, decreasingNumberOfDraws, winningProduct } = this.controller;
        await decreasingNumberOfDraws();
        let i = 0;//转到哪个位置
        let count = 0;//转圈初始值
        let totalCount = 9;//转动的总圈数
        let speed = 500;//转圈速度，越大越慢
        let timer: any;
        /* ---------------- 轮盘转动 ---------------- */
        // let aaaaa = Math.floor(Math.random() * (3600 - 1000) + 1000);
        // let roll = () => {
        //     this.aDeg += 10;
        //     if (this.aDeg >= aaaaa) {
        //         clearTimeout(timer);
        //         this.isLottery = false; this.lotterySuccess = true;
        //     } else
        //         timer = setTimeout(roll, 50);
        // }
        // roll();
        /* ---------------- 轮盘转动 ---------------- */
        this.currIndex = undefined;
        this.isLottery = true;
        let indexMR = this.mR();//随机取值
        let roll = async () => {
            speed -= 50;//速度衰减
            if (speed <= 10) speed = 10;
            this.currIndex = this.prize[i];
            i++;
            if (i > this.prize.length - 1) {//计算转圈次数
                i = 0; count++;
            }
            if (count >= totalCount && productsLib[indexMR].productId === lotteryProducts[this.currIndex].id) {//满足转圈数和指定位置就停止
                clearTimeout(timer); speed = 500; this.isLottery = false; this.lotterySuccess = true; this.winning = lotteryProducts[this.currIndex];
                await winningProduct(this.winning);
            } else {
                timer = setTimeout(roll, speed);//不满足条件时调用定时器
                if (count >= totalCount - 1 || speed <= 50) speed += 100;//最后一圈减速
            }
        }
        roll();
    }

    private mR = () => {
        let { productsLib } = this.controller;
        return Math.floor(Math.random() * (productsLib.length - 0) + 0);
    }

    private renderLotteryBtn = () => {
        let { remainingNumOfDraws } = this.controller;
        return <button className={classNames('btn btn-primary  align-self-center ', this.isLottery ? 'disabled pr-4' : '')} onClick={() => {
            if (remainingNumOfDraws === 0) { this.lotterySuccess = true; return; }
            if (!this.isLottery) { this.lottery() }
        }}>{this.isLottery ? '抽奖中' : '开始抽奖'}
            <span className=" position-relative" style={{ display: this.isLottery ? '' : 'none' }}>
                <i className="fa-li fa fa-spinner fa-spin position-absolute" style={{ left: -7 }}></i>
            </span>
        </button>
    }

    private renderPrizesBlock = (v: any, index: any) => {
        let color = [0, 2, 4, 6].includes(index) ? '#A52A2A' : '#7EC0EE';
        // Math.cos((45 / 2) * (Math.PI / 180)) * 160 / 2 可大约计算border的带宽,存在误差 (------思路错误，需修正)
        // console.log(Math.sin((45) * (Math.PI / 180)) * 160 / 2);
        return <div key={index}
            style={{
                transform: `rotate(${index * 45 - 90}deg) translateY(-50%)`, top: '50%', left: '50%', width: 0, height: 0, border: "68px solid transparent",
                borderRight: `160px solid ${this.currIndex === index ? 'rgb(255,203,63)' : color}`, borderLeft: 0, transformOrigin: '0% 0%'
            }}
            className="position-absolute">
            <span className="position-absolute" style={{ top: -10, left: 130, transform: 'rotate(90deg)' }}>{v.content}</span>
        </div>
    }

    private page = observer(() => {
        let { lotteryProducts, remainingNumOfDraws, openMyLotteryPrize } = this.controller;
        let header = <div className="w-100 text-center">幸运抽奖</div>;

        return <Page header={header} right={<></>} className="w-100">

            <div className="position-relative" style={{ background: `url(http://bpic.588ku.com/back_pic/04/70/62/26589975a47d9d0.jpg) no-repeat`, backgroundSize: 'cover', }}>
                {/* <img style={{ visibility: 'hidden' }} width="100%" src={timg1_test} alt="" /> */}
                <div className="w-100 pb-5" >
                    {/* 抽奖机会 */}
                    <div className="d-flex justify-content-center text-light pt-5 mb-3" >
                        <span className="border border-light rounded px-2 bg-transparent" style={{ padding: '2px 0' }}>
                            剩余 <b className="bg-white p-1 text-danger">{remainingNumOfDraws}</b> 次抽奖机会
                        </span>
                    </div>

                    {/* 抽奖区域 */}
                    <div className=" pb-5 mx-2 rounded-lg w-auto"
                        style={{ background: "url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1104137880,798719686&fm=26&gp=0.jpg) no-repeat", backgroundSize: "100% 100%" }}>
                        {/* 抽奖标题 */}
                        <div className="d-flex justify-content-center p-2 pt-3 h3 text-center text-monospace font-weight-bolder">
                            <div className=" position-relative" style={{ color: "#cc0000" }}>
                                <span style={{ top: 3, left: -30, transform: 'rotate(-12deg)' }} className="position-absolute">福</span>
                                利放
                                <span style={{ top: 3, right: -30, transform: 'rotate(12deg)' }} className="position-absolute">送</span>
                            </div>
                        </div>

                        {/* 抽奖内容 */}
                        {/* 轮盘--------------界面适配bug */} {/* overflow-hidden */}
                        {/* <div className="border rounded-circle m-auto w-20c h-20c position-relative overflow-hidden"
                            style={{ transform: `rotate(${this.aDeg}deg)` }}>
                            {lotteryProducts.map((v: any, index: number) => {
                                return this.renderPrizesBlock(v, index);
                            })}
                            <div className="border rounded-circle position-absolute w-75 h-75 d-flex justify-content-center align-items-center"
                                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                                {this.renderLotteryBtn()}
                            </div>
                        </div> */}
                        {/* 九宫格 */}
                        <div className='d-flex flex-wrap px-2 m-auto'>
                            {lotteryProducts.map((v: any, index: number) => {
                                if (index === 4) {
                                    return <div className="d-flex justify-content-center" key={index} style={{ width: '33.3%' }} >
                                        {this.renderLotteryBtn()}
                                    </div>
                                }
                                return <PointProductImage className={classNames('border', this.currIndex === index ? 'border-success' : '')} key={index} style={{ width: "33.3%" }} chemicalId={'1'} />
                            })}
                        </div>
                    </div>
                    {/* 我的奖品 */}
                    <div className="mx-2 d-flex justify-content-center mt-2" onClick={() => { if (!this.isLottery) openMyLotteryPrize() }}>
                        <span style={{ borderRadius: "22px", color: '#F7C709' }} className="text-center py-1 px-3 bg-white">
                            <FA name='gift' /> <span style={{ color: 'rgb(152,42,7)' }} className="small">我的奖品</span>
                        </span>
                    </div>
                </div>
            </div >

            {/* 抽奖成功提示 */}
            {
                this.lotterySuccess ?
                    <div className="position-fixed d-flex justify-content-center"
                        style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, backgroundColor: 'hsla(120,0%,50%,.7)' }}>
                        <div className="align-self-center bg-white rounded-lg px-4 py-3 pb-4 text-center position-relative">
                            <div className="position-absolute" style={{ top: 5, right: 10, }} onClick={() => { this.lotterySuccess = false; this.winning = undefined; }}><FA name="times-circle-o" /></div>
                            {
                                remainingNumOfDraws === 0 && this.winning === undefined
                                    ? <div className="pt-2">
                                        <div className="text-warning"><FA name='frown-o' size='2x' /></div>
                                        您的抽奖机会用完了！
                                    </div>
                                    : <div className="align-self-center bg-white rounded-lg  pt-3 text-center">
                                        <div>恭喜您</div>
                                        <div>获得-----</div>
                                        <div className="py-5">展示</div>
                                        <div className='small mt-2'>可以到我的奖品中去查看</div>
                                    </div>
                            }
                        </div>
                    </div>
                    : null
            }
        </Page >
    })
}