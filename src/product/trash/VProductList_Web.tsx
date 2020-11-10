import * as React from 'react';
import { CProduct } from '../CProduct';
import { List, View, Page, Scroller } from 'tonva';
// import { renderProduct } from './VProductView';

export class VProductList_Web extends View<CProduct> {

    private onProductClick = async (product: any) => {
        // await this.controller.showProductDetail(product.id);
        let id = product.id;
        document.location.href = '../product/' + + id.obj.id;
    }

    private renderProduct = (p: any) => {
        // console.log(p);
        return this.controller.cApp.cProduct.renderProduct(p);
    }

    render(key: string) {
        let { productsPager, cApp } = this.controller;
        let none = <div className="p-3 text-warning">[无]</div>
        return <div>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{key}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </div>

    }
}