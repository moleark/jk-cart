// import { CSub, CBase, CAppBase, IConstructor, PageWebNav } from 'tonva-react';
// import { UQs } from '../uqs';
// import { CApp } from './CApp';

// export abstract class CUqBase extends CBase {
//     get cApp(): CApp { return this._cApp; }
//     protected get uqs(): UQs { return this._uqs as UQs };
//     getPageWebNav(): PageWebNav { return this.cApp.getPageWebNav(); }
// }

// export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
//     get cApp(): CApp { return this.cApp; }
//     protected get uqs(): UQs { return this._uqs as UQs };
//     protected get owner(): T { return this._owner as T }
//     getPageWebNav(): PageWebNav { return this.cApp.getPageWebNav(); }
// }

// export abstract class CUqApp extends CAppBase {
//     get uqs(): UQs { return this._uqs };

//     protected newC<T extends CUqBase>(type: IConstructor<T>): T {
//         let c = new type(this);
//         c.init();
//         return c;
//     }
// }

//=== UqApp builder created on Fri Jul 16 2021 23:47:57 GMT-0400 (北美东部夏令时间) ===//
import { CSub, CBase, CAppBase, IConstructor } from 'tonva-react';
import { UQs } from 'uq-app';
import { CApp } from './CApp';

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
