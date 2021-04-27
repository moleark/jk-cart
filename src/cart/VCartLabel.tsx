/* eslint-disable */
import * as React from 'react';
import classNames from 'classnames';
import { View, nav } from 'tonva';
import { CCart } from './CCart';
import { observer } from 'mobx-react';

export class VCartLabel extends View<CCart> {

    private showCart = async () => {
        let { cart } = this.controller;
		cart.editButton.set(false);
        nav.navigate("/cart");
    }

    render(): JSX.Element {
		return React.createElement(observer(() => {
			let { cart } = this.controller;
			let count: any = cart.count.get();
			let badge, onClick, pointer;
			if (count > 0) {
				onClick = this.showCart;
				pointer = 'cursor-pointer';
				if (count < 100) badge = <u style={{right:0}}>{count}</u>;
				else badge = <u style={{right:0}}>99+</u>;
			}
			
			return <div className={classNames('jk-cart ', pointer)} onClick={onClick}>
				<div>
					<span className="fa-stack w-auto h-auto">
						<i className="fa fa-square fa-stack-2x text-white d-none"></i>
						<span className="shopping-cart"></span>
					</span>
					{badge}
				</div>
			</div>
			
		}));
	}
}