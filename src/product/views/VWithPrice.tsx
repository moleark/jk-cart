import * as React from 'react';
import { observer } from 'mobx-react';
import { View } from 'tonva';
import { CProduct } from '../CProduct';
import { ProductImage } from 'tools/productImage';
import { renderBrand, renderPropItem } from '../renders';
import { Product } from '../../model';
import { VChemicalInfoInCart } from './VChemicalInfo';
import { VPrice } from './VPrice';


export class VProductWithPrice extends View<CProduct> {
	/*
    @observable product: any;
    @observable discount: number;

    private async getProudct(product: BoxId) {
        if (this.product === undefined) {
            let ret = await this.controller.getProductAndDiscount(product);
            this.product = ret.product;
            this.discount = ret.discount;
        }
    }
	*/
    render(product: Product): JSX.Element {
        return React.createElement(observer(() => {
			let { brand, props } = product;
			let { description, descriptionC, origin, imageUrl } = props;
			return <div className="d-block mb-2 px-3">
				<div className="py-2">
					<div><strong>{description}</strong></div>
					<div>{descriptionC}</div>
				</div>
				<div className="row py-2">
					<div className="col-3">
						<ProductImage chemicalId={imageUrl} className="w-100" />
					</div>
					<div className="col-9">
						<div className="row">
							{renderPropItem('产品编号', origin)}
							{this.renderVm(VChemicalInfoInCart, product)}
							{renderBrand(brand)}
						</div>
					</div>
				</div>
				<div className="border-top pt-2">
					{this.renderVm(VPrice, product) /*renderProductPrice(product, discount)*/}
				</div>
			</div>
		}));
	}
    /*
    render(product: BoxId): JSX.Element {
        let { renderProduct, renderProductPrice } = this.controller;
        return <div className="d-flex flex-column">
            <div>{renderProduct(product)}</div>
            <div className="p-2 border-top">{renderProductPrice(product, 1)}</div>
        </div>
    }
    */
}

/**
 * 显示产品信息（不包含包装价格），特定于参数包含相关的CAS/Purity等信息），现应用于产品列表
 * @param product
 */
/* export function renderProduct(product: any) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl, discountinued } = product;
    return <div className="d-block mb-4 px-3 bg-white">
        <div className="py-2">
            <div className="mr-3"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
        </div>
        <div className="row">
            <div className="col-3">
                <ProductImage chemicalId={imageUrl} className="w-100" />
            </div>
            <div className="col-9">
                <div className="row">
                    {productPropItem('产品编号', origin)}
                    {productPropItem('CAS', CAS)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
        {unsoldProductsUI(discountinued)}
    </div>
} */
