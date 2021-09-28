import * as React from 'react';
import { observable } from 'mobx';
import {
    userApi, ItemSchema, StringSchema, ImageSchema, UiTextItem, UiImageItem, nav, Page,
    Edit, UiSchema, VPage, Prop, FA, IconText, PropGrid
} from 'tonva-react';
import { CMe } from './CMe';

export class VEditMe extends VPage<CMe>{

    async open(param: any) {
        this.openPage(this.page);
    }

    private schema: ItemSchema[] = [
        { name: 'nick', type: 'string' } as StringSchema,
        { name: 'icon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' } as UiTextItem,
            icon: { widget: 'image', label: '头像' } as UiImageItem,
        }
    }
    @observable private data: any;

    constructor(props: any) {
        super(props);
        let { nick, icon } = nav.user;
        this.data = {
            nick: nick,
            icon: icon,
        };
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        nav.user.name = newValue;
        nav.saveLocalUser();
    }

	private onExit = () => {
        nav.showLogout();
    }

	private changePassword = async () => {
        await nav.changePassword();
    }

    private page = () => {
		let { schema, uiSchema, data, onItemChanged } = this;
		let gridRows: Prop[] = [
			'',
			{
				type: 'component',
				component: <IconText iconClass="text-info mr-2" icon="key" text={this.t('changePassword')} />,
				onClick: this.changePassword
			},
			'',
			'',
			{
				type: 'component',
				bk: '',
				component: <div className="w-100 text-center">
					<button className="btn btn-danger w-100 w-max-20c" onClick={this.onExit}>
						<FA name="sign-out" size="lg" /> {this.t('logout')}
					</button>
				</div>
			},
		];


		/*
		let vAdmin: any;
		
		let { role } = this.controller;
		if ((role & 2) === 2) {
			vAdmin = <div className="px-3 py-2 cursor-pointer bg-white border-bottom" onClick={this.controller.showAdmin}>管理员</div>;
		}
		{vAdmin}
		*/
        return <Page header="个人信息">
            <Edit schema={schema} uiSchema={uiSchema}
                data={data}
                onItemChanged={onItemChanged} />
			<PropGrid rows={gridRows} values={{}} />
        </Page>;
    }
}

export const webUserSchema: ItemSchema[] = [
    { name: 'firstName', type: 'string', required: true } as StringSchema,
    { name: 'gender', type: 'string' } as StringSchema,
    { name: 'salutation', type: 'string' } as StringSchema,
    { name: 'organizationName', type: 'string', required: true } as StringSchema,
    { name: 'departmentName', type: 'string' } as StringSchema,
];

