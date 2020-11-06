import React from 'react';
import _ from 'lodash';
import { CUqBase } from '../tapp/CBase';
import { VRootCategory } from './VRootCategory';
import { VRootCategorySideBar } from './VRootCategorySideBar';
import { GLOABLE } from "cartenv";
import './cat.css';
import { Ax, BoxId, Tuid } from 'tonva';
import { VCategoryPage } from './VCategoryPage';

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
        this.uqs.product.ProductCategory.stopCache();

        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.uqs.product.GetRootCategory.query({
            salesRegion: currentSalesRegion, // 去掉.id, 如果传入的是obj参数，会自动取id
            language: currentLanguage, // 去掉.id, 如果传入的是obj参数，会自动取id
        });
        let { first, secend, third } = results;
        (first as any[]).forEach(v => {
            v.children = this.buildChildren(v.productCategory.id, secend, third);
        });
        this.rootCategories = first;
    }

    async load(id: number) {
        let { uqs, cApp } = this;
        let { currentLanguage } = cApp;
        let { product } = uqs;
        let { ProductCategory } = product;
        let promises = [
            ProductCategory.load(id),
            this.getCategoryChildren(id),
            this.getCategoryInstruction(id)
        ];
        let [productCategory, result, instruction] = await Promise.all(promises);
        if (productCategory) {
            let { first, secend } = result;
            this.current = {
                productCategory: id,  // 这个是设置成id还是object?
                parent: undefined,
                name: undefined,
                total: undefined,
                children: this.buildChildren(id, first, secend),
            }
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
    getCategoryInstruction = async (categoryId: number) => {
        let res = await window.fetch(GLOABLE.CONTENTSITE + "/partial/categoryinstruction/" + categoryId);
        if (res.ok) {
            let content = await res.text();
            this.instruction = content;
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

    private buildChildren(id: number, subCategories: ProductCategory[], secendSubCategory: ProductCategory[]): ProductCategory[] {
        let children: ProductCategory[] = [];
        for (let f of subCategories) {
            if (!Tuid.equ(id, f.parent)) continue;
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
        let { productCategory, name } = pc;
        let { id: productCategoryId } = ((productCategory as any) as BoxId);
        await this.showCategoryPage(productCategoryId);
    }

    /**
     * 
     * @param categoryId 
     */
    async showCategoryPage(categoryId: number) {
        if (!this.rootCategories) await this.loadRoot();  // 供SideBar使用

        await this.load(categoryId);
        if (this.current) {
            let { children } = this.current;
            if (children && children.length > 0) {
                this.openVPage(VCategoryPage);
            }
            else {
                await this.cApp.cProduct.searchByCategory({
                    productCategory: categoryId,
                    name: this.current.name
                });
            }
        } else {
            this.openVPage(VCategoryPage);
        }
    }

    renderCategoryItem(pc: ProductCategory, className?: string, content?: any): JSX.Element {
        if (!pc) debugger;
        let { productCategory, name } = pc;
        let pcId = typeof productCategory === 'object' ? (productCategory as any).id : productCategory;
        return <Ax key={pcId}
            href={'/productCategory/' + pcId}
            className={className}
            onClick={() => this.onClickCategory(pc)}>{content || name}</Ax>
    }
}
