import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CAppBase, IConstructor, User, nav, Elements, Query, startRoute } from 'tonva';
//import { UQs } from "./uqs";
import { Cart } from "./cart/Cart";
import { WebUser } from "./CurrentUser";
import { CHome } from "./home";
import { CCart } from "./cart";
import { CProduct } from "./product";
import { COrder } from "./order/COrder";
import { CProductCategory } from "./productCategory/CProductCategory";
import { CMember } from "./member";
import { CMe } from "./me/CMe";
import { CUqApp } from "./CBase";
import { VMain } from 'ui/main';
import * as qs from 'querystringify';
import { CCoupon } from "coupon/CCoupon";
import { CPointProduct } from "pointMarket/CPointProduct";
import { GLOABLE } from "cartenv";
import { CYncProjects } from "ync/CYncProjects";
import { CFavorites } from 'customer/CFavorites';
import { Entrance } from 'ui/entrance';
import { CLottery } from 'pointMarket/CLottery';
import { CSignIn } from 'pointMarket/CSignIn';

export class CApp extends CUqApp {
    //get uqs(): UQs { return this._uqs as UQs };

    topKey: any;

    // currentCouponCode: string;
    // currentCreditCode: string;

    cHome: CHome;
    cCart: CCart;

    cProduct: CProduct;
    cOrder: COrder;
    cCoupon: CCoupon;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;
    cPointProduct: CPointProduct;
    cFavorites: CFavorites;
    cYncProjects: CYncProjects;
    cLottery: CLottery;
    cSignIn: CSignIn;

    /*
    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }
    */

    protected async internalStart() {
        await super.init();

        this.cart = new Cart(this);
        await this.cart.init();

        this.cHome = this.newC(CHome);
        this.cProductCategory = this.newC<CProductCategory>(CProductCategory);
        this.cProduct = this.newC(CProduct);
        this.cOrder = this.newC(COrder);
        this.cCart = this.newC(CCart);
        this.cCoupon = this.newC(CCoupon);
        this.cMember = this.newC(CMember);
        this.cMe = this.newC(CMe);
        this.cPointProduct = this.newC(CPointProduct);
        this.cFavorites = this.newC(CFavorites);
        this.cYncProjects = this.newC(CYncProjects);
        this.cLottery = this.newC(CLottery);
        this.cSignIn = this.newC(CSignIn);

        await this.cHome.getSlideShow();

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        // this.cMe.openMyPoint();
        // this.cLottery.openLotteryProduct();
        // this.cSignIn.openPointSign();

        let { location } = document;
        let { search, pathname } = location;
        if (search) {
            let query: any = qs.parse(search.toLowerCase());
            switch (query.type) {
                case "privacy":
                    this.showMain();
                    this.cMe.openPrivacy();
                    break;
                case "product":
                    this.showMain();
                    let prouductBoxId = await this.uqs.product.ProductX.boxId(query.product).assure();
                    await this.cProduct.showProductDetail(prouductBoxId);
                    break;
                case "coupon":
                    this.showMain();
                    if (query.coupon)
                        await this.cCoupon.showSharedCoupon(query);
                    break;
                case "credits":
                    this.showMain();
                    if (query.credits) {
                        await this.cCoupon.showSharedCredits(query);
                        /*
                        if (query.platform === "1")
                            await this.cPointProduct.openPointDrawing(query.credits);
                        else
                            await this.cCoupon.showSharedCredits(query);
                        */
                    }
                    break;
                case "vipcard":
                    this.showMain();
                    if (query.vipcard)
                        await this.cCoupon.showSharedVIPCard(query);
                    break;
                case "login":
                    if (!this.isLogined)
                        this.cMe.showLogin(async (user: User) => {
                            window.location.href = window.location.origin;
                        });
                    break;
                case "loginout":
                    if (this.isLogined)
                        this.cMe.showLoginOut(async () => {
                            window.location.href = window.location.origin;
                        });
                    break;
                case "cart":
                    this.cCart.start();
                    break;
                case "productlist":
                    this.cProduct.start(query.key);
                    break;
                case "me":
                    this.cMe.openMyOrders('all');
                    break;
                default:
                    this.showMain();
                    break;
            }
        } else {
            // this.showMain();
            // this.openVPage(Entrance);
        }
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
        let divLogin = document.getElementById('login');
        if (divLogin) {
            // this.openPage(this.cCart.renderCartLabel());
            this.openPage(this.cMe.renderLoginState());
        }
    }

    // onRoute在beforeStart中调用。this.on的作用是将url和function的关系（即route)配置在导航基础结构中供使用
    // 导航的基本原理是：根据当前的location.href，从配置好的route中找到匹配项，执行对应的function。
    protected onRoute() {
        this.on(() => {
            console.log('on');
            this.showMain();
        });
        this.on({
            '/search/:key': (params: any, queryStr: any) => {
                this.cProduct.start(params.key);
            },
            '/product/:id': (params: any, queryStr: any) => {
                this.cProduct.showProductDetail(params.id);
            },
            '/cart': (params: any, queryStr: any) => {
            },
            '/pointshop': () => {
                this.cPointProduct.openMyPoint();
            }
        });
    }

    protected afterStart = async () => {
        await super.afterStart();
        let elements: Elements = {
            login: this.showLogin,
            productlist: this.productList,
            productdetail: this.productDetail,
            carts: this.carts,
        };

        this.hookElements(elements);

        window.onfocus = () => {
            this.hookElements(elements);
        }
        return;
    }

    private showLogin = (element: HTMLElement) => {
        ReactDOM.render(this.cMe.renderLoginState_Web(), element);
    }

    private productList = (element: HTMLElement) => {
        // console.log("productlist");

        let { location } = document;
        let { search } = location;
        if (search) {
            let query: any = qs.parse(search.toLowerCase());
            let { type, key } = query;
            if (type === "search") {
                ReactDOM.render(this.cProduct.renderProductList(key), element);
            }
        }
    }

    private productDetail = async (element: HTMLElement) => {
        // console.log("productDetail");

        let { location } = document;
        let { pathname } = location;
        if (pathname) {
            // console.log(pathname);
            let productid = pathname.split('/')[2];
            // console.log(productid);
            if (productid) {
                ReactDOM.render(await this.cProduct.renderProductWeb(productid), element);
            }
        }
    }

    private carts = (element: HTMLElement) => {
        console.log("carts");
        //element.innerText = "hello";
        let { location } = document;
        let { pathname } = location;
        if (pathname) {
            console.log(pathname);
            ReactDOM.render(this.cCart.tab(), element);
        }
    }


    async loginCallBack(user: User) {
        /*
        if (this.cartService.isLocal) {
            let cartLocal = { ...this.cartViewModel } as CartViewModel;
            // this.cartService.clear(this.cartViewModel);
            this.cartService = CartServiceFactory.getCartService(this);
            this.cartViewModel = await this.cartService.load();
            // this.cartViewModel = await this.cartService.merge(cartLocal);
        }
        */
    }

    protected onDispose() {
        this.cart.dispose();
    }
}