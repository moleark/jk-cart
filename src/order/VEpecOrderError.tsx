import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { COrder } from './COrder';
import { xs } from '../tools/browser';

export class VEpecOrderError extends VPage<COrder> {

    async open(error: any) {
        this.openPage(this.page, error);
    }

    private page = (error: any) => {
        let { message } = error;
        if (!message)
            message = '未知原因';
        let header: any;
        if (xs)
            header = '下单失败';
        return <Page header={header}>
            <div className="alert alert-warning">
                <h3>下单失败</h3>
                <p>失败原因:{message}</p>
            </div>
        </Page>
    }
}