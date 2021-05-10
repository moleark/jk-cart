import React from 'react';
import { Ax, tv, View } from 'tonva-react';
import { CProductCategory } from "./CProductCategory";

export class VBrandCrumbs extends View<CProductCategory> {

    render(allAncestors: any) {
        let { cApp } = this.controller;
        return <div className="breadcrumbs mb-4" style={{ lineHeight: 1.5 }}>
            <a href="/">首页</a>
            <Ax href="/product-catalog">产品</Ax>
            {allAncestors.map((parent: any) => {
                return <React.Fragment key={typeof parent === 'object'? parent.id : parent} >{
					tv(parent, (e: any) => {
                    let { id, productcategorylanguage } = e;
                    let jL = productcategorylanguage.find((jl: any) => cApp.currentLanguage.id === jl.language.id);
                    return jL !== undefined ? <Ax href={"/product-catalog/" + id}>{jL.name}</Ax> : null;
                })}
				</React.Fragment>
            })}
        </div>
    }
}