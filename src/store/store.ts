import { WebUser } from "CurrentUser";
import { Product } from "model";
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
	}

	getProduct(productId: number): Product {
		return;
	};

	get isLogined(): boolean {return false;}
}
