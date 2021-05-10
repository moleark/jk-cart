import { observable, makeObservable } from 'mobx';
import { RowContext, BoxId, nav } from 'tonva-react';
import { VCartLabel } from './VCartLabel';
import { VCartLabelWeb } from './VCartLabelWeb';
import { VCart } from './VCart';
import { Product, CartPackRow, CartItem } from '../store';
import { CApp, CUqBase } from 'uq-app';

export class CCart extends CUqBase {
    //cart: Cart;
    editButton: boolean = false; // = observable.box<boolean>(false);

    private selectedCartItems: CartItem[];

    constructor(cApp: CApp) {
        super(cApp);

        makeObservable(this, {
            editButton: observable
        });
    }

    protected async internalStart(param: any) {
        this.openVPage(VCart);
    }

    showCart = async () => {
		this.editButton = false;
        nav.navigate("/cart");
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

    //tabPage: VCart = new VCart(this);
	tabPage = () => this.renderView(VCart);
}
