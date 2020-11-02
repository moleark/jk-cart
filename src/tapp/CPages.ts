import { appConfig } from "configuration";
import { nav, startRoute, User } from "tonva";
import { CApp } from "./CApp";
import { CAppPage, renderCApp } from "./CAppPage";

class CHomePage extends CAppPage {
	protected async onPageStart():Promise<void> {
        await this.cHome.getSlideShow();

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
		this.showMain();
	}
}

class CProductSearchPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cProduct.start(params?.key);
	}
}

class CProductDetailPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
        this.cProduct.showProductDetail(params?.id);
	}
}

class CCartPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cCart.start();
	}
}

class CProductCategoryPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cProductCategory.start(params?.id);
	}
}

class CPointShopPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cPointProduct.openMyPoint();
	}
}

class CAboutPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cMe.openAbout();
	}
}

class CMePage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cMe.start();
	}
}

class CLoginPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		nav.showLogin(async (user:User) => window.history.back(), false);
	}
}

class CLogoutPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		//nav.logout(async ()=>{});
		//this.cMe.openAbout();
		nav.showLogout(async ()=>window.history.back());
	}
}

class CRegisterPage extends CAppPage {
	protected async onPageStart(params:any):Promise<void> {
		this.cMe.openAbout();
	}
}

export async function navStart() {
	let routes: {[route:string]: new () => CApp} = {
		'/app': CApp,
		'/index': CHomePage,
		'/home': CHomePage,
		'/search/:key': CProductSearchPage,
		'/product/:id': CProductDetailPage,
		'/cart': CCartPage,
		'/productCategory/:id': CProductCategoryPage,
		'/pointshop': CPointShopPage,
		'/about': CAboutPage,
		'/me': CMePage,
		'/login': CLoginPage,
		'/logout': CLogoutPage,
		'/register': CRegisterPage,
	};

	let navOns: {[route:string]: (params:any, queryStr:any) => void} = {};
	for (let route in routes) {
		navOns[route] = (params:any, queryStr:any) => {
			renderCApp(routes[route], params);
		}
	}
	nav.on(navOns); 
	/*
	nav.on({
		'/search/:key': (params: any, queryStr: any) => {
			renderCApp(new CProductSearchPage(), params);
		},
		'/product/:id': (params: any, queryStr: any) => {
			renderCApp(new CProductDetailPage(), params);
		},
		'/cart': (params: any, queryStr: any) => {
			renderCApp(new CCartPage(), params);
		},
		'/productCategory/:id': (params: any, queryStr: any) => {
			renderCApp(new CProductCategoryPage(), params);
		},
		'/pointshop': (params: any, queryStr: any) => {
			// 积分商城是否需要登录后才能查看？ 
			renderCApp(new CPointShopPage(), params);
		}*/

		/*
		'/search/:key': (params: any, queryStr: any) => {
			renderCApp(new CAppProduct(), params.key);
		},
		'/product/:id': (params: any, queryStr: any) => {
			renderCApp(new CAppProductDetail(), params.id);
		},
		'/a/b': () => {
			renderDom(<div>/a/b <button onClick={() => nav.navigate('/c/d')}>test</button></div>)
		},
		'/c/d': () => {
			renderDom(<div>
				/c/d
				<button onClick={() => nav.navigate('/eeee/a/1?c=1 & d=3')}>test</button>
			</div>)
		},
		'/eeee/:action/:id': (params: any, queryStr: any) => {
			let span: any;
			if (queryStr) {
				span = <span>{queryStr}</span>
			}
			renderDom(<div>/e query:{span}  params:{JSON.stringify(params)}</div>)
		},
		'/bbbb/cccc': () => {
		},
		*/
	//});
	nav.on(() => {
		renderCApp(CHomePage);
	});
	await startRoute(appConfig);
}
