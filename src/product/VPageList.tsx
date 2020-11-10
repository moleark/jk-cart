/* eslint-disable */
import * as React from 'react';
import { VPage, Scroller } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import { Product } from 'model';
/*
import { NavHeader, NavFooter } from 'tools/ShopPage';
import { xs } from 'tools/browser';
import { observer } from 'mobx-react-lite';
*/

export class VPageList extends VPage<CProduct> {
	/*
    private searchKey: string;
    async open() {
        //this.searchKey = key;
        //xs ? this.openPage(this.page) : this.openPage(this.largePage);
	}
	*/

	/*
    render(key: any) {
        this.searchKey = key;
        return <this.page />
	}
	*/

    private onProductClick = async (product: Product) => {
		let {id} = product;
		// await this.controller.showProductDetail(product.id);
		//if (this.isWebNav === true) {
			let url = "/product/" + id;
			console.log(url);
			this.navigate(url);
		//}
		//else {
		//	await this.controller.showProductDetail(id);
		//}
    }

    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { productsPager } = this.controller;
        //await this.controller.pageProducts.more();
        productsPager.more();
    }

    private renderProduct = (p: Product) => {
        // console.log(p);
        return this.controller.cApp.cProduct.renderProduct(p);
    }

	header() {
		return this.isWebNav===true? null: this.controller.cApp.cHome.renderSearchHeader();
	}

	right() {
		return this.isWebNav===true? null: this.controller.cApp.cCart.renderCartLabel();
	}

	content() {
        let { productsPager, searchKey } = this.controller;
        let none = <div className="p-3 text-warning">[无]</div>;
		return <>
			<div className="bg-white py-2 px-3 mb-1 text1"><small className=" small text-muted">搜索: </small>{searchKey}</div>
			<List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
		</>;
	}

	/*
    private page = observer(() => {

        let { productsPager, cApp } = this.controller;
        let { cHome, cCart } = cApp;
        let header = cHome.renderSearchHeader();
        let cart = cCart.renderCartLabel();
        let none = <div className="p-3 text-warning">[无]</div>

        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white py-2 px-3 mb-1 text1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
    });

    private largePage = () => {
        let { productsPager, cApp } = this.controller;
        //let { renderHeader, renderFooter } = cApp;
        let none = <div className="p-3 text-warning">[无]</div>
        return <Page webNav={{ navRawHeader: renderHeader(), navRawFooter: renderFooter() }}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
            <List before={''} none={none} items={productsPager} item={{ render: this.renderProduct, onClick: this.onProductClick }} />
        </Page>
	};
	*/
}