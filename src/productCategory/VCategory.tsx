import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { CProductCategory } from './CProductCategory';
//import { tv } from 'tonva';
import { renderThirdCategory } from './VRootCategory';

export class VCategory extends VPage<CProductCategory> {

    async open(categoryWaper: any) {
        this.openPage(this.page, categoryWaper);
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
        return <div className="bg-white mb-3" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, parent, labelColor)}>
                <b>{name}</b>
            </div>
            <div className="cat-root-sub">
                <div className="row no-gutters">
                    {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any, parent: any, labelColor: string) => {
        let { name, children, total } = item;
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
                {renderThirdCategory(children, total)}
            </div>
        </div>;
    }

    private page = (categoryWaper: any) => {
        let { cHome } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let cartLabel = this.controller.cApp.cCart.renderCartLabel();

        let { categoryWaper: item, parent, labelColor } = categoryWaper;
        return <Page header={header} right={cartLabel}>
            {this.renderRootCategory(item, parent, labelColor)}
        </Page>
    }
}