/* eslint-disable */
import * as React from 'react';
import { Tuid, VPage } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';
import $ from 'jquery';
import { tv } from '../tonva/uq/tuid/reactBoxId';
import { xs } from '../tools/browser';

export class VCategoryPage extends VPage<CProductCategory> {

    private renderCategory(/*item: any, parent: any, labelColor: string*/) {
        let { instruction, current, rootCategories ,cApp} = this.controller;
        let main,breadcrumbs;
        if (current) {
            let { productCategory, name, children, parent } = current;
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
            breadcrumbs= <div className="breadcrumbs mb-4" style={{lineHeight:1.5}}>
                            <a href="#">首页</a>
                            <a href="#">产品</a>
                            {tv(parent, (v: any) => {
                                if(v.parent) 
                                    return <>{tv(v.parent, (j: any) => {
                                        let jL = j.productcategorylanguage.find((jl: any) => cApp.currentLanguage.id === jl.language.id);
                                        let vL = v.productcategorylanguage.find((vl: any) => cApp.currentLanguage.id === vl.language.id);
                                        return <>
                                            <a href="#">{jL.name}</a>
                                            <a href="#">{vL.name}</a>
                                        </>
                                    })}</>
                                else {
                                    let findRootParent = rootCategories.find((vs: any) => vs.productCategory === v.id);
                                    if (findRootParent) return <a href="#">{findRootParent.name}</a>;
                                    return null;
                                }
                            })}
                            <span>{name}</span>
                        </div>
        } else {
            main = <div>
                无
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

    header() { if (!xs) return ''; return this.controller.cApp.cHome.renderSearchHeader(); }
    right() { if (!xs) return null; return this.controller.cApp.cCart.renderCartLabel(); }
    content() { return this.renderCategory(); }
}