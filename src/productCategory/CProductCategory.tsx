import React from 'react';
import _ from 'lodash';
import { CUqBase } from '../tapp/CBase';
import { VRootCategory } from './VRootCategory';
import { VRootCategorySideBar } from './VRootCategorySideBar';
import { VCategory } from './VCategory';
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
		if (this.rootCategories) return;
        this.uqs.product.ProductCategory.stopCache();

        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.uqs.product.GetRootCategory.query({
            salesRegion: currentSalesRegion, // 去掉.id, 如果传入的是obj参数，会自动取id
            language: currentLanguage, // 去掉.id, 如果传入的是obj参数，会自动取id
        });
        let { first, secend, third } = results;
        this.rootCategories = (first as any[]).map(v => {
            return this.buildCategories(v, secend, third);
        });
	}

	async load(id:number) {
		if (this.current && this.current.productCategory === id) return;
		await this.loadRoot();
		let promises = [this.getCategoryChildren(id), this.getCategoryInstruction(id)];
		let [results, instruction] = await Promise.all(promises);
		//let results = await this.getCategoryChildren(id);
		let {first, secend} = results;
		this.current = {
			productCategory: id,
			parent: undefined,
			name: undefined,
			total: undefined,
			children: this.buildChildren(id, first, secend),
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
            //return content;
			this.instruction = content;
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
    private buildCategories(categoryWapper: ProductCategory, subCategories: ProductCategory[], secendSubCategory: ProductCategory[]): any {
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
	
	private buildChildren(id:number, subCategories: ProductCategory[], secendSubCategory: ProductCategory[]): ProductCategory[] {
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

    /**
     * 
     * @param categoryWaper 装配了子节点和孙节点的productCategory
     * @param parent 
     * @param labelColor 
     */
    async openMainPage(categoryWaper: any, parent?: any, labelColor?: string) {
		this.current = categoryWaper;
        let { productCategory, name } = categoryWaper;
        let { id: productCategoryId } = productCategory;
        let results = await this.getCategoryChildren(productCategoryId);
        if (results.first.length !== 0) {
            this.buildCategories(categoryWaper, results.first, results.secend);
			//let instruction = 
			await this.getCategoryInstruction(productCategoryId);
            this.openVPage(VCategory/*, { categoryWapper: rootCategory, parent, labelColor, instruction }*/);
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategory: productCategoryId, name });
        }
	}
	
	onClickCategory = async (pc: ProductCategory) => {
		this.current = pc;
        let { productCategory, name } = pc;
        let { id: productCategoryId } = ((productCategory as any) as BoxId);
        let results = await this.getCategoryChildren(productCategoryId);
        if (results.first.length !== 0) {
			//let rootCategory = 
			this.buildCategories(pc, results.first, results.secend);
			//let instruction = 
			await this.getCategoryInstruction(productCategoryId);
            this.openVPage(VCategory/*, { categoryWapper: rootCategory, parent, labelColor, instruction }*/);
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategory:productCategoryId, name });
        }
	}

    /**
     * 
     * @param categoryId 
     */
    async showCategoryPage(categoryId: number) {
		await this.load(categoryId);
		let {children} = this.current;
		if (children && children.length > 0) {
			this.openVPage(VCategoryPage);
		}
		else {
			await this.cApp.cProduct.searchByCategory({ 
				productCategory:categoryId, 
				name: this.current.name 
			});
		}
	}

	renderCategoryItem(pc: ProductCategory, className?: string, content?: any):JSX.Element {
		if (!pc) debugger;
		let {productCategory, name} = pc;
		let pcId = typeof productCategory === 'object'? (productCategory as any).id : productCategory;
		return <Ax key={pcId}
			href={'/productCategory/' + pcId} 
			className={className}
			onClick={()=>this.onClickCategory(pc)}>{content || name}</Ax>
	}
}
