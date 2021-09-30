import * as React from 'react';
import { View } from "tonva-react";
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import { COrderMaker } from './COrderMaker';
export class VOrderMaker extends View<COrderMaker> {

    ordermaker: any;
    constructor(c: COrderMaker) {
        super(c);

        makeObservable(this, {
            ordermaker: observable
        });
    }

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