import { CUqBase } from 'uq-app';
import { VFavorites } from './VFavorites';
import { QueryPager } from 'tonva-react';
import { Product } from '../store';
//import { VProductFavorateLabel } from './VProductFavorateLabel';

export class CFavorites extends CUqBase {
    productsFavorites: QueryPager<any>;
    myFavorites: any[] = [];
    protected async internalStart() {
        await this.searchByFavorites();
        this.openVPage(VFavorites);
    }

    private productConverter = (item: any, queryResults?: { [name: string]: any[] }): Product => {
        let product = this.cApp.getProduct(item.id);
        product.props = item;
        // product.props.imageUrl = item.chemical.toString();
        product.loadListItem();
        return product;
    }

    async searchByFavorites() {
        let { currentUser, currentSalesRegion } = this.cApp;
        this.productsFavorites = new QueryPager<any>(this.uqs.webuser.getMyFavirates, 10, 10);
        this.productsFavorites.setItemConverter(this.productConverter);
        await this.productsFavorites.first({ webUser: currentUser, salesRegion: currentSalesRegion });
    }

    /*
    async getMyFavorites() {
        let { currentUser, currentSalesRegion } = this.cApp;
        let myFavorites = await this.uqs.webuser.myFavorites.query({ webUser: currentUser, salesRegion: currentSalesRegion });
        return myFavorites.ret;
    }
    */
	/*
    renderFavoritesLabel = (productid: number) => {
        let { currentUser } = this.cApp;
        // let myFavorite = await this.uqs.webuser.myFavorites.obj({ webUser: currentUser, product: productid });
        return this.renderView(VProductFavorateLabel, productid)
	}
	*/
}
