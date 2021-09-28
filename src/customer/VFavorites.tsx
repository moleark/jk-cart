import * as React from 'react';
import { VPage, Page, BoxId, List, Scroller } from 'tonva-react';
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
        let callb = () => {
            let index = this.controller.productsFavorites.items.findIndex((v: any) => v.id === p.id);
            if(index !== -1) this.controller.productsFavorites.items.splice(index, 1);
        }
        if(!this.controller.cApp.cProduct.showFavorites)
            this.controller.cApp.cProduct.showFavorites = true;
        return this.controller.cApp.cProduct.renderProduct(p,null,callb);
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
            <div className="row mx-0 bg-light my-1">
                <div className="col-lg-3 d-none d-lg-block">
                    {this.controller.cApp.cMe.renderMeSideBar()}
                </div>
                <div className="col-lg-9 product-introduct px-0">
                    {pageHTitle(<div className="text-left pl-3">商品收藏</div>)}
                    <List before={''} none={none} items={productsFavorites} item={{ render: this.renderProduct/* , onClick: this.onProductClick */ ,className:"pb-3 pt-2"}} />
                </div>
            </div>
        </Page>
    }
}
