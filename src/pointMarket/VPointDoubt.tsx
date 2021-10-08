import React from 'react';
import { VPage, Page, FA, Form, ItemSchema, UiSchema, Context, StringSchema, UiTextAreaItem, ButtonSchema, UiButton } from "tonva-react";
import { CPointProduct } from "./CPointProduct";
import { makeObservable, observable } from 'mobx';
import { GLOABLE } from 'cartenv';
import { observer } from 'mobx-react';

export class VPointDoubt extends VPage<CPointProduct> {

    private form: Form;
    tip: string;

    constructor(c: CPointProduct) {
        super(c);
        makeObservable(this, {
            tip: observable
        });
    }

    async open(params: any) {
        this.openPage(this.page, params);
    }

    private schema: ItemSchema[] = [
        { name: 'question', type: 'string' } as StringSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            question: {
                widget: 'textarea', label: '请在此描述您遇到的积分问题：', rules: (value: string) => {
                    if (!value) return "请填写您的问题描述！";
                }
            } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary w-50" } as UiButton
        }
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        console.log(context.data);
        this.tip = "感谢您提交问题，我们将尽快为您处理！";
        setTimeout(() => { this.tip = undefined; this.closePage() }, GLOABLE.TIPDISPLAYTIME);
    }

    private saveMainAccount = async () => {
        if (!this.form) return;
        await this.form.buttonClick('submit');
    }

    private applyAuditUser = async () => {
        await this.controller.applyAuditUser();
        this.tip = "催促成功，我们将尽快为您处理！";
        setTimeout(() => { this.tip = undefined; this.closePage() }, GLOABLE.TIPDISPLAYTIME);
    }

    private tipsUI = observer(() => {
        let tipsUI = <></>;
        if (this.tip) {
            tipsUI = <div className="small text-danger">
                {this.tip}
            </div>
        }
        return tipsUI;
    })

    private page = (param: any) => {

        let content = undefined;
        let { currentUser, currentCustomer, webUsers } = param;
        if (!currentCustomer) {
            content = <>
                <div className="alert alert-primary Card" role="alert">
                    <h5><FA name="question-circle" className="mr-3"></FA>账户审核中</h5>
                    <div className="card-body">
                        <p>您的账号正在审核中，审核通过后，积分方可正确显示，请您耐心等待！</p>
                        <p>您也可以点击以下按钮催促审核：</p>
                        <div className="d-flex flex-column align-items-center">
                            <button className="btn btn-primary w-50 mb-2" onClick={this.applyAuditUser}>催促审核</button>
                            {React.createElement(this.tipsUI)}
                        </div>
                    </div>
                </div>
            </>
        } else {
            switch (webUsers.length) {
                case 0:
                    break;
                case 1:
                    content = <>
                        <div className="alert alert-primary Card" role="alert">
                            <h5><FA name="question-circle" className="mr-3"></FA>问题提交</h5>
                            <div className="card-body">
                                <p>您可以在这里提交遇到的积分问题，我们将尽快为您解决！</p>
                            </div>
                        </div>
                        <Form ref={v => this.form = v} schema={this.schema} uiSchema={this.uiSchema} formData={{}}
                            onButtonClick={this.onFormButtonClick}></Form>
                        <div className="d-flex flex-column align-items-center">
                            <button type="button" className="btn btn-primary w-50 mb-2" onClick={this.saveMainAccount}>提交</button>
                            {React.createElement(this.tipsUI)}
                        </div>
                    </>
                    break;
                default:
                    content = <>
                        <div className="alert alert-primary Card" role="alert">
                            <h5><FA name="question-circle" className="mr-3"></FA>多账户冲突</h5>
                            <div className="card-body">
                                <p>系统检测到您可能在百灵威注册了以下多个账户，积分可能存在其他账户中，请登录其他账号查看积分是否正确: </p>
                            </div>
                            {React.createElement(this.tipsUI)}
                        </div>
                        <ul>
                            {webUsers.filter((u: any) => u.id !== currentUser.id).map((u: any) => {
                                let { id, name, firstName, lastName, organizationName } = u;
                                let title = name || ((firstName || '') + (lastName || '')) || '';
                                title += organizationName ? "(" + organizationName + ')' : '';
                                return <li key={id}>
                                    {title}
                                </li>
                            })}
                        </ul>
                    </>
                    break;
            }
        }
        return <Page header="积分问题解决">
            <div className="bg-white p-3">
                {content}
            </div>
        </Page>
    }
}
/*
                    (this.uiSchema.items.main as UiRadio).list = webUsers.map((u: any) => {
                        let { id, name, firstName, lastName, organizationName } = u;
                        let title = name || ((firstName || '') + (lastName || '')) || '';
                        title += organizationName ? "(" + organizationName + ')' : '';
                        return { value: id, title: title }
                    })
                    content = <div className="bg-white p-3">
                        <div className="alert alert-primary Card" role="alert">
                            <h5>
                                <FA name="question-circle" className="mr-3"></FA>多账户冲突
                        </h5>
                            <div className="card-body">
                                <p>
                                    系统检测到您在百灵威注册了以下多个账户，请选择其一作为您的常用账户，
                                选定后，您的积分将在<span className="text-danger">24小时内</span>同步在该常用账户中。
                            </p>
                            </div>
                        </div>
                        <div>
                            <Form className="my-3"
                                ref={v => this.form = v}
                                formData={{ main: 24 }} schema={this.schema} uiSchema={this.uiSchema}
                                onButtonClick={this.onFormButtonClick} />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary w-50" onClick={this.saveMainAccount}>确认</button>
                            </div>
                        </div>
                    </div>
*/