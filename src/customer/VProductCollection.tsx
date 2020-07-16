import * as React from 'react';
import { View, FA, EasyDate, LMR, BoxId } from 'tonva';

import { CProduct } from '../product/CProduct';

export class VProductCollection extends View<CProduct> {
    private favoriteOrCancel = async (product: BoxId) => {
        let { favoriteOrCancel } = this.controller;
        // await favoriteOrCancel(product);
    }
    render(param: any): JSX.Element {
        let { isValid } = param;
        return <div className="d-flex justify-content-end">
            <small onClick={(e) => { e.stopPropagation(); this.favoriteOrCancel(param) }}>
                <FA className="mr-3 text-warning" name={`${isValid !== 1 ? "star" : 'star-o'}`} size="lg" />
            </small>
        </div>
    }
}
