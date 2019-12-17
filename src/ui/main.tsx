import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';
import logo from '../images/logo.png';
import { browser } from 'tools/browser';
import { GLOABLE } from 'cartenv';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    downloadApp = () => {
        // if (browser.versions.android)
        window.open(GLOABLE.ANDROIDAPPADDRESS);
    }

    render = (param?: any): JSX.Element => {
        let { cHome, cMember, cCart, cMe, cart } = this.controller;
        let faceTabs = [
            { name: 'home', label: '首页', icon: 'home', content: cHome.tab, notify: undefined/*store.homeCount*/ },
            // { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
            { name: 'cart', label: '购物车', icon: 'shopping-cart', content: cCart.tab, notify: cart.count },
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content, notify } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
            }
        });

        let header: any = false;
        if (!browser.versions.html5Plus) {
            header = <div className="w-100 mx-3 d-flex justify-content-between" onClick={this.downloadApp}>
                <span className="pt-2 small text-danger">
                    APP购物更方便
                </span>
                <button type="button" className="btn btn-primary btn-sm">立即安装</button>
            </div>
        }
        return <Page header={header} headerClassName="bg-warning" >
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
