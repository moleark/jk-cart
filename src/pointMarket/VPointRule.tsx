import * as React from 'react';
import { Page } from 'tonva';

export class VPointRule extends React.Component {

    render() {
        let right = null;
        return <Page header="积分兑换说明" right={right}>
            <div className='bg-white p-3'>
                <ul className="point-remarks">
                    <li>订购产品满1元积1分（活动期间积分按活动规则执行），积分按消费额累计；付款后，积分变为有效积分，可以使用；</li>
                    <li>特价产品、产业型产品不计入积分；</li>
                    <li>积分有效期为自然年三年，过期作废；（示例：2010年1-12月份产生的积分在2012年12月31日作废清零，以此类推）</li>
                    <li>积分目前仅限兑换使用，不兑换现金；</li>
                    <li>此积分政策只针对百灵威终端客户；</li>
                </ul>
                <div className="text-muted px-3 small">
                    <p>百灵威保留本积分活动中条款的解释权利，并有权根据需要取消本活动或增删、修订本规定的权利，并于百灵威官网、邮件、报纸或其他公告后生效。</p>
                    <p>如有疑问，请致电百灵威客服中心400-666-7788</p>
                </div>
            </div>
        </Page>;
    }
}