import * as React from 'react';
import { VPage, Page, View } from 'tonva';
import { CSelectContact, CSelectShippingContact } from './CSelectContact';
import { List, LMR, FA } from 'tonva';
import { tv } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export class VContactList extends VPage<CSelectContact> {
    @observable isCurColl:string;
    @observable isSh:boolean=false;
    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (contact: any) => {
        let { onEditContact, onContactSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditContact(contact)}>
            <FA name="edit" />
        </div>
        let param = this.isCurColl === undefined ? contact : { contact, type: this.isCurColl };
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onContactSelected(param)}>
                {tv(contact)}
            </div>
        </LMR>
    }

    private page = observer(() => {
        let { onNewContact, userContacts } = this.controller;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => onNewContact()} >添加新地址</button>;
        let contactList = <List items={userContacts} item={{ render: this.onContactRender }} none="无地址" />;
        return <Page footer={footer} header="管理地址">
            {contactList}
        </Page>
    })


    render(param?: any): JSX.Element {
        this.isCurColl = param;
        let { onNewContact, userContacts } = this.controller.cApp.cSelectShippingContact;
        let footer = <button className="btn btn-primary mt-2 mx-auto w-50"
            onClick={() => {
                this.controller.cApp.cOrder.modalTitle = 'contactInfo';
                this.controller.cApp.cOrder.editContact = undefined;
            }} >添加新地址</button>;
        let contactList = <List items={userContacts} item={{ render: this.onContactRender }} className="h-max-20c overflow-auto border-bottom scroll-S" none="无地址" />;
    	return React.createElement(observer(() => {
            return <div className="d-flex flex-column px-2">
                {contactList}
                {footer}
			</div>;
		}));
	}
}