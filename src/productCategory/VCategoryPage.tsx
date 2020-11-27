/* eslint-disable */
import * as React from 'react';
import { VPage } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';
import $ from 'jquery';

export class VCategoryPage extends VPage<CProductCategory> {

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

        return <div key={name} className="col-lg-4 each-product">
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