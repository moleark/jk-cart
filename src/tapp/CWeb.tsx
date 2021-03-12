import React from 'react';
import ReactDOM from 'react-dom';
import { Elements, nav, User, WebNav } from 'tonva';
import { CApp } from "./CApp";
import { NavHeaderView, NavFooterView } from './webNav';
import { VMainWebNav } from './webNav';


export class CWeb extends CApp {

    //protected abstract async onPageStart(params:any):Promise<void>;

    get webNav(): WebNav<any> {
        return {
            VNavRawHeader: NavHeaderView,
            VNavRawFooter: NavFooterView,
        }
    }

    protected beforeInit() {
        nav.setIsWebNav();
    }

    protected afterInit() {
        if (!nav.isMobile) {
            nav.pageWebNav = this.pageWebNav;
        }
    }

    protected async afterStart(): Promise<void> {
        await super.afterStart();

        this.hookElements();
        window.onfocus = () => {
            nav.reloadUser();
        }
    }

    private hookElements() {
        let elements: Elements = {
            login: this.renderLogin,
            homeCart: this.renderHomeCart,
        }
        for (const p in elements) {
            let elRoot = document.getElementById(p);
            if (elRoot) {
                elements[p](elRoot);
            }
        }
    }

    private renderLogin = (element: HTMLElement) => {
        ReactDOM.render(this.cMe.renderLoginState(), element);
    }

    private renderHomeCart = (element: HTMLElement) => {
        ReactDOM.render(this.cCart.renderCartLabel_web(), element);
    }

    protected async internalStart(params: any) {
    }

    showMain() {
        this.openVPage(VMainWebNav);
    }

    setHomeRoute() {
        nav.onNavRoute(async (params: any) => {
            // window.location.href = process.env.REACT_APP_HOME_PATH;
        });
    }

    /**
     * 
     * @param user 
     */
    protected async onChangeLogin(user: User) {
        super.onChangeLogin(user);
        if (user) {
            // 登陆后

        } else {
            // 退出后
        }
    }
}