import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
        let { cHome, cCart, cMe, cart } = this.controller;
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
                name: 'me',
                label: '我的',
                icon: 'user',
                //content: cMe.tab 
                page: cMe.tabPage
            }
        ].map(v => {
            let { name, label, icon, page, notify } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                page: page,
                notify: notify,
            }
        });

        return <Page tabsProps={{ tabs: faceTabs }} />
    }
}
