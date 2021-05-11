import * as React from 'react';
import { UiRadio } from '../schema';
import { nav } from '../nav';
import { Page } from '../page/page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';

export class RadioItemEdit extends ItemEdit {
    get uiItem(): UiRadio {return this._uiItem as UiRadio}

	init() {
        if (this.value === undefined) {
            this.value = this._uiItem===undefined? undefined : this._uiItem.defaultValue;
        }
	}

    protected async internalStart():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let element = React.createElement(this.page, {resolve:resolve, reject:reject});
            nav.push(element,reject);
        });
    }

    private onChange = (value: any) => {
        this.newValue = value;
        let preValue = this.value;
        this.isChanged = (this.newValue !== preValue);
    }

    private page = observer((props:{resolve:(value:any)=>void, reject: (resean?:any)=>void}):JSX.Element => {
        let {resolve} = props;
        let {name} = this.itemSchema;
        let {list} = this.uiItem;
        let right = <button
            className="btn btn-sm btn-success align-self-center mr-2"
            disabled={!this.isChanged}
            onClick={()=>{
                this.verifyValue();
                if (!this.error) resolve(this.newValue);
            }}>保存</button>;
        let content = list?
            list.map((v, index:number) => {
                let {title, value} = v;
                return <div key={index} className="col"><label className="px-3 py-2 cursor-pointer">
                    <input name={name} type="radio" value={value} 
                        onClick={()=>this.onChange(value)} 
                        defaultChecked={value === this.value} /> {title || value} &nbsp;
                </label></div>;
            })
            :
            <>no list defined</>;
        return <Page header={'更改' + this.label} right={right}>
            <div className="m-3">
				<div className="row row-cols-2 row-cols-sm-3 row-cols-md-4">{content}</div>
			</div>
        </Page>;
    })
}
