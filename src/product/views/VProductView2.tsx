import * as React from 'react';
import { View } from 'tonva';
import { CProduct } from '../CProduct';
import { ProductImage } from 'tools/productImage';
import { observer } from 'mobx-react';
//import { observable } from 'mobx';
import {renderBrand, renderPropItem, renderUnsold} from '../renders';
import { Product } from '../../model';
import { VFavorite } from './VFavorite';

export class VProuductView2 extends View<CProduct> {
    // @observable product: any;
    // @observable discount: number;

    render(product: Product): JSX.Element {
		return React.createElement(observer(() => {
			let { brand, chemical, props } = product;
			let { description, descriptionC, origin, imageUrl } = props;
			let discountinued = 0;
			let { CAS, purity, molecularFomula, molecularWeight } = chemical || {};
			let eName = <div className="mr-3"><strong>{description}</strong></div>;
			let cName:any;
			if (descriptionC !== description) {
				cName = <div>{descriptionC}</div>;
			}
			return <div className="d-block mb-4 px-3 bg-white">
				<div className="py-2">
					{eName}
					{cName}
					<div>{this.renderVm(VFavorite, product)}</div>
				</div>
				<div className="row">
					<div className="col-3">
						<ProductImage chemicalId={imageUrl} className="w-100" />
					</div>
					<div className="col-9">
						<div className="row">
							{renderPropItem('产品编号', origin)}
							{renderPropItem('CAS', CAS)}
							{renderPropItem('纯度', purity)}
							{renderPropItem('分子式', molecularFomula)}
							{renderPropItem('分子量', molecularWeight)}
							{renderBrand(brand) /*tv(brand, renderBrand)*/ /* 这个地方会在调试器报警告 */}
						</div>
					</div>
				</div>
				{renderUnsold(discountinued)}
			</div>
		}));
	}
}

/**
 * 收藏列表（有收藏与取消功能）
 */
/* export class VProductCarryFavorites extends View<CProduct>{
    render(param: any): JSX.Element {
        let { product } = param;
        return <div className='position-relative'>
            {renderProduct(product)}
            <div className='position-absolute' style={{ top: 20, right: -10 }}>
                {this.renderVm(VProductFavorateLabel, product.id)}
            </div>
        </div>
    }
} */
