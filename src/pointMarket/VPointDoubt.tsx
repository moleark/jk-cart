import React from 'react';
import { VPage, Page, FA, Form, ItemSchema, UiSchema, ArrSchema, ObjectSchema, UiArr, UiTextItem, tv, NumSchema, UiRadio, Context } from 'tonva';
import { CPointProduct } from "./CPointProduct";

export class VPointDoubt extends VPage<CPointProduct> {

    private webUsers: any[];
    private form: Form;
    async open(params: any) {
        // this.webUsers = params.webUsers;
        this.openPage(this.page, params);
    }

    private schema: ItemSchema[] = [
        { name: 'main', type: 'number' } as NumSchema
    ];
    private uiSchema: UiSchema = {
        items: {
            main: { widget: 'radio', label: '设置常用账户', list: [], className: "" } as UiRadio
        }
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        console.log(context.data);
    }

    private saveMainAccount = async () => {
        if (!this.form) return;
        await this.form.buttonClick('submit');
    }

    private page = (param: any) => {

        let content = undefined;
        let { webUsers } = param;
        switch (webUsers.length) {
            case 0:
                content = <div className="alert alert-primary Card" role="alert">

                </div>
                break;
            case 1:
                break;
            default:
                (this.uiSchema.items.main as UiRadio).list = webUsers.map((u: any) => {
                    let { id, name, firstName, lastName, organizationName } = u;
                    let title = name || ((firstName || '') + (lastName || '')) || '';
                    title += organizationName ? "(" + organizationName + ')' : '';
                    return { value: id, title: title }
                })
                content = <div className="bg-white p-3">
                    <div className="alert alert-primary Card" role="alert">
                        <h5>
                            <FA name="question-circle" className="mr-3"></FA>
                        多账户冲突
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
                break;
        }
        return <Page header="积分问题解决">
            {content}
        </Page>
    }
}