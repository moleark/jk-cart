import * as React from 'react';
import { COrderDraft } from './COrderDraft';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react-lite';

export class VNotYOrder extends VPage<COrderDraft> {

    async open(param?: any) {
        this.openPage(this.page);
    }


    private page = observer(() => {

        return <Page back="close">
            <h5 className='px-4 pt-3 text-warning'>该订单不是您的，不能查看该订单</h5>
        </Page>
    })
}