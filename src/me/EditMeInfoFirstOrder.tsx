import * as React from 'react';
import { observable } from 'mobx';
import { ItemSchema, Page, Edit, VPage, FA } from 'tonva';
import { CMe } from './CMe';
import { webUserSchema, webUserUiSchema, webUserContactSchema, webUserContactUiSchema } from './EditMeInfo';
import { observer } from 'mobx-react';
import { GLOABLE } from 'configuration';

export class EditMeInfoFirstOrder extends VPage<CMe>{

    @observable tips: JSX.Element;

    async open(param: any) {
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

    private onWebUserChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.webUserData[name] = newValue;
        await this.controller.changeWebUser(this.webUserData);
    }

    private onWebUserContactChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.webUserContactData[name] = newValue;
        await this.controller.changeWebUserContact(this.webUserContactData);
    }

    private checkOut = async () => {
        let { currentUser } = this.controller.cApp;
        if (currentUser.allowOrdering) {
            this.closePage();
            await currentUser.addContactFromAccount();
            await this.controller.doCheckout();
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
        return <Page header="首次下单须补充账户信息">
            <div className="alert alert-primary small" role="alert">
                <FA name="exclamation-circle" className="text-warning mr-3 my-1 float-left" size="3x" />
                化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。
                为此，需要您重新提供非虚拟的、可核查的信息。这些信息包括下面所有带有 <span className="text-danger">*</span> 的信息。
            </div>
            <Edit schema={webUserSchema} uiSchema={webUserUiSchema}
                data={this.webUserData}
                onItemChanged={this.onWebUserChanged} />
            <Edit schema={webUserContactSchema} uiSchema={webUserContactUiSchema(this.controller.pickAddress)}
                data={this.webUserContactData}
                onItemChanged={this.onWebUserContactChanged} />
            <div className="p-3 bg-white">
                {tipsUI}
                <button type="button" className="btn btn-primary w-100" onClick={() => this.checkOut()}>下一步</button>
            </div>
        </Page>;
    });
}
