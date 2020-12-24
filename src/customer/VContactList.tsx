import * as React from 'react';
import { VPage, Page, View } from 'tonva';
import { CSelectContact, CSelectShippingContact } from './CSelectContact';
import { List, LMR, FA } from 'tonva';
import { tv } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { xs, xsOrIpad } from '../tools/browser';
import classNames from 'classnames';
import { VConfirmDeleteContact } from './VContact';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export class VContactList extends VPage<CSelectContact> {
    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (contact: any) => {
        let { onEditContact, onContactSelected, delContact} = this.controller;
        let right = <>
            {
                !xsOrIpad && <div className="p-2 cursor-pointer text-info" onClick={() => this.onDelContact(contact)}>
                    <FA name="trash-o" />
                </div>
            }
            <div className="p-2 cursor-pointer text-info" onClick={() => onEditContact(contact)}>
                <FA name="edit" />
            </div>
        </>;
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onContactSelected(contact)}>
                {tv(contact)}
            </div>
        </LMR>
    }

    private onDelContact = async (contact:any) => {
        let {  delContact} = this.controller;
        confirm({
            title: <div className="text-center pb-2 h5">提示</div>,
            content: '是否删除该地址？',
            okText: '删除地址',
            okType: 'danger',
            cancelText: '取消',
            style:{top: '35%'},
            onOk() { delContact(contact);},
            onCancel() {},
        });
    }

    private page = observer(() => {
        let { onNewContact, userContacts,cApp } = this.controller;
        let footer = <div className="d-flex justify-content-center">
            <button type="button" className={classNames("btn btn-primary", !xs ? 'w-25' : ' w-100')} onClick={() => onNewContact()} >新增地址</button>
        </div>;
        let contactList = <List items={userContacts} item={{ render: this.onContactRender }} none="无地址" />;
        let header: any, title = '地址管理';
        if (xsOrIpad) header = title;
        return <Page footer={footer} header={header}>
            <div className="row mx-0">
                <div className="col-lg-3 d-none d-lg-block">
                    {this.controller.cApp.cMe.renderMeSideBar()}
                </div>
                <div className="col-lg-9 px-0 mx-auto" style={{maxWidth: !xs ? 600 :'none'}}>
                    {!xsOrIpad && <div className="text-left mt-5 px-3"><h1>{title}</h1></div>}
                    {contactList}
                </div>
            </div>
        </Page>
    })


    render(param?: any): JSX.Element {
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