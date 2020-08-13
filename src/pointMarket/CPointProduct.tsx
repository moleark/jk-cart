import { BoxId, RowContext, nav, User, QueryPager } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VPointProduct, VSelectedPointProduct } from 'pointMarket/VPointProduct';
import { VExchangeOrder } from './VExchangeOrder';
import { VMyPoint } from './VMyPoint';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { OrderSuccess } from './OrderSuccess';
import { pointOrder, OrderItem } from './pointOrder';
import { VExchangeHistoryDetail } from './VExchangeHistoryDetail';
import { VExchangeHistory } from './VExchangeHistory';
import { VPlatformOrderPoint } from './VPlatformOrderPoint';
import { VPointDetails } from './VPointDetails';
import { VPointSign } from './VPointSign';
import { VRevenueExpenditure } from './VRevenueExpenditure';
import { VPointProductDetail } from './VPointProductDetail';
import { VSelectedLable } from './VSelectedLable';

export class CPointProduct extends CUqBase {

    @observable myPoints: any[] = [];              /*我的积分 */
    @observable myEffectivePoints: number = 0;            /*我的积分(计算后) */
    @observable myTotalPoints: number = 0;            /*我的积分(计算后) */
    @observable myPointTobeExpired: number = 0;        /*我的快过期积分 */
    @observable signinval: number = 3;              /* 签到可领积分 */
    @observable pointProducts: any[] = [];          /*可兑产品列表 */
    @observable pointProductRecommend: any[] = [];          /* 新品推荐 */
    @observable pointProductHot: any[] = [];          /* 热门产品 */
    @observable pointProductsSelected: any[] = [];  /*已选择产品列表 */
    @observable pointToExchanging: number = 0;              /*将要兑换的积分总计 */
    @observable orderData: pointOrder = new pointOrder();   /*正在提交的产品列表*/
    @observable couponId: number;                   /*积分码 */
    @observable platformOrderId: any;               /*平台合同号 */
    @observable platformOrder: any[] = [];          /*平台合同 */
    @observable pagePointHistory: QueryPager<any>;   /*积分详情 */
    @observable IsSignin: boolean = false;
    @observable signinPageHistory: QueryPager<any>;
    @observable pointProductGenre: any[] = [];    /* 产品类型列表 */

    pointInterval: any = { startPoint: 0, endPoint: 10000 };

    protected async internalStart(param?: any) {
        await this.getPointHistory();   /*获取积分记录*/
        await this.refreshMypoint();
        await this.isSignined();       /* 是否签到 */
        await this.getSigninHistory();  /* 签到记录 */
        await this.getPointProductGenre(); /* 获取产品类型 */
        await this.getPointProductRecommend();  /* 获取新品推荐 */
        await this.getPointProductHot();    /* 获取热门产品 */
        this.openVPage(VMyPoint);
    }


    refreshMypoint = async () => {
        let { currentUser } = this.cApp;
        this.myPoints = await currentUser.getPoints();
        this.myEffectivePoints = this.myPoints.reduce((v, e) => { return v + e.effectiveLeftPoint }, 0);
        this.myTotalPoints = this.myPoints.reduce((v, e) => { return v + e.totalLeftPoint }, 0)
        let date = new Date();
        let dateYear = date.getFullYear();
        this.myPointTobeExpired = this.myPoints.reduce((v, e) => { return v + ((dateYear - e.pointYear) > 1 ? e.effectiveLeftPoint : 0) }, 0);
    }

    /**
     * 可兑换产品页面
     */
    openPointProduct = async (name?: any) => {
        this.initPointProducts();
        this.openVPage(VPointProduct, name);
    }

    /**
     * 积分管理页面
     */
    openMyPoint = () => {
        this.clearSelectedPointsProducts();
    }

    /**
     * 清空选择的积分产品  
     */
    clearSelectedPointsProducts = () => {
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointToExchanging = 0;
    }

    /**
     * 初始化可兑换产品列表
     */
    initPointProducts = () => {
        if (this.pointProductsSelected.length) {
            for (let i of this.pointProductsSelected) {
                this.pointProducts.forEach((el: any) => {
                    if (i.product.id === el.product.id) el.quantity = i.quantity;
                });
            }
        }
    }

    /**
     * 可兑换产品的详情 -------------------html片段渲染 等待界面设计----------------
     */
    openPointProductDetail = async (pointProduct: any) => {
        this.openVPage(VPointProductDetail);
    }

    /**
     * 积分收支明细页面
     */
    openRevenueExpenditure = async (topic?: any) => {
        this.openVPage(VRevenueExpenditure, topic)
    }

    /**
     * 积分兑换记录
     */
    openExchangeHistory = async () => {
        let promises: PromiseLike<any>[] = [];
        promises.push(this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -10));
        promises.push(this.uqs.积分商城.PointExchangeSheet.mySheets("#", 1, -100));
        let presult = await Promise.all(promises);
        let exchangeHistory = presult[0].concat(presult[1]);
        this.openVPage(VExchangeHistory, exchangeHistory);
    }

    /*领取积分 */
    openPointDrawing = async (credits?: string) => {
        /* 
        let lastPlatformId = await this.getLastPlatformOrder();
        if (lastPlatformId)
            this.platformOrder = await this.getPlatFormOrder(this.platformOrderId);
        */
        this.openVPage(VPlatformOrderPoint, credits);
    }

    openExchangeOrder = async () => {
        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = await this.getDefaultShippingContact();
        }
        this.openVPage(VExchangeOrder);
    }

    openOrderDetail = async (orderId: number) => {
        let order = await this.uqs.积分商城.PointExchangeSheet.getSheet(orderId);
        this.openVPage(VExchangeHistoryDetail, order);
    }

    /* 展示 积分详情*/
    pointDetails = async () => {
        this.getPointHistory();
        this.openVPage(VPointDetails);
    }

    /**
     * 已选择的可兑换产品图标
     */
    renderSelectedLable() {
        return this.renderView(VSelectedLable);
    }

    /**
     * 已选择的可兑换产品页面
     */
    showSelectedPointProduct = async () => {
        this.openVPage(VSelectedPointProduct);
    }

    /**
     * 获取积分详情的数据
     */
    getPointHistory = () => {
        this.pagePointHistory = new QueryPager(this.uqs.积分商城.GetPointHistory, 15, 30);
        this.pagePointHistory.first({ key: "" });
    }

    /**
     * 签到
     */
    openPointSign = async () => {
        if (this.IsSignin)
            await this.addSigninSheet(47, this.signinval);
        this.openVPage(VPointSign)
    }

    /**
     * 签到添加积分到
     */
    addSigninSheet = async (customer: any, amount: any) => {
        let { Signin } = this.uqs.积分商城;
        customer = this.cApp.currentUser.currentCustomer;
        customer = customer ? customer : this.user.id;
        await Signin.submit({ webuser: this.user.id, customer: customer, amount: amount });
        await this.getSigninHistory();
        // await this.getPointHistory();

        /**
        let result: any = await SigninSheet.save("SigninSheet", { customer: customer, amount: amount });
        console.log(this.cApp.currentUser);
        let { id, flow, state } = result;
        await SigninSheet.action(id, flow, state, "submit");
        await Signin.submit({ webbuser: 47, customer: 47, amount: 3 });
        **/
    }

    /**
     * 是否签到
     */
    isSignined = async () => {
        let { checkIsSignin } = this.uqs.积分商城;
        let res = await checkIsSignin.obj({});
        this.IsSignin = res.result === 0 ? true : false;
    }

    /**
     * 获取产品类型
     */
    getPointProductGenre = async () => {
        let { Genre } = this.uqs.积分商城;
        this.pointProductGenre = await Genre.all();
    }

    /**
     * 获取签到记录
     */
    getSigninHistory = async () => {
        this.signinPageHistory = new QueryPager(this.uqs.积分商城.GetPointSigninHistory, 15, 30);
        this.signinPageHistory.first({});
    }

    /* renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    } */

    /**
     * 获取可兑换产品(据 分类、新品推荐、热门产品)
     */
    getPointProductByDifferentPlot = async (plot: any) => {
        let state = plot.name ? '分类' : plot;
        console.log(this.uqs.积分商城);

        switch (state) {
            case '分类':
                await this.filterByProductGenre(plot);
                break;
            case '新品推荐':
                await this.getPointProductRecommend();
                break;
            case '热门产品':
                await this.getPointProductHot();
                break;
            default:
                break;
        }
        this.initPointProducts();
    }

    /**
     * 据类型筛选商品  ----------------------------需uq -------------------------------- 
     */
    filterByProductGenre = async (currentGenre: any) => {
        let pointProductByCurrentGenre = await this.uqs.积分商城.PointProductGenre.table({ genre: currentGenre });
        let filterPointProducts = [];
        if (pointProductByCurrentGenre.length) {
            for (let key of pointProductByCurrentGenre) {
                let searchpointProductByKey = await this.getSpecifyPointProduct({ product: key.product, pack: key.pack });
                filterPointProducts.push(searchpointProductByKey);
            }
        }
        this.pointProducts = filterPointProducts;
    }

    /**
     * 获取指定的可兑换商品信息
     */
    getSpecifyPointProduct = async (productInfo: any) => {
        let { product, pack } = productInfo;
        return await this.uqs.积分商城.PointProduct.obj({ product, pack });
    }

    /**
     * 获取新品推荐的产品
     */
    getPointProductRecommend = async () => {
        this.pointProductRecommend = [];
    }

    /**
     * 获取热门产品
     */
    getPointProductHot = async () => {
        this.pointProductHot = [];
    }

    /**
     * 获取积分区间的积分产品
     */
    getPointsIntervalProducts = async (state: any) => {
        switch (state) {
            case 'below':
                this.pointInterval = { startPoint: 0, endPoint: 10000 };
                break;
            case 'firstLevel':
                this.pointInterval = { startPoint: 10000, endPoint: 50000 };
                break;
            case 'twoLevel':
                this.pointInterval = { startPoint: 50000, endPoint: 150000 };
                break;
            case 'above':
                this.pointInterval = { startPoint: 150000, endPoint: Infinity };
                break;
            default:
                break;
        }
        this.pointProducts = await this.getPointsProducts();
        this.initPointProducts();
        return this.pointProducts;
    }

    /**
     * 获取积分商城产品
     */
    getPointsProducts = async () => {
        return await this.uqs.积分商城.GetPointProduct.table(this.pointInterval);
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let IsContain = 0;
        let nowQuantity = value - (prev ? prev : 0);

        this.pointToExchanging = this.pointToExchanging + (data.point * nowQuantity);
        // if (this.pointToExchanging <= 0) this.pointToExchanging = 0;
        this.pointProducts.forEach((el: any) => {
            if (el.quantity === undefined) el.quantity = 0;
            if (data.product.id === el.product.id) el.quantity += nowQuantity;
        });

        this.pointProductsSelected.forEach(element => {
            if (element.pack.id === data.pack.id) {
                element.quantity = element.quantity + nowQuantity;
                IsContain = IsContain + 1;
            }
        });
        if (IsContain === 0) {
            this.pointProductsSelected.push(data);
        }
    }

    private createOrderFromCart = async () => {
        let { currentUser, currentSalesRegion } = this.cApp;
        this.orderData.webUser = currentUser.id;
        this.orderData.salesRegion = currentSalesRegion.id;
        if (currentUser.currentCustomer !== undefined) {
            this.orderData.customer = currentUser.currentCustomer.id;
        }
        if (this.pointProductsSelected !== undefined && this.pointProductsSelected.length > 0) {
            this.orderData.exchangeItems = this.pointProductsSelected.map((e: any) => {
                if (e.quantity > 0) {
                    var item = new OrderItem();
                    item.product = e.product;
                    item.pack = e.pack;
                    item.quantity = e.quantity;
                    item.point = e.point;
                    return item;
                }
            });
        }
    }

    /**
     * 生成兑换单兑换积分
     */
    submitOrder = async () => {
        this.createOrderFromCart();

        let PointExchangeSheet = this.uqs.积分商城.PointExchangeSheet;
        let getDataForSave = this.orderData.getDataForSave();
        let result: any = await PointExchangeSheet.save("PointExchangeSheet", getDataForSave);
        let { id, flow, state } = result;
        await PointExchangeSheet.action(id, flow, state, "submit");

        //暂时扣除已经兑换的积分;
        this.myEffectivePoints = this.myEffectivePoints - this.pointToExchanging;
        this.myTotalPoints = this.myTotalPoints - this.pointToExchanging;
        if (this.pointToExchanging > this.myPointTobeExpired) {
            this.myPointTobeExpired = 0;
        } else {
            this.myPointTobeExpired = this.myPointTobeExpired - this.pointToExchanging;
        }

        //兑换后清空选择的积分产品
        // this.orderData.exchangeItems = undefined;
        // this.pointProductsSelected.length = 0;
        // this.pointToExchanging = 0;
        this.clearSelectedPointsProducts();

        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    /**
     * 获取当前webuser对应customer的最近一个订单 TODO:delete
     */
    getLastPlatformOrder = async () => {

        let { currentCustomer } = this.cApp.currentUser;
        let validationResult = await this.uqs.积分商城.GetLastPlatFormOrder.submit({ customer: currentCustomer && currentCustomer.id });
        let { platformOrderId } = validationResult;
        this.platformOrderId = validationResult.platformOrderId;
        return platformOrderId;
    }

    getPlatFormOrder = async (platformOrderId: string) => {
        return await this.uqs.积分商城.GetPlatFormOrder.table({ platformOrderId: platformOrderId });
    }

    IsCouponCanUse = async (couponCode: string) => {
        this.couponId = 0;
        let { currentUser } = this.cApp;
        let { salesTask } = this.uqs;
        let validationResult = await salesTask.IsCanUseCoupon.submit({ code: couponCode, webUser: currentUser && currentUser.id });

        let { result, id, types } = validationResult;
        if (result === 1) {
            this.couponId = id;
            if (types !== 'credits')
                result = 0;
        }
        return result;
    }

    /**
     * 领取积分码 TODO:delete
     */
    receivePoint = async (orderId: string) => {
        let { currentCustomer } = this.cApp.currentUser;
        let { AddPlatformOrderPoint } = this.uqs.积分商城;
        let result = await AddPlatformOrderPoint.submit({ orderId: orderId, couponId: this.couponId, customer: currentCustomer && currentCustomer.id });
        let rtn = result.result;

        return rtn;
    }

    private openMeInfoOptions: any;
    /**
     * 检查客户信息是否完善（不完善需补充完善后方可领取积分）
     */
    userInfoCompletedChecking = (options: any): boolean => {

        if (!this.isLogined) {
            this.openMeInfoOptions = options;
            nav.showLogin(this.loginCallback, true);
            return false;
        } else {
            let { cMe, currentUser } = this.cApp;
            if (!currentUser.allowOrdering) {
                cMe.openMeInfoFirstOrder(options);
                return false;
            }
            return true;
        }
    }

    private loginCallback = async (user: User): Promise<void> => {
        let { cApp } = this;
        await cApp.currentUser.setUser(user);
        await cApp.loginCallBack(user);
        this.closePage(1);

        let { cMe, currentUser } = this.cApp;
        if (!currentUser.allowOrdering) {
            cMe.openMeInfoFirstOrder(this.openMeInfoOptions);
        }
    };


    /**
     * TODO: delete
     */
    addUsedCoupon = async () => {
        let { AddUsedCoupon } = this.uqs.积分商城;
        let result = await AddUsedCoupon.submit({ couponId: this.couponId });
        let rtn = result.result;
        return rtn;
    }

    private defaultSetting: any;
    private async getDefaultSetting() {
        if (this.defaultSetting) return this.defaultSetting;
        let { currentUser } = this.cApp;
        return this.defaultSetting = await currentUser.getSetting() || {};
    }
    private contact0: BoxId;
    private async getContact(): Promise<BoxId> {
        if (this.contact0 === null) return;
        if (this.contact0 !== undefined) return this.contact0;
        let { currentUser } = this.cApp;
        let contactArr = await currentUser.getContacts();
        if (contactArr === undefined || contactArr.length === 0) {
            this.contact0 = null;
            return;
        }
        return this.contact0 = contactArr[0].contact;
    }
    private async getDefaultShippingContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.shippingContact || await this.getContact();
    }

    onSelectShippingContact = async () => {
        let cSelect = this.newC(CSelectShippingContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.shippingContact = contactBox;
    }
}