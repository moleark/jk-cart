import * as React from 'react';
import _ from 'lodash';
import { observable } from 'mobx';
import { ItemSchema, Page, Edit, VPage, FA } from 'tonva';
import { CMe } from './CMe';
import { webUserSchema, webUserUiSchema, webUserContactSchema, webUserContactUiSchema } from './EditMeInfo';
import { observer } from 'mobx-react';
import { GLOABLE } from 'cartenv';

interface Options {
    onlyRequired: boolean;
    caption: string;
    note: string;
    actionButton: {
        value: string;
        action: any;
    }
}

export class EditMeInfoFirstOrder extends VPage<CMe>{
    private options: Options;
    @observable tips: JSX.Element;

    async open(param: any) {
        // this.onlyRequired = param;
        this.options = param;
        this.openPage(this.page);
    }

    @observable private webUserData: any;
    @observable private webUserContactData: any;

    constructor(props: any) {
        super(props);

        let { cApp } = this.controller;
        let { firstName, gender, salutation, organizationName, departmentName, telephone
            , mobile, email, fax, address, addressString, zipCode } = cApp.currentUser;
        this.webUserData = {
            firstName: firstName,
            gender: gender,
            salutation: salutation,
            organizationName: organizationName,
            departmentName: departmentName
        };

        this.webUserContactData = {
            telephone: telephone,
            mobile: mobile,
            email: email,
            fax: fax,
            address: address,
            addressString: addressString,
            zipCode: zipCode
        }
    }

    private onMergeDataChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.webUserContactData[name] = newValue;
        this.webUserData[name] = newValue;
        await this.controller.changeWebUser(this.webUserData);
        await this.controller.changeWebUserContact(this.webUserContactData);
    }

    private onCompleted = async () => {
        let { currentUser } = this.controller.cApp;
        if (currentUser.allowOrdering) {
            this.closePage();
            await currentUser.addContactFromAccount();
            await this.options.actionButton.action();
        } else {
            this.tips = <>以上带有 <span className='text-danger'>*</span> 的内容均须填写！</>;
            setTimeout(() => {
                this.tips = undefined;
            }, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private page = observer(() => {

        let tipsUI = <></>;
        if (this.tips) {
            tipsUI = <div className="alert alert-primary" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }

        let { onlyRequired, caption, note, actionButton } = this.options;
        let schemaFilter = (itemSchema: ItemSchema): boolean => {
            return (onlyRequired === true && itemSchema.required === true)
                || onlyRequired === undefined
                || onlyRequired === false
        }

        let schemaArr = [];
        for (let item of webUserSchema) {
            if (item.required === true) schemaArr.push(item);
        }
        for (let item of webUserContactSchema) {
            if (item.required === true) schemaArr.push(item);
        }
        if (onlyRequired !== true) {
            for (let item of webUserSchema) {
                if (item.required !== true) schemaArr.push(item);
            }
            for (let item of webUserContactSchema) {
                if (item.required !== true) schemaArr.push(item);
            }
        }
        let uiSchema = {};
        _.merge(uiSchema, webUserUiSchema, webUserContactUiSchema(this.controller.pickAddress));

        let data = _.merge(this.webUserData, this.webUserContactData);
        let { value } = actionButton;
        return <Page header={caption}>
            <div className="alert alert-light my-3 py-4" role="alert">
                <FA name="smile-o" className="text-warning mr-4 my-1" size="2x" />
                {note}
            </div>
            <Edit schema={schemaArr.filter(schemaFilter)} uiSchema={uiSchema}
                data={data}
                onItemChanged={this.onMergeDataChanged} />

            <div className="p-3 bg-white">
                {tipsUI}
                <button type="button" className="btn btn-primary w-100" onClick={() => this.onCompleted()}>{value}</button>
            </div>
        </Page>;
    });
}
