import { observable, autorun, IReactionDisposer, makeObservable, runInAction } from 'mobx';
import { TuidDiv, BoxId, Tuid } from 'tonva-react';
import { PackRow, Product } from './Product';
import { Store } from './store';
import { OrderItem } from 'order/Order';

export interface CartItem {
    product: Product; // BoxId;
    packs: CartPackRow[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export interface CartPackRow extends PackRow {
    /**
     * 销售成交价（在购物车中是目录价或市场活动价或协议价的最小值），订单中还会经过券的计算
     */
    price: number;

    /**
     * 订单中的初始销售成交价（订单中应用折扣券之前的价格）
     */
    priceInit?: number;
    /**
     * 订单中目录价
     */
    retail: number;
    currency: any;
}

export class Cart {
    private store: Store;
    private cartData: any;
    private cartStore: CartStore;
    private disposer: IReactionDisposer;

    /*
    @observable data: any = {
        list: observable<CartItem>([]),
    };
    */
    cartItems: CartItem[];
    count = 0; //observable.box<number>(0);
    amount = 0; //= observable.box<number>(0);
    constructor(store: Store) {
        makeObservable(this, {
            cartItems: observable,
            count: observable,
            amount: observable
        });

        //this.cApp = cApp;
        //this.cartItems = this.data.list;
        this.store = store;
        this.disposer = autorun(this.calcSum);
    }

    dispose() {
        this.disposer();
    }

    private calcSum = () => {
        if (!this.cartItems) return;
        let count = 0, amount = 0;
        for (let cp of this.cartItems) {
            let { $isSelected, $isDeleted, packs } = cp;
            if ($isDeleted === true || !($isSelected === true)) continue;
            for (let pi of packs) {
                let { price, quantity } = pi;
                count += quantity;
                if (price === Number.NaN || quantity === Number.NaN) continue;
                amount += quantity * price;
            }
        }
        this.count = count;
        this.amount = parseFloat(amount.toFixed(2));
    }

    async init(): Promise<void> {
        let { isLogined } = this.store;
        if (isLogined)
            this.cartStore = new CartRemote(this.store);
        else
            this.cartStore = new CartLocal(this.store);
        let cartData = await this.cartStore.load();
        this.cartItems = await this.buildItem2(cartData);
        this.calcSum();
    }

    againOrderCart = (data: CartItem[]) => {
        this.cartItems.forEach((v: any) => v.$isSelected = false);
        data.forEach((v: any) => {
            let findRepeatData = this.cartItems.findIndex((i: any) => Tuid.equ(v.product, i.product) && Tuid.equ(v.packs[0].pack, i.packs[0].pack));
            if (findRepeatData > -1) {
                v.packs[0].quantity = v.packs[0].quantity + this.cartItems[findRepeatData].packs[0].quantity;
                this.cartItems.splice(findRepeatData, 1);
            };
        });
        this.cartItems = [...data, ...this.cartItems];
        this.calcSum();
    }

    /**
     * 合并购物车数据
     * @param cartData 
     * @returns 
     */
    async mergeFromRemote() {
        let { isLogined } = this.store;
        if (!isLogined)
            return;
        this.cartStore = new CartRemote(this.store);
        let cartData = await this.cartStore.load();
        if (!cartData) return;
        let cartItems = await this.buildItem2(cartData);
        if (!(this.cartItems) || this.cartItems.length === 0) {
            this.cartItems = cartItems;
            return;
        }

        for (let i = 0; i < this.cartItems.length; i++) {
            const e = this.cartItems[i];
            let { product, packs } = e;
            let { pack, quantity, price, currency } = packs[0];
            let cartItemExists = cartItems.find((ci) => Tuid.equ(product, ci.product) && Tuid.equ(pack, ci.packs[0].pack));
            if (!cartItemExists)
                await this.cartStore.storeCart(product, pack, quantity, price, currency);
        }
        cartItems.forEach(e => {
            let { product, packs } = e;
            let { pack } = packs[0];
            let cartItemExists = this.cartItems.find((ci) => Tuid.equ(product, ci.product) && Tuid.equ(pack, ci.packs[0].pack));
            if (!cartItemExists) {
                this.cartItems.push(e);
            }
        });
    }

    /**
     * 填充购物车中相关产品的具体信息 
     * @param cartData 
     * @returns 
     */
    private async buildItem2(cartData: any[]): Promise<CartItem[]> {
        let { uqs, currentSalesRegion } = this.store;
        // 初始化购物车中产品的目录价
        let { product } = uqs;
        let { PriceX } = product;
        let promises: PromiseLike<void>[] = [];
        cartData.forEach((e: any) => promises.push(PriceX.obj({ product: e.product, pack: e.pack, salesRegion: currentSalesRegion })));
        let prices = await Promise.all(promises);
        for (let index = cartData.length - 1; index >= 0; index--) {
            let e: any = cartData[index];
            let priceMap: any = prices.find((v: any) => {
                if (!v) return false;
                return Tuid.equ(v.product, e.product)
                    && Tuid.equ(v.pack, e.pack)
                    && v.discountinued === 0
                    && v.expireDate > Date.now()
            });
            if (priceMap && priceMap.retail) {
                e.retail = priceMap.retail;
            } else {
                cartData.splice(index, 1);
            }
        }

        // let cartDataGrouped = groupByProduct(cartData);
        let productPromises: Promise<any>[] = [];
        let cartItems: CartItem[] = [];
        if (cartData && cartData.length) {
            for (let key of cartData) {
                let { product: productId, pack, quantity, price, retail, currency, createdate } = key;
                let product = this.store.getProduct(productId);
                productPromises.push(product.loadListItem());
                cartItems.push({
                    product: product,
                    packs: [{ pack: pack, quantity: quantity, price: price, retail: retail, currency: typeof currency === 'number' ? currency : currency?.id }],
                    $isSelected: true,
                    $isDeleted: false,
                    createdate: createdate,
                });
            };
        };
        await Promise.all(productPromises);
        return cartItems;
    }

    async buildItems() {
        if (this.cartItems) return;
        this.cartItems = await this.buildItem2(this.cartData);
        delete this.cartData;
    }

    /*
    private mergeToRemote(localItems: any[]) {
        let originLength = localItems.length;
        let nowLength = this.items.length;
        if (originLength > 0) {
            if (nowLength > 0) {
                // 合并，谁覆盖谁？
                for (let i = 0; i < originLength; i++) {
                    let { product: tempProduct, pack: tempPack } = localItems[i];
                    let cartItemExits = this.items.find(v => v.product === tempProduct && v.pack === tempPack);
                    if (cartItemExits) {
                        // 如果本地购物车中的产品已经过期，则要删除
                    } else {
                        this.items.push(localItems[i]);
                    }
                }
            } else {
                this.items.push(...localItems);
            }
            // 保存到远程
        }
    }
    */

    getQuantity(productId: number, packId: number): number {
        if (!this.cartItems) return 0;
        let cps = this.cartItems.filter(v => v.$isDeleted !== true && Tuid.equ(v.product, productId));
        if (!cps.length) return 0;
        let cpp = cps.find((v => v.packs[0].pack.id === packId));
        return cpp === undefined ? 0 : cpp.packs[0].quantity;
        /* if (!cp) return 0;
        let cpp = cp.packs.find(v => v.pack.id === packId);
        return cpp === undefined ? 0 : cpp.quantity; */
    }

    isDeleted(productId: number): boolean {
        let i = this.cartItems.findIndex(v => v.$isDeleted === true && Tuid.equ(v.product, productId));
        return i !== -1;
    }

    getSelectedItems(): CartItem[] {
        return this.cartItems.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && $isDeleted !== true;
        });
    }

    /**
     *
     */
    private async add(product: Product/*BoxId*/, pack: BoxId, quantity: number, price: number, retail: number, currency: any) {
        let cartItemExists = this.cartItems.find((e) => Tuid.equ(e.product, product) && Tuid.equ(e.packs[0].pack, pack));
        if (!cartItemExists) {
            this.cartItems.push({
                product: product,
                packs: [{ pack: pack, quantity: quantity, price: price, retail: retail, currency: currency }],
                $isSelected: true,
                $isDeleted: false,
                createdate: Date.now()
            });
        }
        else {
            let { $isDeleted, packs } = cartItemExists;
            if ($isDeleted === true) packs.splice(0);

            let packExists: CartPackRow = packs.find(e => Tuid.equ(e.pack, pack));
            packExists.quantity = quantity;
            packExists.price = price;
            packExists.currency = currency;

            cartItemExists.$isSelected = true;
            cartItemExists.$isDeleted = false;
            cartItemExists.createdate = Date.now();
        }

        await this.cartStore.storeCart(product, pack, quantity, price, currency);
    }
    removeStrike = async (data: any) => {
        console.log(data);
        // data.forEach((el: CartItem2) => {
        //     el.packs.forEach(async (v: any) => {
        //         await this.cartStore.storeCart(el.product, v.pack, v.quantity, v.price, v.currency);
        //     })
        // });
    }

    /**
     *
     * @param rows
     */
    async removeItem(rows: [{ productId: number, packId: number }]) {
        if (rows && rows.length > 0) {
            rows.forEach(pe => {
                let cartItemIndex = this.cartItems.findIndex(e => Tuid.equ(e.product, pe.productId)
                    && Tuid.equ(e.packs[0].pack, pe.packId));
                if (cartItemIndex >= 0) {
                    let cartItem = this.cartItems[cartItemIndex];
                    let i = cartItem.packs.findIndex(e => e.pack.id === pe.packId)
                    if (i >= 0) {
                        cartItem.packs.splice(i, 1);
                        if (cartItem.packs.length === 0) {
                            this.cartItems.splice(cartItemIndex, 1);
                        }
                    }
                }
            })
            this.cartStore.removeFromCart(rows);
        }
    }

    async changeQuantity(product: Product, pack: BoxId, quantity: number, price: number, retail: number, currency: any) {
        if (quantity > 0)
            await this.add(product, pack, quantity, price, retail, currency);
        else
            await this.removeItem([{ productId: product.id, packId: pack.id }]);
    }


    againCreatOrder = async (initialData: OrderItem[]) => {
        let { uqs, currentSalesRegion } = this.store;
        let { product: p } = uqs;
        let { PriceX } = p;
        let promises: PromiseLike<void>[] = [];
        initialData.forEach((e: any) => e.packs.forEach((v: any) => {
            promises.push(PriceX.obj({ product: e.product, pack: v.pack, salesRegion: currentSalesRegion }))
        }));
        let prices: any[] = await Promise.all(promises);
        let orderData: CartItem[] = [];
        let productPromises: Promise<any>[] = [];
        for (let key of initialData) {
            let { product, packs } = key;
            let filtPacksByProductId = prices.filter((v: any) => Tuid.equ(v.product, product) && v.discountinued === 0 && v.expireDate > Date.now());
            if (!filtPacksByProductId.length) continue;
            for (let i of packs) {
                let findPack = filtPacksByProductId.find((v: any) => Tuid.equ(v.pack, i.pack));
                if (!findPack) continue;
                product = this.store.getProduct(product.id);
                productPromises.push(product.loadListItem());
                orderData.push({
                    product: product,
                    packs: [{ pack: i.pack, quantity: i.quantity || 1, price: findPack.retail, retail: findPack.retail, currency: findPack.salesRegion?.obj?.currency }],
                    $isSelected: true,
                    $isDeleted: false,
                    createdate: Date.now()
                })
            };
        };
        await Promise.all(productPromises);
        orderData.forEach((v: any) => {
            let newPrices: any[] = v.product?.prices || [];
            let findPack = newPrices.find((i: any) => Tuid.equ(i.pack, v.packs[0].pack));
            if (findPack) {
                let { vipPrice, promotionPrice } = findPack;
                v.packs[0].price = this.minPrice(vipPrice, promotionPrice) || v.packs[0].price;
            };
        });
        this.againOrderCart(orderData);
        //nav.navigate('/cart');
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    /*
    setDeletedMark(productId: number, packId: number) {
        let cp = this.items.find(v => v.$isDeleted !== true && v.product === productId && v.pack === packId);
        if (cp !== undefined)
            cp.$isDeleted = true;
    }

    async removeDeletedItem() {
        let rows: { product: number, packItem: CartPackRow }[] = [];
        for (let cp of this.items) {
            let { quantity, $isDeleted } = cp;
            if ($isDeleted === true || quantity === 0) {
                // TODO:
            }
        }
        if (rows.length === 0) return;
        await this.cartStore.removeFromCart(rows);

        // 下面是从本地数据结构中删除
        for (let cp of this.items) {
            let { packs } = cp;
            let packIndexes: number[] = [];
            let len = packs.length;
            for (let i = 0; i < len; i++) {
                if (packs[i].quantity === 0) packIndexes.push(i);
            }
            for (let i = packIndexes.length - 1; i >= 0; i--) packs.splice(packIndexes[i], 1);
        }

        let itemIndexes: number[] = [];
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            let { $isDeleted, packs } = this.items[i];
            if ($isDeleted === true || packs.length === 0) itemIndexes.push(i);
        }
        for (let i = itemIndexes.length - 1; i >= 0; i--) this.items.splice(itemIndexes[i], 1);
    }

    async clear() {
        this.items.forEach(v => v.$isDeleted = true);
        await this.removeDeletedItem();
    }
    */

}

abstract class CartStore {

    protected store: Store;
    constructor(store: Store) {
        this.store = store;
    }
    //abstract get isLocal(): boolean;
    abstract load(): Promise<CartItem[]>;
    abstract storeCart(product: Product, pack: BoxId, quantity: number, price: number, currency: any): Promise<void>;
    abstract removeFromCart(rows: [{ productId: number, packId: number }]): Promise<void>;
}

class CartRemote extends CartStore {
    //private getCartQuery: Query;
    //private setCartAction: Action;
    //private removeFromCartAction: Action;

    //get isLocal(): boolean { return false }

    /*
    constructor(cApp: CApp) {
        super(cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
    }
    */

    async load(): Promise<CartItem[]> {
        let ret = await this.store.uqs.order.GetCart.page(undefined, 0, 100);
        return ret && ret.$page && ret.$page.filter((v: any) => v.product && v.pack) as any;
    }

    /**
     *
     * @param product
     * @param pack
     * @param quantity
     * @param price
     * @param currency
     */
    async storeCart(product: Product, pack: BoxId, quantity: number, price: number, currency: any) {
        await this.store.uqs.order.SetCart.submit({
            product,
            pack: pack.id,
            price: price,
            currency: currency,
            quantity: quantity
        });
    }

    async removeFromCart(rows: [{ productId: number, packId: number }]) {
        let param = rows.map(e => { return { product: e.productId, pack: e.packId } });
        await this.store.uqs.order.RemoveFromCart.submit({ rows: param });
    }
}

export const LOCALCARTNAME: string = "cart";
class CartLocal extends CartStore {

    private cartData: any[] = [];
    private productTuid: Tuid;
    private packTuid: TuidDiv;
    constructor(store: Store) {
        super(store);

        this.productTuid = this.store.uqs.product.ProductX;
        this.packTuid = this.productTuid.div('packx');
    }

    //get isLocal(): boolean { return true }

    async load(): Promise<CartItem[]> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            if (cartstring === null) return [];
            this.cartData = JSON.parse(cartstring);
            let cartDataBoxed = [];
            for (let i = 0; i < this.cartData.length; i++) {
                let { product, pack, quantity, price, currency } = this.cartData[i];
                if (product && pack) {
                    let productbox = this.productTuid.boxId(product);
                    let packbox = this.packTuid.boxId(pack);
                    cartDataBoxed.push({
                        product: productbox,
                        pack: packbox,
                        quantity: quantity,
                        price: price,
                        currency: currency
                    } as any)
                }
            }
            return cartDataBoxed;
        }
        catch (e) {
            localStorage.removeItem(LOCALCARTNAME);
            this.cartData = [];
            return this.cartData;
        }
    }

    async storeCart(product: Product, pack: BoxId, quantity: number, price: number, currency: any) {
        let cartItemExists = this.cartData.find(e => {
            if (!e) return false;
            return Tuid.equ(e.product, product) && TuidDiv.equ(e.pack, pack);
        });
        if (cartItemExists !== undefined) {
            cartItemExists.quantity = quantity;
            cartItemExists.price = price;
            cartItemExists.currency = typeof currency === 'number' ? currency : currency?.id
        } else
            this.cartData.push({ product: product.id, pack: pack.id, quantity: quantity, price: price, currency: typeof currency === 'number' ? currency : currency?.id });
        localStorage.setItem(LOCALCARTNAME, JSON.stringify(this.cartData));
    }

    async removeFromCart(rows: [{ productId: number, packId: number }]) {

        rows.forEach(e => {
            let i = this.cartData.findIndex(v => v.product = e.productId && v.pack === e.packId);
            if (i >= 0)
                this.cartData.splice(i, 1);
        })
        localStorage.setItem(LOCALCARTNAME, JSON.stringify(this.cartData));
    }
}