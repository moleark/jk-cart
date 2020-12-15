import * as React from 'react';
import { VPage, Page, BoxId, List, Scroller } from 'tonva';
import { CFavorites } from './CFavorites';
import { xs } from '../tools/browser';
import { pageHTitle } from 'tools/pageHeaderTitle';

export class VFavorites extends VPage<CFavorites> {

    async open(param: any) {
        this.openPage(this.page);
    }
    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsFavorites } = this.controller;
        productsFavorites.more();
    }
    private onProductClick = async (product: BoxId) => {
        let { cProduct } = this.controller.cApp;
        await cProduct.showProductDetail(product.id);
    }

    private renderProduct = (p: any) => {
        // console.log(p);
        if(!this.controller.cApp.cProduct.showFavorites)
            this.controller.cApp.cProduct.showFavorites = true;
        return this.controller.cApp.cProduct.renderProduct(p);
    }

    private page = (param: any) => {
        let { productsFavorites } = this.controller;
        //let { cProduct } = cApp;
        let header: any;
        if (xs) {
            header = "商品收藏";
        };
        let none = <div className="p-3 text-warning mt-4 d-flex justify-content-center">[无收藏]</div>
        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            {pageHTitle('商品收藏')}
            <List before={''} none={none} items={productsFavorites} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
    }
}
