import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { ItemSchema, UiImageItem } from '../../schema';
import { Image } from '../../image';
import { ImageItemEdit } from '../../edit/imageItemEdit';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import { Context } from '../context';
import { FieldProps } from '../field';

export class ImageWidget extends Widget {
    protected input: HTMLInputElement;
    protected get ui(): UiImageItem {return this._ui as UiImageItem};

	imageSrc: string = null;

	constructor(context:Context, itemSchema:ItemSchema, fieldProps:FieldProps, children: React.ReactNode) {
		super(context, itemSchema, fieldProps, children);
		makeObservable(this, {
			imageSrc: observable,
		})
	}

    init() {
        super.init();
        this.imageSrc = this.value;
    }

    protected onClick = async () => {
        let edit = new ImageItemEdit(undefined, this.itemSchema, this.ui, this.ui.label, this.value);
        let ret = await edit.start();
        if (ret !== null) {
            this.setValue(ret);
            this.imageSrc = ret;
        }
        await edit.end();
    }

    render() {
        return React.createElement(this.observerRender);
    }

    private observerRender = observer(() => {
        let cn = [
            'bg-white p-1 d-flex justify-content-center',
        ];
        let onClick: any;
        if (!this.readOnly && !this.disabled) {
            cn.push('cursor-pointer');
            onClick = this.onClick;
        }
        return <div className={classNames(cn)} onClick={onClick}>
            <Image src={this.imageSrc} className="w-4c h-4c"/>
        </div>;
    });
}
