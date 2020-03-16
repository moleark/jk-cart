import _ from 'lodash';
import { Context, nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { CSelectShippingContact } from '../customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { CAddress } from '../customer/CAddress';
import { CPointProduct } from 'pointMarket/CPointProduct';
import { VLoginState } from './VLoginState';

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

    openPoint = async () => {
        let cPointProduct = this.newC(CPointProduct);// new CSelectShippingContact(this.cApp, undefined, false);
        await cPointProduct.start();
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
}