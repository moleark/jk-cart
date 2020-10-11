import * as React from 'react';
import { VPage, Page, Scroller, nav } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import { NavHeader, NavFooter } from 'tools/ShopPage';
import { xs } from 'tools/browser';
import { observer } from 'mobx-react-lite';

export class VProductList extends VPage<CProduct> {
    private searchKey: string;
    async open(key: string) {
        this.searchKey = key;
        xs ? this.openPage(this.page) : this.openPage(this.largePage);
    }

    render(key: any) {
        this.searchKey = key;
        return <this.page />
    }

    private onProductClick = async (product: any) => {
        // await this.controller.showProductDetail(product.id);
        let url = "/product/" + product.id.id;
        console.log(url);
        nav.navigate(url);
    }

    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsPager } = this.controller;
        //await this.controller.pageProducts.more();
        productsPager.more();
    }

    private renderProduct = (p: any) => {
        // console.log(p);
        return this.controller.cApp.cProduct.renderProduct(p);
    }

    private page = observer(() => {

        let { productsPager, cApp } = this.controller;
        let { cHome, cCart } = cApp;
        let header = cHome.renderSearchHeader();
        let cart = cCart.renderCartLabel();
        let none = <div className="p-3 text-warning">[无]</div>

        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
    });

    private largePage = () => {
        let { productsPager, cApp } = this.controller;
        let none = <div className="p-3 text-warning">[无]</div>
        /*
        return <ShopPage>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </ShopPage>
        */
        return <Page webNav={{ navRawHeader: <NavHeader />, navRawFooter: <NavFooter /> }}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
    };
}