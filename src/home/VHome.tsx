import * as React from 'react';
import { Page, View } from 'tonva';
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';

export class VHome extends View<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private page = () => {
        return <Page header={false}>
            <this.content />
        </Page>;
    };

    private content = () => {
        let { controller } = this;
        let { renderCategoryRootList } = controller;
        let siteHeader = this.renderVm(VSiteHeader);
        return <>
            {siteHeader}
            {this.renderVm(VSlider)}
            {renderCategoryRootList()}
        </>
    };
}