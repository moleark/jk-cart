import { QueryPager, Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../tapp/CBase';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';
import { VScanCode } from './VScanCode';

class HomeSections extends PageItems<any> {

    private sectionTuid: Tuid;

    constructor(sectionTuid: Tuid) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[] }> {
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return { $page: ret };
    }
    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class CHome extends CUqBase {

    homeSections: HomeSections;
    sectionTuid: Tuid;

    banners: any[] = [];
    async internalStart(param: any) {

        /*
        let { cProductCategory } = this.cApp;
        await cProductCategory.start();
        this.openVPage(VHome);
        */
    }

    openScanCode = () => {
        this.openVPage(VScanCode)
    }

    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }

    renderCategoryRootList = () => {
        let { cProductCategory } = this.cApp;
        return cProductCategory.renderRootList();
    }

    getSlideShow = async () => {
        let list = await this.uqs.webBuilder.GetSlideShow.table({});
        list.forEach(v => {
            this.banners.push({ path: v.path, src: v.src });
        })
    }

    scanCodetoProductDetail = async (origin: any) => {
        let { cProduct, currentSalesRegion } = this.cApp;
        let productByOrigin = await this.uqs.product.GetProductByOrigin.obj({ origin, salesRegion: currentSalesRegion.id });
        await cProduct.showProductDetail(productByOrigin.id, 'ScanCode');
    }

    // tab = () => this.renderView(VHome);
    tab: VHome = new VHome(this);
}