import * as React from 'react';
import { Page, View, VPage } from 'tonva';
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';

export class VHome extends VPage<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.pageContent />
    }

    private page = () => {
        return <Page header={false}>
            <this.pageContent />
        </Page>;
    };

    private pageContent = () => {
        let { controller } = this;
        let { renderCategoryRootList } = controller;
        let siteHeader = this.renderVm(VSiteHeader);
        return <>
            {siteHeader}
            <div>
                {this.renderVm(VSlider)}
            </div>
            {renderCategoryRootList()}
        </>
    };
}