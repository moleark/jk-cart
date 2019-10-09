import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CInvoiceInfo } from './CInvoiceInfo';
import { observer } from 'mobx-react';

export class VInvoiceDetail extends VPage<CInvoiceInfo> {

    async open(origInvoice?: any) {
        this.openPage(this.page, origInvoice);
    }

    private page = observer((origInvoice: any) => {
        return <Page header="发票">
            <div className="px-3">
                <div className="row">
                    <div className="col-3">发票类型</div>
                    <div className="col-9"></div>
                    <div className="col-3"></div>
                    <div className="col-9"></div>
                    <div className="col-3"></div>
                    <div className="col-9"></div>
                    <div className="col-3"></div>
                    <div className="col-9"></div>
                </div>
            </div>
        </Page>
    });
}