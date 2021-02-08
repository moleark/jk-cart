import React from 'react';
import { CUqBase } from '../tapp/CBase';
import { VRootCategory } from './VRootCategory';
import { VRootCategorySideBar } from './VRootCategorySideBar';
import { GLOABLE } from "global";
import './cat.css';
import { Ax, BoxId, Tuid, VPage } from 'tonva';
import { VCategoryPage } from './VCategoryPage';
import classNames from 'classnames';

export interface ProductCategory {
    productCategory: number; //ID ProductCategory,
    parent: number; // ID,
    name: string; // char(200),
    total: number; // int
    children?: ProductCategory[];
};

export class CProductCategory extends CUqBase {
    rootCategories: ProductCategory[];
    current: ProductCategory;		// 当前显示的目录
    instruction: string; 			// 当前目录的介绍
    //@observable categories2: any[] = [];

    async internalStart(param: any) {
        await this.loadRoot();
        /*
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
        */
        /*
        let result2 = await this.getRootCategoriesQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        if (result2)
            this.categories2 = result2.ret;
        */
    }

    async loadRoot() {
        if (this.rootCategories) return;
        let { uqs, cApp } = this;
        let { product } = uqs;
        let { ProductCategory, GetRootCategory } = product;
        ProductCategory.stopCache();

        let { currentSalesRegion, currentLanguage } = cApp;
        let results = await GetRootCategory.query({
            salesRegion: currentSalesRegion, // 去掉.id, 如果传入的是obj参数，会自动取id
            language: currentLanguage, // 去掉.id, 如果传入的是obj参数，会自动取id
        });
        let { first, secend, third } = results;
        (first as any[]).forEach(v => {
            v.productCategory = v.productCategory.id;
            v.children = this.buildChildren(v.productCategory, secend, third);
        });
        this.rootCategories = first;
    }

    /**
     * 加载指定目录节点，结果赋值给this.current;
     * @param id 目录节点id
     */
    async load(id: number) {
        if (this.current && this.current.productCategory === id) return;

        let { uqs, currentLanguage } = this.cApp;
        let { product } = uqs;
        let { ProductCategory } = product;
        let promises = [
            ProductCategory.load(id),
            this.getCategoryChildren(id),
            this.getCategoryInstruction(id)
        ];
        let [pcTuid, { first, secend }, instruction] = await Promise.all(promises);
        this.instruction = instruction;
        this.current = {
            productCategory: id,
            parent: undefined,
            name: undefined,
            total: undefined,
            children: [],
        }

        let getAllAncestors = async function (productCategoryId: number) {
            let isM = true;
            while (isM) {
                let ProductCategoryLoad: any = await ProductCategory.load(productCategoryId);
                if (ProductCategoryLoad.parent) productCategoryId = ProductCategoryLoad.parent.id;
                else isM = false;
            }
        };
        await getAllAncestors(id);

        if (pcTuid) {
            let { parent, productcategorylanguage } = pcTuid;
            this.current.parent = parent;
            let pcCurrentLanguage = productcategorylanguage.find((v: any) => Tuid.equ(currentLanguage, v.language));
            this.current.name = pcCurrentLanguage && pcCurrentLanguage.name;
            this.current.children = this.buildChildren(id, first, secend);
        }
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
    private getCategoryInstruction = async (categoryId: number) => {
        try {
            let res = await window.fetch(GLOABLE.CONTENTSITE + "/partial/categoryinstruction/" + categoryId);
            if (res.ok) {
                let content = await res.text();
                return content;
            }
        } catch (error) {

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
     * 为productCategory装配子节点/孙节点 
     * @param id 
     * @param subCategories 
     * @param secendSubCategory 
     */
    private buildChildren(id: number, subCategories: ProductCategory[], secendSubCategory: ProductCategory[]): ProductCategory[] {
        let children: ProductCategory[] = [];
        for (let sub of subCategories) {
            let { productCategory: subProductCategory, parent: subParent, name: subName, total: subTotal } = sub;
            if (!Tuid.equ(id, subParent)) continue;
            children.push({
                productCategory: (subProductCategory as any).id,
                parent: (subParent as any).id,
                name: subName,
                total: subTotal,
                children: secendSubCategory
                    .filter(v => Tuid.equ(v.parent, subProductCategory))
                    .map(v => {
                        return {
                            productCategory: (v.productCategory as any).id,
                            parent: (v.parent as any).id,
                            name: v.name,
                            total: v.total
                        }
                    })
            });
        }
        return children;
    }

    onClickCategory = async (pc: ProductCategory) => {

        /*
        this.current = pc;
        let { productCategory, name } = pc;
        let { id: productCategoryId } = ((productCategory as any) as BoxId);
        let promises = [this.getCategoryChildren(productCategoryId), this.getCategoryInstruction(productCategoryId)];
        let [results, instruction] = await Promise.all(promises);
        if (results.first.length !== 0) {
            this.openVPage(VCategory);
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategory: productCategoryId, name });
        }
        */
        let { productCategory } = pc;
        let { id: productCategoryId } = ((productCategory as any) as BoxId);
        await this.showCategoryPage(productCategoryId);
    }

    /**
     * 
     * @param {number} categoryId 目录节点的id 
     */
    async showCategoryPage(categoryId: number) {
        if (!this.rootCategories) await this.loadRoot();  // 供SideBar使用

        await this.load(categoryId);
        let VP: new (c: CProductCategory) => VPage<any>;
        VP = VCategoryPage;
        /*
        // 如果想要web跟app方式的产品分类页面不一样，可以这么处理
        if (this.isWebNav) {
            VP = VCategoryPage;
        }
        else {
            VP = VCategory;
        }
        */
        if (this.current) {
            let { children } = this.current;
            if (children && children.length > 0) {
                this.openVPage(VP);
            }
            else {
                await this.cApp.cProduct.searchByCategory({
                    productCategory: categoryId,
                    name: this.current.name
                });
            }
        } else {
            this.openVPage(VP);
        }
    }

    /**
     * 
     * @param {ProductCategory} pc 目录节点
     * @param className 所使用的class 
     * @param content 
     */
    renderCategoryItem(pc: ProductCategory, className?: string, content?: any): JSX.Element {
        if (!pc) debugger;
        let { productCategory, name } = pc;
        let pcId = typeof productCategory === 'object' ? (productCategory as any).id : productCategory;
        return <Ax key={pcId}
            href={'/productCategory/' + pcId}
            className={classNames(className, 'd-block text-truncate')}
        >{content || name}</Ax>
    }
}
