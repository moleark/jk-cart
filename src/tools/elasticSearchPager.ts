import { PageItems } from 'tonva';
import * as _ from 'lodash';
import { result } from 'lodash';

export class ElasticSearchPager<T extends any> extends PageItems<T>{

    private searchUrl: string;
    protected idFieldName: any;
    private pageNumber: number;
    constructor(searchUrl: string, pageSize?: number, firstSize?: number, itemObservable?: boolean) {
        super(itemObservable);
        this.searchUrl = searchUrl;
        if (pageSize !== undefined) this.pageSize = pageSize;
        if (firstSize !== undefined) this.firstSize = firstSize;
        this.pageNumber = 1;
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
        let url = this.searchUrl + '/key=' + keyWord;
        if (this.pageNumber > 1) {
            url += "/" + this.pageNumber;
        }
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

    /*
    async refreshItems(item: T) {
        let index = this._items.indexOf(item);
        if (index < 0) return;
        let startIndex: number;
        if (this.appendPosition === 'tail') {
            startIndex = index - 1;
        }
        else {
            startIndex = index + 1;
        }
        let pageStart = this.getPageId(this._items[startIndex]);
        let pageSize = 1;
        let ret = await this.load(
            this.param,
            pageStart,
            pageSize);
        let len = ret.length;
        if (len === 0) {
            this._items.splice(index, 1);
            return;
        }
        for (let i = 0; i < len; i++) {
            let newItem = ret[i];
            if (!newItem) continue;
            let newId = newItem[this.idFieldName];
            if (newId === undefined || newId === null) continue;
            if (typeof newId === 'object') newId = newId.id;
            let oldItem = this._items.find(v => {
                let oldId = (v as any)[this.idFieldName];
                if (oldId === undefined || oldId === null) return false;
                if (typeof oldId === 'object') oldId = oldId.id;
                return oldId = newId;
            });
            if (oldItem) {
                _.merge(oldItem, newItem);
            }
        }
    }
    */

    protected async onLoaded(): Promise<void> {

        this.pageNumber += 1;
    }
}
