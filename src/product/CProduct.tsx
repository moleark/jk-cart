import { observable } from 'mobx';
import { BoxId, QueryPager } from 'tonva';
import { CUqBase } from '../tapp/CBase';
import { VPageProduct } from './VPageProduct';
import { VPageList } from './VPageList';
import { VPagePDF } from './VPagePDF';
import { VPageVerifyCode } from './VPageVerifyCode';
import { VDelivery, VInCart, VProductWithPrice, VPrice, VProuductView2, VChemicalInfoInCart, VFavorite } from './views';
import { Product } from '../model';

/**
 *
 */
/*
interface ProductProps {
	//packs?: {[packId:number]: PackValues};
	inventoryAllocation?: any[];
	futureDeliveryTimeDescription?: string;
	chemical?: any;
	prices?: any;
	favorite?: boolean;
	MSDSFiles: any;
	specFiles: any;
	data: any;
	discount: any;
}
*/

export class CProduct extends CUqBase {
    productsPager: QueryPager<Product>;
    //@observable productSpecFiles: any[] = [];
    //@observable productMSDSFiles: any[] = [];
    //@observable futureDeliveryTimeDescriptionContainer: { [cacheId: string]: string } = {};
	//@observable chemicalInfoContainer: { [productId: number]: any } = {};
	
    @observable verifyCode: any;
    @observable currentFileName: any;
    @observable currentLanguage: any;
	@observable currentProduct: any;

	//@observable productData: any;
	//@observable product: any;
	//@observable discount: any;

	private salesRegion: any;
	private language: any;

	product: Product;

	searchKey: string;
    protected async internalStart(param?: any) {
		this.searchKey = param;
        this.searchByKey();
        this.openVPage(VPageList);
    }

	/*
    renderProductList2(key: any) {
        return this.renderView(VProductList);
	}
	*/

	private productConverter = (item:any, queryResults:{[name:string]:any[]}):Product => {
		let product = this.cApp.getProduct(item.id);
		product.props = item;
		product.loadListItem();
		return product;
	}

    private searchByKey() {
        let { currentSalesRegion } = this.cApp;
		this.productsPager = new QueryPager<Product>(this.uqs.product.SearchProduct, 10, 10);
		this.productsPager.setItemConverter(this.productConverter);
        this.productsPager.first({ 
			keyWord: this.searchKey, 
			salesRegion: currentSalesRegion.id 
		});
        console.log(this.productsPager);
    }

    searchWebByKey(key: string) {
        let { currentSalesRegion } = this.cApp;
        this.productsPager = new QueryPager<any>(this.uqs.product.SearchProduct, 3, 3);
		this.productsPager.setItemConverter(this.productConverter);
        this.productsPager.first({ keyWord: key, salesRegion: currentSalesRegion.id })
    }

    async searchByCategory({ productCategory, name }: { productCategory:number; name:string }) {
        let { currentSalesRegion } = this.cApp;
        this.productsPager = new QueryPager<any>(this.uqs.product.SearchProductByCategory, 10, 10);
		this.productsPager.setItemConverter(this.productConverter);
		await this.productsPager.first({
			productCategory,
			salesRegion: currentSalesRegion.id 
		});
		this.searchKey = name;
        this.openVPage(VPageList);
    }

    /**
     *
     */
    showProductDetail = async (productId: BoxId | number | string, JumpSource?: any) => {
		if (!productId) return;
		if (typeof productId === 'string') {
			productId = Number(productId);
		}
		this.product = this.cApp.getProduct(productId);
		await this.product.loadDetail();
		if (JumpSource) this.closePage();
		this.openVPage(VPageProduct);
    }

	/*
    renderProductPrice = (product: BoxId, discount: number) => {
        return this.renderView(VProductPrice, { product: product, discount: discount });
	}
	*/

    renderProductWithPrice = (product: BoxId) => {
        return this.renderView(VProductWithPrice, product);
    }

	/*
    getProductPrice = async (product: BoxId, salesRegionId: number, discount: number) => {
        let { id: productId } = product;
        let { currentSalesRegion, cart, currentLanguage, uqs } = this.cApp;

        let prices = await uqs.product.PriceX.table({ product: product, salesRegion: salesRegionId });
        let priceSet = prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).sort((a, b) => a.retail - b.retail).map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            if (discount !== 0)
                ret.vipPrice = Math.round(element.retail * (1 - discount));
            ret.currency = currentSalesRegion.currency;
            ret.quantity = cart.getQuantity(productId, element.pack.id)
            return ret;
        });
        let promises: PromiseLike<any>[] = [];
        priceSet.forEach(v => {
            promises.push(uqs.promotion.GetPromotionPack.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
        })
        let results = await Promise.all(promises);

        for (let i = 0; i < priceSet.length; i++) {
            let promotion = results[i];
            let discount = promotion && promotion.discount;
            if (discount)
                priceSet[i].promotionPrice = Math.round((1 - discount) * priceSet[i].retail);
        }
        return priceSet;
	}
	*/

    renderDeliveryTime = (pack: BoxId) => {
        return this.renderView(VDelivery, pack);
    }

	/*
    renderChemicalInfoInCart = (product: BoxId) => {
        return this.renderView(VChemicalInfoInCart, product);
	}
	*/

	/*
    renderFavoritesLabel = (product: Product) => {
        //let { cApp } = this;
        //let { cFavorites } = cApp;
		//return cFavorites.renderFavoritesLabel(product);
		return this.renderView(VFavorite, product);
    }
	*/
	
    /**
     *
     */
    renderProduct = (product: Product) => {
        return this.renderView(VProuductView2, product);
    }

    renderCartProduct = (product: Product) => {
        return this.renderView(VInCart, product);
    }

    /**
     * 在线预览PDF,开启验证
     */
    ToVerifyPdf = async (fileInfo: any) => {
        //let { currentUser } = this.cApp;
        let { content, product } = fileInfo;
        let reg = /\w*\//ig
        this.currentFileName = content.fileName ? content.fileName.replace(reg, '').toLocaleUpperCase() : undefined;
        this.currentLanguage = content.language;
		this.currentProduct = product;
		await this.cApp.assureLogin();
        //let loginCallback = async (user: User) => {
        //    await currentUser.setUser(user);
        //    this.closePage(1);
        //    await this.openVerifyCode();
        //};
        //if (!this.isLogined)
        //    nav.showLogin(loginCallback, true);
        //else
            await this.openVerifyCode();
    }

    /**
     * 验证码页面
     */
    openVerifyCode = async () => {
		//this.getVerifyCode();
		debugger;
        this.openVPage(VPageVerifyCode);
    }

    /**
     * PDF文件预览页面
     */
    openPDFView = async (fileUrl: any) => {
        this.openVPage(VPagePDF, fileUrl);
    }
}
