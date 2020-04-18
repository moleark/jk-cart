import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';
import banner1 from '../images/20200306_banner-01.jpg';
import banner3 from '../images/20200306_banner-03.jpg';
import banner5 from '../images/20200306_banner-05.jpg';

class HomeSections extends PageItems<any> {

    private sectionTuid: Tuid;

    constructor(sectionTuid: Tuid) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

	protected async loadResults(param:any, pageStart:any, pageSize:number):Promise<{[name:string]:any[]}> {
		let ret = await this.sectionTuid.search("", pageStart, pageSize);
		return {$page: ret};
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

    //    cApp: CApp;
    homeSections: HomeSections;
	sectionTuid: Tuid;
	
	banners = [banner1, banner3, banner5];

    async internalStart(param: any) {

        let { cProductCategory } = this.cApp;
        await cProductCategory.start();
        this.openVPage(VHome);
    }

    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }

    renderCategoryRootList = () => {
        let { cProductCategory } = this.cApp;
        return cProductCategory.renderRootList();
    }

    tab = () => this.renderView(VHome);
}