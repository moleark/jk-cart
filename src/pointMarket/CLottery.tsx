/* eslint-disable */
import { CUqBase } from 'tapp/CBase';
import { VLottery } from './VLottery';
import { observable } from 'mobx';
import { VMyLotteryPrize } from './VMyLotteryPrize';
import { VMyPrizeExchangeOrder } from './VExchangeOrder';
import { prizeOrder, prizeOrderItem } from './prizeOrder';

export class CLottery extends CUqBase {
    @observable lotteryProducts: any[] = [];        /* 抽奖产品列表 */
    @observable remainingNumOfDraws: number = 1;    /* 剩余抽奖次数 */
    @observable productsLib: any[] = [];            /* 抽奖产品集合（加概率） */
    @observable myPrizeLib: any[] = [];             /* 我的奖品 */
    @observable totalNumPrizes: number = 10000;      /* 奖品总量 */
    @observable prizeOrderData: prizeOrder = new prizeOrder();

    async internalStart(param?: any) { }

    /**
     * 抽奖界面
     */
    openLotteryProduct = async () => {
        await this.getLotteryProducts();
        await this.getLotteryNumOfDraws();
        this.basedChanceHandlePrizes();
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
    * 奖品领取预览界面
    */
    openMyPrizeOrder = async () => {
        let { cPointProduct } = this.cApp;
        if (this.prizeOrderData.shippingContact === undefined) {
            this.prizeOrderData.shippingContact = await cPointProduct.getDefaultShippingContact();
        }
        this.openVPage(VMyPrizeExchangeOrder);
    }

    /**
     * 中奖获得的产品
     */
    winningProduct = async (winning: any) => {
        console.log('winning', winning);
        await this.addMyPrize(winning);
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
    getLotteryProducts = async () => {//PR
        // this.lotteryProducts = await this.uqs.积分商城.
        this.lotteryProducts = [
            { id: 1, content: '111', p: '1', PR: 15 },
            { id: 2, content: '222', p: '4', PR: 20 },
            { id: 3, content: '333', p: '5', PR: 5 },
            { id: 4, content: '444', p: '1', PR: 10 },
            { id: 5, content: '555', p: '1', PR: 10 },
            { id: 6, content: '666', p: '8', PR: 20 },
            { id: 7, content: '777', p: '2', PR: 5 },
            { id: 8, content: '888', p: '7', PR: 15 },
        ];
    }

    /**
     * 据概率处理抽奖商品
     */
    basedChanceHandlePrizes = () => {
        let arr = [], minPrice = this.lotteryProducts[0];
        for (let key of this.lotteryProducts) {
            if (minPrice.p >= key.p && minPrice.PR > key.PR) minPrice = key;
            let base = key.PR * this.totalNumPrizes / 100;
            arr.push(Array.from(Array(base), (v, k) => { return { productId: key.id, content: key.content } }));
        }
        let shift = arr.flat();
        this.productsLib = shift;
        let total = this.productsLib.length;

        if (total !== this.totalNumPrizes) {
            for (let i = 0; i < (this.totalNumPrizes - total); i++)  //找8个商品中价值最小的
                this.productsLib.push({ productId: minPrice.id, content: minPrice.content });//productId 暂未定
        }

        //乱序
        let { length } = this.productsLib, i;
        while (length) {
            i = (Math.random() * length--) >>> 0;
            [this.productsLib[length], this.productsLib[i]] = [this.productsLib[i], this.productsLib[length]]
        }

        this.lotteryProducts.splice(this.lotteryProducts.length / 2, 0, {}); // 九宫格 使用
    }

    /**
     * 抽中的产品添加至我的奖品列表   ------------------ 需uq 
     */
    addMyPrize = async (prize: any) => {
        // await this.uqs.积分商城
    }

    /**
     * 获取我的奖品
     */
    getMyPrizes = async () => {
        this.myPrizeLib = [];
        // await this.uqs.积分商城
    }

    private createOrderFromCart = async () => {
        let { currentUser, currentSalesRegion } = this.cApp;
        this.prizeOrderData.webUser = currentUser.id;
        this.prizeOrderData.salesRegion = currentSalesRegion.id;
        if (currentUser.currentCustomer !== undefined) {
            this.prizeOrderData.customer = currentUser.currentCustomer.id;
        }

        /* if (this.myPrizeLib !== undefined && this.myPrizeLib.length > 0) {
            this.prizeOrderData.exchangeItems = this.myPrizeLib.map((e: any) => {
                if (e.quantity > 0) {
                    var item = new prizeOrderItem();
                    item.product = e.id;
                    item.pack = e.pack;
                    item.quantity = e.quantity;
                    item.point = e.point;
                    return item;
                }
            });
        } */
    }

    /**
     * 确认领取(成功 VMyPrizeExchangeOrder 确认使用此函数)
     */
    submitOrder = async () => {
        this.createOrderFromCart();
        console.log(this.prizeOrderData);

        // let PointExchangeSheet = this.uqs.积分商城.PointExchangeSheet;
        // let getDataForSave = this.orderData.getDataForSave();
        // let result: any = await PointExchangeSheet.save("PointExchangeSheet", getDataForSave);
        // let { id, flow, state } = result;
        // await PointExchangeSheet.action(id, flow, state, "submit");


        // 打开下单成功显示界面
        // nav.popTo(this.cApp.topKey);
        // this.openVPage(OrderSuccess, result);
    }

    onSelectShippingContact = async () => {
        let { cPointProduct } = this.cApp;
        this.prizeOrderData.shippingContact = await cPointProduct.selectContact()
    }
}
