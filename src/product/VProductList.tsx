import * as React from 'react';
import { VPage, Page, Scroller } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import logo from '../images/logo.png';
import magnifier from '../images/magnifier.svg'
// import { renderProduct } from './VProductView';

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

    private renderProduct = (p: any) => {
        // console.log(p);
        return this.controller.cApp.cProduct.renderProduct(p);
    }

    private page = () => {

        let { productsPager, cApp } = this.controller;
        let { cHome, cCart } = cApp;
        let header = cHome.renderSearchHeader();
        let cart = cCart.renderCartLabel();
        let none = <div className="p-3 text-warning">[无]</div>
        /*
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
        */
        return <div className="bg-light">
            <header className="d-flex align-items-center p-1">
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand mr-1">
                        {<img className="m-1 ml-2" src={logo} alt="logo" style={{ height: "3rem", width: "2.5rem" }} />}
                    </a>
                    <form className="custom-search-input">
                        <div className="input-group">
                            <input name="keyInput" type="text" className="form-control" style={{ borderRadius: 30 }} placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn" type="submit">
                                    <img src={magnifier} alt="magnifier" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <button className="narbar-toggler" type="button" data-toggle="collapse" data-target="#navBarResponsive"
                        aria-controls="navBarResponsive" aria-expanded="false">
                        <span className="narbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navBarResponsive">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    产品<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    服务<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item"
                                        href="http://www.jkchemical.com/Member/Center/SaleOrderList.aspx?language=ch">订单查询
                                </a>
                                    <a className="dropdown-item"
                                        href="https://www.jkchemical.com/PointsSearch.aspx?language=ch">积分查询</a>

                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownBlog" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    会员<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item"
                                        href="https://www.jkchemical.com/ChangePassword.aspx?language=ch">修改密码</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div id="login">
                                </div>
                            </li>
                            <li className="nav-item display-none">
                                <a className="nav-link shopping-cart"
                                    href="https://www.jkchemical.com/Member/Share/Shopping.aspx?language=ch">
                                    <img src="<%=$root%>img/commerce-and-shopping.svg" width="40px" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main>
                <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
                <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
            </main>
        </div>
    };
}