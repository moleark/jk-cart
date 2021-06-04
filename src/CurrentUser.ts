/* eslint-disable */
import { User } from 'tonva';
import { BoxId } from 'tonva';
import { observable, computed } from 'mobx';
import { UQs } from './uqs';

export class WebUser {
    private _user: User;
    id: number;
    name: string;
    nick?: string;
    icon?: string;

    @observable firstName: string;
    gender: string;
    salutation: string;
    @observable organizationName: string;
    departmentName: string;

    get defaultOrganizationName(): string {
        return this.organizationName ||
            (this.webUserSettings &&
                (
                    (this.webUserSettings.invoiceInfo && this.webUserSettings.invoiceInfo.obj['title'])
                    || (this.webUserSettings.shippingContact && this.webUserSettings.shippingContact.obj['organizationName'])
                    || (this.webUserSettings.invoiceContact && this.webUserSettings.invoiceContact.obj['organizationName'])
                )
            );
    }

    get defaultName(): string {
        return this.firstName ||
            (this.webUserSettings &&
                ((
                    this.webUserSettings.shippingContact && this.webUserSettings.shippingContact.obj['name'])
                    || (this.webUserSettings.invoiceContact && this.webUserSettings.invoiceContact.obj['name'])
                )
            );
    }

    get defaultMobile(): string {
        return this.mobile ||
            (this.webUserSettings &&
                ((
                    this.webUserSettings.shippingContact && this.webUserSettings.shippingContact.obj['mobile'])
                    || (this.webUserSettings.invoiceContact && this.webUserSettings.invoiceContact.obj['mobile'])
                )
            );
    }

    telephone: string;
    @observable mobile: string;
    email: string;
    fax: string;
    address: BoxId;
    addressString: string;
    zipCode: string;
    VIPDiscount: any;
    webUserVIPCard: any;
    @computed get allowOrdering() {
        // 这个地方要改成相关账号吧？
        return this.currentCustomer !== undefined ||
            (this.mobile && this.firstName && this.organizationName);
    }

    private webUserSettings: any;

    private uqs: UQs;


    constructor(uqs: UQs) {// cUsqWebUser: CUq, cUsqCustomer: CUq) {
        this.uqs = uqs;
    }

    setUser = async (user: User) => {
        if (!user) return;
        this._user = user;
        this.id = user.id;
        this.name = user.name;
        this.nick = user.nick;
        this.icon = user.icon;

        await this.loadWebUser();
    }

    private async loadWebUser() {
        let { id, _user } = this;
        if (_user === undefined) return;

        let { webuser: webUserTuid, salesTask } = this.uqs;
        let { WebUser, WebUserContact, WebUserSetting, WebUserCustomer, WebUserBuyerAccount, RecordLogin } = webUserTuid;
        let webUser = await WebUser.load(this.id);
        if (webUser) {
            let { firstName, gender, salutation, organizationName, departmentName } = webUser;
            this.firstName = firstName;
            this.gender = gender;
            this.salutation = salutation;
            this.organizationName = organizationName;
            this.departmentName = departmentName;
            this.webUserVIPCard = await webUserTuid.WebUserVIPCard.obj({ webUser: this });
            if (this.webUserVIPCard !== undefined) {
                // this.VIPDiscount = await vipCardType.VIPCardTypeDiscount.query({ vipCard: this.webUserVIPCard.vipCardType })
                if (this.webUserVIPCard.expiredDate > Date.now())
                    this.VIPDiscount = await salesTask.VIPCardDiscount.table({ coupon: this.webUserVIPCard.vipCard });
                else this.VIPDiscount = [];
            }

            await RecordLogin.submit({ webUser: webUser, ip: "", app: "shop" });
        }


        let contact = await WebUserContact.obj({ "webUser": id });
        if (contact) {
            let { telephone, mobile, email, fax, address, addressString, zipCode } = contact;
            this.telephone = telephone;
            this.mobile = mobile;
            this.email = email;
            this.fax = fax;
            this.address = address;
            this.addressString = addressString;
            this.zipCode = zipCode;
        }

        this.webUserSettings = await WebUserSetting.obj({ webUser: id }) || { webUser: id };

        let value = await WebUserCustomer.obj({ webUser: id });
        if (value !== undefined) {
            this.currentCustomer = new Customer(value.customer, this.uqs);
            await this.currentCustomer.init();
        }
        let accountValue = await WebUserBuyerAccount.query({ webUser: id });
        let { ret: buyerAccounts } = accountValue;
        if (buyerAccounts && buyerAccounts.length > 0) {
            // TODO: 暂时不考虑有多个相关账号的情况
            this.buyerAccount = buyerAccounts[0].buyerAccount;
        }
    }

    /*
    get isLogined(): boolean {
        return this._user !== undefined;
    }
    */

    get hasCustomer(): boolean {
        return this.currentCustomer !== undefined;
    }
    currentCustomer: Customer;
    buyerAccount: any;

    async getContacts(): Promise<any[]> {
        /*
        if (this.currentCustomer !== undefined) {
            return await this.currentCustomer.getContacts()
        }
        */
        return await this.uqs.webuser.WebUserContacts.table({ webUser: this.id });
    }

    async addContact(contactId: number) {
        /*
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.addContact(contactId);
            return;
        }
        */
        await this.uqs.webuser.WebUserContacts.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async addContactFromAccount() {
        let { firstName, organizationName, mobile, telephone, email, address, addressString } = this;
        if (firstName && organizationName && mobile && address && addressString) {
            let newContact = await this.uqs.customer.Contact.save(undefined, {
                name: firstName,
                organizationName: organizationName,
                mobile: mobile,
                telephone: telephone,
                email: email,
                address: address,
                addressString: addressString
            })
            if (newContact) {
                let { id: newContactId } = newContact;
                await this.addContact(newContactId);
                let newContactBox = this.uqs.customer.Contact.boxId(newContactId);
                this.setDefaultShippingContact(newContactBox);
            }
        }
    }

    async delContact(contactId: number) {
        /*
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.delContact(contactId);
            return;
        }
        */
        await this.uqs.webuser.WebUserContacts.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async getSetting() {
        /*
        if (this.currentCustomer !== undefined) {
            return this.currentCustomer.getSetting();
        }
        */
        return this.webUserSettings;
    }

    async setDefaultShippingContact(contactId: BoxId) {
        /*
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultShippingContact(contactId);
            return;
        }
        */
        this.webUserSettings.shippingContact = contactId;
        this.saveDefaultSettings();
    }

    async setDefaultInvoiceContact(contactId: BoxId) {
        /*
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultInvoiceContact(contactId);
            return;
        }
        */
        this.webUserSettings.invoiceContact = contactId;
        this.saveDefaultSettings();
    }

    async setDefaultInvoice(invoiceTypeId: BoxId, invoiceInfoId: BoxId) {
        /*
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultInvoice(invoiceTypeId, invoiceInfoId);
            return;
        }
        */
        // await this.webUserSettingMap.add({ webUser: this.id, arr1: [{ invoiceType: invoiceTypeId, invoiceInfo: invoiceInfoId }] });
        this.webUserSettings.invoiceType = invoiceTypeId;
        this.webUserSettings.invoiceInfo = invoiceInfoId;
        this.saveDefaultSettings();
    }

    async saveDefaultSettings() {
        await this.uqs.webuser.WebUserSetting.add(this.webUserSettings);
    }


    async changeWebUser(webUser: any) {
        await this.uqs.webuser.WebUser.save(this.id, webUser);
        await this.loadWebUser();
    }

    async changeWebUserContact(webUserContact: any) {
        webUserContact.webUser = this.id;
        await this.uqs.webuser.WebUserContact.add(webUserContact);
        await this.loadWebUser();
    }

    async getPoints() {
        return await this.uqs.积分商城.getPoints.table({ webuser: this.id });
    }

};

export class Customer {
    private readonly uqs: UQs;
    id: number;

    private customerSettings: any;
    Contractor: any;
    Organization: any;
    Discounts: any[] = []

    constructor(customer: BoxId, uqs: UQs) {
        this.id = customer.id;
        this.uqs = uqs;
    };

    async getContacts(): Promise<any[]> {
        return await this.uqs.customer.CustomerContacts.table({ customer: this.id });
    }

    async addContact(contactId: number) {
        await this.uqs.customer.CustomerContacts.add({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    async delContact(contactId: number) {
        await this.uqs.customer.CustomerContacts.del({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    /**
     * 获取customer折扣表
     */
    async getcustomerDiscount(customer: BoxId | number) {
        let discounts = await this.uqs.customerDiscount.CustomerDiscount.table({ customer: customer });
        return discounts.filter((el: any) => el.endDate > Date.now());
    }

    /**
     * 获取所属组织折扣表
     */
    async getOrganizationDiscount(organization: BoxId | number) {
        let discounts = await this.uqs.customerDiscount.OrganizationDiscount.table({ organization: organization });
        return discounts.filter((el: any) => el.endDate > Date.now());
    }
    /* 获取用户的折扣表(个人-->个人所属组织-->关联老师-->老师所属组织) */
    async getcustomerDiscountArr() {
        /* 获取个人的折扣表 */
        this.Discounts = await this.getcustomerDiscount(this.id);
        if (this.Organization && !this.Discounts.length) {/* 获取个人组织的折扣表 */
            this.Discounts = await this.getOrganizationDiscount(this.Organization);
        };
        if (this.Discounts.length) return;
        /* 获取关联老师 */
        let customerBuyerAccount = await this.uqs.customer.CustomerBuyerAccount.obj({ customer: this.id });
        if (customerBuyerAccount) {
            let { buyerAccount } = customerBuyerAccount;
            /* 读取老师 buyerAccount */
            let getBuyerAccountID = await this.uqs.customer.Buyeraccount.load(buyerAccount);
            if (getBuyerAccountID) {
                let { description: BuyerAccountName, organization } = getBuyerAccountID;
                /*  获取老师customer */
                let getBuyerAccountCustomerRes = await this.uqs.customer.Customer.search(BuyerAccountName, 10, 10);
                if (!getBuyerAccountCustomerRes.length) return;
                /* 获取老师的折扣表 */
                this.Discounts = await this.getcustomerDiscount(getBuyerAccountCustomerRes[0].id);
                if (this.Discounts.length) return;
                /* 获取老师组织折扣表 */
                this.Discounts = await this.getOrganizationDiscount(organization);
            };
        };
    }

    async init() {
        this.customerSettings = await this.uqs.customer.CustomerSetting.obj({ customer: this.id }) || { customer: this.id };
        let customerContactorMap: any = await this.uqs.customer.CustomerContacts.obj({ customer: this.id });
        if (customerContactorMap)
            this.Contractor = customerContactorMap.contractor;
        let customerOrganization = await this.uqs.customer.getCustomerOrganization.obj({ customerId: this.id });
        if (customerOrganization) this.Organization = customerOrganization.organization;
        await this.getcustomerDiscountArr();
    }

    getSetting() {
        return this.customerSettings;
    }

    async setDefaultShippingContact(contactId: BoxId) {
        this.customerSettings.shippingContact = contactId;
        await this.setDefaultSettings();
    }

    async setDefaultInvoiceContact(contactId: BoxId) {
        this.customerSettings.invoiceContact = contactId;
        await this.setDefaultSettings();
    }

    async setDefaultInvoice(invoiceTypeId: BoxId, invoiceInfoId: BoxId) {
        this.customerSettings.invoiceType = invoiceTypeId;
        this.customerSettings.invoiceInfo = invoiceInfoId;
        await this.setDefaultSettings();
    }

    async setDefaultSettings() {
        await this.uqs.customer.CustomerSetting.add(this.customerSettings);
    }

}