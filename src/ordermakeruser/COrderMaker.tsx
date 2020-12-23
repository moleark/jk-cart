import { CUqBase } from '../CBase';
import { VOrderMaker } from './VOrderMaker';

export class COrderMaker extends CUqBase {

    protected async internalStart(param: any) {
    }

    getOrderMakerName = async (webuser: any) => {
        let user = await this.uqs.webuser.WebUser.load(webuser);
        return user;
    }

    renderOrderMaker = (param: any) => {
        return this.renderView(VOrderMaker, param);
    }
}