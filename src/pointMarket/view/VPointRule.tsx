import * as React from 'react';
import { Page } from 'tonva-react';
import { CrPageHeaderTitle, pageHTitle } from 'tools/pageHeaderTitle';
import { xs } from '../../tools/browser';

export class VPointRule extends React.Component {

    render() {
         let header = CrPageHeaderTitle('积分规则');
        return <Page header={header}>
            {pageHTitle('积分规则')}
            <div className='bg-white p-2 mx-auto' style={{maxWidth: !xs ? 800 :'none'}}>
                {/* <ol className="mb-3">
                    <li>订购产品满1元积1分（活动期间积分按活动规则执行），积分按消费额累计；付款后，积分变为有效积分，可以使用；</li>
                    <li>特价产品、产业型产品等不产生积分；</li>
                    <li>积分有效期为自然年三年，过期作废（示例：2010年1-12月份产生的积分在2012年12月31日作废清零，以此类推）；</li>
                    <li>积分目前仅限兑换百灵威积分商城中的产品使用，不兑换现金；</li>
                    <li>此积分政策只针对百灵威终端客户，经销商等不产生积分；</li>
                </ol> */}
                <div className=" text-muted small">
                    <p className="m-0 pb-1"><b>1，订购产品满1元积1分（活动期间积分按活动规则执行），积分按消费额累计；付款后，积分变为有效积分，可以使用；</b></p>
                    <p className="m-0 pb-1"><b>2，特价产品、产业型产品等不产生积分；</b></p>
                    <p className="m-0 pb-1"><b>3，积分有效期为自然年三年，过期作废（示例：2010年1-12月份产生的积分在2012年12月31日作废清零，以此类推）；</b></p>
                    <p className="m-0 pb-1"><b>4，积分目前仅限兑换百灵威积分商城中的产品使用，不兑换现金；</b></p>
                    <p><b>5，此积分政策只针对百灵威终端客户，经销商等不产生积分；</b></p>
                </div >
                <div className="text-muted small py-2">
                    <p>百灵威保留本积分活动中条款的解释权利，并有根据需要取消本活动或增删、修订本规定的权利，并于百灵威官网、邮件、报纸或其他途径公告后生效。</p>
                    <p>如有疑问，请致电百灵威客服中心：400-666-7788</p>
                </div>
            </div>
        </Page>;
    }
}




