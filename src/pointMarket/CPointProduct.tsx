import * as React from 'react';
import { BoxId, RowContext, nav } from 'tonva';
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
    @observable myPointSum: number = 0;            /*我的积分(计算后) */
    @observable myPointInvalid: number = 0;        /*我的快过期积分 */

    @observable pointProducts: any[] = [];          /*可兑产品列表 */
    @observable pointProductsSelected: any[] = [];  /*已选择产品列表 */
    @observable pointsSum: number = 0;              /*积分总计 */
    @observable exchangeHistory: any[] = [];        /*积分产品列表 */
    @observable orderData: pointOrder = new pointOrder();   /*正在提交的产品列表*/
    @observable couponId: number;                   /*积分码 */
    @observable platformOrderId: any;               /*平台合同号 */
    @observable platformOrder: any[] = [];          /*平台合同 */

    protected async internalStart(param: any) {
        let { currentUser } = this.cApp;
        let date = new Date();
        let dateYear = date.getFullYear();
        this.myPoints = await currentUser.getPoints();
        this.myPointSum = this.myPoints.reduce((v, e) => { return v + e.point - e.usedPoint }, 0);
        this.myPointInvalid = this.myPoints.reduce((v, e) => { return v + ((dateYear - e.pointYear) > 1 ? (e.point - e.usedPoint) : 0) }, 0);
        this.exchangeHistory = await this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -20);
        this.openVPage(VMyPoint);
    }

    openPointProduct = async () => {
        //清空选择的积分产品
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointsSum = 0;
        this.pointProducts = await this.getPointsProducts();
        this.openVPage(VPointProduct);
    }

    openExchangeHistory = async () => {
        this.exchangeHistory = await this.uqs.积分商城.PointExchangeSheet.mySheets(undefined, 1, -20);
        this.openVPage(VExchangeHistory);
    }

    openPlatformOrderPoint = async (credits?: string) => {
        await this.applyOrder();
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
        this.pointsSum = this.pointsSum + (data.point * nowQuantity);

        this.pointProductsSelected.forEach(element => {
            if (element.pack.id == data.pack.id) {
                element.quantity = element.quantity + nowQuantity;
                IsContain = IsContain + 1;
            }
        });
        if (IsContain == 0) {
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

    submitOrder = async () => {
        this.createOrderFromCart();

        let PointExchangeSheet = this.uqs.积分商城.PointExchangeSheet;
        let getDataForSave = this.orderData.getDataForSave();
        let result: any = await PointExchangeSheet.save("PointExchangeSheet", getDataForSave);
        let { id, flow, state } = result;
        await PointExchangeSheet.action(id, flow, state, "submit");

        //暂时扣除已经兑换的积分;
        this.myPointSum = this.myPointSum - this.pointsSum;
        if (this.pointsSum > this.myPointInvalid) {
            this.myPointInvalid = 0;
        } else {
            this.myPointInvalid = this.myPointInvalid - this.pointsSum;
        }

        //兑换后清空选择的积分产品
        this.orderData.exchangeItems = undefined;
        this.pointProductsSelected.length = 0;
        this.pointsSum = 0;

        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    applyOrder = async () => {
        this.platformOrderId = undefined;
        let validationResult = await this.getLastPlatFormOrder();
        let rtn = validationResult.result;
        if (rtn !== 0) {
            this.platformOrderId = validationResult.platformOrderId;
            rtn = validationResult.platformOrderId;
        }
        return rtn;
    }

    getLastPlatFormOrder = async () => {
        let { currentCustomer } = this.cApp.currentUser;
        return await this.uqs.积分商城.GetLastPlatFormOrder.submit({ customer: currentCustomer.id });
    }

    getPlatFormOrder = async (platformOrderId: string) => {
        return await this.uqs.积分商城.GetPlatFormOrder.table({ platformOrderId: platformOrderId });
    }

    IsCouponCanUse = async (couponCode: string) => {
        this.couponId = 0;
        let { currentUser } = this.cApp;
        let { salesTask, 积分商城 } = this.uqs;
        let validationResult = await salesTask.IsCanUseCoupon.submit({ code: couponCode, webUser: currentUser && currentUser.id });

        let { result, id, types } = validationResult;
        if (result === 1) {
            if (types !== 'credits')
                result = 0;
            else {
                this.couponId = id;
                let { currentCustomer, id: currentUserId } = currentUser;
                let userRecord = await 积分商城.CustomerCoupon.obj({
                    customer: currentCustomer.id
                    , webUser: currentUserId, coupon: this.couponId
                });
                if (userRecord && userRecord.coupon)
                    result = 100;
            }
        }
        return result;
    }

    addPlatformOrderPoint = async (orderId: string) => {
        let { currentCustomer } = this.cApp.currentUser;
        let { AddPlatformOrderPoint } = this.uqs.积分商城;
        let result = await AddPlatformOrderPoint.submit({ orderId: orderId, couponId: this.couponId, customer: currentCustomer.id });
        let rtn = result.result;
        return rtn;
    }

    addUsedCoupon = async () => {
        let { currentCustomer } = this.cApp.currentUser;
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