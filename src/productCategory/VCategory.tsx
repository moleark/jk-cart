/* eslint-disable */
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CProductCategory, ProductCategory } from './CProductCategory';
import { observer } from 'mobx-react';
import { xs } from '../tools/browser';

export class VCategory extends VPage<CProductCategory> {

    instruction: string;
    async open() {
        //this.instruction = categoryWapper.instruction;
        // let { getCategoryInstruction } = this.controller;
        // this.instruction = await getCategoryInstruction(0);
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { cHome } = this.controller.cApp;
        let header: any, cartLabel: any;
        if (xs) {
            header = cHome.renderSearchHeader();
            cartLabel = this.controller.cApp.renderCartLabel();
        }
        return <Page header={header} right={cartLabel}>
            {this.renderRootCategory()}
        </Page>
    })

    /*
    private renderChild = (childWapper: any) => {
        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }*/

    //private categoryClick = async (childWapper: any, parent: any, labelColor: string) => {
    /*  console.log(childWapper);
     console.log(parent); */

    //    await this.controller.openMainPage(childWapper, parent, labelColor);
    //}

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

    private renderRootCategory = () => {
        //let { productCategory, name, children } = this.controller.rootCategories;
		let {name} = this.controller.current;
        let instructionUi;
        if (this.instruction) {
            // let instr: JQuery<Element> = $(this.instruction);
            // $("a[href*='jkchemical.com']", instr).addClass('d-none');
            // instructionUi = <p dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
            instructionUi = <section dangerouslySetInnerHTML={{ __html: (this.instruction) }} />;
        }

        return <section className="container mt-lg-2">
            <div className="row">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.renderRootSideBar()}
                </div>
                <div className="col-lg-9 product-introduct">
                    <h1>{name}</h1>
                    {instructionUi}
                    <div className="row">
                        {this.controller.rootCategories.map(v => this.renderSubCategory(v))}
                    </div>
                </div>
            </div>
        </section>
    }

    private renderSubCategory = (item: ProductCategory) => {
        let { name, children, total } = item;
        let isChildren = children.length !== 0;

        return <div className="col-lg-4 each-product" key={name}
            onClick={() => { if (!isChildren) { this.controller.onClickCategory(item) } }}>
            <h2 className="purple-bg">{name}</h2>
            <div className="background-grey">
                {/* {children.slice(0,3).map((v: any) => <a href="" key={v.name}><p>{v.name}</p></a>)} */}
                {
                    isChildren
                        ? <>
                            {children.slice(0, 3).map((v: any) => <div onClick={() => this.controller.onClickCategory(v)} key={v.name}><p>{v.name}</p></div>)}
                            <p className="text-right"> <span onClick={() => this.controller.onClickCategory(item)}>更多 <i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                        </>
                        : <div>{total > 1000 ? '>1000' : total}个产品</div>
                }
            </div>
        </div>
    }
}