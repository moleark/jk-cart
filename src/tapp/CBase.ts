import { CSub, CBase, CAppBase, IConstructor, PageWebNav } from 'tonva';
import { UQs } from '../uqs';
import { CApp } from './CApp';
import { GLOABLE } from 'cartenv';
import { WebUser } from 'CurrentUser';

export abstract class CUqBase extends CBase {
    get cApp(): CApp { return this._cApp; }
	protected get uqs(): UQs { return this._uqs as UQs };
	getPageWebNav(): PageWebNav {return this.cApp.getPageWebNav();}
}

export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
    get cApp(): CApp { return this.cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
	protected get owner(): T { return this._owner as T }
	getPageWebNav(): PageWebNav {return this.cApp.getPageWebNav();}
}

export abstract class CUqApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

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

		let { uqs } = this;
		let { common } = uqs;
		let { SalesRegion, Language } = common;
		let [currentSalesRegion, currentLanguage] = await Promise.all([
			SalesRegion.load(GLOABLE.SALESREGION_CN),
			Language.load(GLOABLE.CHINESE),
		]);
		this.currentSalesRegion = currentSalesRegion;
		this.currentLanguage = currentLanguage;

        this.setUser();
		return true;
	}
}
