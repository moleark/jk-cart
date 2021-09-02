import { observable, makeObservable } from 'mobx';
import { BoxId, QueryPager } from 'tonva-react';
import { CUqBase } from 'tapp';
import { VPageProduct } from './VPageProduct';
import { VPageList } from './VPageList';
import { docTypeWithCaptcha, VPageSkillSearch } from './VPageSkillSearch';
import { VDelivery, VInCart, VProductWithPrice, VProuductView2 } from './views';
import { Product } from '../store';
import { GLOABLE } from 'global';
import { ElasticSearchPager, UrlGen, productUrlGen, productCatalogUrlGen, productStandardUrlGen } from '../tools/elasticSearchPager';
import { xs } from 'tools/browser';
import { VError } from '../tools/VError';

export class CProduct extends CUqBase {
    productsPager: QueryPager<Product>;
    @observable esproductsPager: ElasticSearchPager<Product> | any[];
    @observable esProductsTotal: any;
    @observable currentPage: number = 1;
    //@observable productSpecFiles: any[] = [];
    //@observable productMSDSFiles: any[] = [];
    //@observable futureDeliveryTimeDescriptionContainer: { [cacheId: string]: string } = {};
    //@observable chemicalInfoContainer: { [productId: number]: any } = {};

    @observable captcha: any;
    @observable materialType: string;
    @observable currentFileName: any;
    @observable currentLanguage: any;
    @observable currentProduct: any;
    @observable productMscuVersions: any[] = [];
    @observable showFavorites: Boolean = false;
    @observable searchUrl: string;

    //@observable productData: any;
    //@observable product: any;
    //@observable discount: any;

    private salesRegion: any;
    private language: any;

    product: Product;

    searchKey: string;
    protected async internalStart(param?: any) {
        let { key, type } = param;
        this.searchKey = key;
        this.currentPage = 1;
        this.searchByKey(Number(type));
    }

    private productConverter = (item: any, queryResults?: { [name: string]: any[] }): Product => {
        let product = this.cApp.getProduct(item.id);
        product.props = item;
        // product.props.imageUrl = item.chemical.toString();
        product.loadListItem();
        return product;
    }

    searchAction = async (url: string, keyWord: any, urlGen: UrlGen) => {
        let { currentSalesRegion } = this.cApp;
        this.searchUrl = url;
        // if (xs) {
        this.esproductsPager = new ElasticSearchPager<Product>(url, urlGen, 10, 10);
        this.esproductsPager.setItemConverter(this.productConverter);
        await this.esproductsPager.first({
            keyWord: keyWord,
            salesRegion: currentSalesRegion.id
        });
        // };

        /* if (!xs) {
            this.searchUrl = url + '?key=' + keyWord;
            // this.searchUrl = url + '/' + keyWord;
            await this.esProductsPagerMore(this.currentPage);
        }
        this.openVPage(VPageList); */
    }

    private async searchByKey(type: number) {
        let url = GLOABLE.CONTENTSITE + '/api/product/search';
        if (type === 2) url = GLOABLE.CONTENTSITE + '/api/standard-sample';
        let keyWord = encodeURIComponent(this.searchKey);
        if (xs) {
            let urlGen = new productUrlGen();
            if (type === 2) urlGen = new productStandardUrlGen();
            await this.searchAction(url, keyWord, urlGen);
        };
        if (!xs) {
            this.searchUrl = url + '?key=' + keyWord + '&pageNumber=';
            if (type === 2) this.searchUrl = url + '/' + keyWord + '/';
            await this.esProductsPagerMore(this.currentPage);
        };
        this.openVPage(VPageList);
        /* this.productsPager = new QueryPager<Product>(this.uqs.product.SearchProduct, 10, 10);
        this.productsPager.setItemConverter(this.productConverter);
        this.productsPager.first({
            keyWord: this.searchKey,
            salesRegion: currentSalesRegion.id
        }); */
    }

    searchWebByKey(key: string) {
        let { currentSalesRegion } = this.cApp;
        this.productsPager = new QueryPager<any>(this.uqs.product.SearchProduct, 3, 3);
        this.productsPager.setItemConverter(this.productConverter);
        this.productsPager.first({ keyWord: key, salesRegion: currentSalesRegion.id })
    }

    async searchByCategory({ productCategory, name }: { productCategory: number; name: string }) {
        this.searchKey = name; this.currentPage = 1;
        let url = GLOABLE.CONTENTSITE + '/api/product-catalog';
        let keyWord = productCategory + '/products';
        if (xs) {
            let urlGen = new productCatalogUrlGen();
            await this.searchAction(url, keyWord, urlGen);
        };
        if (!xs) {
            this.searchUrl = url + '/' + keyWord + '/';
            await this.esProductsPagerMore(this.currentPage);
        };
        this.openVPage(VPageList);
        /* this.productsPager = new QueryPager<any>(this.uqs.product.SearchProductByCategory, 10, 10);
        this.productsPager.setItemConverter(this.productConverter);
        await this.productsPager.first({
            productCategory,
            salesRegion: currentSalesRegion.id
        }); */
        // this.openVPage(VPageList);
    }

    esProductsPagerMore = async (page: number) => {
        this.currentPage = page;
        let url = this.searchUrl + page;
        // let url = this.searchUrl + '/' + page;
        let resp = await fetch(url, {
            // mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let ret = await resp.json();
        let items = ret.hits.filter((v: any) => v);
        let arr = [];
        for (let key of items) {
            if (!key) continue;
            let product = this.productConverter(key);
            arr.push(product);
        }
        this.esproductsPager = arr;
        this.esProductsTotal = ret.total;
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
        if (!this.product.props) {
            this.openVPage(VError);
        } else {
            this.openVPage(VPageProduct);
        }
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

    renderDeliveryTime = (pack: BoxId, defColor?: string) => {
        let param = { pack: pack, defColor: defColor };
        return this.renderView(VDelivery, param);
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
    renderProduct = (product: Product, dataSource?: string, callback?: any) => {
        return this.renderView(VProuductView2, { product, dataSource, callback });
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
        //    await this.openMaterial();
        //};
        //if (!this.isLogined)
        //    nav.showLogin(loginCallback, true);
        //else
        // await this.openMaterial();
    }

    /**
     * 获取PDF文件流
     */
    getPDFFileUrl = async (row: any) => {
        // await this.cApp.assureLogin();
        let { origin, captcha, lang, lot } = row;
        if (this.materialType === 'msds')
            return await this.fetchPdf('/partial/productMsdsFileByOrigin/' + `${lang}/${origin}/${captcha}`);
        if (this.materialType === 'um')
            return await this.fetchPdf('/partial/productUserManualFileByOrigin/' + `${lang}/${origin}/${captcha}`);
        if (this.materialType === 'spec')
            return await this.fetchPdf('/partial/productSpecFileByOrigin/' + `${origin}/${captcha}`);
        if (this.materialType === 'coa') {
            let getLot = await this.getLotByOrigin({ lotnumber: lot, origin: origin });/* LV50T103 911810  */
            let res = {
                status: 404,
                msg: `暂时不能提供质检报告（COA）, 您可能输入了错误的产品编号（批号），或者您查询产品品牌暂时不能提供质检报告。`
            };
            if (!getLot) return res;
            let getCoaByOrigin = await this.getCoaByOrigin(getLot.id);
            if (!getCoaByOrigin) return res;
            return {
                content: {
                    ...getLot,
                    ...getCoaByOrigin,
                    origin: origin
                }
            };
        };
    }

    getCoaByOrigin = async (lotNumber: string | number) => {
        return await this.uqs.product.COA.obj({ lot: lotNumber });
    }

    getLotByOrigin = async (row: any) => {
        let { origin, lotnumber } = row;
        return await this.uqs.product.GetLotByLotnumber.obj({ lotnumber: lotnumber, origin: origin });
    }

    fetchPdf = async (url: string) => {
        let fileUrl = GLOABLE.CONTENTSITE + url;
        let res = await window.fetch(fileUrl, {
            credentials: 'include'
        });
        if (res.status === 200) {
            let content = await res.arrayBuffer();
            return {
                content: content,
                fileUrl: fileUrl,
            };
        } else {
            return {
                status: res.status,
                msg: res.status !== 400 ? res.statusText : '验证码错误!'
            }
        }
    }

    /**
     * 获取验证码
     */
    getCaptcha = async () => {
        let timer = (new Date()).getTime();
        this.captcha = GLOABLE.CONTENTSITE + `/partial/captcha/?timer=${timer}`;
    }

    /**
     * 产品资料页面
     */
    openMaterial = async (type?: string, id?: string) => {
        type = type !== undefined ? type.toLowerCase() : type;
        if (docTypeWithCaptcha.includes(type)) await this.getCaptcha();
        this.materialType = type;
        let origin: string;
        if (!isNaN(Number(id))) {
            this.product = this.cApp.getProduct(Number(id));
            await this.product.loadBase();
        }
        if (this.product && this.product.props) {
            origin = this.product.props.origin;
            if (origin && (type === 'msds' || type === 'um')) {
                let urls: { [type: string]: string } = {
                    "msds": "/partial/productMsdsVersion/",
                    "um": "/partial/productUserManualVersion/",
                };
                let url: string = urls[type] || "/partial/productMsdsVersion/";
                let result = await window.fetch(GLOABLE.CONTENTSITE + url + origin);
                if (result && result.ok) this.productMscuVersions = await result.json();
                else this.productMscuVersions = [];
            };
        }
        this.openVPage(VPageSkillSearch, origin);
    }
}
