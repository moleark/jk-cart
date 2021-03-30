import * as React from 'react';
import { BoxId, tv, View } from 'tonva';
import { CProduct } from '../CProduct';
import { ProductImage } from 'tools/productImage';
import { observer } from 'mobx-react';
//import { observable } from 'mobx';
import { renderBrand, renderPropItem, renderUnsold } from '../renders';
import { Product } from '../../model';
import { VFavorite } from './VFavorite';
import { VPrice, VPriceWithTr } from './VPrice';
import classNames from 'classnames';
import { xs } from '../../tools/browser';

export class VProuductView2 extends View<CProduct> {
	// @observable product: any;
	// @observable discount: number;
	render(param: any): JSX.Element {
		return React.createElement(observer(() => {
			let { product, dataSource, callback } = param;
			let productListSource = dataSource ? true : false;
			let { brand, chemical, props } = product;
			let { description, descriptionC, origin, imageUrl, id } = props;
			let { CAS, purity, molecularFomula, molecularWeight } = chemical || {};
			let eName = <div className="pr-5"><strong dangerouslySetInnerHTML={{__html:description|| ''}}></strong></div>;
			let cName: any;
			if (descriptionC !== description) {
				cName = <div className="pr-5" dangerouslySetInnerHTML={{__html:descriptionC || ''}}></div>;
			}
			return <div className="row mx-0 my-lg-2">
				<div className="col-lg-2">
					<div className="img-wrap">
						<ProductImage chemicalId={imageUrl} className="mx-auto" style={{ maxHeight: 192 }} />
					</div>
				</div>
				<div className="col-lg-10 each-product">
					<div onClick={(event: React.MouseEvent) => { event.stopPropagation(); }}>
						<div>{this.renderVm(VFavorite, { product, callback: callback })}</div>
					</div>
					<h3 className="ml-lg-3">
						{eName}
						{cName}
					</h3>
					{
						!productListSource
							? <div className="row p-0 mx-0">
								{renderPropItem('产品编号', origin)}
								{renderPropItem('CAS', CAS || props.CAS)}
								{renderPropItem('纯度', purity || props.purity)}
								{renderPropItem('分子式', molecularFomula || props.molecularFomula)}
								{renderPropItem('分子量', molecularWeight || props.molecularWeight)}
								{renderBrand(brand)}
							</div>
							: <p className="ml-lg-3">
								{renderPropItemC('产品编号', origin, null, false)}
								{renderPropItemC('CAS', CAS || props.CAS)}
								{brand && renderPropItemC('品牌', brand.name)}
							</p>
					}
					{!this.controller.showFavorites &&
						<div className="text-right">
							<a className="button display-desktop collapsed" data-toggle="collapse" href={`#description${id}`} role="button" aria-expanded="false" aria-controls="jk" target="_blank"
								onClick={(event: React.MouseEvent) => { event.stopPropagation(); }}
							></a>
						</div>
					}
				</div>

				<div className="col-lg-12 mt-lg-2 collapse" id={`description${id}`}
					onClick={(event: React.MouseEvent) => { event.stopPropagation(); }}
				>
					<div className="table-responsive-vertical shadow-z-1">
						<table id="table" className="table article-product-table" style={{marginBottom:2}}>
							<thead>
								<tr className="article-product-list">
									<th>包装</th>
									<th>库存</th>
									<th>价格</th>
									<th>数量</th>
								</tr>
							</thead>
							<tbody>
								{this.renderVm(VPriceWithTr, product)}
							</tbody>
						</table>
					</div>
				</div>
				{/* <hr style={{width: "97%",height: "1px",marginBottom: "35px"}}></hr> */}
			</div>;

			// return <div className="row mx-0 my-3 bg-white">
			// 	<div className="col-lg-4 d-flex">
			// 		<ProductImage chemicalId={imageUrl} className="mx-auto" style={{ maxHeight: 192 }} />
			// 		{/* <ProductImage chemicalId={imageUrl} className="w-100" /> */}
			// 	</div>
			// 	<div className="col-lg-8 each-product">
			// 		<div className="details">
			// 			{eName}
			// 			{cName}
			// 			<div>{this.renderVm(VFavorite, { product, callback: callback })}</div>
			// 			{
			// 				!productListSource
			// 					? <div className="row p-0 mx-0">
			// 						{renderPropItem('产品编号', origin)}
			// 						{renderPropItem('CAS', CAS || props.CAS)}
			// 						{renderPropItem('纯度', purity || props.purity)}
			// 						{renderPropItem('分子式', molecularFomula || props.molecularFomula)}
			// 						{renderPropItem('分子量', molecularWeight || props.molecularWeight)}
			// 						{renderBrand(brand)}
			// 					</div>
			// 					: <div className="row p-0 mx-0">
			// 						{renderPropItemCustom('产品编号', origin, null, false)}
			// 						{renderPropItemCustom('CAS', CAS || props.CAS)}
			// 						{brand && renderPropItemCustom('品牌', brand.name)}
			// 					</div>
			// 			}
			// 		</div>
			// 		{!this.controller.showFavorites &&
			// 			<div>
			// 				<a className="button display-desktop collapsed" data-toggle="collapse" href={`#description${id}`} role="button" aria-expanded="false" aria-controls="jk" target="_blank"
			// 					onClick={(event: React.MouseEvent) => { event.stopPropagation(); }}>详情
			// 				</a>
			// 			</div>
			// 		}
			// 	</div>
			// 	<div className="container collapse col-lg-12 pt-2 px-0 border-top-0"
			// 		onClick={(event: React.MouseEvent) => { event.stopPropagation(); }} id={`description${id}`}>
			// 		<table id="table" className="table article-product-table table-striped">
			// 			<thead>
			// 				<tr className="article-product-list">
			// 					<th>包装</th>
			// 					<th>价格</th>
			// 					<th>数量</th>
			// 					{/* <th>收藏夹</th> */}
			// 				</tr>
			// 			</thead>
			// 			<tbody>
			// 				<>{this.renderVm(VPriceWithTr, product)}</>
			// 			</tbody>
			// 		</table>
			// 	</div>
			// </div>

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

function renderPropItemC(caption: string, value: any, captionClass?: string, CutLine?: Boolean) {
	if (value === null || value === undefined || value === '0') return null;
	let capClass = captionClass ? classNames(captionClass) : classNames("");
	let valClass = captionClass ? classNames(captionClass) : "";
	let cutLine: JSX.Element = <span className="mx-2" style={{color:"#333"}}>|</span>;
	if (!CutLine && CutLine !== undefined) cutLine = null;
	return <>
		{cutLine}
		<span className={classNames('', capClass)}>{caption}:</span>
		<span className={classNames('', valClass)}>{value}</span>

	</>
}

function renderPropItemCustom(caption: string, value: any, captionClass?: string, CutLine?: Boolean) {
	if (value === null || value === undefined || value === '0') return null;
	let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
	let valClass = captionClass ? classNames(captionClass) : "";
	let cutLine: JSX.Element = <span className="h-1c align-self-center mx-2" style={{ borderRight: '1px solid #333' }}></span>;
	if (!CutLine && CutLine !== undefined) cutLine = null;
	return <div className="col-6 col-lg-4 col-sm-6 px-0">
		{/* {!xs && cutLine} */}
		<span className={classNames('small', capClass)}> {caption}： </span>
		<span className={classNames('small', valClass)}>{value}</span>
	</div>;
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
