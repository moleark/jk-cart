import * as React from 'react';
import { View } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';

export class VRootCategorySideBar extends View<CProductCategory>{

	//private categoryClick = async (categoryWapper: Product-catalog/*, parent: any, labelColor: string*/) => {
	//    await this.controller.openMainPage(categoryWapper/*, parent, labelColor*/);
	//}

	render() {
		return <>
			<h2>产品大类</h2>
			<nav id="sidebar">
				<ul className="list-unstyled components">
					{this.controller.rootCategories.map(v => {
						let { productCategory, name, children } = v;
						let pcId = productCategory; //(productCategory as any).id;
						let menuId = "Submenu" + pcId;
						return <li className="active" key={pcId}>
							<a href={'#' + menuId} data-toggle="collapse" aria-expanded="false">{name}</a>
							{this.renderChildren(children, menuId)}
						</li>
					})}
				</ul>
			</nav>
		</>;
	}

	private renderChildren(children: ProductCategory[], menuId: string) {
		return <ul className="collapse list-unstyled" id={menuId}>
			{children.map(e => {
				let { productCategory } = e;
				let pcId = (productCategory as any).id || productCategory;
				return <li key={pcId}>
					{this.controller.renderCategoryItem(e)}
				</li>;
			})}
		</ul>
	}
}

export class VRootCategorySideBarToSelect extends View<CProductCategory>{

	render() {
		return <nav id="sidebar" className="dropdown">
			<select name="" id="" className="form-control" onChange={(v: any) => {
				let url = "/product-catalog/" + v.target.value;
        		this.navigate(url);
			}}>
				{this.controller.rootCategories.map(v => {
						let { productCategory, name, children } = v;
						let pcId = productCategory; //(productCategory as any).id;
					let menuId = "Submenu" + pcId;
						return <>
							<option key={pcId} value={pcId} disabled>{ name }</option>
							<>{this.renderChildren(children, menuId)}</>
						</>
					})}
				
			</select>
		</nav>
	}

	private renderChildren(children: ProductCategory[], menuId: string) {
		return <>
			{children.map(e => {
				let { productCategory,name } = e;
				let pcId = (productCategory as any).id || productCategory;
				return <option key={pcId} value={pcId}>{ name }</option>
			})}
		</>
	}
}