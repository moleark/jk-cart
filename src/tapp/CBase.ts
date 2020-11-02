import { CSub, CBase, CAppBase, IConstructor } from 'tonva';
import { UQs } from '../uqs';
import { CApp } from './CApp';
import { GLOABLE } from 'cartenv';
import { WebUser } from 'CurrentUser';
import { Cart } from 'cart/Cart';

export abstract class CUqBase extends CBase {
    get cApp(): CApp { return this._cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
}

export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
    get cApp(): CApp { return this.cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
    protected get owner(): T { return this._owner as T }
}

export abstract class CUqApp extends CAppBase {
	static currentSalesRegion:any;
	static currentLanguage:any;

    get uqs(): UQs { return this._uqs };

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;
    cart: Cart;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        let c = new type(this);
        c.init();
        return c;
    }

    private setUser() {
        this.currentUser = new WebUser(this.uqs); //this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }
    }

	/*
    init() {
		super.init();
        let { uqs } = this;
        let { common } = uqs;
        let { SalesRegion, Language } = common;
        let [currentSalesRegion, currentLanguage] = await Promise.all([
            SalesRegion.load(GLOABLE.SALESREGION_CN),
            Language.load(GLOABLE.CHINESE),
        ]);
        //this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);
        //this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);
        this.currentSalesRegion = currentSalesRegion;
        this.currentLanguage = currentLanguage;

        this.setUser();
	}
	*/

	protected async beforeStart():Promise<boolean> {
		let ret = await super.beforeStart();
		if (ret === false) return false;

		if (CUqApp.currentLanguage === undefined) {
			let { uqs } = this;
			let { common } = uqs;
			let { SalesRegion, Language } = common;
			let [currentSalesRegion, currentLanguage] = await Promise.all([
				SalesRegion.load(GLOABLE.SALESREGION_CN),
				Language.load(GLOABLE.CHINESE),
			]);
			CUqApp.currentSalesRegion = currentSalesRegion;
			CUqApp.currentLanguage = currentLanguage;
			//this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);
			//this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);
		}

        this.currentSalesRegion = CUqApp.currentSalesRegion;
        this.currentLanguage = CUqApp.currentLanguage;

        this.setUser();
		return true;
	}
}
