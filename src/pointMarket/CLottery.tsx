import { CUqBase } from 'CBase';
import { VLottery } from './VLottery';
import { observable } from 'mobx';
import { VMyLotteryPrize } from './VMyLotteryPrize';
import { VMyPrizeExchangeOrder } from './VExchangeOrder';

export class CLottery extends CUqBase {
    @observable lotteryProducts: any[] = [];        /* 抽奖产品列表 */
    @observable remainingNumOfDraws: number = 1;    /* 剩余抽奖次数 */
    @observable productsLib: any[] = [];            /* 抽奖产品集合（加概率） */
    @observable myPrizeLib: any[] = [];            /* 我的奖品 */
    async internalStart(param?: any) {
        await this.getLotteryProducts();
        this.openVPage(VLottery);
    }

    /**
     * 抽奖界面
     */
    openLotteryProduct = async () => {
        await this.getLotteryProducts();
        await this.getLotteryNumOfDraws();
        this.openVPage(VLottery);
    }

    /**
     * 我的奖品界面
     */
    openMyLotteryPrize = async () => {
        await this.getMyPrizes();
        this.openVPage(VMyLotteryPrize);
    }

    /**
    * 奖品领取界面
    */
    openMyPrizeOrder = async () => {
        let { cPointProduct } = this.cApp;
        await cPointProduct.openMyPrizeOrder();
    }


    /**
     * 中奖获得的产品
     */
    winningProduct = async (winning: any) => {
        console.log('winning', winning);
    }

    /**
     * 抽奖次数递减
     */
    decreasingNumberOfDraws = async () => {
        this.remainingNumOfDraws -= 1;
        // await this.uqs.积分商城.
    }

    /**
     * 获取可抽奖次数
     */
    getLotteryNumOfDraws = async () => {
        // this.remainingNumOfDraws = await this.uqs.积分商城.
    }

    /**
     * 获取抽奖产品列表
     */
    getLotteryProducts = async () => {
        // this.lotteryProducts = await this.uqs.积分商城.
        this.lotteryProducts = [
            { id: 1, content: '111', num: 50 },
            { id: 2, content: '222', num: 1 },
            { id: 3, content: '333', num: 100 },
            { id: 4, content: '444', num: 20 },
            { id: 5, content: '555', num: 40 },
            { id: 6, content: '666', num: 10 },
            { id: 7, content: '777', num: 5 },
            { id: 8, content: '888', num: 90 },
        ];
        for (let key of this.lotteryProducts) {
            for (let i = 0; i < key.num; i++) {
                this.productsLib.push({ productId: key.id, content: key.content })
            }
        }
        // 乱序
        let { length } = this.productsLib, i;
        while (length) {
            i = (Math.random() * length--) >>> 0;
            [this.productsLib[length], this.productsLib[i]] = [this.productsLib[i], this.productsLib[length]]
        }

        this.lotteryProducts.splice(this.lotteryProducts.length / 2, 0, {}); // 九宫格 使用
    }

    /**
     * 获取我的奖品
     */
    getMyPrizes = async () => {

    }
}
