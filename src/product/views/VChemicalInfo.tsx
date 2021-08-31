import * as React from 'react';
import { View } from "tonva-react";
import { CProduct } from '../CProduct';
import { observer } from 'mobx-react';
import { renderPropItem } from '../renders';
import { Product } from '../../store';

export class VChemicalInfoInCart extends View<CProduct> {
    render(product: Product): JSX.Element {
		return React.createElement(observer(() => {
			let {chemical} = product;
			if (!chemical) return;
			let { purity, CAS, molecularFomula, molecularWeight } = chemical;
			return <>
				{renderPropItem('CAS', CAS)}
				{renderPropItem('纯度', purity)}
				{renderPropItem('分子式', molecularFomula)}
				{renderPropItem('分子量', molecularWeight)}
			</>
		}));
    }

	/*
    private content = observer((param: any) => {

        let { productId } = param;
        let { chemicalInfoContainer } = this.controller;
        let chemicalInfo = chemicalInfoContainer[productId];
        if (chemicalInfo !== undefined) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = chemicalInfo;
            return <>
                {productPropItem('CAS', CAS)}
                {productPropItem('纯度', purity)}
                {productPropItem('分子式', molecularFomula)}
                {productPropItem('分子量', molecularWeight)}
            </>
        }
        return <></>;
	})
	*/
}
