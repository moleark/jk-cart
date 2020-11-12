/* eslint-disable */
import * as React from 'react';
import { VPage } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';
import $ from 'jquery';

export class VCategoryPage extends VPage<CProductCategory> {
	/*
    instruction: string;
    async open(categoryWapper: any) {

        this.instruction = categoryWapper.instruction;
       xs ? this.openPage(this.page, categoryWapper) : this.openPage(this.lpage, categoryWapper);;
        // let { getCategoryInstruction } = this.controller;
        // this.instruction = await getCategoryInstruction(0);
	}
	*/

    /*
    private renderChild = (childWapper: any) => {
        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }*/

    /*
    private breadCrumb = (item: any, parent: any) => {
        return <nav arial-babel="breadcrumb">
            <ol className="breadcrumb">
                {tv(item, this.breadCrumbItem)}
            </ol>
        </nav>

    }*/

    /*
    private breadCrumbItem = (values: any, parent: any) => {
        if (values === undefined || values.productCategory === undefined)
            return <></>;
        return <>
            {tv(values.productCategory.parent, this.breadCrumbItem)}
            <li className="breadcrumb-item" onClick={() => this.categoryClick(values, undefined, "")}>{values.name}</li>
        </>
    }*/

    private renderCategory(/*item: any, parent: any, labelColor: string*/) {
        let { instruction, current } = this.controller;
        let main;
        if (current) {
            let { productCategory, name, children } = current;
            let instructionUi;
            if (instruction) {
                let instr: JQuery<Element> = $(instruction);
                $("a[href*='jkchemical.com']", instr).addClass('d-none');
                // instructionUi = <div className="overflow-auto my-3 bg-light" style={{ height: 320 }} dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
                instructionUi = <p dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
            }
            main = <div className="col-lg-9 product-introduct">
                <h1>{name}</h1>
                {instructionUi}
                <div className="row">
                    {children.map(v => this.renderSubcategory(v))}
                </div>
            </div>
        } else {
            main = <div>
                无
            </div>
        }

        return <section className="container mt-lg-2">
            <div className="row">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.renderRootSideBar()}
                </div>
                {main}
            </div>
        </section>
    }

    private renderSubcategory(item: ProductCategory/*item: any, parent: any, labelColor: string*/) {
        //let labelColor = 'text-success';
        let { name, children, total } = item;
        let hasChildren = children && children.length > 0;

        let vItem = hasChildren === true ?
            <>
                {
                    children.slice(0, 3).map(v => {
                        return this.controller.renderCategoryItem(v, 'mr-3');
						/*
						return <div key={v.name}
							onClick={() => this.categoryClick(v, item, labelColor)}>
							<p>{v.name}</p>
						</div>;
						*/
					})
				}
				<p className="text-right">
					{
						this.controller.renderCategoryItem(
							item, 
							undefined, 
							<>更多 <i className="fa fa-angle-right" aria-hidden="true"></i></>)
					}
				</p>
			</>
			:
			<div>{total > 1000 ? '>1000' : total}个产品</div>;

		return <div
			key={name} 
			className="col-lg-4 each-product"
			onClick={()=>{if(!hasChildren){this.controller.onClickCategory(item)}}}
		>
			{this.controller.renderCategoryItem(
				item, 
				undefined, 
				<h2 className="purple-bg">{name}</h2>
			)}
			<div className="background-grey">{vItem}</div>
        </div>
    }

    header() { return this.controller.cApp.cHome.renderSearchHeader(); }
    right() { return this.controller.cApp.cCart.renderCartLabel(); }
    content() { return this.renderCategory(); }
}