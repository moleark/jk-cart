import { VPage } from 'tonva-react';
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';
import { browser } from 'tools/browser';
import { GLOABLE } from 'global';

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
            header = <div className="bg-warning d-flex align-items-center"
                onClick={this.downloadApp}>
                <span className="small text-danger ml-3">
                    APP购物更方便
                </span>
                <button type="button" className="btn btn-primary btn-sm ml-auto m-1">立即安装</button>
            </div>
        }
        return header;
    }

    content() {
        return <this.pageContent />
    }

    private pageContent = () => {
        let { controller, isWebNav } = this;
        let { renderCategoryRootList } = controller;
        let siteHeader: any;
		if (isWebNav) {
			siteHeader = <div className="mt-3"></div>;
		}
		else {
			siteHeader = this.renderVm(VSiteHeader);
		}
        return <>
            {siteHeader}
            <div className="mb-3">
                {this.renderVm(VSlider)}
            </div>
            {renderCategoryRootList()}
        </>
    };
}