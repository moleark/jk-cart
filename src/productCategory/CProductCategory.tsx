import _ from 'lodash';
import { CUqBase } from '../tapp/CBase';
import { VRootCategory } from './VRootCategory';
import { VRootCategorySideBar } from './VRootCategorySideBar';
import { VCategory } from './VCategory';
import { GLOABLE } from "cartenv";
import './cat.css';
import { Tuid } from 'tonva';

export class CProductCategory extends CUqBase {
    rootCategories: any[] = [];
    //@observable categories2: any[] = [];

    async internalStart(param: any) {
        this.uqs.product.ProductCategory.stopCache();

        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.uqs.product.GetRootCategory.query({
            salesRegion: currentSalesRegion.id,
            language: currentLanguage.id
        });
        let { first, secend, third } = results;
        this.rootCategories = (first as any[]).map(v => {
            return this.buildCategories(v, secend, third);
        });
        /*
        let result2 = await this.getRootCategoriesQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        if (result2)
            this.categories2 = result2.ret;
        */
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    /**
     * 渲染PC版SideBar中的目录树
     */
    renderRootSideBar = () => {
        return this.renderView(VRootCategorySideBar, this.rootCategories);
    }

    /**
     * 获取目录节点相关的介绍贴文
     * @param categoryId 目录节点id
     */
    getCategoryInstruction = async (categoryId: number) => {
        let res = await window.fetch(GLOABLE.CONTENTSITE + "/partial/categoryinstruction/" + categoryId);
        if (res.ok) {
            let content = await res.text();
            return content;
        }
    };

    /**
     * 根据目录节点的id获取该节点的子节点列表
     * @param categoryId 目录节点的id
     */
    private async getCategoryChildren(categoryId: number) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        return await this.uqs.product.GetChildrenCategory.query({
            parent: categoryId,
            salesRegion: currentSalesRegion.id,
            language: currentLanguage.id
        });
    }

    /**
     * 为productCategory装配子节点和孙节点 
     * @param categoryWapper 是个ProductCategory的object，但是其中又包含了一个名为ProductCategory属性，这个属性值是BoxId
     * @param subCategories 是第一个参数的子节点
     * @param secendSubCategory 是第一个参数的孙节点
     * @returns 装配了子节点和孙节点的ProductCategory object
     */
    private buildCategories(categoryWapper: any, subCategories: any[], secendSubCategory: any[]): any {
        let { productCategory } = categoryWapper;
        let children: any[] = [];
        for (let f of subCategories) {
            if (!Tuid.equ(productCategory, f.parent)) continue;
            let len = secendSubCategory.length;
            let secendSub: any[] = [];
            for (let j = 0; j < len; j++) {
				// eslint-disable-next-line
                let { name, parent } = secendSubCategory[j];
                if (!Tuid.equ(parent, f.productCategory)) continue;

                secendSub.push(secendSubCategory[j]);
            }
            f.children = secendSub;
            children.push(f);
        }
        //categoryWapper.children = firstCategory.filter((v: any) => v.parent === pcid);
        let ret = _.clone(categoryWapper);
        ret.children = children; // firstCategory.filter((v: any) => v.parent === pcid);
        return ret;
    }

    /**
     * 
     * @param categoryWaper 装配了子节点和孙节点的productCategory
     * @param parent 
     * @param labelColor 
     */
    async openMainPage(categoryWaper: any, parent: any, labelColor: string) {

        let { productCategory, name } = categoryWaper;
        let { id: productCategoryId } = productCategory;
        let results = await this.getCategoryChildren(productCategoryId);
        if (results.first.length !== 0) {
            let rootCategory = this.buildCategories(categoryWaper, results.first, results.secend);
            let instruction = await this.getCategoryInstruction(productCategoryId);
            this.openVPage(VCategory, { categoryWapper: rootCategory, parent, labelColor, instruction });
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategoryId, name });
        }
    }

    /**
     * 
     * @param categoryId 
     */
    async showCategoryPage(categoryId: number) {

    }
}
