import * as React from 'react';
import { VPage, Page, FA } from "tonva-react";
import { CProductCategory } from './CProductCategory';
import marked from 'marked';
//import { tv } from "tonva-react";
import { renderThirdCategory } from './VRootCategory';
import { observer } from 'mobx-react';
import $ from 'jquery';

export class VCategory extends VPage<CProductCategory> {

    instruction: string;
    async open(categoryWapper: any) {

        this.instruction = categoryWapper.instruction;
        this.openPage(this.page, categoryWapper);
        // let { getCategoryInstruction } = this.controller;
        // this.instruction = await getCategoryInstruction(0);
    }

    /*
    private renderChild = (childWapper: any) => {
        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }*/

    private categoryClick = async (childWapper: any, parent: any, labelColor: string) => {
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
            instructionUi = <div className="overflow-auto my-3 bg-light" style={{ height: 320 }} dangerouslySetInnerHTML={{ __html: (instr[0].innerHTML || "") }} />;
        }
        return <div className="bg-white mb-3" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, parent, labelColor)}>
                <b>{name}</b>
                {instructionUi}
            </div>
            <div className="cat-root-sub">
                <div className="row no-gutters">
                    {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any, parent: any, labelColor: string) => {
        let { name, subsub, total } = item;
        return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            onClick={() => this.categoryClick(item, parent, labelColor)}>
            <div className="py-2 px-2 cat-sub">
                <div className="cat-title-title">
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className={labelColor} />
                        &nbsp; {name}
                    </span>
                </div>
                {renderThirdCategory(subsub, total)}
            </div>
        </div>;
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
}