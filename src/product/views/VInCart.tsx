import * as React from 'react';
import { View, tv } from 'tonva';
import { CProduct } from '../CProduct';
import {renderBrand, renderPropItem} from '../renders';
import { ProductImage } from '../../tools/productImage';

export class VInCart extends View<CProduct> {
    render(param: any): JSX.Element {
        return <>{tv(param, this.renderCartProduct)}</>;
    }

    private renderCartProduct = (product: any) => {
        let { props, brand } = product;
		// if (!props) return;
        let { description, descriptionC, origin, imageUrl } = props || product;
        if (!brand.name) brand = brand.obj;
		let cName:any;
		if (descriptionC !== description) {
			cName = <div className="pb-2"><strong dangerouslySetInnerHTML={{__html:descriptionC || ''}}></strong></div>;
        }
        return <div className="row mx-0">
                    <div className="col-lg-3">
                        <ProductImage chemicalId={imageUrl} className="w-5c h-5c" />
                    </div>
                    <div className="col-lg-9">
                        <div className="py-2 text-truncate">
                            <strong dangerouslySetInnerHTML={{__html:description|| ''}}></strong>
                        </div>
                        {cName}
                        <div className="row mx-0">
                            {renderPropItem('编号', origin)}
                            {renderBrand(brand)}
                        </div>
                    </div>
                </div>

        // return <div className="row d-flex mb-3 px-2">
        //     <div className="col-12">
        //         <div className="py-2">
        //             <strong>{description}</strong>
        //         </div>
		// 		{cName}
        //         <div className="row">
        //             <div className="col-3">
        //                 <ProductImage chemicalId={imageUrl} className="w-4c h-4c" />
        //             </div>
        //             <div className="col-9">
        //                 <div className="row">
        //                     {renderPropItem('编号', origin)}
        //                     {this.renderVm(VChemicalInfoInCart, product) /*this.controller.renderChemicalInfoInCart(product)*/}
        //                     {renderBrand(brand)}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    };
}
