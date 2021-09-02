import { PageItems } from 'tonva-react';
import * as _ from 'lodash';

export class ElasticSearchPager<T extends any> extends PageItems<T>{

    private searchUrl: string;
    private urlGen: UrlGen;
    protected idFieldName: any;
    private pageNumber: number;
    constructor(searchUrl: string, urlGen: UrlGen, pageSize?: number, firstSize?: number, itemObservable?: boolean) {
        super(itemObservable);
        this.searchUrl = searchUrl;
        if (pageSize !== undefined) this.pageSize = pageSize;
        if (firstSize !== undefined) this.firstSize = firstSize;
        this.pageNumber = 1;
        this.urlGen = urlGen;
    }

    setReverse() {
        this.appendPosition = 'head';
    }

    protected async onLoad() {
        if (this.idFieldName) return;
        this.sortOrder = 'asc';
    }

    protected async loadResults(param: any, pageStart: number, pageSize: number): Promise<{ [name: string]: any[] }> {

        let { keyWord, salesregion } = param;
        /*
        let url = this.searchUrl + '/' + keyWord;
        if (this.pageNumber > 1) {
            url += "&pageNumber=" + this.pageNumber;
            url += "/" + this.pageNumber;
        }
        */
        let url = this.searchUrl + this.urlGen.generateUrl(keyWord, this.pageNumber);
        try {
            let resp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let ret = await resp.json();
            let items = ret.hits;
            // 做数据变换，返回items
            return { $page: items };
        } catch (error) {
            return { $page: [] };
        }
    }

    protected async onLoaded(): Promise<void> {
        this.pageNumber += 1;
    }
}


export abstract class UrlGen {
    abstract generateUrl(keyWord: string, pageNumber: number): string;
}

export class productUrlGen extends UrlGen {

    generateUrl(keyWord: string, pageNumber: number): string {
        let url = '?key=' + keyWord;
        if (pageNumber > 1) {
            url += "&pageNumber=" + pageNumber;
        }
        return url;
    }
}

export class productCatalogUrlGen extends UrlGen {

    generateUrl(keyWord: string, pageNumber: number): string {
        let url = '/' + keyWord;
        if (pageNumber > 1) {
            url += "/" + pageNumber;
        }
        return url;
    }
}

export class productStandardUrlGen extends UrlGen {

    generateUrl(keyWord: string, pageNumber: number): string {
        let url = '/' + keyWord;
        if (pageNumber > 1) {
            url += "/" + pageNumber;
        }
        return url;
    }
}