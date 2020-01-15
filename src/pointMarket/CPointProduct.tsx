import * as React from 'react';
import { BoxId, RowContext, nav, User } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VPointProduct } from 'pointMarket/VPointProduct';
import { VExchangeOrder } from './VExchangeOrder';
import { VMyPoint } from './VMyPoint';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { OrderSuccess } from './OrderSuccess';
import { pointOrder, OrderItem } from './pointOrder';
import { VExchangeHistoryDetail } from './VExchangeHistoryDetail';
import { VExchangeHistory } from './VExchangeHistory';
import { VPlatformOrderPoint } from './VPlatformOrderPoint';

export class CPointProduct extends CUqBase {

    @observable myPoints: any[] = [];              /*我的积分 */
    @observable myEffectivePoints: number = 0;            /*我的积分(计算后) */
    @observable myTotalPoints: number = 0;            /*我的积分(计算后) */
    @observable myPointTobeExpired: number = 0;        /*我的快过期积分 */

    @observable pointProducts: any[] = [];          /*可兑产品列表 */
    @observable pointProductsSelected: any[] = [];  /*已选择产品列表 */
    @observable pointToExchanging: number = 0;              /*将要兑换的积分总计 */
    @observable exchangeHistory: any[] = [];        /*积分产品列表 */
    @observable orderData: pointOrder = new pointOrder();   /*正在提交的产品列表*/
    @observable couponId: number;                   /*积分码 */
    @observable platformOrderId: any;               /*平台合同号 */
    @observable platformOrder: any[] = [];          /*平台合同 */

    protected async internalStart(param: any) {
        await this.refreshMypoint();
        this.exchangeHistory = await this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -20);
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

    openPointProduct = async () => {
        //清空选择的积分产品
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointToExchanging = 0;
        this.pointProducts = await this.getPointsProducts();
        this.openVPage(VPointProduct);
    }

    openExchangeHistory = async () => {
        this.exchangeHistory = await this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -20);
        this.openVPage(VExchangeHistory);
    }

    openPlatformOrderPoint = async (credits?: string) => {
        let lastPlatformId = await this.getLastPlatformOrder();
        if (lastPlatformId)
            this.platformOrder = await this.getPlatFormOrder(this.platformOrderId);
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

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    getPointsProducts = async () => {
        return await this.uqs.积分商城.GetPointProduct.table({});
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let IsContain = 0;
        let nowQuantity = value - (prev ? prev : 0);
        this.pointToExchanging = this.pointToExchanging + (data.point * nowQuantity);

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
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointToExchanging = 0;

        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    /**
     * 获取当前webuser对应customer的最近一个订单
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
     * 领取积分
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
     *
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