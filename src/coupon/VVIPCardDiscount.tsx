import * as React from 'react';
import { VPage, Page, List, tv } from 'tonva-react';
import { CrPageHeaderTitle } from 'tools/pageHeaderTitle';
import { CCoupon } from './CCoupon';
import { pageHTitle } from '../tools/pageHeaderTitle';
import { observer } from 'mobx-react';

export class VVIPCardDiscount extends VPage<CCoupon>{

    private vipCard: any;
    async open(vipCard: any) {
        this.vipCard = vipCard;
        this.openPage(this.page);
    }

    private renderVIPCardDiscountSetting(item: any) {
        let { brand, discount } = item;
        return <div className="row">
            <div className="col-7">
                {tv(brand, v => v.name)}
            </div>
            <div className="col-5">
                {100 - discount * 100}%
            </div>
        </div>
    }

    private page = () => {
        let header = CrPageHeaderTitle('折扣明细');
        return <Page header={header}>
            <div style={{maxWidth:990}} className="mx-auto mb-5">
                {pageHTitle('折扣明细')}
                <List items={this.vipCard.discountSetting} item={{ render: this.renderVIPCardDiscountSetting, className: "px-3 py-2" }}></List>
            </div>
        </Page>
    }

    render(param?: any): JSX.Element{
        this.vipCard = param.vipCard;
        return React.createElement(observer(() => {
            return <List items={this.vipCard?.discountSetting} item={{ render: this.renderVIPCardDiscountSetting, className: "px-3 py-2" }}></List>
        }));
    }
}