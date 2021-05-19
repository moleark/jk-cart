import * as React from 'react';
import classNames from 'classnames';
import { makeObservable, observable } from 'mobx';
import { Widget } from './widget';
import { ItemSchema, UiSelect } from '../../schema';
import { Context } from '../context';
import { FieldProps } from '../field';

export class SelectWidget extends Widget {
    protected select: HTMLSelectElement;
    protected get ui(): UiSelect {return this._ui as UiSelect};
    readOnly: boolean = false;

	constructor(context:Context, itemSchema:ItemSchema, fieldProps:FieldProps, children: React.ReactNode) {
		super(context, itemSchema, fieldProps, children);
		makeObservable(this, {
			readOnly: observable,
		})
	}

    protected setElementValue(value:any) {this.select.value = value}
    protected onInputChange = (evt:React.ChangeEvent<HTMLSelectElement>) => {
        this.setDataValue(evt.target.value);
    }

    setReadOnly(value:boolean) {this.select.disabled = this.readOnly = !value}
    setDisabled(value:boolean) {this.select.disabled = this.disabled = value}

    render() {
        if (this.readOnly === true) {
            let option = this.ui.list.find(v => v.value === this.value);
            let title = (option === undefined)? '(???)' : option.title;
            return <span className="form-control w-min-6c">{title}</span>;
        }
        return <select
            ref={(select)=>this.select = select}
            className={classNames(this.className, 'form-control')}
            defaultValue={this.defaultValue} 
            onChange={this.onInputChange}>
            {this.ui.list.map((v,index) => {
                let {title, value} = v;
                let cn:string;
                //if (value === undefined || value === null) cn = 'text-light small';
                //else cn = 'text-danger';
                return <option className={cn} key={index} value={value}>{title || value}</option>
            })}
        </select>
    }
}
