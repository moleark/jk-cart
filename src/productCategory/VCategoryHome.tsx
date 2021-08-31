/* eslint-disable */
import * as React from 'react';
import { Ax, VPage } from "tonva-react";
import { CProductCategory } from './CProductCategory';
import { xs } from '../tools/browser';
import { rootCategroyResFromId } from 'global';
import classNames from 'classnames';
import combinations5 from 'images/J&K triangle combinations 5.png';
import combinations4 from 'images/J&K triangle combinations4.png';
import { VBrandCrumbs } from './VBreadCrumbs';

export class VCategoryHome extends VPage<CProductCategory> {

    private renderCategory() {
        let main = <div className="row">
            {
                this.controller.rootCategories.map((v, index: number) => {
                    let { name, children, productCategory } = v;
                    let pcId = typeof productCategory === 'object' ? (productCategory as any).id : productCategory;
                    let { viceSrc, bgClass } = rootCategroyResFromId(pcId);
                    return <div className="col-lg-4 single-product" key={pcId}>
                        <Ax key={pcId} href={'/product-catalog/' + pcId} className={classNames('d-block text-truncate')}>
                            <img src={viceSrc} className="w-100" />
                            <h2 className={bgClass}>{name}</h2>
                        </Ax>
                        <div className="background-grey">
                            <ul>
                                {
                                    children.slice(0, 5).map(i => {
                                        return this.controller.renderCategoryItem(i, 'mr-3 mb-2');
                                    })
                                }
                                <p className="text-right">
                                    {
                                        this.controller.renderCategoryItem(v, undefined,
                                            <>更多 <i className="fa fa-angle-right" aria-hidden="true"></i></>)
                                    }
                                </p>
                            </ul>
                        </div>
                    </div>
                })
            }
        </div>;

        return <div>
            <div className="main-product">
                <img src={combinations5} className="img1" />
                <img src={combinations4} className="img2" />
                <img src={combinations4} className="img3" />
            </div>
            <div className="mt-lg-2 px-3">{this.renderVm(VBrandCrumbs, [])}</div>
            <div className="container main-product-introduce w-100 px-3 pt-0">
                <p className="text-left">向全球化学、生命科学、材料领域客户提供60万种高质量化学品和仪器耗材产品，以及定制生产服务，满足从研发到生产的需求。</p>
            </div>
            <section className="container mt-lg-2 main-product">
                {main}
            </section>

        </div>
    }

    header() { if (!xs) return ''; return this.controller.cApp.cHome.renderSearchHeader(); }
    right() { if (!xs) return null; return this.controller.cApp.renderCartLabel(); }
    content() { return this.renderCategory(); }
}