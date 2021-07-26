import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { FA, InputCheckBox, InputIntegerProps, List, Page, uqStringify, VPage } from "tonva-react";
import { InputForm, InputList } from "tonva-react";
import { renderPackX } from "uq-app";
import { ReturnGetCustomerOrderReturnDetail, ReturnGetCustomerOrderReturnMain } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";

export class VOrderReturn extends VPage<CTrial> {
    private returnForm: ReturnForm;
    init(params: any) {
        let data = {...params.main[0], detail: params.detail};
        let props: ReturnFormProps = {
            onNext: this.onNext
        };
        this.returnForm = new ReturnForm(this.controller, data, props);
    }

    header() {return '退货'}
    content() {
        return this.returnForm.render();
    }

    private onNext = () => {
        let d = this.returnForm.getValues().detail.filter(v => (v as any).retQuantity > 0);
        this.openVPage(VOrderReturnReady, d);
    }
}

interface ReturnFormValues extends ReturnGetCustomerOrderReturnMain {
    detail: ReturnGetCustomerOrderReturnDetail[];
}

interface ReturnFormProps {
    onNext: () => void;
}

class ReturnForm extends InputForm<ReturnFormValues> {
    private readonly controller: CTrial;
    private readonly props: ReturnFormProps;
    private detailInputList: InputList<ReturnGetCustomerOrderReturnDetail, ReturnDetailForm>;

    constructor(controller: CTrial, values: ReturnFormValues, props: ReturnFormProps) {
        super(values);
        makeObservable(this, {
            buttonDisabled: computed,
        });
        this.controller = controller;
        this.props = props;
    }
    protected initInputLists() {
        this.detailInputList = new InputList<ReturnGetCustomerOrderReturnDetail, ReturnDetailForm>(
            this.values.detail,
            item => item.id,
            item => new ReturnDetailForm(this.controller, item),
        );
        return {
            detail: this.detailInputList,
        };
    }

    get buttonDisabled() {
        let detailForm =  this.detailInputList?.itemForms.find(v => v.isSelected);
        return this.hasError || detailForm === undefined;
    }

    render() {
        return <div>
            <div className="px-3 py-3">
                <FA className="me-3 text-success" name="file-text-o" size="2x" />
                {uqStringify(this.values)}
            </div>
            <div className="text-warning bg-white px-3 pt-3 pb-1 border-bottom">请点选退货条目</div>
            {this.renderList('detail')}
            <div className="p-3">
                {
                    React.createElement(observer(() => {
                        //let {buttonDisabled} = this.mOrderReturn;
                        //
                        return <button className="btn btn-outline-primary"
                            disabled={this.buttonDisabled}
                            onClick={this.props.onNext}>下一步</button>;
                    }))                
                }
            </div>
        </div>
    }
}

class ReturnDetailForm extends InputForm<ReturnGetCustomerOrderReturnDetail> {
    private readonly controller: CTrial;
    isSelected: boolean = false;

    constructor(controller: CTrial, values: ReturnGetCustomerOrderReturnDetail) {
        super(values);
        makeObservable(this, {
            isSelected: observable,
            onCheckChang: action,
        });
        this.controller = controller;
    }

    protected initWidgets() {
        let {deliver, deliverReturn} = this.values;
        return {
            retQuantity: {
                widgetType: 'number',
                required: true,
                defaultValue: 1,
                max: deliver - deliverReturn,
                min: 0,
            } as InputIntegerProps,

        }
    }

    onCheckChang(checked: boolean) {
        this.isSelected = checked;
    }
    render() {
        return React.createElement(observer(() => {
            let {JkProduct} = this.controller.uqs;
            let {ProductX} = JkProduct;
            let PackX = ProductX.div('packx');
            let {
                main, product, item, quantity, price, amount
                , deliver, deliverDone, deliverTime, deliverReturn, deliverReturnDone
            } = this.values;
            deliverReturn = deliverReturn ?? 0;
            let returnable = quantity - deliverReturn;
            let defaultReturn = 1;
            return <div className="bg-white d-flex">
                <label className="p-3">
                    <InputCheckBox 
                        className="form-check-input p-2"
                        onValueChange={v => this.onCheckChang(v)}
                        disabled={!(deliver > deliverReturn)} />
                </label>
                <div className="py-3 pe-3">
                    <div>{ProductX.tv(product)}</div>
                    <div>{PackX.tv(item, renderPackX)}</div>
                    <div>
                        数量<span className="fs-5 text-primary ms-2 me-5">{returnable}</span>
                        {
                            deliverReturn>0 && <>
                                <small className="text-muted me-2">订单</small>{quantity}
                                <small className="text-muted me-2 ms-3">已退</small>{deliverReturn}
                            </>
                        }
                    </div>
                    <div>
                        price: {price} &nbsp; amount: {amount} 
                    </div>
                    {
                        this.isSelected && <div className="py-3">
                            <span className="text-muted me-3">退货数量</span>
                            {this.renderInput('retQuantity')}
                        </div>
                    }
                </div>
            </div>;
        }))
    }
}


type ReturnDetail =  ReturnGetCustomerOrderReturnDetail & {retQuantity:number};
class VOrderReturnReady extends VPage<CTrial> {
    private returnDetail: ReturnDetail[];
    init(params: any) { this.returnDetail = params; }
    header() {return '确认退货'}
    content() {
        return <div>
            <List items={this.returnDetail} item={{render: this.renderDetail}} />
            <div className="p-3 d-flex">
                <button className="btn btn-outline-info me-5" onClick={() => this.closePage()}>
                    <FA name="angle-left" className="me-2" />上一步
                </button>
                <button className="btn btn-primary" onClick={this.applyReturn}>
                    提交退货申请
                </button>
            </div>
        </div>;
    }

    private applyReturn = async () => {
        let data: {
            orderDetail: number;
            quantity: number;
        }[] = this.returnDetail.filter(v => v.retQuantity > 0).map(v => ({
            orderDetail: v.id,
            quantity: v.retQuantity
        }));
        await this.controller.applyReturn(data);
        this.closePage(3);
        this.openPageElement(<Page header="退货申请提交成功" back="close">
            <div className="p-3">退货申请提交成功</div>
        </Page>);
    }

    private renderDetail = (row:ReturnDetail, index:number) => {
        let {JkProduct} = this.controller.uqs;
        let {ProductX} = JkProduct;
        let PackX = ProductX.div('packx');
        let {
            main, product, item, quantity, price, amount
            , deliver, deliverDone, deliverTime, deliverReturn, deliverReturnDone
            , retQuantity
        } = row;
        deliverReturn = deliverReturn ?? 0;
        return <div className="d-block bg-white py-3 px-3">
            <div>{ProductX.tv(product)}</div>
            <div>{PackX.tv(item, renderPackX)}</div>
            <div>
                退货数量<span className="fs-5 text-primary ms-2 me-5">{retQuantity}</span>
                <small className="text-muted ms-3 me-2">订单: </small>{deliver}
                {deliverReturn>0 && <><small className="text-muted ms-3 me-2">已退</small>{deliverReturn}</>}
            </div>
            <div>
                price: {price} &nbsp; amount: {amount} 
            </div>
        </div>;
    }
}
