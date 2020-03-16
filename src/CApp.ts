import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { Cart } from "./cart/Cart";
import { WebUser } from "./CurrentUser";
import { CHome } from "./home";
import { CCart } from "./cart";
import { CProduct } from "./product";
import { COrder } from "./order/COrder";
import { CProductCategory } from "./productCategory/CProductCategory";
import { CMember } from "./member";
import { CMe } from "./me/CMe";
import { CUqBase } from "./CBase";
import { VMain } from 'ui/main';
import * as qs from 'querystringify';
import { CCoupon } from "coupon/CCoupon";
import { CPointProduct } from "pointMarket/CPointProduct";
import { GLOABLE } from "cartenv";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    cart: Cart;
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;
    currentCouponCode: string;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cCoupon: CCoupon;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;
    cPointProduct: CPointProduct;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);

        this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);

        this.currentUser = new WebUser(this.uqs); //this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            await this.currentUser.setUser(this.user);
        }

        this.cart = new Cart(this);
        await this.cart.init();

        this.cProductCategory = this.newC(CProductCategory);
        this.cCart = this.newC(CCart);
        this.cHome = this.newC(CHome);
        this.cProduct = this.newC(CProduct);
        this.cOrder = this.newC(COrder);
        this.cCoupon = this.newC(CCoupon);
        this.cMember = this.newC(CMember);
        this.cMe = this.newC(CMe);
        this.cPointProduct = this.newC(CPointProduct);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);

        let { location } = document;
        let { search } = location;
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
                    if (query.credits)
                        await this.cPointProduct.openPlatformOrderPoint(query.credits);
                    break;
                case "login":
                    this.cMe.showLogin();
                    break;
                default:
                    this.showMain();
                    break;
            }
        } else {
            this.showMain();
        }
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        let root = document.getElementById('root');
        if (root)
            this.openVPage(VMain, initTabName);

        let divLogin = document.getElementById('login');
        if (divLogin) {
            // this.openPage(this.cCart.renderCartLabel());
            this.openPage(this.cMe.renderLoginState());
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