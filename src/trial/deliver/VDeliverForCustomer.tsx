import { List, VPage } from "tonva-react";
import { OrderDetail } from "uq-app/uqs/JkOrder";
import { CDeliver } from "./CDeliver";

export class VDeliverForCustomer extends VPage<CDeliver> {
	header() {return '发货给客户'}
	content() {
		let {customer, deliversForCustomer} = this.controller;
		return <div>
			<div className="p-3">
				<div><b>下一步实现：</b></div>
				<ul>
					<li>查库存的同时锁库存10分钟</li>
					<li>分解下列订单明细</li>
					<li>库存满足，进入发货表</li>
					<li>库存不满足，进入寻货表</li>
					<li>点击按钮，操作</li>
					<li>也可以省去这个步骤，直接生成发货表和寻货表</li>
					<li>寻货不成，通知客户退货</li>
				</ul>
			</div>
			<div className="p-3">
				customer: {customer}
			</div>
			<List items={deliversForCustomer} item={{render: this.renderItem}} />
		</div>;
	}

	private renderItem = (item:OrderDetail, index:number) => {
		return <div className="px-3 py-2">{this.controller.uqs.JkOrder.OrderDetail.render(item)}</div>;
	}
}
