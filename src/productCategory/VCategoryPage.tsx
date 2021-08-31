/* eslint-disable */
import * as React from 'react';
import { VPage } from "tonva-react";
import { CProductCategory, ProductCategory } from './CProductCategory';
import { xs } from '../tools/browser';
import { rootCategroyResFromId } from 'global';
import { VBrandCrumbs } from './VBreadCrumbs';
import classNames from 'classnames';

export class VCategoryPage extends VPage<CProductCategory> {

    private getBgClass = (productCategoryId: number, allAncestors: any[]) => {
        let bgClass = "";
        if (allAncestors !== undefined && allAncestors.length > 0) {
            let res = rootCategroyResFromId(allAncestors[0].id);
            if (res) bgClass = res.bgClass;
        } else {
            let res = rootCategroyResFromId(productCategoryId);
            if (res) bgClass = res.bgClass;
        }
        return bgClass;
    }

    private renderCategory(/*item: any, parent: any, labelColor: string*/) {
        let { instruction, current } = this.controller;
        let main, breadcrumbs;
        if (current) {
            let { productCategory: productCategoryId, name, children, parent, allAncestors } = current;
            breadcrumbs = this.renderVm(VBrandCrumbs, allAncestors);

            let instructionUi;
            if (instruction) {
                // let instr: JQuery<Element> = $(instruction);
                // $("a[href*='jkchemical.com']", instr).addClass('d-none');
                // instructionUi = <p dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
                instructionUi = <section dangerouslySetInnerHTML={{ __html: (instruction) }} />;
            }

            let bgClass = this.getBgClass(productCategoryId, allAncestors);
            main = <div className="col-lg-9 product-introduct">
                <h1>{name}</h1>
                {instructionUi}
                <div className="row">
                    {children.map(v => this.renderSubcategory(v, bgClass))}
                </div>
            </div>
        }

        return <section className="container mt-lg-2">
            {breadcrumbs}
            <div className="row">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.renderRootSideBar()}
                </div>
                {main}
            </div>
        </section>
    }

    private renderSubcategory(item: ProductCategory/*item: any, parent: any*/, titleBgClass: string) {
        let { productCategory: id, name, children, total } = item;
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
                        this.controller.renderCategoryItem(item, undefined,
                            <>更多 <i className="fa fa-angle-right" aria-hidden="true"></i></>)
                    }
                </p>
            </>
            :
            <div>{this.controller.renderCategoryItem(item, undefined, <>{total > 1000 ? '>1000' : total}个产品</>)}</div>;

        return <div key={name} className="col-lg-4 each-product">
            {this.controller.renderCategoryItem(item, undefined, <h2 className={classNames(titleBgClass,'text-truncate')}>{name}</h2>)}
            <div className="background-grey">{vItem}</div>
        </div>
    }

    header() { if (!xs) return ''; return this.controller.cApp.cHome.renderSearchHeader(); }
    right() { if (!xs) return null; return this.controller.cApp.renderCartLabel(); }
    content() { return this.renderCategory(); }
}