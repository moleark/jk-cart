import * as React from 'react';
import { BoxId, RowContext, nav, User, QueryPager } from "tonva-react";
import { CUqBase } from 'CBase';
import { observable, makeObservable } from 'mobx';
import { VPointProduct, VSelectedPointProduct } from 'pointMarket/VPointProduct';
import { VExchangeOrder } from './VExchangeOrder';
import { VMyPoint } from './VMyPoint';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { OrderSuccess } from './OrderSuccess';
import { pointOrder, OrderItem } from './pointOrder';
import { VExchangeHistoryDetail } from './VExchangeHistoryDetail';
import { VExchangeHistory } from './VExchangeHistory';
// import { VPlatformOrderPoint } from './VPlatformOrderPoint';
import { VRevenueExpenditure } from './VRevenueExpenditure';
import { VPointProductDetail } from './VPointProductDetail';
import { VSelectedLable } from './VSelectedLable';
import { GLOABLE } from 'cartenv';
import { VDefaultPost } from './VDefaultPost';
import moment from 'moment';
import { VPointDoubt } from './VPointDoubt';
import { VExchangeOrderTrack } from './VExchangeOrderTrack';
import { FetchPost } from 'tools/wFeatch';
import { CApp } from 'CApp';

export const topicClump = {
    productGenre: '产品分类',
    newRecommend: '新品推荐',
    hotProduct: '热门产品',
}

export const OrderSource = {
    EXCHANGEORDER: '兑换订单',
    PRIZEORDER: '奖品订单',
}

export const PointIntervals: { [state: string]: any } = {
    'below': { startPoint: 0, endPoint: 10000 },
    'firstLevel': { startPoint: 10000, endPoint: 50000 },
    'twoLevel': { startPoint: 50000, endPoint: 150000 },
    'above': { startPoint: 150000, endPoint: Infinity },
}

export const PointProductDetailLevel = {
    DIRECT: 3,
    INDIRECT: 4,
}

export class CPointProduct extends CUqBase {

    myPoints: any[] = [];                  /* 我的积分 */
    myEffectivePoints: number = 0;         /* 我的积分(计算后) */
    myTotalPoints: number = 0;             /* 我的积分(计算后) */
    myPointTobeExpired: number = 0;        /* 我的快过期积分 */

    navCloseByOrderSuccess: number = 0;    /* 兑换成功后关闭页面层数 */
    themeName: any = '积分商城';
    pointProducts: any[] = [];             /* 可兑产品列表 */
    newPointProducts: any[] = [];          /* 新品推荐 */
    hotPointProducts: any[] = [];          /* 热门产品 */
    pointProductsSelected: any[] = [];     /* 已选择产品列表 */
    pointProductsDetail: any;              /* 详情产品 */
    pointToExchanging: number = 0;              /* 将要兑换的积分总计 */
    orderData: pointOrder = new pointOrder();   /* 正在提交的产品列表*/
    couponId: number;                      /* 积分码 */
    platformOrderId: any;                  /* 平台合同号 */
    platformOrder: any[] = [];             /* 平台合同 */
    pagePointHistory: QueryPager<any>;     /* 积分详情 */
    pointProductGenre: any[] = [];         /* 产品类型列表 */

    outWardOrderByJD: any;                 /* 订单中存在京东商品的订单 */
    noJDStock: boolean=false;            

    pointInterval: any = { startPoint: 0, endPoint: 10000 };

    constructor(cApp: CApp) {
        super(cApp);

        makeObservable(this, {
            myPoints: observable,
            myEffectivePoints: observable,
            myTotalPoints: observable,
            myPointTobeExpired: observable,
            pointProducts: observable,
            newPointProducts: observable,
            hotPointProducts: observable,
            pointProductsSelected: observable,
            pointProductsDetail: observable,
            pointToExchanging: observable,
            orderData: observable,
            couponId: observable,
            platformOrderId: observable,
            platformOrder: observable,
            pagePointHistory: observable,
            pointProductGenre: observable,
            navCloseByOrderSuccess: observable,
            themeName: observable,
            outWardOrderByJD: observable,
            noJDStock: observable,
        });
    }

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

    loginMonitor = async (callBack?:any): Promise<void> => {
        if (!this.isLogined) {
            let loginCallback = async (user: User): Promise<void> => {
                let { cApp } = this;
                await cApp.currentUser.setUser(user);
                await cApp.loginCallBack(user);
                this.closePage(1);
                if (callBack !== undefined) callBack();
                else await this.showMainPoint();
            };
            nav.showLogin(loginCallback, true);
        }
    };

    
    tabPage: VMyPoint = new VMyPoint(this);

    initPointAllData = async () => {
        if(this.user !==undefined)
            await this.refreshMypoint();        /* 刷新积分 */
        await this.getPointProductGenre();  /* 获取产品类型 */
        this.newPointProducts = await this.getNewPointProducts();    /* 获取新品推荐 */
        this.hotPointProducts = await this.getHotPointProducts();    /* 获取热门产品 */
    }

    showMainPoint = async () => {
        await this.refreshMypoint(); 
        this.cApp.showMain('pointMarket');
    }

    /**
     * 积分管理页面
     */
    openMyPoint = async (param?: any) => {
        await this.initPointAllData();
        this.openVPage(VMyPoint);
        // await this.refreshMypoint();        /* 刷新积分 */
        // await this.getPointProductGenre();  /* 获取产品类型 */
        // this.newPointProducts = await this.getNewPointProducts();    /* 获取新品推荐 */
        // this.hotPointProducts = await this.getHotPointProducts();    /* 获取热门产品 */
        // this.openVPage(VMyPoint);
    }

    /**
     * 可兑换产品页面
     */
    openPointProduct = async (name?: any) => {
        if (name) {
            this.themeName = name;
            await this.getPointProductByDifferentPlot(this.themeName);
        } else this.themeName = '积分商城';
        // this.initPointProducts();
        this.openVPage(VPointProduct);
    }

    /**
     * 可兑换产品的详情(可生成浏览量)
     */
    openPointProductDetail = async (pointProduct: any, DetailLevel: number) => { 
        this.navCloseByOrderSuccess = DetailLevel;
        let { product } = pointProduct;
        let findP = this.pointProductsSelected.find((v: any) => pointProduct.product.id === v.product.id);
        let subVar: any;
        if (findP) {//找到当前
            pointProduct.quantity = findP.quantity;
            subVar = findP;
        } else {//未找到当前
            pointProduct.quantity = 0;
            subVar = pointProduct;
        };
        if (!subVar.pointProductSource) {//无来源 获取来源
            pointProduct.pointProductSource = await this.getProductSources(product);
        } else {
            pointProduct.pointProductSource = subVar.pointProductSource;
        };
        /* if (pointProduct.pointProductSource) {//存在来源
            if (!subVar.newStockRes) {
                let StockRes = await this.getStockBySource({ data: [pointProduct], sourceType: pointProduct.pointProductSource.type });
                pointProduct.newStockRes = StockRes.find((v: any) => v && v.skuId === Number(pointProduct.pointProductSource.sourceId));
            } else {
                pointProduct.newStockRes = subVar.newStockRes;
            };
        } else {//不存在来源
            pointProduct.newStockRes = undefined;
        }; */
        this.pointProductsDetail = pointProduct;
        let fm = 'YYYY-MM-DD HH:mm:ss';
        this.pointProductsDetail.OffShelf = false;
        let findProduct = await this.getPointProductLibLoad(pointProduct.product.id);
        if (findProduct !== undefined && moment(undefined, fm) >= moment(findProduct.endDate, fm))
            this.pointProductsDetail.OffShelf = true;
        // this.pointProductsDetail.htmlFragment = await this.getPointProductDetailFragment(this.pointProductsDetail);
        await this.setPointProductVisits(pointProduct.product.obj);//生成浏览量
        this.openVPage(VPointProductDetail, DetailLevel);
    }

    /* 获取(检测)积分商品库存 据商品数据源数据 */
    getStockBySource = async (param: any) => {
        let { data, sourceType } = param;
        if (!sourceType) return;
        if (sourceType === 'jd.com') {
            let area = await this.getAddressById();
            if (!area) return;
            let mapData = data.map((v: any) => {
                let { pointProductSource, quantity } = v;
                let { sourceId } = pointProductSource;
                return { skuId: Number(sourceId), num: quantity === 0 ? 1 : quantity };
            });
            let jdSkuNums = JSON.stringify(mapData);
            let newStockRes = await this.getPointProductStockByJD({ skuNums: jdSkuNums, area: area });
            return newStockRes;
        };

        if (sourceType === 'self') {
            return;
            // let a = await this.cApp.cProduct.getInventoryAllocation(Number(product.id), Number(sourceId), 1);
        };
    };

    /* 获取(检测)JD商品是否有库存 */
    getPointProductStockByJD = async (param: any) => {
        let res = await FetchPost(GLOABLE.JD + '/getNewStockById', JSON.stringify(param));
        if (!res.ok) return;
        let newStockRes = await res.json();
        return JSON.parse(newStockRes);
    };

    /* 获取本司地址 */
    getAddressById = async () => {
        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = await this.getDefaultShippingContact();
        };
        if (!this.orderData.shippingContact) return;
        let { obj } = this.orderData.shippingContact;
        let { address, addressString } = obj;
        let { obj: addressObj } = address;
        let { city, country, county, province } = addressObj;
        let myAddress = { city: city.id, country: country.id, county: county.id, province: province.id };
        return { myAddress, addressString };
    };

    /**
     * 据商品id 获取对应的商品所有信息
     */
    getPointProductLibLoad = async (id: number) => {
        return await this.uqs.积分商城.PointProductLib.load(id);
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
        if (!this.isLogined)
            await this.cApp.cPointProduct.loginMonitor();
        else { 
            await this.getPointHistory();
            this.openVPage(VRevenueExpenditure, topic)
        }
    }

    /**
     * 积分兑换记录页面
     */
    openExchangeHistory = async () => {
        if (!this.isLogined)
            await this.cApp.cPointProduct.loginMonitor();
        else {
            let promises: PromiseLike<any>[] = [];
            promises.push(this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -10));
            promises.push(this.uqs.积分商城.PointExchangeSheet.mySheets("#", 1, -100));
            let presult = await Promise.all(promises);
            let exchangeHistory = presult[0].concat(presult[1]);
            this.openVPage(VExchangeHistory, exchangeHistory);
        }
    }

    /**
     * 历史兑换单详情页面
     */
    openOrderDetail = async (orderId: number) => {
        await this.getOutWardOrderByJD(orderId);
        let order = await this.uqs.积分商城.PointExchangeSheet.getSheet(orderId);
        this.openVPage(VExchangeHistoryDetail, order);
    };

    /* 订单是否是含有JD商品的订单 */
    getOutWardOrderByJD = async (orderId: number) => {
        // orderId = nav.testing ? 485 : 96; //96  485
        this.outWardOrderByJD = await this.uqs.platFormJoint.OutWardOrderMapping.obj({ platform: 1, myOrderId: orderId });
    };

    /** 获取物流信息 */
    getOrderTrack = async () => {
        let param = { jdOrderId: this.outWardOrderByJD.platformOrderId };
        let res = await FetchPost(GLOABLE.JD + '/orderTrack', JSON.stringify(param));
        let orderTrackObj: any;
        if (res.ok) orderTrackObj = await res.json();
        return orderTrackObj;
    };

    /**
     * 历史兑换单物流信息页面
     */
    openExchangeOrderTrack = async () => {
        let OrderTrack = await this.getOrderTrack();
        this.openVPage(VExchangeOrderTrack, OrderTrack);
    };

    /**
     * 已选择的可兑换产品页面
     */
    openSelectedPointProduct = async (DetailLevel: number) => {
        this.navCloseByOrderSuccess = DetailLevel;
        this.pointProductsSelected = this.pointProductsSelected.filter(v => v.quantity !== 0);
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
        /* 优化 '京东商品有无货' 时需要调整此处 */
        this.noJDStock=false;
        this.openVPage(VExchangeOrder);
    }

    /**
     * 已选择的可兑换产品图标
     */
    renderSelectedLable(DetailLevel: number) {
        return this.renderView(VSelectedLable, DetailLevel);
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
        let { currentUser } = this.cApp;
        this.pagePointHistory = new QueryPager(this.uqs.积分商城.GetPointHistory, 15, 30);
        this.pagePointHistory.first({ customer: currentUser?.currentCustomer, key: "" });
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
        // let pointProductFromGenre = await this.getProductsFromGenre(currentGenre);
        let pointProductFromGenre = await this.uqs.积分商城.GetPointProductByGenre.table({ genre: currentGenre });
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
        return result.sort((a, b) => a.point - b.point).map((v) => { return { product: v.id } });
    }

    /**
     * 获取热门产品
     */
    getHotPointProducts = async () => {
        let result = await this.uqs.积分商城.GetHotPointProducts.table({});
        return result.sort((a, b) => a.point - b.point).map((v) => { return { product: v.id } });
    }

    /**
     * 获取积分区间的积分产品
     */
    getPointsIntervalProducts = async (state: any) => {
        this.pointInterval = PointIntervals[state];
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
        if (!this.isLogined) {
            let callBack = async () => {
                await this.showMainPoint();
                if (this.navCloseByOrderSuccess === 4) await this.openPointProduct(this.themeName);
                this.openPointProductDetail(data, this.navCloseByOrderSuccess);
            };
            await this.cApp.cPointProduct.loginMonitor(callBack);
        } else {
            if (data.product.id === this.pointProductsDetail.product.id) this.pointProductsDetail.quantity = value;
            if (!data.pointProductSource) data.pointProductSource = await this.getProductSources(data.product);
            /* data.newStockRes = undefined;
            if (data.pointProductSource) {
                let newStockRes = await this.getStockBySource({ data: [data], sourceType: data.pointProductSource.type });
                data.newStockRes = newStockRes.find((v: any) => v.skuId === Number(data.pointProductSource.sourceId));
            }; */
            let findCurIndex = this.pointProductsSelected.findIndex((v: any) => v.product.id === data.product.id);
            if (findCurIndex === -1) {
                data.point = data.product.obj.point;
                this.pointProductsSelected.push(data);
            } else {
                let nowData = {
                    quantity: value,
                    pointProductSource: data.pointProductSource
                };
                this.pointProductsSelected[findCurIndex] = { ...this.pointProductsSelected[findCurIndex], ...nowData };
            };
            let pointTotal: number = 0;
            this.pointProductsSelected.forEach((v: any) => { if (v && v.quantity > 0) pointTotal += v.point * v.quantity; });
            this.pointToExchanging = pointTotal;
        };
    };

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
    };

    createOrderStocks = async () => {
        let noSourceList = this.pointProductsSelected.filter((v: any) => v.quantity > 0 && !v.pointProductSource);
        if (noSourceList.length) {
            let promises1: PromiseLike<any>[] = [];
            noSourceList.forEach((v: any) => promises1.push(this.getProductSources(v.product)));
            let result = await Promise.all(promises1);
            this.pointProductsSelected.forEach((v: any) => {
                let findCoincideById = result.find((o: any) => o && v.product.id === o.pointProduct.id);
                if (findCoincideById) v.pointProductSource = findCoincideById;
            });
        };

        let jdProducts = this.pointProductsSelected.filter((v: any) => v.quantity > 0 && v.pointProductSource && v.pointProductSource.type === 'jd.com');
        this.noJDStock = false;
        if (!jdProducts.length) return;
        let newStockRes = await this.getStockBySource({ data: jdProducts, sourceType: 'jd.com' });
        let noStockList = newStockRes.filter((v: any) => v.stockStateId === 34 || v.stockStateDesc === "无货");
        if (!noStockList.length) return;
        this.pointProductsSelected.forEach((v: any) => {
            let pSource = v.pointProductSource;
            if (pSource?.type === 'jd.com') {
                v.newStockRes = noStockList.find((e: any) => e.skuId === Number(pSource.sourceId));
            };
        });
        this.noJDStock = true;
    };

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
        this.clearSelectedPointsProducts();

        // 打开下单成功显示界面
        // nav.popTo(this.cApp.topKey);
        this.closePage(this.navCloseByOrderSuccess);
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
        /* let { AddUsedCoupon } = this.uqs.积分商城;
        let result = await AddUsedCoupon.submit({ couponId: this.couponId });
        let rtn = result.result;
        return rtn; */
        return;
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
        this.orderData.shippingContact = await this.selectContact();
        await this.createOrderStocks();
    }

    showPointDoubt = async () => {
        if (!this.isLogined)
            await this.cApp.cPointProduct.loginMonitor();
        else {
            let { cMe, currentUser } = this.cApp;
            let param: any = { currentUser, webUsers: [] };
            if (currentUser.hasCustomer) {
                let { currentCustomer } = currentUser;
                param.currentCustomer = currentCustomer;
                let otherWebUsers = await currentCustomer.getRelatedWebUser();
                param.webUsers = otherWebUsers;
                this.openVPage(VPointDoubt, param);
            } else {
                if (!currentUser.allowOrdering) {
                    let note = <>
                        我们需要审核您的账号信息。账号审核是为了将您的账号和您之前的积分关联起来。
                        为此，需要您提供以下信息（带有 <span className="text-danger">*</span> 的信息为必填项），感谢您的配合。
                    </>;
                    cMe.toPersonalAccountInfo(async () => { this.openVPage(VPointDoubt) }, note);
                } else {
                    this.openVPage(VPointDoubt, param);
                }
            }
        } 
    }

    applyAuditUser = async () => {
        let { cApp, uqs } = this;
        let { currentUser } = cApp;
        await uqs.webuser.applyAuditUser.submit({ webUser: currentUser });
    }
}