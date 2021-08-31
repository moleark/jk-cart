import * as React from 'react';
import classNames from 'classnames';
import { View } from "tonva-react";
import { observer } from 'mobx-react';
import { CPointProduct } from './CPointProduct';

export class VSelectedLable extends View<CPointProduct> {

    render(): JSX.Element { 
        return <this.content />
    };

    private content = observer(() => {
        let { pointProductsSelected, openSelectedPointProduct } = this.controller;
        let { length } = pointProductsSelected;
        let count = 0
        let badge, onClick:any, pointer;
        if (length) {
            for (let i of pointProductsSelected) {
                count += i.quantity;
            }
        }
        if (count > 0) {
            onClick = openSelectedPointProduct;
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }
        return <div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={()=>{if(onClick){onClick()}}}>
            <div>
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-white"></i>
                    <i className="fa fa-shopping-cart fa-stack-1x text-info"></i>
                </span>
                {badge}
            </div>
        </div>
    });
}