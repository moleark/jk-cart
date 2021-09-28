import { observable, makeObservable } from 'mobx';
import { Context, BoxId } from 'tonva-react';
import { CApp, CUqBase } from 'tapp';
import { VContactList } from './VContactList';
import { VContact } from './VContact';
import { CAddress } from './CAddress';

export abstract class CSelectContact extends CUqBase {
    fromOrderCreation: boolean;
    userContacts: BoxId[] = [];

    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            userContacts: observable
        });
    }

    async internalStart(fromOrderCreation: boolean/*contactType: ContactType*/) {
        this.fromOrderCreation = fromOrderCreation;
        let userContactMaps = await this.cApp.currentUser?.getContacts();
        this.userContacts = userContactMaps.map((v: any) => v.contact);
        this.openVPage(VContactList);
        if (this.fromOrderCreation && (!this.userContacts || this.userContacts.length === 0)) {
            this.onNewContact();
        }
    }

    protected abstract getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    renderContentList = (param?: any) => {
        return this.renderView(VContactList, param);
    }

    /**
     * 打开地址新建界面
     */
    onNewContact = async () => {
        this.openVPage(VContact, { contact: undefined });
    }

    /**
     * 打开地址编辑界面
     */
    onEditContact = async (userContact: BoxId) => {
        let userContactId = userContact.id;
        let contact = await this.uqs.customer.Contact.load(userContactId);
        let userSetting = await this.cApp.currentUser?.getSetting();
        contact.isDefault = await this.cApp.cSelectShippingContact.getIsDefault(userSetting, userContactId);
        contact.isDefaultInvoice = await this.cApp.cSelectInvoiceContact.getIsDefault(userSetting, userContactId);
        let userContactData: any = { contact: contact };
        this.openVPage(VContact, userContactData);
    }

    delContact = async (contact: any) => {
        let { id } = contact;
        let { currentUser } = this.cApp;
        if (!currentUser) return;
        if (contact.isDefault === undefined || contact.isDefaultInvoice=== undefined) {
            let userSetting = await currentUser.getSetting();
            if (contact.isDefault === undefined) {
                contact.isDefault = await this.cApp.cSelectShippingContact.getIsDefault(userSetting, id);
            };
            if (contact.isDefaultInvoice === undefined) {
                contact.isDefaultInvoice = await this.cApp.cSelectInvoiceContact.getIsDefault(userSetting, id);
            };
        };
        await currentUser.delContact(id);
        if (contact.isDefault) {
            this.cApp.cSelectShippingContact.setDefaultContact(undefined);
        };
        if (contact.isDefaultInvoice) {
            this.cApp.cSelectInvoiceContact.setDefaultContact(undefined);
        };
        let index = this.userContacts.findIndex(v => v.id === id);
        if (index > -1)
            this.userContacts.splice(index, 1);
    }

    saveContact = async (contact: any) => {
        let contactBox = await this.saveContactData(contact);
        this.backPage();
        if (this.fromOrderCreation) {
            this.onContactSelected(contactBox);
        }
        /* let { Contact: contactTuid } = this.uqs.customer;
        let newContact = await contactTuid.save(undefined, contact);
        let { id: newContactId } = newContact;
        let contactBox = contactTuid.boxId(newContactId);

        let { currentUser } = this.cApp;
        await currentUser.addContact(newContactId);
        this.userContacts.push(contactBox);
        let { id, isDefault } = contact;
        if (isDefault === true || this.userContacts.length === 1) {
            await this.setDefaultContact(contactBox);
        }
        // contact.id !== undefined表示是修改了已有的contact(我们只能用“替换”表示“修改”，所以此时需要删除原contact)
        if (id !== undefined) {
            await currentUser.delContact(id);
            let index = this.userContacts.findIndex(v => v.id === id);
            if (index > -1)
                this.userContacts.splice(index, 1);
        }
        this.backPage();
        if (this.fromOrderCreation) {
            this.onContactSelected(contactBox);
        } */
    }

    saveContactData = async (contact: any) => {
        let { Contact: contactTuid } = this.uqs.customer;
        let newContact = await contactTuid.save(undefined, contact);
        let { id: newContactId } = newContact;
        let contactBox = contactTuid.boxId(newContactId);

        let { currentUser } = this.cApp;
        if (!currentUser) return;
        await currentUser.addContact(newContactId);
        this.userContacts.push(contactBox);
        let { id, isDefault, isDefaultInvoice } = contact;
        if (isDefault === true || this.userContacts.length === 1) {
            await this.cApp.cSelectShippingContact.setDefaultContact(contactBox);
        };
        if (isDefaultInvoice === true || this.userContacts.length === 1) {
            await this.cApp.cSelectInvoiceContact.setDefaultContact(contactBox);
        };
        // contact.id !== undefined表示是修改了已有的contact(我们只能用“替换”表示“修改”，所以此时需要删除原contact)
        if (id !== undefined) {
            await currentUser.delContact(id);
            let index = this.userContacts.findIndex(v => v.id === id);
            if (index > -1)
                this.userContacts.splice(index, 1);
        };
        return contactBox;
    }

    protected abstract setDefaultContact(contactId: BoxId): Promise<any>;

    onContactSelected = async (contact: BoxId, source?: string) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(contact);
        }
        if (source === 'createOrder') {
            await this.cApp.cOrder.onContactSelected(contact);
        }

        if (source === 'pointOrder') {
            await this.cApp.cPointProduct.onContactSelected(contact);
        }
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress); // new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }

    getContactList = async () => {
        let { currentUser } = this.cApp;
        if (!currentUser) return;
        let userContactMaps = await currentUser.getContacts();
        this.userContacts = userContactMaps.map((v: any) => v.contact);
    }
}

export class CSelectShippingContact extends CSelectContact {
    async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        if (userSetting !== undefined) {
            let { shippingContact } = userSetting;
            return shippingContact && shippingContact.id === userContactId;
        }
        return false;
    }

    async setDefaultContact(contactId: BoxId) {
        let { currentUser } = this.cApp;
        if (!currentUser) return;
        await currentUser.setDefaultShippingContact(contactId);
    }
}

export class CSelectInvoiceContact extends CSelectContact {
    async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        if (userSetting !== undefined) {
            let { invoiceContact } = userSetting;
            return invoiceContact && invoiceContact.id === userContactId;
        }
        return false;
    }

     async setDefaultContact(contactId: BoxId) {
        let { currentUser } = this.cApp;
        if (!currentUser) return;
        await currentUser.setDefaultInvoiceContact(contactId);
    }
}
