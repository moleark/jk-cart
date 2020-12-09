import * as React from 'react';
import { observer } from 'mobx-react';
import { View } from 'tonva';
import { CProduct } from '../CProduct';
import { ProductImage } from 'tools/productImage';
import {renderBrand, renderPropItem} from '../renders';
import { VChemicalInfoInCart } from './VChemicalInfo';
import { Product } from '../../model';
import { VFavorite } from './VFavorite';
/*
import { VProductFavorateLabel } from 'customer/VProductFavorateLabel';
import { Link } from 'react-router-dom';
*/

/**
 *
 */
export class VProuductView extends View<CProduct> {
    render(product: Product): JSX.Element {
        return React.createElement(observer(() => {
			let { brand, props } = product;
			let { description, descriptionC, origin, imageUrl } = props;
			return <div className="d-block mb-4 px-3">
				<div className="d-flex py-2">
					<div>
						<div><strong>{description}</strong></div>
						<div>{descriptionC}</div>
					</div>
					<div>{this.renderVm(VFavorite, {product})}</div>
				</div>
				<div className="row">
					<div className="col-3">
						<ProductImage chemicalId={imageUrl} className="w-100" />
					</div>
					<div className="col-9">
						<div className="row">
							{renderPropItem('产品编号', origin)}
							{this.renderVm(VChemicalInfoInCart, product) /*renderChemicalInfoInCart(productBox)*/}
							{renderBrand(brand)}
						</div>
					</div>
				</div>
			</div>;
		}));
	}

	/*
    private async getProudct(product: BoxId) {
        if (this.product === undefined) {
            let ret = await this.controller.getProductAndDiscount(product);
            this.product = ret.product;
            this.discount = ret.discount;
        }
	}
	*/
}
