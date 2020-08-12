import * as React from 'react';
import { VPage, Page, EasyDate, FA } from 'tonva';
import { CPointProduct } from './CPointProduct';
import { List } from 'tonva';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

export class VPointProductDetail extends VPage<CPointProduct> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer((param: any) => {
        let footer = <div>
            <FA name="leaf" className='mt-2 text-success' size='lg' />
            <button type="button" className="btn btn-danger m-1" onClick={this.controller.openExchangeOrder}>去兑换</button>
        </div>
        return <Page header='产品详情' footer={footer}>
            <div className="">
                产品详情
            </div>
        </Page>;
    });
}
