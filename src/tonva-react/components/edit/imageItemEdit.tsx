import * as React from 'react';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import { ItemSchema, UiImageItem, UiItem } from '../schema';
import { ImageUploader } from '../resUploader';
import { nav } from '../nav';
import { ItemEdit } from './itemEdit';
import { Edit } from './edit';

export class ImageItemEdit extends ItemEdit {
    get uiItem(): UiImageItem {return this._uiItem as UiImageItem}
	resId: string = null;
	
	constructor(edit:Edit, itemSchema: ItemSchema, uiItem:UiItem, label:string|JSX.Element, value: any) {
		super(edit, itemSchema, uiItem, label, value);
		makeObservable(this, {
			resId: observable
		})
	}

    protected async internalStart():Promise<any> {
        this.resId = this.value;
        return new Promise<any>((resolve, reject) => {
            nav.push(React.createElement(this.page, {resolve:resolve, reject:reject}), ()=>reject());
        });
    }

    /*
    private upload = async () => {
        if (!this.resUploader) return;
        let ret = await this.resUploader.upload();
        if (ret === null) {
            this.overSize = true;
            env.setTimeout('imageItemEdit upload', () => this.overSize = false, 3000);
            return;
        }
        this.resId = ret;
        this.isChanged = (this.resId !== this.value);
    }
    */

    private page = observer((props:{resolve:(value:any)=>void, reject: (resean?:any)=>void}):JSX.Element => {
        let {resolve} = props;
        let size:any = this.uiItem && this.uiItem.size;

        /*
        let right = <button
            className="btn btn-sm btn-success align-self-center"
            disabled={!this.isChanged}
            onClick={()=>resolve(this.resId)}>保存</button>;
        let overSize:any;
        if (this.overSize === true) {
            overSize = <div className="text-danger">
                <i className="fa fa-times-circle" /> 图片文件大小超过2M，无法上传
            </div>;
        }
        */
        return <ImageUploader 
            label={'更改' + this.label}
            id={this.resId}
            size={size}
            onSaved={(resId):Promise<void>=>{resolve(resId); return;}} />;
        /*
        return <Page header={'更改' + this.label} right={right}>
            <div className="my-3 px-3 py-3 bg-white">
                <div>
                    <div>上传图片：</div>
                    <div className="my-3">
                        <ResUploader ref={v=>this.resUploader=v} multiple={false} maxSize={2048} />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={this.upload}>上传</button>
                    </div>
                </div>
                {overSize}
                <div className="small muted my-4">支持JPG、GIF、PNG格式图片，不超过2M。</div>
                <div className="d-flex">
                    <div className="w-12c h-12c mr-4"
                        style={{border: '1px dotted gray', padding: '8px'}}>
                        <Image className="w-100 h-100" src={this.resId} />
                    </div>
                    <div>
                        <div className="small">图片预览</div>
                        <Image className="w-4c h-4c mt-3" src={this.resId} />
                    </div>
                </div>
            </div>
        </Page>;
        */
    })
}
