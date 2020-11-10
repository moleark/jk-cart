/* eslint-disable */
import * as React from 'react';
import classNames from 'classnames';
import { View, nav } from 'tonva';
import { CCart } from './CCart';
import { observer } from 'mobx-react';

export class VCartLabel extends View<CCart> {

    private showCart = async () => {
        let { cart } = this.controller.cApp;
        cart.editButton.set(false);
        // this.controller.start();
        nav.navigate("/cart");
    }

    render(param: any): JSX.Element {
        return <this.content />
    };

    private content = observer(() => {
        let { cart } = this.controller.cApp;
        let count: any = cart.count.get();
        let badge, onClick, pointer;
        if (count > 0) {
            onClick = this.showCart;
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }
        /*
        return <div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={onClick}>
            <li className="nav-item d-none d-lg-block">
                <a className="nav-link shopping-cart" href="#">购物车</a>
                {badge}
            </li>
        </div>
        */
        
        return <div className={classNames('jk-cart ', pointer)} onClick={onClick}>
            <div>
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-white d-none"></i>
                    <span className="shopping-cart"></span>
                </span>
                {badge}
            </div>
        </div>
        
    });
}