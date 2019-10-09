import { observable } from 'mobx';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';

export class CProductCategory extends CUqBase {

    //    cApp: CApp;
    @observable categories: any[] = [];
    @observable categories2: any[] = [];

    async internalStart(param: any) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.uqs.product.GetRootCategory.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        this.categories = results.first;
        this.categories.forEach(element => {
            this.buildCategories(element, results.secend, results.third);
        })
        /*
        let result2 = await this.getRootCategoriesQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        if (result2)
            this.categories2 = result2.ret;
        */
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    async getCategoryChildren(parentCategoryId: number) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        return await this.uqs.product.GetChildrenCategory.query({ parent: parentCategoryId, salesRegion: currentSalesRegion.id, language: currentLanguage.id });
    }

    async buildCategories(categoryWapper: any, firstCategory: any, secendCategory: any) {
        firstCategory.forEach(async (element: any) => {
            element.children = secendCategory.filter((v: any) => v.parent === element.productCategory.id);
        });
        categoryWapper.children = firstCategory.filter((v: any) => v.parent === categoryWapper.productCategory.id);
    }

    async openMainPage(categoryWaper: any, parent: any, labelColor: string) {

        let { productCategory, name } = categoryWaper;
        let { id: productCategoryId } = productCategory;
        let results = await this.getCategoryChildren(productCategoryId);
        if (results.first.length !== 0) {
            this.buildCategories(categoryWaper, results.first, results.secend);
            this.openVPage(VCategory, { categoryWaper, parent, labelColor });
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategoryId, name });
        }
    }
}