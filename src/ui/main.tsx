import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';
import logo from '../images/logo.png';
import { browser } from 'tools/browser';
import { GLOABLE } from 'configuration';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    downloadApp = () => {
        if (browser.versions.android)
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
        if (!browser.versions.html5Plus && browser.versions.android) {
            header = <div className="w-100 mx-3 d-flex justify-content-between">
                <div className="d-flex" onClick={this.downloadApp}>
                    <img src={logo} alt="logo" style={{ height: "2rem", width: "2rem" }}></img>
                    <div className="ml-2">
                        <div className="small">百灵威购物</div>
                        <div className="small">专业化学试剂供应商</div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary">立即打开</button>
            </div>
        }
        return <Page header={header}>
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
