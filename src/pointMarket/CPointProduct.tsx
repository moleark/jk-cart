import { BoxId, RowContext, nav, User, QueryPager } from 'tonva';
import { CUqBase } from 'tapp/CBase';
import { observable } from 'mobx';
import { VPointProduct, VSelectedPointProduct } from 'pointMarket/VPointProduct';
import { VExchangeOrder } from './VExchangeOrder';
import { VMyPoint } from './VMyPoint';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { OrderSuccess } from './OrderSuccess';
import { pointOrder, OrderItem } from './pointOrder';
import { VExchangeHistoryDetail } from './VExchangeHistoryDetail';
import { VExchangeHistory } from './VExchangeHistory';
import { VRevenueExpenditure } from './VRevenueExpenditure';
import { VPointProductDetail } from './VPointProductDetail';
import { VSelectedLable } from './VSelectedLable';
import { GLOABLE } from 'cartenv';
import { VDefaultPost } from './VDefaultPost';

export const topicClump = {
    productGenre: '产品分类',
    newRecommend: '新品推荐',
    hotProduct: '热门产品',
}

export const OrderSource = {
    EXCHANGEORDER: '兑换订单',
    PRIZEORDER: '奖品订单',
}

export class CPointProduct extends CUqBase {

    @observable myPoints: any[] = [];                  /* 我的积分 */
    @observable myEffectivePoints: number = 0;         /* 我的积分(计算后) */
    @observable myTotalPoints: number = 0;             /* 我的积分(计算后) */
    @observable myPointTobeExpired: number = 0;        /* 我的快过期积分 */

    @observable pointProducts: any[] = [];             /* 可兑产品列表 */
    @observable newPointProducts: any[] = [];          /* 新品推荐 */
    @observable hotPointProducts: any[] = [];          /* 热门产品 */
    @observable pointProductsSelected: any[] = [];     /* 已选择产品列表 */
    @observable pointProductsDetail: any;              /* 详情产品 */
    @observable pointToExchanging: number = 0;              /* 将要兑换的积分总计 */
    @observable orderData: pointOrder = new pointOrder();   /* 正在提交的产品列表*/
    @observable couponId: number;                      /* 积分码 */
    @observable platformOrderId: any;                  /* 平台合同号 */
    @observable platformOrder: any[] = [];             /* 平台合同 */
    @observable pagePointHistory: QueryPager<any>;     /* 积分详情 */
    @observable pointProductGenre: any[] = [];         /* 产品类型列表 */

    pointInterval: any = { startPoint: 0, endPoint: 10000 };

    protected async internalStart(param?: any) { }

    /**
     * 刷新积分
     */
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
     * 初始化可兑换产品列表(暂时弃用)
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
     * 清空选择的积分产品  
     */
    clearSelectedPointsProducts = () => {
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointToExchanging = 0;
    }

    /**
     * 积分管理页面
     */
    openMyPoint = async (param?: any) => {
        await this.refreshMypoint();        /* 刷新积分 */
        await this.getPointProductGenre();  /* 获取产品类型 */
        this.newPointProducts = await this.getNewPointProducts();    /* 获取新品推荐 */
        this.hotPointProducts = await this.getHotPointProducts();    /* 获取热门产品 */
        this.openVPage(VMyPoint);
    }

    /**
     * 可兑换产品页面
     */
    openPointProduct = async (name?: any) => {
        // this.initPointProducts();
        this.openVPage(VPointProduct, name);
    }

    /**
     * 可兑换产品的详情(可生成浏览量)
     */
    openPointProductDetail = async (pointProduct: any) => {
        this.pointProductsDetail = pointProduct;
        if (this.pointProductsSelected.length) {
            for (let i of this.pointProductsSelected) {
                if (pointProduct.product.id === i.product.id)
                    this.pointProductsDetail.quantity = i.quantity;
            }
        } else
            this.pointProductsDetail.quantity = 0;
        // this.pointProductsDetail.htmlFragment = await this.getPointProductDetailFragment(this.pointProductsDetail);
        await this.setPointProductVisits(pointProduct.product.obj);//生成浏览量
        this.openVPage(VPointProductDetail);
    }

    /**
     * 获取积分商品详情的html片段(编译后)
     */
    getPointProductDetailFragment = async (pointProduct: any) => {
        // this.pointProductsDetail.htmlFragment = '<div style="color:red;text-align:center;margin-top:2rem;">帖文 待开发</div>';
        let result = await window.fetch(GLOABLE.CONTENTSITE + '/partial/pointproductdetail/' + pointProduct.product.id);
        if (result.ok) {
            let content = await result.text();
            return content;
        } else {
            return '';
        }
    }

    /**
     * 积分收支明细页面
     */
    openRevenueExpenditure = async (topic?: any) => {
        await this.getPointHistory();
        this.openVPage(VRevenueExpenditure, topic)
    }

    /**
     * 积分兑换记录页面
     */
    openExchangeHistory = async () => {
        let promises: PromiseLike<any>[] = [
			this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -10),
			this.uqs.积分商城.PointExchangeSheet.mySheets("#", 1, -100)
		];
        let presult = await Promise.all(promises);
        let exchangeHistory = presult[0].concat(presult[1]);
        this.openVPage(VExchangeHistory, exchangeHistory);
    }

    /**
     * 历史兑换单详情页面
     */
    openOrderDetail = async (orderId: number) => {
        let order = await this.uqs.积分商城.PointExchangeSheet.getSheet(orderId);
        this.openVPage(VExchangeHistoryDetail, order);
    }

    /**
     * 已选择的可兑换产品页面
     */
    openSelectedPointProduct = async () => {
        this.openVPage(VSelectedPointProduct);
    }

    /**
     * 确认兑换订单预览页面
     */
    openExchangeOrder = async () => {
        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = await this.getDefaultShippingContact();
        }
        this.pointProductsSelected = this.pointProductsSelected.filter(v => v.quantity !== 0);
        this.openVPage(VExchangeOrder);
    }

    /**
     * 已选择的可兑换产品图标
     */
    renderSelectedLable() {
        return this.renderView(VSelectedLable);
    }

    /**
     * 默认帖文
     */
    renderVDefaultPost() {
        return this.renderView(VDefaultPost);
    }

    // /*领取积分 */
    // openPointDrawing = async (credits?: string) => {
    //     /* 
    //     let lastPlatformId = await this.getLastPlatformOrder();
    //     if (lastPlatformId)
    //         this.platformOrder = await this.getPlatFormOrder(this.platformOrderId);
    //     */
    //     this.openVPage(VPlatformOrderPoint, credits);
    // }

    /* 展示 积分详情*/
    /* pointDetails = async () => {
        this.getPointHistory();
        this.openVPage(VPointDetails);
    } */

    /**
     * 浏览商品(数据埋点,生产浏览量PV)
     */
    setPointProductVisits = async (pointProduct: any) => {
        return this.uqs.积分商城.SetPointProductVisits.submit({ pointProduct });
    }

    /**
     * 获取产品类型
     */
    getPointProductGenre = async () => {
        let { Genre } = this.uqs.积分商城;
        this.pointProductGenre = await Genre.all();
    }

    /**
     * 获取积分详情的数据
     */
    getPointHistory = () => {
        this.pagePointHistory = new QueryPager(this.uqs.积分商城.GetPointHistory, 15, 30);
        this.pagePointHistory.first({ key: "" });
    }

    /**
     * 获取可兑换产品(据 分类、新品推荐、热门产品)
     */
    getPointProductByDifferentPlot = async (plot: any) => {
        let { productGenre, newRecommend, hotProduct } = topicClump;
        let state = typeof plot === 'object' && this.pointProductGenre.some((v) => v.name === plot.name) ? productGenre : plot;
        switch (state) {
            case productGenre:
                this.pointProducts = await this.filterByProductGenre(plot);
                break;
            case newRecommend:
                this.pointProducts = await this.getNewPointProducts();
                break;
            case hotProduct:
                this.pointProducts = await this.getHotPointProducts();
                break;
            default:
                break;
        }
        // this.initPointProducts();
    }

    /**
     * 据类型筛选商品
     */
    filterByProductGenre = async (currentGenre: any) => {
        let pointProductFromGenre = await this.getProductsFromGenre(currentGenre);
        return pointProductFromGenre.map((v) => { return { genre: v.genre, product: v.pointProduct } });
    }

    /**
     * 获取指定分类所属的商品
     */
    getProductsFromGenre = async (genre: any) => {
        return await this.uqs.积分商城.PointProductGenre.table({ genre, pointproduct: undefined });
    }

    /**
     * 获取新品推荐的产品
     */
    getNewPointProducts = async () => {
        let result = await this.uqs.积分商城.GetNewPointProducts.table({});
        return result.sort((a,b)=>a.point-b.point).map((v) => { return { product: v.id } });
    }

    /**
     * 获取热门产品
     */
    getHotPointProducts = async () => {
        let result = await this.uqs.积分商城.GetHotPointProducts.table({});
        return result.sort((a,b)=>a.point-b.point).map((v) => { return { product: v.id } });
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
        // this.initPointProducts();
        return this.pointProducts;
    }

    /**
     * 获取积分商城产品(积分划分)
     */
    getPointsProducts = async () => {
        return await this.uqs.积分商城.GetPointProduct.table(this.pointInterval);
    }

    /**
     * 获取商品源（兑换下单可用）
     */
    getProductSources = async (pointProduct: any) => {
        return await this.uqs.积分商城.PointProductSource.obj({ pointProduct, sourceId: undefined });
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let IsContain = 0;
        let nowQuantity = value - (prev ? prev : 0);

        // 当前产品详情的数量
        this.pointProductsDetail.quantity = value;
        // this.pointToExchanging = this.pointToExchanging + (data.point * nowQuantity);
        this.pointToExchanging = this.pointToExchanging + (data.product.obj.point * nowQuantity);
        this.pointProductsSelected.forEach(element => {
            if (element.product.id === data.product.id) {
                element.quantity = element.quantity + nowQuantity;
                IsContain = IsContain + 1;
            }
        });
        if (IsContain === 0) {
            data.point = data.product.obj.point;
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
                    // item.pack = e.pack;
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
        /* this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointToExchanging = 0; */
        this.clearSelectedPointsProducts();

        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    /**
     * 获取当前webuser对应customer的最近一个订单 TODO:delete
    getLastPlatformOrder = async () => {

        let { currentCustomer } = this.cApp.currentUser;
        let validationResult = await this.uqs.积分商城.GetLastPlatFormOrder.submit({ customer: currentCustomer && currentCustomer.id });
        let { platformOrderId } = validationResult;
        this.platformOrderId = validationResult.platformOrderId;
        return platformOrderId;
    }
    */

    /*
    getPlatFormOrder = async (platformOrderId: string) => {
        return await this.uqs.积分商城.GetPlatFormOrder.table({ platformOrderId: platformOrderId });
    }
    */

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
    receivePoint = async (orderId: string) => {
        let { currentCustomer } = this.cApp.currentUser;
        let { AddPlatformOrderPoint } = this.uqs.积分商城;
        let result = await AddPlatformOrderPoint.submit({ orderId: orderId, couponId: this.couponId, customer: currentCustomer && currentCustomer.id });
        let rtn = result.result;

        return rtn;
    }
    */

    private openMeInfoOptions: any;
    /**
     * 检查客户信息是否完善（不完善需补充完善后方可领取积分）
     */
    userInfoCompletedChecking = async (options: any): Promise<boolean> => {
		await this.cApp.assureLogin();
		let { cMe, currentUser } = this.cApp;
		if (!currentUser.allowOrdering) {
			cMe.openMeInfoFirstOrder(options);
			return false;
		}
		return true;
		/*
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
		*/
    }
	/*
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
	*/
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
    async getDefaultShippingContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.shippingContact || await this.getContact();
    }

    selectContact = async () => {
        let cSelect = this.newC(CSelectShippingContact);
        let contactBox = await cSelect.call<BoxId>(true);
        return contactBox;
    }

    onSelectShippingContact = async () => {
        this.orderData.shippingContact = await this.selectContact()
    }
}