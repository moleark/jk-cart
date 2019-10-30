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
import { GLOABLE } from 'configuration';
import * as qs from 'querystringify';

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    cart: Cart;
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);

        this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);

        this.currentUser = new WebUser(this.uqs); //this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }

        this.cart = new Cart(this);
        await this.cart.init();

        this.cProductCategory = this.newC(CProductCategory); // new CProductCategory(this, undefined);
        this.cCart = this.newC(CCart); // new CCart(this, undefined);
        this.cHome = this.newC(CHome); // new CHome(this, undefined);
        this.cProduct = this.newC(CProduct); // new CProduct(this, undefined);
        this.cOrder = this.newC(COrder); // new COrder(this, undefined);
        //this.cSelectContact = new CSelectContact(this, undefined);
        this.cMember = this.newC(CMember); // new CMember(this, undefined);
        this.cMe = this.newC(CMe); // new CMe(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);

        this.showMain();
        let { location } = document;
        let { search } = location;
        if (search) {
            let query: any = qs.parse(search.toLowerCase());
            switch (query.type) {
                case "product":
                    let prouductBoxId = this.uqs.product.ProductX.boxId(query.product);
                    this.cProduct.showProductDetail(prouductBoxId);
                    break;
                case "order":
                    break;
            }
        }
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
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
