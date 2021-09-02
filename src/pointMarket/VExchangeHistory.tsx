import { VPage, Page, EasyDate, Ax, nav } from 'tonva-react';
import { CPointProduct } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { CrPageHeaderTitle, pageHTitle } from 'tools/pageHeaderTitle';
import { ListTable } from 'tools/listTable';

export class VExchangeHistory extends VPage<CPointProduct> {

    private exchangeHistory: any[] = [];        /*积分产品列表 */
    async open(param?: any) {
        this.exchangeHistory = param;
        this.openPage(this.page);
    }

    private renderExchangeHistory = (pointProduct: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date } = pointProduct;
        return <div className="p-3 justify-content-between">
            <div className="mr-5" onClick={() => openOrderDetail(id)}><span className="small text-muted">兑换单号: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
    }

    private page = observer(() => {
        let header = CrPageHeaderTitle('兑换历史记录');
        return <Page header={header}>
            {pageHTitle('兑换历史记录')}
            <div className="d-none d-lg-block p-2 mt-2 breadcrumbs"><Ax href="/pointshop" >商城首页 </Ax> 兑换记录</div>
            {/* <List items={this.exchangeHistory} item={{ render: this.renderExchangeHistory }} none="暂无记录"></List> */}
            {this.historyListTable()}
        </Page>;
    });

    historyListTable = () => {
        if (!this.exchangeHistory.length)
            return <div className="my-5 text-secondary d-flex justify-content-center">暂无记录</div>;
        let columns = [{ id: 1, name: '兑换单号' },{ id: 2, name: '日期' },{ id: 3, name: '详情' }];
        let content = <>{
            this.exchangeHistory.map((v: any) => {
                let { id, date, no } = v;
                return <tr className="article-product-list order-wrap-list" key={id}>
                    <td data-title={columns[0].name}>{no}</td>
                    <td data-title={columns[1].name}><EasyDate date={date} /></td>
                    <td data-title={columns[2].name}>
                        <button onClick={() => nav.navigate("/pointshop/orderDetail/" + id) /* this.controller.openOrderDetail(id) */}
                            type='button' className="btn-primary w-4c">详情</button>
                    </td>
                </tr>
            })
        }</>;
        return <ListTable columns={columns} content={content} ></ListTable>;
    }
}