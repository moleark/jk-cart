import * as React from 'react';
import { View } from 'tonva';
import { CProductCategory } from './CProductCategory';
import { FA } from 'tonva';
//import { observer } from 'mobx-react';
import { GLOABLE } from 'configuration';

/*
const imgStyle: React.CSSProperties = {
    height: '1.5rem', width: '1.5rem',
    marginLeft: '0.1rem',
    marginRight: '0.3rem'
}

export const titleTitle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export const subStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}
*/

export class VRootCategory extends View<CProductCategory> {

    private categoryClick = async (categoryWapper: any, parent: any, labelColor: string) => {
        await this.controller.openMainPage(categoryWapper, parent, labelColor);
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { name, children, productCategory } = item;
        let { id: productCategoryID } = productCategory;
        let { src, labelColor } = GLOABLE.ROOTCATEGORY[productCategoryID];
        return <div className="bg-white mb-3" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, undefined, labelColor)}>
                <img className="mr-4 cat-root-img" src={src} alt={name} />
                <b>{name}</b>
            </div>
            <div className="cat-root-sub">
                <div className="row no-gutters">
                    {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                </div>
            </div>
        </div>;
    }

    private renderSubCategory = (item: any, parent: any, labelColor: string) => {
        let { name, subsub, total } = item;
        return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            onClick={() => this.categoryClick(item, parent, labelColor)}>
            <div className="py-2 px-2 cat-sub">
                <div className="text-truncate">
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className={labelColor} />
                        &nbsp; {name}
                    </span>
                </div>
                {renderThirdCategory(subsub, total)}
            </div>
        </div>;
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private content = () => {
        let { rootCategories: categories } = this.controller;
        return <>{categories.map((v: any) => this.renderRootCategory(v, undefined))}</>;
        // return <>{categories2.map(v => <div key={v.productCategory.id}>{tv(v, e => this.renderRoot(e))}</div>)}</>;
    };

    private renderRoot(root: any) {
        let { productCategory } = root;
        let { id } = productCategory;
        console.log(id);
        return <div key={id}>{id}</div>
    }
}


export function renderThirdCategory(subsub: string, total: number) {
    /*
    return <div className="py-1 px-1 text-muted small cat-sub-style">
        {items.length === 0 ? <>该类产品数量: {total > 1000 ? '>1000' : total}</> : items.map((v: any) => v.name).join(' / ')}
    </div>
    */
    return <div className="py-1 px-1 text-muted small text-truncate">
        {
            subsub === undefined ?
                <>该类产品数量: {total > 1000 ? '>1000' : total}</>
                :
                subsub
        }
    </div>
}
