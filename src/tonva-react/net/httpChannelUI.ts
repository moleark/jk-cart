import {nav} from '../components/nav';
import {FetchError} from './fetchError';

export interface HttpChannelUI {
    startWait():void;
    endWait():void;
    showError(error:FetchError):Promise<void>;
    showUpgradeUq(uq:string, version:number):Promise<void>;
}

export class HttpChannelNavUI implements HttpChannelUI {
    startWait() {
        nav.startWait();
    }
    endWait() {
        nav.endWait();
    }
    async showError(error:FetchError):Promise<void> {
        nav.endWait();
        /*
        if (error.name === 'SyntaxError') {
            error = {
                name: error.name,
                message: error.message,
            }
        }*/
        await nav.onError(error);
    }
    async showUpgradeUq(uq:string, version:number):Promise<void> {
        await nav.showUpgradeUq(uq, version);
    }
}

