import * as React from 'react';
import { View } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { COrderMaker } from './COrderMaker';
export class VOrderMaker extends View<COrderMaker> {

    @observable private ordermaker: any;

    render(param: any): JSX.Element {
        return <this.content id={param} />;
    }

    private initPostCount = async (param: any) => {
        if (this.ordermaker === undefined)
            this.ordermaker = await this.controller.getOrderMakerName(param.id);
    }

    private content = observer((param: any): any => {
        this.initPostCount(param);
        if (!this.ordermaker)
            return null;
        return this.ordermaker.firstName;
    })

}