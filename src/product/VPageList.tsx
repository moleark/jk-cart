/* eslint-disable */
import { VPage, Scroller } from 'tonva-react';
import { CProduct } from './CProduct';
import { List } from 'tonva-react';
import { Product } from '../store';
import Pagination from 'antd/lib/pagination/Pagination';
import { observer } from 'mobx-react';

export class VPageList extends VPage<CProduct> {

    private onProductClick = async (product: Product) => {
        let { id } = product;
        let url = "/product/" + id;
        this.navigate(url);
    }

    onPageScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsPager, esproductsPager } = this.controller;
        if (!(esproductsPager instanceof Array))
            esproductsPager.more();
    }

    private renderProduct = (p: Product) => {
        return this.controller.cApp.cProduct.renderProduct(p, 'productList');
    }


    /*
    async open() {
        this.openPage(this.page)
    }

    private page = observer(() => {

        let { productsPager, esproductsPager, cApp, searchKey, esProductsPagerMore, esProductsTotal, currentPage } = this.controller;
        let { cHome, cCart } = cApp;
        let header: any, cart: any;
        if (xs) {
            header = cHome.renderSearchHeader();
            cart = cCart.renderCartLabel();
        }
        let none = <div className="p-3 text-warning">[无]</div>

        return <Page header={header} right={cart} onScrollBottom={this.onPageScrollBottom}>
            <div className="breadcrumbs mb-4"><small className="small text-muted">搜索: </small>{searchKey}</div>
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
    });
    */

    header() {
        return this.isWebNav === true ? null : this.controller.cApp.cHome.renderSearchHeader();
    }

    right() {
        return this.isWebNav === true ? null : this.controller.cApp.renderCartLabel();
    }

    content() {
        return <this.contentView />
    }

    private contentView = observer(() => {

        let { productsPager, esproductsPager, cApp, searchKey, esProductsPagerMore, esProductsTotal, currentPage } = this.controller;
        let none = <div className="p-3 text-warning">[无]</div>;
        return <section className="container mt-lg-2">
            <div className="breadcrumbs mb-4"><small className=" small text-muted">搜索: </small>{searchKey}</div>
            <div className="container display-mobile">
                {cApp.cProductCategory.renderRootSideBarByMob()}
            </div>
            <div className="row">
                <div className="col-lg-3 product-side display-desktop">{/* d-none d-lg-block col-lg-3 product-side */}
                    {/* col-lg-3 product-side display-desktop */}
                    {cApp.cProductCategory.renderRootSideBar()}
                </div>
                <div className="col-lg-9 product-introduct">
                    <List before={''} none={none} items={esproductsPager} className="bg-white"
                        item={{ render: this.renderProduct,/*  onClick: this.onProductClick, */ className: "py-3 border-bottom" }} />
                    <div className="text-center mt-lg-65">
                        <Pagination onChange={(v) => {
                            document.body.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                            esProductsPagerMore(v);//scrollTo(0,0);
                        }} defaultCurrent={currentPage} pageSize={20} hideOnSinglePage={true}
                            total={esProductsTotal ? esProductsTotal.value : 0} showSizeChanger={false} className="page-item" />
                    </div>
                </div>
            </div>
        </section>;
    })
}