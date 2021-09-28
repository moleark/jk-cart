import ReactDOM from 'react-dom';
import { Elements, env, nav, PageWebNav, User, WebNav } from 'tonva-react';
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
        if (!env.isMobile) {
            nav.pageWebNav = this.pageWebNav;
        }
    }

    protected async afterStart(): Promise<void> {
        await super.afterStart();

        // this.hookElements();
		/*
        window.onfocus = () => {
            nav.reloadUser();
        }
		*/
    }

    // private hookElements() {
    //     let elements: Elements = {
    //         login: this.renderLogin,
    //         homeCart: this.renderHomeCart,
    //     }
    //     for (const p in elements) {
    //         let elRoot = document.getElementById(p);
    //         if (elRoot) {
    //             elements[p](elRoot);
    //         }
    //     }
    // }

    // private renderLogin = (element: HTMLElement) => {
    //     ReactDOM.render(this.cMe.renderLoginState(), element);
    // }

    // private renderHomeCart = (element: HTMLElement) => {
    //     ReactDOM.render(this.cCart.renderCartLabel_web(), element);
    // }

    protected async internalStart(params: any) {
    }

    /* protected showMain() {
        this.openVPage(VMainWebNav);
    } */

    /**
     * 
     * @returns 
     */
	 getPageWebNav(): PageWebNav {
        let webNav = this.getWebNav();
        if (webNav === undefined) return;
        let { VNavHeader, VNavRawHeader, VNavFooter, VNavRawFooter, renderPageHeader } = webNav;
        let navHeader: JSX.Element;
        if (VNavHeader) navHeader = this.renderView(VNavHeader);
        let navRawHeader: JSX.Element;
        if (VNavRawHeader) navRawHeader = this.renderView(VNavRawHeader);
        let navFooter: JSX.Element;
        if (VNavFooter) navFooter = this.renderView(VNavFooter);
        let navRawFooter: JSX.Element;
        if (VNavRawFooter) navRawFooter = this.renderView(VNavRawFooter);
        let ret: PageWebNav = {
            navHeader,
            navRawHeader,
            navFooter,
            navRawFooter,
            renderPageHeader,
        };
        return ret;
    }

    protected setHomeRoute() {
    	nav.onNavRoute(async (params: any) => {
            // window.location.href = process.env.REACT_APP_HOME_PATH;
        });
    }

    /**
     * 
     * @param user 
     */
    protected async onChangeLogin(user: User) {
        await super.onChangeLogin(user);
        if (user) {
            // 登陆后

        } else {
            // 退出后
        }
    }
}