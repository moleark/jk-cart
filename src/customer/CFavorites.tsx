import { VFavorites } from './VFavorites';
import { CUqBase } from '../CBase';
import { QueryPager } from 'tonva';

export class CFavorites extends CUqBase {
    productsCollect: QueryPager<any>;

    protected async internalStart() {
        await this.searchByCollect();
        this.openVPage(VFavorites);
    }
    async searchByCollect() {
        let { currentSalesRegion, currentUser } = this.cApp;
        console.log(this.uqs.webuser);

        // let myFavorites = await this.uqs.webuser.myFavorites.query({ webUser: currentUser });

        this.productsCollect = new QueryPager<any>(this.uqs.product.SearchProductByCategory, 10, 10);
        // let { productCategoryId, name } = category;
        // this.productsPager.first({ productCategory: 0, salesRegion: currentSalesRegion.id });
        // await this.productsPager.first({ productCategory: productCategoryId, salesRegion: currentSalesRegion.id });
        await this.productsCollect.first({ productCategory: 86, salesRegion: currentSalesRegion.id });
    }
}
