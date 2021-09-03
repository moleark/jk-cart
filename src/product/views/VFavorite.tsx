import * as React from 'react';
import { View, A } from 'tonva-react';
import { CProduct } from '../CProduct';
import { observer } from 'mobx-react';
import { Product } from '../../store';

export class VFavorite extends View<CProduct> {
	/*
    @observable private isProductFarirates: boolean = false;
    private favoriteOrCancel = async (product: number) => {
        let { cApp } = this.controller;
		let { cFavorites, cMe } = cApp;
		await cApp.assureLogin();
        //const { user } = nav;
        //if (user !== undefined) {
            if (this.isProductFarirates)
                await cFavorites.delProductFavorites(product);
            else
                await cFavorites.addProductFavorites(product);
            await this.initInventoryAllocation(product);
        //} else {
        //    cMe.showLogin();
        //}
    }

    private isMyFarirates = async (id: number) => {
        let { cFavorites } = this.controller.cApp;
        // let customerFavoritesProducts = await cFavorites.getMyFavorites();
        // return customerFavoritesProducts.some((el: any) => el.product.id === id);
        return await cFavorites.getProductIsFavorites(id);
    }

    private initInventoryAllocation = async (id: number) => {
        let { currentUser } = this.controller.cApp;
        if (currentUser)
            this.isProductFarirates = await this.isMyFarirates(id);
    }
	*/
    render(param: any): JSX.Element {
        let { product, curPack, callback } = param;
    	return React.createElement(observer(() => {
            let { favorite, favoriteOrCancel } = product as Product;
			//let { currentUser } = this.controller.cApp;
			//if (currentUser)
			//    this.initInventoryAllocation(productId);
			let icon = favorite === true ? "heart" : 'heart-o';
			let onClick = async (evt: React.MouseEvent) => {
				evt.stopPropagation();
				await this.controller.cApp.assureLogin();
                favoriteOrCancel();
                if (callback) callback();
			}
            let imgSrc = favorite === true ? "/images/icon/favorite-icon-choose.svg" : "/images/icon/favorite-icon.svg";
			return <div className="d-flex justify-content-end">
                <small onClick={onClick} style={{ zIndex: 9 }}>
                    <img src={imgSrc} width="25px" className="favorite" />
					{/* <FA className="mr-3 text-danger" name={icon} size="lg" /> */}
				</small>
			</div>;
		}));
	}
}
