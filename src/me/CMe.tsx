/* eslint-disable */
import * as React from 'react';
import _ from 'lodash';
import { Context, nav, VPage, User } from 'tonva';
import { CUqBase } from '../tapp/CBase';
import { VMe } from './VMe';
import { CSelectShippingContact } from '../customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { CAddress } from '../customer/CAddress';
import { CFavorites } from '../customer/CFavorites';
import { CPointProduct } from 'pointMarket/CPointProduct';
import { VLoginState } from './VLoginState';
import { VAbout } from './about';
import { EditMeInfo } from './EditMeInfo';
import { VMeSideBar } from './VMeSideBar';

export class CMe extends CUqBase {
    //    cApp: CApp;
    protected async internalStart(param?: any) {
		this.openVPage(VMe);
	}

    async changeWebUser(webUser: any) {
        let { currentUser } = this.cApp;
        await currentUser.changeWebUser(webUser);
    }

    async changeWebUserContact(webUserContact: any) {
        let { currentUser } = this.cApp;
        await currentUser.changeWebUserContact(webUserContact);
    }

    tab = () => this.renderView(VMe);
    tabPage: VMe = new VMe(this);

    openMyOrders = async (state:string) => {
        let { cOrder } = this.cApp;
        await cOrder.openMyOrders(state);
    }

    openMeInfo = async () => {
        this.openVPage(EditMeInfo);
    }

    openContactList = async () => {
        let contactList = this.newC(CSelectShippingContact); // new CSelectShippingContact(this.cApp, undefined, false);
        await contactList.start(false);
    }

    openInvoice = async () => {
        let cInvoiceInfo = this.newC(CInvoiceInfo); // new CInvoiceInfo(this.cApp, undefined, false);
        let { currentUser } = this.cApp;
        let defaultSetting = await currentUser.getSetting();

        let origInvoice = _.pick(defaultSetting, ['invoiceType', 'invoiceInfo']);
        cInvoiceInfo.start(origInvoice);
    }

    openMyPoint = async () => {
        /* let cPointProduct = this.newC(CPointProduct);// new CSelectShippingContact(this.cApp, undefined, false);
        await cPointProduct.start(); */
        await this.cApp.cPointProduct.openMyPoint();
    }
    /**
     * 卡券管理
     */
    openCouponManage = async () => {
        let { cCoupon } = this.cApp;
        await cCoupon.openMyCouponManage();
        // let cCouponManage = this.newC(CCouponManage);
        // await cCouponManage.start();
    }

    /**
     * 商品收藏
     */
    openFavorites = async () => {
        let cMyFavorites = this.newC(CFavorites);
        await cMyFavorites.start();
    }

    toPersonalAccountInfo = async (fn: Function) => {
        await this.openMeInfoFirstOrder({
            onlyRequired: false,
            caption: "请补充账户信息",
            note: <>
                化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。
                为此，需要您重新提供非虚拟的、可核查的信息。这些信息包括下面所有带有 <span className="text-danger">*</span> 的信息。
            </>,
            actionButton: {
                value: "下一步",
                action: fn
            }
        });
	}
	
	openAbout() {
		this.openVPage(VAbout);
	}

    openMeInfoFirstOrder = async (options?: any) => {
        await this.openVPage(EditMeInfoFirstOrder, options);
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress); // new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }

    openPrivacy = () => {
        // this.openVPage(Privacy);
        nav.showPrivacyPage();
    }

    getCommonText = async (textId: number) => {
        return await this.uqs.order.CommonText.load(textId);
    }

    renderLoginState() {
        return this.renderView(VLoginState);
    }

    showLogin = (callback?: (user: User) => Promise<void>) => {
		if (nav.isWebNav) {
			nav.navigate('/login');
		}
		else {
			nav.showLogin(callback, true);
		}
    }

    showLoginOut = (callback?: () => Promise<void>) => {
        nav.showLogout(callback);
    }

    renderCarLabel = () => {
        let { cCart } = this.cApp;
        return cCart.renderCartLabel();
    }

    renderMeSideBar = () => {
        return this.renderView(VMeSideBar);
    }

	/*
    renderLoginState_Web() {
        return this.renderView(VLoginState_Web);
	}
	*/
	/*
    renderCarLabel_Web() {
        let { cCart } = this.cApp;
        return cCart.renderCartLabel_Web();
	}
	*/
}