/* eslint-disable */
import * as React from 'react';
import { VPage, Ax, FA, View, A, Image } from 'tonva';
import { CApp } from './CApp';
import { observer } from 'mobx-react';

export class VMainWebNav extends VPage<CApp> {
    content() {
        let { cHome } = this.controller;
        return cHome.tab.content();
    }
}

export class NavHeaderView extends View<CApp> {
    private searchKey: HTMLInputElement;
    render() {
        let vLogin = React.createElement(() => {
            let { user } = this.controller;
            let v: any;
            if (!user) {
                v = <>
                    <A className="" href="/register" target="_self">注册</A>/
                    <A className="" href="/login" target="_self">登录</A>
                </>;
            }
            else {
                let { name, nick, icon } = user;
                let Avatar: JSX.Element = !icon ? <FA name="user" size="lg" className="text-primary" /> : <Image className="w-1c h-1c" src={icon} />
                v = <>
                    <A className="mr-2 nav-item dropdown" href="/me" target="_self">
                        {Avatar}
                        {/* <FA name="user" size="lg" className="text-primary" /> */}
                        <span className="dropdown-menu dropdown-menu-right px-2">{nick || name}</span>
                    </A>
                    {/* <A className="mr-2" href="/me" target="_self">{nick || name}</A> */}
                    <A className="mr-2" href="/logout" target="_self">退出</A>
                </>;
            }
            return <span className="small">{v}</span>;
        });
        let vCartLabel = React.createElement(observer(() => {
            let { cart } = this.controller;
            if (!cart) return null;
            let count = cart.count.get();
            let vCount: any;
            if (count) vCount = <u>{count}</u>;
            //if (!count) count = undefined;
            return <Ax className="mr-3 text-primary jk-cart position-relative" href="/cart">
                <FA name="shopping-cart" />{vCount}
            </Ax>;
        }));

        return <header>
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-auto ml-auto d-flex align-items-center">
                            <div className="phone mr-2 small">
                                <img src="/images/Phone.svg" /> 400-666-7788
                            </div>
                            <a className="small mr-2" data-toggle="modal" data-target="#choosecountry">
                                中国
							</a>
                            {vCartLabel}
                            {vLogin}
                        </div>
                    </div>
                </div>
            </div >

            <nav className="navbar navbar-expand-lg mb-1">
                <div className="container">
                    <A href="/home" className="header-logo"><img src="/images/logo.svg" alt="logo" className="img-fluid" /></A>
                    <div className="justify-content-center search-wrap">
                        <ul className="d-none d-lg-flex top-list justify-content-center">
                            <li><a href="https://web.jkchemical.com/subjectpost/18" type="_blank">特惠活动</a> </li>
                            <li><a href="/myOrders">订单查询</a> </li>
                            <li><a href="/product/mscu/COA" target="_blank">COA</a> </li>
                            <li><a href="/product/mscu/MSDS" target="_blank">SDS</a> </li>
                        </ul>
                        <div className="custom-search-input">
                            <div className="input-group col-md-12">
                                <form className="w-100" onSubmit={(e: any) => {
                                    e.preventDefault();
                                    let url = "/search/" + this.searchKey.value;
                                    this.navigate(url);
                                }}>
                                    <input type="text" ref={v => this.searchKey = v} className="search-query form-control" placeholder="Search" />
                                </form>
                                <span className="input-group-btn" onClick={() => {
                                    let url = "/search/" + this.searchKey.value;
                                    this.navigate(url);
                                }}>
                                    <button className="btn" type="button">
                                        <img src="/images/magnifier.svg" />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="display-mobile-block-login d-block d-sm-none">登入</a>

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
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    产品
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                                    <a className="dropdown-item" href="/productCategory/7">有机化学</a>
                                    <a className="dropdown-item" href="/productCategory/430">分析化学</a>
                                    <a className="dropdown-item" href="/productCategory/986">生命科学</a>
                                    <a className="dropdown-item" href="/productCategory/1214">材料科学</a>
                                    <a className="dropdown-item" href="/productCategory/#">仪器耗材</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    服务
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="/myOrders">订单查询</a>
                                    <a className="dropdown-item" href="/pointshop">积分查询</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    会员
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="/password">修改密码</a>
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
        return <div className="d-none d-sm-block bg-light pt-4 reset-z-footer-bg">
            <div className="container reset-z-ul reset-z-ul-a">
                <div className="row reset-z-footer-title reset-z-contact">
                    <div className="col-lg-3 col-xs-6">
                        <img src="/images/footer-logo.svg" />
                        <p className="mt-lg-3" style={{ fontSize: 12 }}>促进科技与工业<br />
                                发展，造福人类</p>
                        <img src="/images/qrcode.jpg" className="w-75 mt-lg-28 qrcode" />
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="footer-title">百灵威集团</div>
                        <ul>
                            <li><a href="https://web.jkchemical.com/ch/about" target="_blank">公司简介</a></li>
                            <li><a href="https://web.jkchemical.com/ch/promise" target="_blank">企业承诺</a></li>
                            <li><a href="https://web.jkchemical.com/ch/recommended-brand" target="_blank">合作品牌</a></li>
                            <li><a href="https://web.jkchemical.com/job" target="_blank">招贤纳士</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="font-weight-bold">浏览</div>
                        <ul>
                            <li><a href="https://web.jkchemical.com/information" target="_blank">资讯中心</a></li>
                            <li><a href="/product/mscu/coa" target="_blank">质量证书(COA)</a></li>
                            <li><a href="/product/mscu/msds" target="_blank">安全说明书(SDS)</a></li>
                            <li><a href="#">产品</a></li>
                            <ul className="ml-3">
                                <li><a href="/productCategory/7">有机化学</a></li>
                                <li><a href="/productCategory/430">分析化学</a></li>
                                <li><a href="/productCategory/986">生命科学</a></li>
                                <li><a href="/productCategory/1214">材料科学</a></li>
                                <li><a href="/productCategory/#">仪器耗材</a></li>
                            </ul>
                            <li><a href="/product/mscu/msds" target="_blank">危险品购买提示</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
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
                        <div className="footer-social">
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom mt-2 py-1">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-5">
                            严禁在未经同意的情况下使用本网站所有信息 | <a>法律声明</a> | <a href="https://web.jkchemical.com/privacy">隐私政策</a>
                        </div>
                        <div className="col-sm-7">
                            京公安网备11010502027473 | <a href="https://beian.miit.gov.cn" target="_blank">京ICP备09071033号-3</a>&nbsp;
                            | <a href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20120328090456140" target="_blank">上海工商</a>&nbsp;
                            | <a target="_blank">危险化学品经营许可证</a> | <a target="_blank"> 营业执照(三证合一)</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
}
