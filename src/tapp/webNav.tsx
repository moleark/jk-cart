/* eslint-disable */
import * as React from 'react';
import { VPage, Ax, FA, View, A } from 'tonva';
import logo from '../images/logo.svg';
import footer_logo from '../images/footer-logo.svg';
import phone from '../images/Phone.svg';
import magnifier from '../images/magnifier.svg';
import qrcode from '../images/qrcode.png';
import { CApp } from './CApp';

//const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMainWebNav extends VPage<CApp> {
/*	
    async open(param?: any) {
        this.openPage(() => {
			let { cHome } = this.controller;
			return cHome.tab.content();
		});
	}
*/
	content() {
		let { cHome } = this.controller;
		return cHome.tab.content();
	}
}


export class NavHeaderView extends View<CApp> {
    render() {
        let { cMe, user } = this.controller;
		let vLogin:any;
		if (!user) {
			vLogin = <div className="nav-link">
				<a className="px-2" href="./register" target="_self">注册</a>
				<A className="px-2" href="./login" target="_self">登录</A>
			</div>;
		}
		else {
		let { id, name, nick, icon } = user;
			vLogin = <div className="nav-link">
				<a className="px-2" href="./me" target="_self">{nick || name}</a>
				<A className="px-2" href="./logout" target="_self">退出</A>
			</div>;
		}

        return <header>
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-auto ml-auto d-flex align-items-center flot-right">
                            <div className="phone">
                                <img src={phone} /> Call Us 400-666-7788
                            </div>
                            <div className="area">
                                <a className="btn" data-toggle="modal" data-target="#choosecountry">
                                    中国
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a href="#" className="header-logo"><img src={logo} alt="logo" className="img-fluid" /></a>
                    <div className="justify-content-center search-wrap">
                        <ul className="d-none d-lg-flex top-list justify-content-center">
                            <li><a href="#">特惠活动</a> </li>
                            <li><a href="#">结构检索</a> </li>
                            <li><a href="#">订单查询</a> </li>
                            <li><a href="#">COA</a> </li>
                            <li><a href="#">SDS</a> </li>
                        </ul>
                        <div className="custom-search-input">
                            <div className="input-group col-md-12">
                                <input type="text" className="search-query form-control" placeholder="Search" />
                                <span className="input-group-btn">
                                    <button className="btn" type="button">
                                        <img src={magnifier} />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="display-mobile-block-login display-mobile">登入</a>
                   
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
                                    <a className="dropdown-item" href="#">1 Column</a>
                                    <a className="dropdown-item" href="#">2 Column </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    服务
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="#">1 Column </a>
                                    <a className="dropdown-item" href="#">2 Column</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    会员
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="#">1 Column Portfolio</a>
                                    <a className="dropdown-item" href="#">2 Column Portfolio</a>
                                </div>
                            </li>
							<li className="nav-item">
								<Ax className="nav-link" href="cart" onClick={() => this.controller.cCart.start()}>
									<FA name="shopping-cart" /> 购物车
								</Ax>
							</li>
							<li className="nav-item">
								{vLogin}
							</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    }
}

/*
export class NavFooter extends React.Component {
    render() {
        return <div className="d-none d-sm-block bg-light pt-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-xs-6">
                        <img src={footer_logo} />
                        <p className="mt-lg-3">促进科技与工业<br />
                                发展，造福人类</p>
                        <img src={qrcode} className="w-100 mt-lg-50 qrcode" />
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="footer-title">百灵威集团</div>
                        <ul>
                            <li><a href="#">公司简介</a></li>
                            <li><a href="#">企业承诺</a></li>
                            <li><a href="#">合作品牌</a></li>
                            <li><a href="#">招贤纳士</a></li>

                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="font-weight-bold">浏览</div>
                        <ul>
                            <li><a href="#">资讯中心</a></li>
                            <li><a href="#">质量证书(COA)</a></li>
                            <li><a href="#">安全说明书(SDS)</a></li>
                            <li><a href="#">大包装与定制生产</a></li>
                            <li><a href="#">订购指南</a></li>
                            <li><a href="#">产品</a></li>
                            <ul>
                                <li><a href="#">有机化学</a></li>
                                <li><a href="#">分析化学</a></li>
                                <li><a href="#">生命科学</a></li>
                                <li><a href="#">材料科学</a></li>
                                <li><a href="#">仪器耗材</a></li>
                            </ul>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="footer-title">联系我们</div>
                        <div className="contact ">
                            电话：<br />400-666-7788<br />+86 10 8284 8833
                            </div>
                        <div className="contact mt-lg-28 mb-lg-58">
                            传真：<br />+86 10 8284 9933
                            </div>
                        <div className="contact mb-lg-2">
                            电子邮件：<br />
                            <a href="mailto:jkinfo@jkchemical.com">jkinfo@jkchemical.com</a><br /><a href="mailto:jkinfo@jk-sci.com">jkinfo@jk-sci.com</a>
                        </div>
                        <div className="footer-social">
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm">© 2020 - Copyright <a href="#">J&K Scientific Ltd., All Rights Reserved</a></div>
                    </div>
                </div>
            </div>
        </div >
    }
}
*/
export class NavFooterView extends View<CApp> {
    render() {
        return <div className="d-none d-sm-block bg-light pt-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-xs-6">
                        <img src={footer_logo} />
                        <p className="mt-lg-3">促进科技与工业<br />
                                发展，造福人类</p>
                        <img src={qrcode} className="w-100 mt-lg-50 qrcode" />
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="footer-title">百灵威集团</div>
                        <ul>
                            <li><a href="/about">公司简介</a></li>
                            <li><a href="#">企业承诺</a></li>
                            <li><a href="#">合作品牌</a></li>
                            <li><a href="#">招贤纳士</a></li>

                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="font-weight-bold">浏览</div>
                        <ul>
                            <li><a href="#">资讯中心</a></li>
                            <li><a href="#">质量证书(COA)</a></li>
                            <li><a href="#">安全说明书(SDS)</a></li>
                            <li><a href="#">大包装与定制生产</a></li>
                            <li><a href="#">订购指南</a></li>
                            <li><a href="#">产品</a></li>
                            <ul>
                                <li><a href="#">有机化学</a></li>
                                <li><a href="#">分析化学</a></li>
                                <li><a href="#">生命科学</a></li>
                                <li><a href="#">材料科学</a></li>
                                <li><a href="#">仪器耗材</a></li>
                            </ul>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="footer-title">联系我们</div>
                        <div className="contact ">
                            电话：<br />400-666-7788<br />+86 10 8284 8833
                            </div>
                        <div className="contact mt-lg-28 mb-lg-58">
                            传真：<br />+86 10 8284 9933
                            </div>
                        <div className="contact mb-lg-2">
                            电子邮件：<br />
                            <a href="mailto:jkinfo@jkchemical.com">jkinfo@jkchemical.com</a><br /><a href="mailto:jkinfo@jk-sci.com">jkinfo@jk-sci.com</a>
                        </div>
                        <div className="footer-social">
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm">© 2020 - Copyright <a href="#">J&K Scientific Ltd., All Rights Reserved</a></div>
                    </div>
                </div>
            </div>
        </div >
    }
}
