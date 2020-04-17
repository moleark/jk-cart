import * as React from 'react';
import { VPage, Page, Scroller } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import { observer } from 'mobx-react';
import { renderProduct } from './VProductView';

export class VProductList extends VPage<CProduct> {

    private searchKey: string;
    async open(key: string) {
        this.searchKey = key;
        this.openPage(this.page);
    }

    private onProductClick = async (product: any) => {
        await this.controller.showProductDetail(product.id);
    }

    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsPager } = this.controller;
        //await this.controller.pageProducts.more();
        productsPager.more();
    }

    private page = observer(() => {

        let { productsPager, cApp } = this.controller;
        let { cHome, cCart } = cApp;
        let header = cHome.renderSearchHeader();
        let cart = cCart.renderCartLabel();
        let none = <div className="p-3 text-warning">[无]</div>
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: renderProduct, onClick: this.onProductClick }} />
        </Page>
    });
}