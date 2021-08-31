import * as React from 'react';
import { CPointProduct } from './CPointProduct';
import { VPage, Page, FA } from "tonva-react";

export class VReceivePointSuccess extends VPage<CPointProduct> {

    private tip: string;
    async open(param: any) {
        this.tip = param;
        this.openPage(this.page);
    }

    private page = () => {
        return <Page header="领取积分成功" back="close">
            <div className="py-4 px-3 bg-white mb-3 d-flex">
                <FA name="list-alt" className="text-success mr-3" size="4x" />
                <div>
                    <p className="text-primary"><span className="h4">领取成功！</span></p>
                    <p className="">
                        {this.tip}
                    </p>
                </div>
            </div>
        </Page>
    }
}