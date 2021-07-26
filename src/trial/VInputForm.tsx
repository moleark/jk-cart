import { observer } from "mobx-react";
import React from "react";
import { InputCheckBox, InputCheckBoxProps, InputIntegerProps, VPage } from "tonva-react";
import { InputForm, InputList } from "tonva-react";
import { CTrial } from "./CTrial";

export class VInputForm extends VPage<CTrial> {
    private data: any;
    private vDataForm: VDataForm;
    init(params: any) {
        this.data = params;
        this.vDataForm = new VDataForm(params);
    }
    header() {return '测试InputForm'}
    content() {
        return <div >
            <div className="">{this.vDataForm.render()}</div>
            <div className="m-3">
                {React.createElement(observer(() => {
                    return <button 
                        className="btn btn-primary" 
                        disabled={this.vDataForm.hasError}
                        onClick={this.onBtnClick}>输入结果</button>
                }))}

                
            </div>
        </div>;
    }

    private onBtnClick = () => {
        let v = this.vDataForm.getValues();
        let s = JSON.stringify(v);
        alert(s);
    }
}

interface DataFormDetail {
    key: number;
    selected: boolean;
    a: number;
};

class VDataForm extends InputForm<any> {
    private detailInputList: InputList<DataFormDetail, VItemForm>;
    protected initWidgets() {
        return {
            selected: {
                widgetType: 'boolean',
            } as InputCheckBoxProps,
            a: {
                widgetType: 'number',
                required: true,
                max: 10,
                min: 3,
            } as InputIntegerProps,
        };
    }
    protected initInputLists() {
        this.detailInputList = new InputList(
            [
                {key: 1, selected: false, a: 1},
                {key: 2, selected: true, a: 2},
            ],
            (item) => item.key,
            (item) => new VItemForm(item)
        );

        return { detail: this.detailInputList };
    }

    render() {
        return <div>
            <div className="mx-3 py-5">
                {this.renderInput('selected')}
                {this.renderInput('a')}
            </div>
            <div className="d-flex align-items-end justify-content-between mx-3 mb-1">
                <label>
                    <InputCheckBox onValueChange={this.selectAll} />
                    <span className="ms-2">全选</span>
                </label>
                <button className="btn btn-outline-info" 
                    onClick={this.addDetail}>+</button>
            </div>
            <div className="border-bottom">{this.renderList('detail')}</div>
            <div className="p-3">
            </div>
        </div>;
    }

    private selectAll = (isSelected: boolean) => {
        this.detailInputList.setEachValue('selected', isSelected);
    }

    private addDetail = () => {
        let list = this.getInputList('detail');
        list.addItem({});
    }
}

class VItemForm extends InputForm<any> {
    protected initWidgets() {
        return {
            selected: {
                widgetType: 'boolean',
            } as InputCheckBoxProps,
            a: {
                widgetType: 'number',
                required: true,
                max: 10,
                min: 3,
            } as InputIntegerProps,
        }
    }
    render() {
        return <div className="d-flex py-2 bg-white border-top">
            <span className="mx-3">{this.renderInput('selected')}</span>
            <span className="mx-3">{this.renderInput('a')}</span>
        </div>;
    }
}
