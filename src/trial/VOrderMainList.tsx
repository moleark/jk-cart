import { VPage, List } from "tonva-react";
import { OrderMain } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";

export class VOrderMainList extends VPage<CTrial> {
	header() {return '订单列表'}
	content() {
		let {orderList, onClickOrder} = this.controller;
		return <List items={orderList} item={{render: this.renderOrderItem, onClick: onClickOrder}} />
	}

	private renderOrderItem = (order: OrderMain, index: number) => {
		let {no, id} = order;
		return <div className="px-3 py-2">NO:{no} &nbsp; ID:{id}</div>
	}


}