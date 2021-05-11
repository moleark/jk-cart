/* eslint-disable */
import * as React from 'react';
import { VPage, Ax, FA, View, A, Image, nav, env } from 'tonva-react';
import { CApp } from './CApp';
import { observer } from 'mobx-react';

interface PCategoryId {
    id: number | string,
    id_test: number | string
};

const ProductCategorys: { [name: string]: PCategoryId } = {
    "有机化学": { id: 47, id_test: 7 },
    "分析化学": { id: 470, id_test: 430 },
    "生命科学": { id: 1013, id_test: 986 },
    "材料科学": { id: 1219, id_test: 1214 },
    "仪器耗材": { id: 1545, id_test: "#" }
};

export class VMainWebNav extends VPage<CApp> {
    content() {
        let { cHome } = this.controller;
        return cHome.tabContent();
    }
}

export class NavHeaderView extends View<CApp> {
    private searchKey: HTMLInputElement;
    render() {
        let vLogin = React.createElement(observer(() => {
            let { user } = this.controller;
            let v: any;
            if (!user) {
                v = <>
                    <Ax className="" href="/register" target="_self">注册</Ax> /&nbsp;
                    <Ax className="" href="/login" target="_self">登录</Ax>
                </>;
            }
            else {
                let { name, nick, icon } = user;
                let Avatar: JSX.Element = !icon ? <FA name="user" size="lg" className="text-primary" /> : <Image className="w-1c h-1c" style={{ width: "1rem", height: "1rem" }} src={icon} />
                v = <>
                    <Ax className="mr-2 nav-item dropdown" href="/me" target="_self">
                        {Avatar}
                        {/* <FA name="user" size="lg" className="text-primary" /> */}
                        <span className="dropdown-menu dropdown-menu-right px-2 m-0">{nick || name}</span>
                    </Ax>
                    {/* <A className="mr-2" href="/me" target="_self">{nick || name}</A> */}
                    <Ax className="mr-2" href="/logout" target="_self">退出</Ax>
                </>;
            }
            return <div className="login" style={{ fontSize: "14px" }}> {v}</div >;
        }));

        let vCartLabel = React.createElement(observer(() => {
            let { store } = this.controller;
			if (!store) return null;
            let count = store.cartCount;
            let vCount: any;
            if (count) vCount = <u className="position-absolute d-flex align-items-center justify-content-center text-white text-right text-decoration-none ml-2"
                style={{ top: "0.2rem", fontSize: "0.6rem", backgroundColor: "red", minWidth: "1rem", padding: "0 3px", height: "1.0rem", borderRadius: '0.6rem' }}>{count}</u>;
            //if (!count) count = undefined;
            return <div className="cart mr-3 pl-1">
                <Ax className="text-primary position-relative" href="/cart">
                    <span className="text-primary small">
                        <FA name="shopping-cart" />
                    </span>
                    {vCount}
                </Ax>
            </div>
        }));

        return <header>
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-auto ml-auto d-flex align-items-center float-right">
                            <div className="phone">
                                <img src="/images/icon/Phone.svg" /> 客服热线： 400-666-7788
                            </div>
                            <div className="area">
                                <a className="px-1" data-toggle="modal">
                                    中国
                                </a>
                            </div>
                            {vCartLabel}
                            {vLogin}
                        </div>
                    </div>
                </div>
            </div >

            <nav className="navbar navbar-expand-lg navbar-dark pad-tb20">
                <div className="container">
                    <a href="/" className="header-logo"><img src="/images/logo.svg" alt="logo" className="img-fluid" /></a>
                    <div className="justify-content-center search-wrap">
                        <ul className="d-none d-lg-flex top-list justify-content-center">
                            <li><a href="/subjectpost/18" type="_blank">特惠活动</a> </li>
                            <li><a href="/myOrders">订单查询</a> </li>
                            <li><a href="/product/mscu/COA" target="_blank">COA</a> </li>
                            <li><a href="/product/mscu/MSDS" target="_blank">SDS</a> </li>
                            <li><a href="/quickOrder" target="_blank">快速订购</a></li>
                        </ul>
                        <div className="custom-search-input">
                            <div className="input-group col-md-12">
                                <form className="w-100" onSubmit={(e: any) => {
                                    e.preventDefault();
                                    let url = "/search/" + encodeURIComponent(this.searchKey.value);
                                    this.navigate(url);
                                }}>
                                    <input type="text" ref={v => this.searchKey = v} className="search-query form-control" placeholder="Search" />
                                </form>
                                <span className="input-group-btn" onClick={() => {
                                    let url = "/search/" + encodeURIComponent(this.searchKey.value);
                                    this.navigate(url);
                                }}>
                                    <button className="btn" type="button">
                                        <img src="/images/icon/magnifier.svg" />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className="navbar-toggle navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="bar1"></span>
                        <span className="bar2"></span>
                        <span className="bar3"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/product-catalog" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    产品<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right m-0" aria-labelledby="navbarDropdownPortfolio">
                                    {
                                        Object.keys(ProductCategorys).map((name: string) => {
                                            let id = env.testing === true ? ProductCategorys[name].id_test : ProductCategorys[name].id;
                                            return <a key={name} className="dropdown-item text-center" href={`/product-catalog/${id}`}>{name}</a>;
                                        })
                                    }
                                </div>
                            </li>

                            {/* 服务菜单 二级菜单开发中
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    服务<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right m-0" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item text-center" href="/myOrders">订单查询</a>
                                    <a className="dropdown-item text-center" href="/pointshop">积分查询</a>
                                </div>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    会员<b className="caret"></b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right m-0" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item text-center" href="/password">修改密码</a>
                                    <a className="dropdown-item text-center" href="/meInfo">账户信息</a>
                                    <a className="dropdown-item text-center" href="/contact">地址管理</a>
                                    <hr className="my-1" />
                                    <a className="dropdown-item text-center" href="/favorites">商品收藏</a>
                                    <a className="dropdown-item text-center" href="/pointshop">积分管理</a>
                                    <a className="dropdown-item text-center" href="/couponManage">卡券管理</a>
                                    <hr className="my-1" />
                                    <a className="dropdown-item text-center" href="/myOrders">订单记录</a>
                                    <a className="dropdown-item text-center" href="/invoice">发票管理</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    }
}

export class NavFooterView extends View<CApp> {
    render() {
        return <div className="d-none d-sm-block footer footer-m reset-z-footer-bg" id="end-page-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <img src="/images/icon/footer-logo.svg" className="footer-logo" />
                        <p>服务科技与工业发展 造福人类</p>
                        <img src="/images/qrcode.jpg" style={{width:100}} className="mt-lg-50 qrcode" />
                        <p className="follow">关注微信公众号</p>
                        {/* <img src="/images/qrcode.jpg" className="w-75 mt-lg-28 qrcode" /> */}
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="footer-title">百灵威集团</div>
                        <ul>
                            <li><a href="/ch/about" target="_blank">公司简介</a></li>
                            <li><a href="/ch/promise" target="_blank">企业承诺</a></li>
                            <li><a href="/ch/recommended-brand" target="_blank">合作品牌</a></li>
                            <li><a href="/job" target="_blank">招贤纳士</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="footer-title">浏览</div>
                        <ul>
                            <li><a href="/information" target="_blank">资讯中心</a></li>
                            <li><a href="/product/mscu/msds" target="_blank">安全说明书(SDS)</a></li>
                            <li><a href="/product-catalog">产品</a></li>
                            <ul className="ml-3">
                                {
                                    Object.keys(ProductCategorys).map((name: string) => {
                                        let id = env.testing === true ? ProductCategorys[name].id_test : ProductCategorys[name].id;
                                        return <li key={name}><a href={`/product-catalog/${id}`}>{name}</a></li>
                                    })
                                }
                            </ul>
                            <li><a href="/hazard-purchase" className="text-danger" target="_blank">危险品购买提示</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="footer-title">联系我们</div>
                        <div className="contact">
                            电话：400-666-7788<br />+86 10 8284 8833
                        </div>
                        <div className="contact">
                            传真：<br />+86 10 8284 9933
                        </div>
                        <div className="contact">
                            电子邮件：<br />
                            <a href="mailto:jkinfo@jkchemical.com">jkinfo@jkchemical.com</a><br />
                            <a href="mailto:jkinfo@jk-sci.com">jkinfo@jk-sci.com</a>
                        </div>
                        <div className="contact">
                            QQ：4006667788
                        </div>
                        {/* <div className="contact">
                            <a href="/ch/contact" target="_blank">更多...</a>
                        </div> */}
                        <div className="footer-social">
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom mt-2 py-1">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-5">
                            严禁在未经同意的情况下使用本网站所有信息
                            | <a href="/legal" target="_blank">法律声明</a>
                            | <a href="/privacy-cn" target="_blank">隐私政策</a>
                        </div>
                        <div className="col-sm-7">
                            京公安网备11010502027473 | <a href="https://beian.miit.gov.cn" target="_blank">京ICP备09071033号-3</a>&nbsp;
                            | <a href="/images/上海百灵威营业执照副本.pdf" target="_blank">上海工商</a>&nbsp;
                            | <a href="/images/危险化学品经营许可证副本.jpg" target="_blank">危险化学品经营许可证</a>
                            | <a href="/images/营业执照副本.jpg" target="_blank"> 营业执照(三证合一)</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
}
