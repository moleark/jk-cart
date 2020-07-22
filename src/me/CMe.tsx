import _ from 'lodash';
import { Context, nav, VPage } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { CSelectShippingContact } from '../customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { CAddress } from '../customer/CAddress';
import { CFavorites } from '../customer/CFavorites';
import { CPointProduct } from 'pointMarket/CPointProduct';
import { VLoginState } from './VLoginState';
import { VLoginState_Web } from './VLoginState_Web';

export class CMe extends CUqBase {
    //    cApp: CApp;
    protected async internalStart(param?: any) {
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

    openMyOrders = async (state: string) => {
        let { cOrder } = this.cApp;
        await cOrder.openMyOrders(state);
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
        let cPointProduct = this.newC(CPointProduct);// new CSelectShippingContact(this.cApp, undefined, false);
        await cPointProduct.start();
    }
    /**
     * 优惠券管理
     */
    openCouponManage = async () => {
        let { cCoupon } = this.cApp;
        await cCoupon.openMyCouponManage();
        // let cCouponManage = this.newC(CCouponManage);
        // await cCouponManage.start();
    }

    /**
     * 收藏夹
     */
    openFavorites = async () => {
        let cMyFavorites = this.newC(CFavorites);
        await cMyFavorites.start();
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

    showLogin = () => {
        nav.showLogin(undefined, true);
    }

    showLoginOut = () => {
        nav.showLogout();
    }

    renderCarLabel = () => {
        let { cCart } = this.cApp;
        return cCart.renderCartLabel();
    }

    renderLoginState_Web() {
        return this.renderView(VLoginState_Web);
    }

    renderCarLabel_Web() {
        let { cCart } = this.cApp;
        return cCart.renderCartLabel_Web();
    }
}