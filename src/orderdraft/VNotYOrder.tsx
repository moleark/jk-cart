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
            <h5 className='pl-3 pt-3 text-warning'>这不是给您制作的订单，该订单信息您不能查看</h5>
        </Page>
    })
}