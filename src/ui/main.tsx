import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from "tonva-react";
import { CApp } from '../CApp';
// import { Switch, Route } from 'react-router-dom';
import { CUqBase } from 'CBase';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render,{tabName:param});
    }

    render = (param?: any): JSX.Element => {
        let { tabName } = param;
        if (!tabName) tabName = 'home';
        let { cHome, cCart, cMe, cart,cPointProduct } = this.controller;
        let faceTabs = [
            { name: 'home', label: '首页', icon: 'home', page: cHome.tab, notify: undefined/*store.homeCount*/ },
            // { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
            {
                name: 'cart',
                label: '购物车',
                icon: 'shopping-cart',
                //content: cCart.tab, 
                page: cCart.tabPage,
                notify: cart.count
            },
            {
                name: 'pointMarket',
                label: '积分商城',
                icon: 'gift',
                page: cPointProduct.tabPage,
                load: cPointProduct.initPointAllData,
                show : cPointProduct.initPointAllData,
            },
            {
                name: 'me',
                label: '我的',
                icon: 'user',
                //content: cMe.tab 
                page: cMe.tabPage
            }
        ].map(v => {
            let { name, label, icon, page, notify, load, show } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                page: page,
                notify: notify,
                isSelected: tabName === name ? true : false,
                load: load,
                show: show,
            }
        });

        return <Page tabsProps={{ tabs: faceTabs }} />
    }
}

/* export class Main extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render, { param });
    }

    render = (param?: any): JSX.Element => {
        return <Switch>
            <Route path='/search1/:key' render={() => {
                return <div>cProduct1.start</div>
            }} />
            <Route path='/search/:key' render={() => {
                // this.controller.cProduct.start(param.param);
                this.controller.cProduct.searchByKey(param.param);
                return this.controller.cProduct.renderProductList2(param.param);
            }} />
            <Route path='/' render={() => {
                this.openVPage(VMain);
                return <></>
            }} />
        </Switch>
    }
} */