import * as React from 'react';
import { Page, View, VPage } from "tonva-react";
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';
import { browser } from 'tools/browser';
import { GLOABLE } from 'cartenv';

export class VHome extends VPage<CHome> {

    async open(param?: any) {
        // this.openPage(this.page);
    }

    /*
    render(param: any): JSX.Element {
        return <this.pageContent />
    }

    private page = () => {
        return <Page header={false}>
            <this.pageContent />
        </Page>;
    };
    */

    downloadApp = () => {
        if (browser.versions.android)
            window.open(GLOABLE.ANDROIDAPPADDRESS);
    }

    header() {
        let header = <></>;
        if (!browser.versions.html5Plus && browser.versions.android) {
            header = <div className="bg-warning w-100 px-1 d-flex justify-content-between" onClick={this.downloadApp}>
                <span className="pt-2 small text-danger">
                    APP购物更方便
                </span>
                <button type="button" className="btn btn-primary btn-sm">立即安装</button>
            </div>
        }
        return header;
    }

    content() {
        return <this.pageContent />
    }

    private pageContent = () => {
        let { controller } = this;
        let { renderCategoryRootList } = controller;
        let siteHeader = this.renderVm(VSiteHeader);
        return <>
            {siteHeader}
            <div className="mb-3">
                {this.renderVm(VSlider)}
            </div>
            {renderCategoryRootList()}
        </>
    };
}