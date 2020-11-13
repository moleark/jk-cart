import * as React from 'react';
import { Ax, View } from 'tonva';
import { CProductCategory } from './CProductCategory';
import { FA } from 'tonva';
import { rootCategroyResFromId } from 'global';
//import { observer } from 'mobx-react';

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

    /**
     * 
     * @param item 装配了子节点和孙节点的productCategory
     * @param parent 
     */
    private renderRootCategory = (item: any, parent: any) => {
        let { name, children, productCategory } = item;
        let { id: productCategoryID } = productCategory;
        let { src, labelColor } = rootCategroyResFromId(productCategoryID);
        return <div className="bg-white mb-3" key={name}>
            <Ax className="py-2 px-3 cursor-pointer"
                href={'/productCategory/' + productCategoryID}
                onClick={() => this.controller.showCategoryPage(productCategoryID)}>
                <img className="mr-4 cat-root-img" src={src} alt={name} />
                <b>{name}</b>
            </Ax>
            <div className="cat-root-sub">
                <div className="row no-gutters">
                    {children.map((v: any) => this.renderSubCategory(v, item, labelColor))}
                </div>
            </div>
        </div>;
    }

    private renderSubCategory = (item: any, parent: any, labelColor: string) => {
		let { name, children, total } = item;
		/*
        return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer">
            <A onClick={() => this.categoryClick(item, parent, labelColor)} href={"/productCategory/"+ productCategory.id}>
                <div className="py-2 px-2 cat-sub">
                    <div className="text-truncate">
                        <span className="ml-1 align-middle">
                            <FA name="chevron-circle-right" className={labelColor} />
                            &nbsp; {name}
                        </span>
                    </div>
                    {renderThirdCategory(children, total)}
                </div>
                {renderThirdCategory(children, total)}
            </div>
		</div>;
		*/
		//onClick={() => this.controller.onClickCategory(item)}
		let productCategoryId = item.productCategory.id;
        return <Ax key={name}
			className="col-6 col-md-4 col-lg-3 cursor-pointer"
			href={'/productCategory/' + productCategoryId}
			onClick={() => this.controller.showCategoryPage(productCategoryId)}
            >
            <div className="py-2 px-2 cat-sub">
                <div className="text-truncate">
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className={labelColor} />
                        &nbsp; {name}
                    </span>
                </div>
                {renderThirdCategory(children, total)}
            </div>
        </Ax>;
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private content = () => {
        let { rootCategories } = this.controller;
        return <>{rootCategories.map((v: any) => this.renderRootCategory(v, undefined))}</>;
        // return <>{categories2.map(v => <div key={v.productCategory.id}>{tv(v, e => this.renderRoot(e))}</div>)}</>;
    };

    private renderRoot(root: any) {
        let { productCategory } = root;
        let { id } = productCategory;
        console.log(id);
        return <div key={id}>{id}</div>
    }
}


function renderThirdCategory(children: any[], total: number) {
    return <div className="py-1 px-1 text-muted small text-truncate">
        {
            children.length === 0 ?
                <>{total > 1000 ? '>1000' : total} 个产品</>
                :
                children.map(v => v.name).join(' / ')
        }
    </div>
}
