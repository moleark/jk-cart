import { VPage, List, LMR } from "tonva-react";
import { CTrial, Order } from "./CTrial";
import { renderOrderStates } from "./renderOrderStates";

abstract class VOrderListBase extends VPage<CTrial> {
	content() {
		let {orderList, onClickOrder} = this.controller;
		return <List items={orderList} item={{render: this.renderOrderItem, onClick: onClickOrder}} />
	}

	private renderOrderItem = (order: Order, index: number) => {
		let {no, id} = order;
		let right = <span>
			{renderOrderStates(order)}</span>;
		return <LMR className="px-3 py-2" right={right}>NO:{no} &nbsp; ID:{id}</LMR>
	}
}

export class VOrderMainList extends VOrderListBase {
	header() {return '全部订单'}
}

export class VOrderDraftList extends VOrderListBase {
	header() {return '待批订单'}
}

export class VOrderProcessingList extends VOrderListBase {
	header() {return '待处理订单'}
}

export class VOrderReturningList extends VOrderListBase {
	header() {return '待退货订单'}
}

export class VOrderDoneList extends VOrderListBase {
	header() {return '完成订单'}
}
