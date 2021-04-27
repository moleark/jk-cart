import * as React from 'react';
import { View, FA } from 'tonva';
import { CCart } from './CCart';

export class VCartLabelWeb extends View<CCart> {

    render() {
        let { cart } = this.controller;
        if (!cart) return null;
        let count = cart.count.get();
        let vCount: any;
        if (count) vCount = <u className="position-absolute d-flex align-items-center justify-content-center text-white text-right text-decoration-none ml-2"
            style={{ top: "0.2rem", fontSize: "0.6rem", backgroundColor: "red", minWidth: "1rem", padding: "0 3px", height: "1.0rem", borderRadius: '0.6rem' }}>{count}</u>;
        //if (!count) count = undefined;
        return <a className="text-primary position-relative" href="/cart">
            <span className="text-primary small">
                <FA name="shopping-cart" />
            </span>
            {vCount}
        </a>
    }
}