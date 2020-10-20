import { VFavorites } from './VFavorites';
import { CUqBase } from '../CBase';
import { QueryPager, BoxId } from 'tonva';
import moment from 'moment';
import { VProductFavorateLabel } from './VProductFavorateLabel';

export class CFavorites extends CUqBase {
    productsFavorites: QueryPager<any>;
    myFavorites: any[] = [];
    protected async internalStart() {
        await this.searchByFavorites();
        this.openVPage(VFavorites);
    }

    async searchByFavorites() {
        let { currentUser, currentSalesRegion } = this.cApp;
        this.productsFavorites = new QueryPager<any>(this.uqs.webuser.getMyFavirates, 10, 10);
        await this.productsFavorites.first({ webUser: currentUser, salesRegion: currentSalesRegion });
    }

    /*
    async getMyFavorites() {
        let { currentUser, currentSalesRegion } = this.cApp;
        let myFavorites = await this.uqs.webuser.myFavorites.query({ webUser: currentUser, salesRegion: currentSalesRegion });
        return myFavorites.ret;
    }
    */

    async getProductIsFavorites(product: number) {
        let { currentUser } = this.cApp;
        let myFavorites = await this.uqs.webuser.myFavorites.obj({ webUser: currentUser, product: product });
        return myFavorites !== undefined;
    }

    async addProductFavorites(productId: number) {
        let { currentUser } = this.cApp;
        let createDate = moment().format('YYYY-MM-DD HH:mm:ss');
        await this.uqs.webuser.myFavorites.add({ webUser: currentUser, product: productId, arr1: [{ pack: 0, date: createDate }] });
    }

    async delProductFavorites(productId: number) {
        let { currentUser } = this.cApp;
        await this.uqs.webuser.myFavorites.del({ webUser: currentUser, product: productId, arr1: [{ pack: 0 }] });
    }

    renderFavoritesLabel = (productid: number) => {
        let { currentUser } = this.cApp;
        // let myFavorite = await this.uqs.webuser.myFavorites.obj({ webUser: currentUser, product: productid });
        return this.renderView(VProductFavorateLabel, productid)
    }
}
