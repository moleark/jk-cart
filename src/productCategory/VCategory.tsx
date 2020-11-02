/* eslint-disable */
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CProductCategory } from './CProductCategory';
import { observer } from 'mobx-react';
import $ from 'jquery';
import { xs } from '../tools/browser';
import { NavFooter, NavHeader } from 'tools/ShopPage';

export class VCategory extends VPage<CProductCategory> {

    instruction: string;
    async open(categoryWapper: any) {

        this.instruction = categoryWapper.instruction;
       xs ? this.openPage(this.page, categoryWapper) : this.openPage(this.lpage, categoryWapper);;
        // let { getCategoryInstruction } = this.controller;
        // this.instruction = await getCategoryInstruction(0);
    }

    /*
    private renderChild = (childWapper: any) => {
        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }*/

    private categoryClick = async (childWapper: any, parent: any, labelColor: string) => {
       /*  console.log(childWapper);
        console.log(parent); */
        
        await this.controller.openMainPage(childWapper, parent, labelColor);
    }

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

    private renderRootCategory = (item: any, parent: any, labelColor: string) => {
        let { productCategory, name, children } = item;
        let instructionUi;
        if (this.instruction) {
            let instr: JQuery<Element> = $(this.instruction);
            $("a[href*='jkchemical.com']", instr).addClass('d-none');
            // instructionUi = <div className="overflow-auto my-3 bg-light" style={{ height: 320 }} dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
            instructionUi = <p dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
        }

        /* 
        return <div className="bg-white mb-3" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, parent, labelColor)}>
                <h1>{name}</h1>
                {instructionUi}
            </div>
            <div className="cat-root-sub">
                <div className="row no-gutters">
                    {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                </div>
            </div>
        </div>
        */
        return <section className="container mt-lg-2">
            <div className="row">
                <div className="col-lg-3 product-side d-none d-lg-block">
                    {this.controller.renderRootSideBar()}
                </div>
                <div className="col-lg-9 product-introduct">
                    <h1>{name}</h1>
                    {instructionUi}
                    <div className="row">
                        {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                    </div>
                </div>
            </div>
        </section>
    }

    private renderSubCategory = (item: any, parent: any, labelColor: string) => {
        let { name, children, total } = item;
        let isChildren = children.length !== 0;

        /* return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            onClick={() => this.categoryClick(item, parent, labelColor)}>
            <div className="py-2 px-2 cat-sub">
                <div className="cat-title-title">
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className={labelColor} />
                        &nbsp; {name}
                    </span>
                </div>
                {renderThirdCategory(children, total)}
            </div>
        </div>; */
       
        return <div className="col-lg-4 each-product" key={name} onClick={()=>{if(!isChildren){this.categoryClick(item, parent, labelColor)}}}>
            <h2 className="purple-bg">{name}</h2>
            <div className="background-grey">
                {/* {children.slice(0,3).map((v: any) => <a href="" key={v.name}><p>{v.name}</p></a>)} */}
                {
                    isChildren 
                        ? <>
                            {children.slice(0,3).map((v: any) => <div onClick={() => this.categoryClick(v, item, labelColor)} key={v.name}><p>{v.name}</p></div>)}
                            <p className="text-right"> <span onClick={() => this.categoryClick(item, parent, labelColor)}>更多 <i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                        </>
                        : <div>{total > 1000 ? '>1000' : total}个产品</div>
                }
            </div>
        </div>
    }

    private page = observer((categoryWapper: any) => {
        let { cHome } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let cartLabel = this.controller.cApp.cCart.renderCartLabel();

        let { categoryWapper: item, parent, labelColor } = categoryWapper;
        return <Page header={header} right={cartLabel}>
            {this.renderRootCategory(item, parent, labelColor)}
        </Page>
    })

    private lpage = observer((categoryWapper: any) => {
        let { cHome /*,renderHeader,renderFooter*/ } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let cartLabel = this.controller.cApp.cCart.renderCartLabel();

        let { categoryWapper: item, parent, labelColor } = categoryWapper;
        return <Page>
            {/*  return <Page webNav={{ navRawHeader: <NavHeader />, navRawFooter: <NavFooter /> }} className="bg-white"> */}
             {this.renderRootCategory(item, parent, labelColor)}
        </Page>

		//webNav={{ navRawHeader: renderHeader(), navRawFooter: renderFooter() }}
    })    
}