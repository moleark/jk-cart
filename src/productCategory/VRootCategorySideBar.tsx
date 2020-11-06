import * as React from 'react';
import { Ax, View } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';

export class VRootCategorySideBar extends View<CProductCategory>{

	render() {
		return <>
			<h2>产品分类</h2>
			<nav id="sidebar">
				<ul className="list-unstyled components">
					{this.controller.rootCategories.map(v => {
						let { productCategory, name, children } = v;
						let pcId = (productCategory as any).id;
						let menuId = "Submenu" + pcId;
						return <li className="active" key={pcId}>
							<a href={'#' + menuId} data-toggle="collapse" aria-expanded="false">{name}</a>
							{this.renderChildren(children, menuId)}
						</li>
					})}
				</ul>
			</nav>
		</>;
		//<a href={'/productCategory/'+productCategory} data-toggle="collapse" aria-expanded="false">{name}</a>
	}

	private renderChildren(children: ProductCategory[], menuId: string) {
		return <ul className="collapse list-unstyled" id={menuId}>
			{children.map(e => {
				let { productCategory } = e;
				let pcId = (productCategory as any).id;
				return <li key={pcId}>
					{this.controller.renderCategoryItem(e)}
				</li>;
			})}
		</ul>
	}
}
