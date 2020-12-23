import * as React from 'react';
import { COrderDraft } from './COrderDraft';
import { VPage, Page, FA } from 'tonva';

export class VNotYOrder extends VPage<COrderDraft> {

    async open(brief?: any) {
        this.openPage(this.page, brief);
    }

    private page = (brief: any) => {

        return <Page header="为您下单" back="close">
            <div className='alert alert-primary'>
                <p>
                    <FA name="info-circle" size="2x" className="pr-3"></FA>
                    百灵威可按照客户要求制作订单（订单制作后需客户确认方可生效），<span className="text-danger">若您并未要求百灵威提供此服务，则可安全忽略此信息。</span>
                </p>
            </div>
        </Page>
    }
}