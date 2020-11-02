import { appConfig } from 'configuration';
import React from 'react';
import ReactDOM from 'react-dom';
import { CAppBase, nav, NavView, startRoute, User, WebNav } from 'tonva';
import { CApp } from "./CApp";
import { Cart } from "../cart/Cart";
import { CHome } from "../home";
import { CCart } from "../cart";
import { CProduct } from "../product";
import { COrder } from "../order/COrder";
import { CProductCategory } from "../productCategory/CProductCategory";
import { CMember } from "../member";
import { CMe } from "../me/CMe";
/*
import { CUqApp } from "./CBase";
import { VMain } from 'tapp/main';
import * as qs from 'querystringify';
*/
import { CCoupon } from "coupon/CCoupon";
import { CPointProduct } from "pointMarket/CPointProduct";
import { CYncProjects } from "ync/CYncProjects";
import { CFavorites } from 'customer/CFavorites';
import { CLottery } from 'pointMarket/CLottery';
import { CSignIn } from 'pointMarket/CSignIn';
import { NavHeaderView, NavFooterView } from './webNav';
import { VMainWebNav } from './webNav';

export abstract class CAppPage extends CApp {
	protected onRoute() {
	}

	protected abstract async onPageStart(params:any):Promise<void>;

	get webNav(): WebNav<any> {
		return { 
			VNavRawHeader: NavHeaderView,
			VNavRawFooter: NavFooterView,
		}
	}

    protected async internalStart(params: any) {
        //await super.init();

        this.cart = new Cart(this);
        await this.cart.init();

        this.cHome = this.newC(CHome);
        this.cProductCategory = this.newC<CProductCategory>(CProductCategory);
        this.cProduct = this.newC(CProduct);
        this.cOrder = this.newC(COrder);
        this.cCart = this.newC(CCart);
        this.cCoupon = this.newC(CCoupon);
        this.cMember = this.newC(CMember);
        this.cMe = this.newC(CMe);
        this.cPointProduct = this.newC(CPointProduct);
        this.cFavorites = this.newC(CFavorites);
        this.cYncProjects = this.newC(CYncProjects);
        this.cLottery = this.newC(CLottery);
        this.cSignIn = this.newC(CSignIn);

		/*
        await this.cHome.getSlideShow();

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        // this.cMe.openMyPoint();
        // this.cLottery.openLotteryProduct();
        // this.cSignIn.openPointSign();

        let { location } = document;
        let { search, pathname } = location;
        if (search) {
            let query: any = qs.parse(search.toLowerCase());
            switch (query.type) {
                case "privacy":
                    this.showMain();
                    this.cMe.openPrivacy();
                    break;
                case "product":
                    this.showMain();
                    let prouductBoxId = await this.uqs.product.ProductX.boxId(query.product).assure();
                    await this.cProduct.showProductDetail(prouductBoxId);
                    break;
                case "coupon":
                    this.showMain();
                    if (query.coupon)
                        await this.cCoupon.showSharedCoupon(query);
                    break;
                case "credits":
                    this.showMain();
                    if (query.credits) {
                        await this.cCoupon.showSharedCredits(query);
                        //if (query.platform === "1")
                        //    await this.cPointProduct.openPointDrawing(query.credits);
                        //else
                        //    await this.cCoupon.showSharedCredits(query);
                    }
                    break;
                case "vipcard":
                    this.showMain();
                    if (query.vipcard)
                        await this.cCoupon.showSharedVIPCard(query);
                    break;
                case "login":
                    if (!this.isLogined)
                        this.cMe.showLogin(async (user: User) => {
                            window.location.href = window.location.origin;
                        });
                    break;
                case "loginout":
                    if (this.isLogined)
                        this.cMe.showLoginOut(async () => {
                            window.location.href = window.location.origin;
                        });
                    break;
                case "productlist":
                    this.cProduct.start(query.key);
                    break;
                case "me":
                    this.cMe.openMyOrders('all');
                    break;
                default:
                    this.showMain();
                    break;
            }
        } else {
            this.showMain();
            //this.openVPage(Entrance);
        }*/
		this.topKey = nav.topKey();
		await this.onPageStart(params);
	}

	showMain() {
        this.openVPage(VMainWebNav);
	}
}

export function renderDom(div: any) {
	ReactDOM.render(
		<React.StrictMode>
			{div}
		</React.StrictMode>,
		document.getElementById('root')
	);
}

export function renderCApp(AppClass : new() => CAppBase, param?: any, ...params: any[]) {
	const App: React.FC = () => {
		const onLogined = async () => {
			let cApp = new AppClass();
			cApp.init();
			await cApp.start(param, params);
		}
		return <NavView onLogined={onLogined} notLogined={onLogined} />;
	}
	renderDom(<App />);
}

