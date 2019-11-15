import { RowContext, nav, User, BoxId } from 'tonva';
import { CUqBase } from '../CBase';
import { VCartLabel } from './VCartLabel';
import { VCart } from './VCart';
import { CartPackRow, CartItem2 } from './Cart';

export class CCart extends CUqBase {

    private selectedCartItems: CartItem2[];

    protected async internalStart(param: any) {
        this.openVPage(VCart);
    }

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data, parentData } = context;
        let { product } = parentData;
        let { pack, price, currency } = data as CartPackRow;
        let { cart } = this.cApp;
        if (value > 0)
            await cart.add(product, pack, value, price, currency);
        else
            await cart.removeFromCart([{ productId: product.id, packId: pack.id }]);
    }

    onRowStateChanged = async (context: RowContext, selected: boolean, deleted: boolean) => {
        alert('onRowStateChanged')
    }

    private loginCallback = async (user: User): Promise<void> => {
        let { cApp } = this;
        await cApp.currentUser.setUser(user);
        await cApp.loginCallBack(user);
        this.closePage(1);
        await this.doFirstOrderChecking();
    };

    onProductClick = (product: BoxId) => {
        let { cart, cProduct } = this.cApp;
        if (!cart.isDeleted(product.id)) {
            cProduct.showProductDetail(product);
        }
    }

    checkOut = async () => {
        let { cart } = this.cApp;
        this.selectedCartItems = cart.getSelectedItems();
        if (this.selectedCartItems === undefined) return;
        if (!this.isLogined) {
            nav.showLogin(this.loginCallback, true);
        } else {
            this.doFirstOrderChecking();
        }
    }

    private doFirstOrderChecking = async () => {
        let { cMe, currentUser } = this.cApp;
        if (!currentUser.allowOrdering) {
            cMe.openMeInfoFirstOrder();
        } else {
            await this.doCheckOut();
        }
    }

    /**
     * 导航到CheckOut界面
     */
    doCheckOut = async () => {

        let { cOrder } = this.cApp;
        if (this.selectedCartItems === undefined) return;
        await cOrder.start(this.selectedCartItems);
    }

    tab = () => this.renderView(VCart);

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    renderCartProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }
}
