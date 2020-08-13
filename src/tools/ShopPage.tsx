import * as React from 'react';
import logo from '../images/logo.png';
import magnifier from '../images/magnifier.svg';

interface ShopPageProps {
}

export class ShopPage extends React.Component<ShopPageProps> {

    render() {
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
                {this.props.children}
            </main>
            <div className="d-none d-sm-block bg-light pt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <img src="img/icon/footer-logo.svg" />
                            <p className="mt-lg-3">促进科技与工业<br />
                                发展，造福人类</p>
                            <img src="img/qrcode.png" className="w-100 mt-lg-50 qrcode" />
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
                            <div className="mt-2 font-weight-bold">浏览</div>
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
            </div>
        </div>
    }
}