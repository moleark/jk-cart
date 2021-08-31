import { WebUser } from "CurrentUser";
import { Product } from "./Product";
import { BoxId, nav } from "tonva-react";
import { UQs } from "uqs";
import { Cart } from "./Cart";

export class Store {
    private cache: Map<number, Product>;

    uqs: UQs;
    cart: Cart;
    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    constructor(uqs: UQs) {
        this.uqs = uqs;
        this.cart = new Cart(this);
        this.cache = new Map();
    }

    getProduct(productId: number | BoxId): Product {
        if (!productId) return;
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
        if (typeof productId === 'object') productId = productId.id;
        let product = this.cache.get(productId);
        if (!product) {
            product = new Product(this, productId);
            this.cache.set(productId, product);
        }
        return product;
    };

    get isLogined(): boolean {
        let { user } = nav;
        if (user === undefined) return false;
        return user.id > 0;
    }

    get cartCount(): number { return this.cart.count; }

    async buildCartItems(): Promise<void> {
        await this.cart.buildItems();
    }

    async initCart() {
        await this.cart.init();
        //await this.buildCartItems();
    }

    dispose() {
        this.cart.dispose();
    }
}
