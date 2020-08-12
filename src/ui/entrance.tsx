import * as React from 'react';
import { VPage, View, List } from 'tonva';
import { CApp } from 'CApp';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.png';
import magnifier from '../images/magnifier.svg'

export class Entrance extends VPage<CApp>{

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = (param: any) => {
        return <div className="bg-light">
            <header className="d-flex align-items-center p-1">
                <nav className="navbar navbar-expand-md">
                    <Link to="/gege" className="navbar-brand mr-1">
                        {<img className="m-1 ml-2" src={logo} alt="logo" style={{ height: "3rem", width: "2.5rem" }} />}
                    </Link>
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
            <Route path="/test/search/:key" render={(props: any) => {
                let { match, location, history } = props;
                let { params } = match;
                return this.controller.cProduct.renderProductList2(params.key);
                // return <div>{params.key}</div>;
            }} />
            <Route path="/test/product/:id" render={async (props: any) => {
                // <h1>gegege{props.match.params.id}</h1>
                return await this.controller.cProduct.renderProductDetail(props.match.params.id);
            }} />
        </div>
    }
}