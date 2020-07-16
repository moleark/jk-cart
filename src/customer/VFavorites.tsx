import * as React from 'react';
import { VPage, Page, BoxId, List, Scroller } from 'tonva';
import { CFavorites } from './CFavorites';

export class VFavorites extends VPage<CFavorites> {

    async open(param: any) {
        this.openPage(this.page);
    }
    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsCollect } = this.controller;
        productsCollect.more();
    }
    private onProductClick = async (product: BoxId) => {
        let { cProduct } = this.controller.cApp;
        await cProduct.showProductDetail(product.id);
    }

    private page = (param: any) => {
        let { productsCollect, cApp } = this.controller;
        let { cProduct } = cApp;
        let none = <div className="p-3 text-warning mt-4 d-flex justify-content-center">『 无任何收藏产品 』</div>
        return <Page header="收藏管理" onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={productsCollect} item={{ render: cProduct.renderProductCarryFavorites, onClick: this.onProductClick }} />
        </Page>
    }
}
