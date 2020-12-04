import * as React from 'react';
import { BoxId, View } from 'tonva';
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
	
	Detail = async (productId: BoxId | number | string) => {
        if (!productId) return;
        if (typeof productId === 'string') {
            productId = Number(productId);
        }
        let product = this.controller.cApp.getProduct(productId);
        await product.loadDetail();
		console.log('product',product);
    }

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
			return <div className="row mx-0 my-3 bg-white">
					<div className="col-lg-4 product-left-card">
						<ProductImage chemicalId={imageUrl} className="w-100" />
					</div>
					<div className="col-lg-8 each-product">
						<div className="details">
							{eName}
							{cName}
							<div>{this.renderVm(VFavorite, product)}</div>
							<div className="row p-0">
								{renderPropItem('产品编号', origin)}
								{renderPropItem('CAS', CAS)}
								{renderPropItem('纯度', purity)}
								{renderPropItem('分子式', molecularFomula)}
								{renderPropItem('分子量', molecularWeight)}
								{renderBrand(brand)}
							</div>
						</div>
						{/* <a className="button ahover display-desktop"
							onClick={(event: any) => { event.stopPropagation();this.Detail(product.id)}}
						>详情</a> */}
				</div>
				{/* <div className="col-lg-12">
					<div className="stable mt-lg-2">
						<div className="table-responsive-vertical shadow-z-1">
							<table id="table" className="table article-product-table">
								<thead>
									<tr className="article-product-list">
										<th>包装</th>
									</tr>
								</thead>
								<tbody>
									<tr className="article-product-list">
										<td data-title="包装" className="text-right red">25ML</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div> */}
			</div>
			
			// return <div className="d-block mb-4 px-3 bg-white">
			// 	<div className="py-2">
			// 		{eName}
			// 		{cName}
			// 		<div>{this.renderVm(VFavorite, product)}</div>
			// 	</div>
			// 	<div className="row">
			// 		<div className="col-3">
			// 			<ProductImage chemicalId={imageUrl} className="w-100" />
			// 		</div>
			// 		<div className="col-9">
			// 			<div className="row">
			// 				{renderPropItem('产品编号', origin)}
			// 				{renderPropItem('CAS', CAS)}
			// 				{renderPropItem('纯度', purity)}
			// 				{renderPropItem('分子式', molecularFomula)}
			// 				{renderPropItem('分子量', molecularWeight)}
			// 				{renderBrand(brand) /*tv(brand, renderBrand)*/ /* 这个地方会在调试器报警告 */}
			// 			</div>
			// 		</div>
			// 	</div>
			// 	{renderUnsold(discountinued)}
			// </div>
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
