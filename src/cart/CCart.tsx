import { observable, makeObservable } from 'mobx';
import { RowContext, BoxId, nav } from 'tonva-react';
import { VCartLabel } from './VCartLabel';
import { VCartLabelWeb } from './VCartLabelWeb';
import { VCart } from './VCart';
import { Product, CartPackRow, CartItem } from '../store';
import { CApp, CUqBase } from 'tapp';
import { GLOABLE } from '../global';

export class CCart extends CUqBase {
	//cart: Cart;
    @observable editButton: boolean = false; // = observable.box<boolean>(false);
    @observable cartBtnMatch: CartBtnMatch = new CartBtnMatch(this.cApp);
    private selectedCartItems: CartItem[];

    protected async internalStart(param: any) {
        let punchOutXML = await this.generatePunchOutXML();
        this.cartBtnMatch = new CartBtnMatch(this.cApp);
        this.openVPage(VCart, { punchOutXML: punchOutXML });
    }

	showCart = async () => {
		this.editButton = false;
        nav.navigate("/cart");
    }

    generatePunchOutXML = async () => {
        let { currentUser } = this.cApp;
        let punchOutXML: any;
        try {
            if (currentUser && currentUser.thirdPartyOrg) {
                if (currentUser.thirdPartyOrg === "3") {
                    let webuserId = currentUser.id;
                    let result = await fetch(GLOABLE.PUNCHOUT.PUNCHOUTXML + "?webuser=" + webuserId, {
                        method: "post",
                        headers: { "Content-Type":"application/json" }
                    });
                    let content: any = await result.json();
                    if (result.ok) {
                        // let content: any = await result.json();
                        punchOutXML = {
                            url: content?.url,
                            cxmlBase64: content["cxml-base64"]
                        };
                    } else {
                        punchOutXML = content;
                    }
                };
            };
            return punchOutXML;
        } catch (error) {
            return undefined;
        };
    }

	//get count(): number {return this.cart?.count.get();}

	/*
	getQuantity(productId: number, packId: number): number {
		return this.cApp.store.cart.getQuantity(productId, packId);
	}
	*/
	/*
	async add(product: Product, pack: BoxId, quantity: number, price: number, retail: number, currency: any) {
		await this.cApp.store.cart.add(product, pack, quantity, price, retail, currency);
	}

	async removeItem(rows: [{ productId: number, packId: number }]) {
		await this.cApp.store.cart.removeItem(rows);
	}
	*/
	/*
	async againOrderCart(data: CartItem[]) {
		await this.cApp.store.cart.againOrderCart(data);
	}
	*/

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    renderCartLabel_web() {
        return this.renderView(VCartLabelWeb);
    }

    /**
     * 修改购物车中产品数量 
     * @param context 
     * @param value 
     * @param prev 
     */
    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data, parentData } = context;
        let { product } = parentData;
        let { pack, price, retail, currency } = data as CartPackRow;
        let { cart } = this.cApp.store;
		await cart.changeQuantity(product, pack, value, price, retail, currency);
    }

    /**
     * 
     * @param row 
     */
    onRemoveCartItem = (row: any) => {
        let { product, packs } = row;
        //let { cart } = this.cApp;
        let packsToDeleted: any = [];
        packs.forEach((each: any) => {
            packsToDeleted.push({ productId: product.id, packId: each.pack.id });
        });
        this.cApp.store.cart.removeItem(packsToDeleted);
    }

    onRowStateChanged = async (context: RowContext, selected: boolean, deleted: boolean) => {
        alert('onRowStateChanged')
    }

    /*
    private loginCallback = async (user: User): Promise<void> => {
        let { cApp } = this;
        await cApp.currentUser.setUser(user);
        await cApp.loginCallBack(user);
        this.closePage(1);
        await this.doFirstOrderChecking();
    };
    */

    onItemClick = (cartItem: CartItem) => {
        let { store, cProduct } = this.cApp;
        let { product } = cartItem;
        if (!store.cart.isDeleted(product.id)) {
            cProduct.showProductDetail(product.id);
        }
    }
    /**
     * 商品从购物车永久性删除
     */
    strikeOut = async () => {
        let { cart } = this.cApp.store;
        this.selectedCartItems = cart.getSelectedItems();
        await cart.removeStrike(this.selectedCartItems)


        // let combinedData = this.selectedCartItems.map((el: CartItem2) => {
        //     return el.packs.map((v: any) => {
        //         return {
        //             productId: el.product, packId: v.pack
        //         }
        //     })
        // }).flat();
        // combinedData.forEach(async (el: any) => {
        //     await cart.removeFromCart(el);
        // })
    }

    punchOut = async () => {
        /* 清除购物车 */
        let param: [{ productId: number, packId: number }] = [] as any;
        this.cApp.store.cart.cartItems.forEach((e: any) => {
            e.packs.forEach((v: any) => {
                param.push({ productId: e.product.id, packId: v.pack.id });
            });
        });
        await this.cApp.store.cart.removeItem(param);
        return true;
    }

    checkOut = async () => {
        let { cart } = this.cApp.store;
        this.selectedCartItems = cart.getSelectedItems();
        if (this.selectedCartItems === undefined) return;
        /*
        if (!this.isLogined) {
            nav.showLogin(this.loginCallback, true);
        } else {
            await this.doFirstOrderChecking();
        }
        */
        await this.cApp.assureLogin();
        await this.doFirstOrderChecking();
    }

    private doFirstOrderChecking = async () => {
        let { cMe, currentUser } = this.cApp;
        if (!currentUser || !currentUser.allowOrdering) {
            cMe.toPersonalAccountInfo(this.doCheckOut);
            // cMe.openMeInfoFirstOrder({
            //     onlyRequired: false,
            //     caption: "请补充账户信息",
            //     note: <>
            //         化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。
            //     为此，需要您重新提供非虚拟的、可核查的信息。这些信息包括下面所有带有 <span className="text-danger">*</span> 的信息。
            //     </>,
            //     actionButton: {
            //         value: "下一步",
            //         action: this.doCheckOut
            //     }
            // });
        } else {
            await this.doCheckOut();
        }
    }

    /**
     * 导航到CheckOut界面
     */
    doCheckOut = async () => {

        let { cOrder } = this.cApp;
        let { selectedCartItems } = this;
        if (selectedCartItems === undefined) return;
        await cOrder.createOrderFromCart(selectedCartItems);
        // await cOrder.start(this.selectedCartItems);
    }

    //tab = () => this.renderView(VCart);

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    renderCartProduct = (product: Product) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    tabPage: VCart = new VCart(this);
}

export class CartBtnMatch {
    private cApp: CApp;
    private organization: any;

    constructor(res: any) {
        this.cApp = res;
        this.organization = this.cApp.currentUser?.thirdPartyOrg;
    }

    get displayBtn():boolean {
        return this.organization && !["3"].includes(this.organization);
    }

    getCartButtonTip = () => {
        switch (this.organization) {
            case "3":
                return "punchOut";
            default:
                return "去结算";
        };
    }

    CartButtonClick = async () => {
        let { cCart } = this.cApp;
        switch (this.organization) {
            case "3":
                await cCart.punchOut();
                break;
            default:
                await cCart.checkOut();
                break;
        };
    }
}
