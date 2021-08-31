
//=== UqApp builder created on Mon Aug 30 2021 17:40:46 GMT+0800 (中国标准时间) ===//
import { CSub, CBase, CAppBase, IConstructor } from "tonva-react";
import { CApp } from './CApp';
import { UQs as UQss } from 'uqs';
import { UQs as UQst } from 'uq-app/uqs';

export type UQs = UQss & UQst;
export abstract class CUqBase extends CBase<CApp, UQs> {
}

export abstract class CUqSub<A extends CAppBase<U>, U, T extends CBase<A, U>> extends CSub<A, U, T> {
}

export abstract class CUqApp extends CAppBase<UQs> {
    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        let c = new type(this);
        c.init();
        return c;
    }
}

/* export abstract class CUqBase extends CBase {
    get cApp(): CApp { return this._cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
    getPageWebNav(): PageWebNav { return this.cApp.getPageWebNav(); }
}

export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
    get cApp(): CApp { return this.cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
    protected get owner(): T { return this._owner as T }
    getPageWebNav(): PageWebNav { return this.cApp.getPageWebNav(); }
}

export abstract class CUqApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        let c = new type(this);
        c.init();
        return c;
    }
}
 */