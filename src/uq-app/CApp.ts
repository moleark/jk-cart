/*
import { CHome } from "./home";
import { CMe } from "./me";
import { CBug } from "./bug";
import { CUqApp } from "./CBase";
import { res } from "./res";
import { VMain } from "./VMain";
import { CTester } from "./test-uqui";
import { setUI } from "./uqs";

const gaps = [10, 3,3,3,3,3,5,5,5,5,5,5,5,5,10,10,10,10,15,15,15,30,30,60];

export class CApp extends CUqApp {
    cHome: CHome;
    cBug: CBug;
    cMe: CMe;
    cUI: CTester;

    protected async internalStart(isUserLogin: boolean) {
        this.setRes(res);
        setUI(this.uqs);
        this.cHome = this.newC(CHome);
        this.cBug = this.newC(CBug);
        this.cMe = this.newC(CMe);
        this.cUI = this.newC(CTester) as CTester;
        this.cHome.load();
        this.openVPage(VMain, undefined, this.dispose);
        // 加上下面一句，可以实现主动页面刷新
        // this.timer = setInterval(this.callTick, 1000);
        // uq 里面加入这一句，会让相应的$Poked查询返回poke=1：
        // TUID [$User] ID (member) SET poke=1;
    }

    private timer:any;
    protected onDispose() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    private tick = 0;
    private gapIndex = 0;
    private callTick = async () => {
        try {
            if (!this.user) return;
            ++this.tick;
            if (this.tick<gaps[this.gapIndex]) return;
            //console.error('tick ', new Date());
            this.tick = 0;
            if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
            let ret = await this.uqs.BzHelloTonva.$poked.query(undefined, false);
            let v = ret.ret[0];
            if (v === undefined) return;
            if (!v.poke) return;
            this.gapIndex = 1;

            // 数据服务器提醒客户端刷新，下面代码重新调入的数据
            //this.cHome.refresh();
        }
        catch {
        }
    }
}
*/
/* eslint-disable */
import { User, nav, NavPage, BoxId, PageWebNav } from 'tonva-react';
//import { Cart/*, LOCALCARTNAME*/ } from "../cart/Cart";
import { CHome } from "../home";
import { CCart } from "../cart";
import { CProduct } from "../product";
import { COrder } from "../order/COrder";
import { CProductCategory } from "../productCategory/CProductCategory";
import { CMember } from "../member";
import { CMe } from "../me/CMe";
import { CUqApp } from "./CBase";
//import { VMain } from 'tapp/main';
import { VMain } from "./VMain";
import * as qs from 'querystringify';
import { CCoupon } from "coupon/CCoupon";
import { CPointProduct } from "pointMarket/CPointProduct";
import { CYncProjects } from "ync/CYncProjects";
import { CFavorites } from 'customer/CFavorites';
import { CLottery } from 'pointMarket/lottery/CLottery';
import { CSignIn } from 'pointMarket/signIn/CSignIn';
import { Store, Product } from '../store';
import { WebUser } from 'CurrentUser';
import { GLOABLE } from 'global';
import { CSelectInvoiceContact, CSelectShippingContact } from 'customer/CSelectContact';
import { CAddress } from '../customer/CAddress';
import { CInvoiceInfo } from 'customer/CInvoiceInfo';
import { CQuickOrder } from '../order/CQuickOrder';
import { setUI } from './uqs';
// import { CTrial } from '../trial';

export class CApp extends CUqApp {
    store: Store;
    private cache: Map<number, Product>;
    //cart: Cart;
    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    topKey: any;

    cHome: CHome;
    cCart: CCart;

    cProduct: CProduct;
    cOrder: COrder;
    cQuickOrder: CQuickOrder;
    cCoupon: CCoupon;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;
    cPointProduct: CPointProduct;
    cFavorites: CFavorites;
    cYncProjects: CYncProjects;
    cLottery: CLottery;
    cSignIn: CSignIn;
    cSelectShippingContact: CSelectShippingContact;
    cSelectInvoiceContact: CSelectInvoiceContact;
    cAddress: CAddress;
    cInvoiceInfo: CInvoiceInfo;

    protected async beforeStart(): Promise<boolean> {
        if (await super.beforeStart() === false) return false;
        this.store = new Store(this.uqs);
        this.currentSalesRegion = GLOABLE.SALESREGION_CN;
        this.currentLanguage = GLOABLE.CHINESE;
        this.store.currentSalesRegion = this.currentSalesRegion;
        this.store.currentLanguage = this.currentLanguage;

        this.cache = new Map();
        this.cHome = this.newC(CHome);
        this.cProductCategory = this.newC<CProductCategory>(CProductCategory);
        this.cProduct = this.newC(CProduct);
        this.cOrder = this.newC(COrder);
        this.cQuickOrder = this.newC(CQuickOrder);
        this.cCart = this.newC(CCart);
        this.cCoupon = this.newC(CCoupon);
        this.cMember = this.newC(CMember);
        this.cMe = this.newC(CMe);
        this.cPointProduct = this.newC(CPointProduct);
        this.cFavorites = this.newC(CFavorites);
        this.cYncProjects = this.newC(CYncProjects);
        this.cLottery = this.newC(CLottery);
        this.cSignIn = this.newC(CSignIn);
        this.cSelectShippingContact = this.newC(CSelectShippingContact);
        this.cSelectInvoiceContact = this.newC(CSelectInvoiceContact);
        this.cAddress = this.newC(CAddress);
        this.cInvoiceInfo = this.newC(CInvoiceInfo);
        await this.store.initCart();/* 暂时性初始化购物车 调整后可删除 */
        await this.cSelectShippingContact.getContactList();
        await this.cHome.getSlideShow();

        return true;
    }

    protected async internalStart(params: any) {
        setUI(this.uqs);
        nav.onNavRoute(this.navHome);
        /*
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);

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
            this.showMain();
            //this.openVPage(Entrance);
        }
        */

    }

    protected async afterStart(): Promise<void> {
        // await super.afterStart();
        nav.onChangeLogin = (user: User) => this.onChangeLogin(user);
        await this.onChangeLogin(this.user);
        nav.resolveRoute();
        this.topKey = nav.topKey();
    }

    renderCartLabel() {
        return this.cCart.renderCartLabel();
    }

    /*
    private setUser() {
        this.currentUser = new WebUser(this.uqs); //this.cUqWebUser, this.cUqCustomer);
        this.currentUser.setUser(this.user);
    }
    */

    protected showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }

    getProduct(id: number | BoxId): Product {
        if (!id) return;
        // region, language 改变的时候，直接清cache
        /*
        let {currentSalesRegion, currentLanguage} = this;
        if (this.salesRegion !== currentSalesRegion
            || this.language != currentLanguage) {
            this.cache = new Map<number, Product>();
            this.salesRegion = currentSalesRegion;
            this.language = currentLanguage;
        }
        */
        if (typeof id === 'object') id = id.id;
        let product = this.cache.get(id);
        if (!product) {
            product = new Product(this.store, id);
            this.cache.set(id, product);
        }
        return product;
    }

    /*
        // onRoute在beforeStart中调用。this.on的作用是将url和function的关系（即route)配置在导航基础结构中供使用
        // 导航的基本原理是：根据当前的location.href，从配置好的route中找到匹配项，执行对应的function。
        protected onRoute() {
            this.on(() => {
                this.showMain();
            });
            this.on({
                '/search/:key': (params: any, queryStr: any) => {
                    this.cProduct.start(params.key);
                },
                '/product/:id': (params: any, queryStr: any) => {
                    this.cProduct.showProductDetail(params.id);
                },
                '/cart': () => {
                    this.cCart.start();
                },
                '/product-catalog/:id': (params: any, queryStr: any) => {
                    this.cProduct.showProductDetail(params.id);
                },
                '/pointshop': () => {
                    // 积分商城是否需要登录后才能查看？ 
                    this.cPointProduct.openMyPoint();
                }
            });
        }
    */
    async assureLogin(): Promise<void> {
        if (this.isLogined) return;
        return new Promise<void>((resolve, reject) => {
            let loginCallback = async (user: User) => {
                if (this.isWebNav) {
                    window.history.back();
                }
                else {
                    this.closePage(1);
                }
                resolve();
            };
            nav.showLogin(loginCallback, true);
        });
    }

    protected async onChangeLogin(user: User) {
        if (user) {
            await this.initLogined(user);
        }
        else {
            this.initNotLogined();
        }
        await this.initUQs();
        this.store.initCart();
    }

    private async initLogined(user: User) {
        this.currentUser = new WebUser(this.uqs);
        await this.currentUser.setUser(this.user);
        this.store.currentUser = this.currentUser;
        /*
        // 如果currentUser，也必须重置
        //if (this.currentUser === undefined)
        this.currentUser = new WebUser(this.uqs);
        await this.currentUser.setUser(user);
        await this.cart.mergeFromRemote();
        */
    }

    private initNotLogined() {
        // 退出的话把购物车清掉？
        this.currentUser = undefined;
        /*
        localStorage.removeItem(LOCALCARTNAME);
        this.cart.count.set(0);
        this.cart.cartItems = [];
        */
    }

    protected onDispose() {
        this.store.dispose();
    }

    getPageWebNav(): PageWebNav { return undefined; }

    private navHome: NavPage = async (params: any) => {
        await this.cHome.getSlideShow();
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        this.showMain();
    }

    private navSearch: NavPage = async (params: any) => {
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        await this.store.buildCartItems();
        this.cProduct.start(params?.key);
    }

    private navProduct: NavPage = async (params: any) => {
        await this.store.buildCartItems();
        this.cProduct.showProductDetail(params?.id);
    }

    private navProductMSCU: NavPage = async (params: any) => {
        // await this.assureLogin();
        this.cProduct.openMaterial(params?.type, params?.id);
    }

    private navCart: NavPage = async (params: any) => {
        await this.store.buildCartItems();
        await this.cSelectShippingContact.getContactList();
        await this.cCart.start();
    }

    private navProductCategory: NavPage = async (params: any) => {
        let id = params.id;
        if (id) id = Number(id);
        await this.store.buildCartItems();
        await this.cProductCategory.showCategoryPage(id);
    }

    private navProductCategoryHome: NavPage = async (params: any) => {
        await this.cProductCategory.showCategoryHome();
    }

    private navPointShop: NavPage = async (params: any) => {
        this.cPointProduct.openMyPoint();
    }

    private navAbout: NavPage = async (params: any) => {
        this.cMe.openAbout();
    }

    private navMe: NavPage = async (params: any) => {
        this.cMe.start();
    }

    private navContactList: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cMe.openContactList();
    }

    private navInvoice: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cMe.openInvoice();
    }

    private navMyOrders: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cMe.openMyOrders('all');
    }

    private navOrderDetail: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cOrder.openOrderDetail(Number(params.orderId), params.state);
    }

    private navCouponManage: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cMe.openCouponManage();
    }

    private navFavorites: NavPage = async (params: any) => {
        await this.assureLogin();
        this.cMe.openFavorites();
    }

    private navPassword: NavPage = async (params: any) => {
        await this.assureLogin();
        await nav.changePassword();
    }

    private navMeInfo: NavPage = async (params: any) => {
        this.cMe.openMeInfo();
    }

    private navQuickOrder: NavPage = async (params: any) => {
        this.cQuickOrder.openQuickOrder();
    }

    protected setHomeRoute() {
        nav.onNavRoute(this.navHome);
    }

    protected onNavRoutes() {
        let routes: { [route: string]: NavPage } = {
            '/app': this.navHome,
            '/index': this.navHome,
            '/home': this.navHome,
            '/search/:key': this.navSearch,
            '/product/:id': this.navProduct,
            '/product/mscu/:type/:id': this.navProductMSCU,
            '/product/mscu/:type': this.navProductMSCU,
            '/cart': this.navCart,
            '/product-catalog/:id': this.navProductCategory,
            '/product-catalog': this.navProductCategoryHome,
            '/pointshop': this.navPointShop,
            '/about': this.navAbout,
            '/me': this.navMe,

            '/contact': this.navContactList,
            '/invoice': this.navInvoice,
            '/myOrders': this.navMyOrders,
            '/orderDetail/:state/:orderId': this.navOrderDetail,
            '/couponManage': this.navCouponManage,
            '/favorites': this.navFavorites,
            '/password': this.navPassword,
            '/meInfo': this.navMeInfo,

            '/quickOrder': this.navQuickOrder,
        };
        nav.onNavRoutes(routes);
        this.setHomeRoute();
    }
}
