/* eslint-disable */
import * as React from 'react';
import { VPage, Scroller, Page } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import { Product } from 'model';
import Pagination from 'antd/lib/pagination/Pagination';
import { observer } from 'mobx-react';
import { xs } from 'tools/browser';

export class VPageList extends VPage<CProduct> {

    async open() {
        this.openPage(this.page)
    }

    private onProductClick = async (product: Product) => {
        let { id } = product;
        let url = "/product/" + id;
        this.navigate(url);
    }

    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsPager, esproductsPager } = this.controller;
        if (!(esproductsPager instanceof Array))
            esproductsPager.more();
    }

    private renderProduct = (p: Product) => {
        return this.controller.cApp.cProduct.renderProduct(p, 'productList');
    }

    /* header() {
        return this.isWebNav===true? null: this.controller.cApp.cHome.renderSearchHeader();
    }

    right() {
        return this.isWebNav===true? null: this.controller.cApp.cCart.renderCartLabel();
    } */

    /* content() {
        let { productsPager,esproductsPager, searchKey } = this.controller;
        let none = <div className="p-3 text-warning">[无]</div>;
        return <Page header={''}>
            <div className="bg-white py-2 px-3 my-1 text1"><small className=" small text-muted">搜索: </small>{searchKey}</div>
            <div className="row mx-0 bg-light">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.cApp.cProductCategory.renderRootSideBar()}
                </div>
                <div className="col-lg-9 product-introduct px-0">
                    <List before={''} none={none} items={esproductsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
                    <div className="text-center mt-3 mb-5 border">
                        <Pagination onChange={(v)=>{console.log(v);
                        }} defaultCurrent={1} total={500} />
                    </div>
                </div>
            </div>
        </Page>;
    } */

    private page = observer(() => {

        let { productsPager, esproductsPager, cApp, searchKey, esProductsPagerMore, esProductsTotal, currentPage } = this.controller;
        let { cHome, cCart } = cApp;
        let header: any, cart: any;
        if (xs) {
            header = cHome.renderSearchHeader();
            cart = cCart.renderCartLabel();
        }
        let none = <div className="p-3 text-warning">[无]</div>

        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 my-1 text1"><small className=" small text-muted">搜索: </small>{searchKey}</div>
            <div className="row mx-0 bg-light">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.cApp.cProductCategory.renderRootSideBar()}
                </div>
                <div className="col-lg-9 product-introduct px-0">
                    <List before={''} none={none} items={esproductsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
                    <div className="text-center mt-3 mb-5 d-none d-sm-block">
                        <Pagination onChange={(v) => {
                            document.body.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                            esProductsPagerMore(v);//scrollTo(0,0);
                        }} defaultCurrent={currentPage} pageSize={20} hideOnSinglePage={true}
                            total={esProductsTotal ? esProductsTotal.value : 0} showSizeChanger={false} />
                    </div>
                </div>
            </div>
        </Page>;

        /* return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 mb-1 text1"><small className=" small text-muted">搜索: </small>{searchKey}</div>
            <List before={''} none={none} items={esproductsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page> */
    });

    /* private largePage = () => {
        let { productsPager, cApp } = this.controller;
        //let { renderHeader, renderFooter } = cApp;
        let none = <div className="p-3 text-warning">[无]</div>
        return <Page webNav={{ navRawHeader: renderHeader(), navRawFooter: renderFooter() }}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
    }; */
}