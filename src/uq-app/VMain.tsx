import { VPage, TabCaptionComponent, TabsProps, TabProp } from 'tonva-react';
import { CApp } from './CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label:string|JSX.Element, icon:string) {
	return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}

export class VMain extends VPage<CApp> {
	protected get tabsProps(): TabsProps {
		let { store, cHome, cMe, cCart/*, cBug, cUI*/ } = this.controller;
		let tabs: TabProp[] = [
			//{name: 'home', caption: caption(t('home'), 'home'), content: cHome.tab},
			//{name: 'me', caption: caption(t('me'), 'user-o'), content: cMe.tab, load: cMe.load},
            { 
				name: 'home', 
				caption: caption('首页', 'home'),
				content: cHome.tab, 
				notify: undefined
			},
            // { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
            {
                name: 'cart',
				caption: caption('购物车', 'shopping-cart'),
                content: cCart.tabPage, 
                //page: cCart.tabPage,
                notify: store.cartCount
            },
            {
                name: 'me',
				caption: caption('我的', 'user'),
                content: cMe.tab 
                //page: cMe.tabPage,
            }
		];
		/*
		if (this.isDev === true) {
			tabs.push({
				name: 'UI', caption: caption(t('UI'), 'television'), content: cUI.tab
			});
			tabs.push({
				name: 'debug', caption: caption(t('debug'), 'bug'), content: cBug.tab, onShown: cBug.load
			});
		}
		*/
		return {tabs};
	}


	/*
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
	let { cHome, cCart, cMe, store } = this.controller;
        let faceTabs = [
            { name: 'home', label: '首页', icon: 'home', page: cHome.tab, notify: undefined },
            // { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
            {
                name: 'cart',
                label: '购物车',
                icon: 'shopping-cart',
                content: cCart.tabPage, 
                //page: cCart.tabPage,
                notify: store.cartCount
            },
            {
                name: 'me',
                label: '我的',
                icon: 'user',
                content: cMe.tab 
                //page: cMe.tabPage,
            }
        ].map(v => {
            let { name, label, icon, content, notify } = v;
            return {
                name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content,
                notify,
            }
        });

        return <Page tabsProps={{ tabs: faceTabs }} />
    }
	*/
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