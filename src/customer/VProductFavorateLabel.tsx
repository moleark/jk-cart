import * as React from 'react';
import { View, FA, BoxId, nav } from 'tonva';
import { CProduct } from '../product/CProduct';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export class VProductFavorateLabel extends View<CProduct> {

    @observable private isProductFarirates: boolean = false;
    private favoriteOrCancel = async (product: number) => {
        let { cApp } = this.controller;
        let { cFavorites, currentUser, cMe } = cApp;
        const { user } = nav;
        if (user !== undefined) {
            if (this.isProductFarirates)
                await cFavorites.delProductFavorites(product);
            else
                await cFavorites.addProductFavorites(product);
            await this.initInventoryAllocation(product);
        } else {

            cMe.showLogin();
        }
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

    render(param: BoxId): JSX.Element {
        return <this.content productId={param} />;
    }

    private content = observer((param: any): any => {

        let favirateLabelUI;
        let { productId } = param;
        let { currentUser } = this.controller.cApp;
        if (currentUser)
            this.initInventoryAllocation(productId);

        favirateLabelUI = <div className="d-flex justify-content-end">
            <small onClick={(e) => { e.stopPropagation(); this.favoriteOrCancel(productId) }} style={{ zIndex: 9 }}>
                <FA className="mr-3 text-danger" name={`${this.isProductFarirates ? "heart" : 'heart-o'}`} size="lg" />
            </small>
        </div>
        return favirateLabelUI;
    });
}
