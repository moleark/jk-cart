import { observable } from 'mobx';
import { BoxId, Tuid } from 'tonva';
import { Product } from 'model';
import { CUqBase } from '../tapp/CBase';
import { VQuickOrder } from './VQuickOrder';
import { VPriceQuickOrder } from 'product/views';

export let minPrice = (vipPrice: any, promotionPrice: any) => {
    if (vipPrice || promotionPrice)
        return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
};

export class CQuickOrder extends CUqBase {

    @observable quickOrderProducts: any[] = [
        // { id: 1, origin: "187351" },
        // { id: 2, origin: "102053" },
        // { id: 3, origin: "159262" },
        // { id: 4, origin: "160666" },
        // { id: 5, origin: "187351" },
    ];
    
    protected async internalStart(param?: any) { }

    /**
     * 初始化产品订购列表
     */
    initProduct = () => {
        this.quickOrderProducts = Array.from({ length: 5 }, (v, k) => { return { id: k + 1, origin: '' } });
    };

    /**
     * 一键下单页
     */
    openQuickOrder = async () => {
        this.initProduct();
        this.openVPage(VQuickOrder);
    }

    renderPriceQuickOrderView = (item:any) => {
        return this.renderView(VPriceQuickOrder , item);
    }

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    /**
     * 据指定字段检索产品
     */
    queryProductByOrigin = async (origin: string) => {
        let { currentSalesRegion } = this.cApp;
        let nOrigin = origin.trim();
        let productByOrigin = await this.cApp.uqs.product.GetProductPackByOrigin.table({ origin: nOrigin, salesRegion: currentSalesRegion });
        return productByOrigin;
    };

    /**
     * 根据产品编号/包装规格查询产品，在客户手动输入或提交excel表格 检索产品
     */
    QueryProductsByOriginOrPack = async (param: any[]) => {
        /* 获取product 据origin */
        let promises: Promise<any>[]=[];
        param.forEach((el: any) => {
            let { origin } = el;
            promises.push(this.queryProductByOrigin(origin));
        });
        let res = await Promise.all(promises);
        let result = res.flat();
        /* 去重 product */
        let resultArr: any = [];
        result.forEach((el: any) => {
            let { product, pack } = el;
            let productExists = resultArr.find((i: any) => Tuid.equ(i.product, product));
            if (productExists) {
                if (!Tuid.equ(productExists.pack, pack)) productExists.packArr.push(pack);
            } else {
                resultArr.push({ product: product, packArr: [pack] });
            };
        });
        /* product 重装为 Product类数据 */
        let promises2: PromiseLike<any>[] = [];
        resultArr.forEach((el: any) => {
            let productExists = this.quickOrderProducts.find((v: any) => Tuid.equ(el.product, v.product));
            if (productExists) {
                el.product = productExists.product;
            } else {
                el.product = this.cApp.getProduct(el?.product?.id);
                promises2.push(el.product.loadListItem());
            };
        });
        await Promise.all(promises2);
        /* 获取有效的Pack,pack数据重装（获取的pack中obj数据不是需求值,需重装） */
        resultArr = resultArr.map((el: any) => {
            el.packArr = el.packArr.map((v: any) => {
                let packExistsFormPrices = el.product.prices.find((i: any) => Tuid.equ(i.pack, v));
                if (!packExistsFormPrices || packExistsFormPrices.retail === 0.01) return;
                return { ...packExistsFormPrices, quantity: packExistsFormPrices.quantity || 1 };
            }).filter((i: any) => i);
            return el;
        });
        /* 不考虑一个origin 匹配到多个产品,多个取一个就行 */
        this.quickOrderProducts.forEach((el: any) => {
            if (el?.productExists) return;
            let findOriginById = param.find((i: any) => i.id === el.id);
            if (!findOriginById) return;
            let getProductByOrigin = resultArr.find((v: any) => v.product.props.origin === findOriginById.origin);
            if (getProductByOrigin) {
                el.product = getProductByOrigin.product;
                el.noProductTip = "";
                if (findOriginById?.radioy || findOriginById?.unit) {
                    let finddefaultPack:any = getProductByOrigin.packArr.find((v: any) => v.pack?.obj?.radioy === findOriginById?.radioy && v.pack?.obj?.unit === findOriginById?.unit);
                    el.selectedPack = finddefaultPack ? { ...finddefaultPack, quantity: findOriginById?.quantity } : undefined;
                };
                if (!getProductByOrigin.packArr.length) {
                    el.noPackTip = "该产品无销售包装,请删除."; return;
                };
                el.QPacks = getProductByOrigin.packArr;
                el.productExists = true;
            } else {
                el.noProductTip = "您输入了无效的产品编号,请再试一次.";
            };
        });
        this.quickOrderProducts = this.quickOrderProducts.filter((v: any) => v && v.origin);
    };

    /**
     * 产品列表数量变更
     */
    changeProductQuantity = async (item: any, pack: BoxId, quantity: number) => {
        let { id } = item;
        this.quickOrderProducts.forEach((el: any) => {
            if (el.id === id) el.selectedPack.quantity = quantity;
        });
    }

    /**
     * 包装选择 
     */
    selectedPack = (item: any, pack: any) => {
        let { id } = item;
        this.quickOrderProducts.forEach((el: any) => { if (el.id === id) el.selectedPack = pack; });
    };

    /* 现在下单 */
    overOrder = async () => {
        await this.cApp.assureLogin();
        let resultArr: any = [];
        this.quickOrderProducts.forEach((el: any) => {
            if (!el) return;
            let { product, selectedPack } = el;
            let getPriceByPackID = product.prices.find((v: any) => Tuid.equ(v.pack, selectedPack.pack));
            let price = minPrice(getPriceByPackID?.vipPrice, getPriceByPackID?.promotionPrice) || selectedPack.retail;
            selectedPack.price = price;
            let productExists = resultArr.find((i: any) => Tuid.equ(i.product, product));
            if (productExists) {
                if (!Tuid.equ(productExists.pack, selectedPack.pack)) productExists.packs.push(selectedPack);
            } else {
                resultArr.push({ product: product, packs: [selectedPack], $isSelected: true, $isDeleted: false, createdate: Date.now() });
            };
        });
        await this.cApp.cOrder.createOrderFromCart(resultArr);
    };
}
