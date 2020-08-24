import { CUqBase } from 'CBase';
import { VLottery } from './VLottery';
import { observable } from 'mobx';

export class CLottery extends CUqBase {
    @observable lotteryProducts: any[] = [];        /* 抽奖产品列表 */
    @observable remainingNumOfDraws: number = 0;    /* 剩余抽奖次数 */
    async internalStart(param?: any) {
        await this.getLotteryProducts();
        this.openVPage(VLottery);
    }

    /**
     * 抽奖界面
     */
    openLotteryProduct = async () => {
        await this.getLotteryProducts();
        this.openVPage(VLottery);
    }

    /**
     * 获取抽奖产品列表
     */
    getLotteryProducts = async () => {
        this.lotteryProducts = [];
    }
}
