import * as React from 'react';
import { VPage } from '../vm';
import { Page, Form, ItemSchema, UiSchema, StringSchema, UiPasswordItem, Context, ButtonSchema, UiButton, nav } from '../components';
//import { CenterAppApi } from '../net';
import { CLogin } from './CLogin';

export class VChangePassword extends VPage<CLogin> {
    private schema: ItemSchema[] = [
        {name:'orgPassword', type: 'string', maxLength: 60, required: true} as StringSchema,
        {name:'newPassword', type: 'string', maxLength: 60, required: true} as StringSchema,
        {name:'newPassword1', type: 'string', maxLength: 60, required: true} as StringSchema,
        {name:'submit', type: 'submit'} as ButtonSchema
    ];
    private uiSchema: UiSchema = {
        items: {
            orgPassword: {
                widget: 'password',
                label: '原密码',
                placeholder: '输入原来的密码'
            } as UiPasswordItem,
            newPassword: {
                widget: 'password',
                label: '新密码',
                placeholder: '输入新设的密码'
            } as UiPasswordItem,
            newPassword1: {
                widget: 'password',
                label: '确认密码', 
                placeholder: '再次输入新设密码'
            } as UiPasswordItem,
            submit: {
                widget: 'button',
                label: '提交',
                className: 'btn btn-primary'
            } as UiButton,
        }
	};
	
	private onChange: (orgPassword:string, newPassword:string) => Promise<boolean>
	init(onChange: (orgPassword:string, newPassword:string) => Promise<boolean>) {
		this.onChange = onChange;
	}

    private onSubmit = async (name:string, context: Context):Promise<any> => {
        let {orgPassword, newPassword, newPassword1} = context.data;
        if (newPassword !== newPassword1) {
            context.setError('newPassword1', '新密码错误，请重新输入');
            return;
        }
        //let centerAppApi = new CenterAppApi('tv/', undefined);
		//let ret = await centerAppApi.changePassword({orgPassword, newPassword});
		let ret = await this.onChange(orgPassword, newPassword);
        if (ret === false) {
            context.setError('orgPassword', '原密码错误');
            return;
        }
        nav.replace(<Page header="修改密码" back="close">
            <div className="m-3  text-success">
                密码修改成功！
            </div>
        </Page>);
        return;
    }

	header() {return '修改密码'}

    content() {
        return <Form
			className="m-3" 
			schema={this.schema}
			uiSchema={this.uiSchema}
			onButtonClick={this.onSubmit}
			fieldLabelSize={2} />
    }
}
