import { IDX, PageItems } from "tonva-react";
import { UQs } from '../uq-app';
import { Order } from "./CTrial";

export abstract class OrderPageList extends PageItems<Order> {
	protected uqs: UQs;
	constructor(uqs: UQs) {
		super(true);
		this.uqs = uqs;
	}

	protected abstract get IDX(): IDX[];

	async loadResults(param:any, pageStart:any, pageSize:number):Promise<{[name:string]:any[]}> {
		let order = this.uqs.JkOrder;
		let orderList = await order.QueryID<Order>({
			IDX: this.IDX,
			order: 'desc',
			page: {
				start: pageStart,
				size: pageSize,
			}
		});
		return {$page: orderList};
	}
}

export class OrderAllPageList extends OrderPageList {
	protected get IDX(): IDX[] {
		let {OrderMain} = this.uqs.JkOrder;
		return [OrderMain];
	}

	acceptOrder(order: Order) {
		let {id} = order;
		let index = this._items.findIndex(v => v.id === id);
		if (index >= 0) {
			let ord = this._items[index];
			ord.draft = null;
			ord.processing = 1;
		}
	}
}

export class DraftPageList extends OrderPageList {
	protected get IDX(): IDX[] {
		let {OrderMain} = this.uqs.JkOrder;
		return [OrderMain];
	}
	acceptOrder(order: Order) {
		let {id} = order;
		let index = this._items.findIndex(v => v.id === id);
		if (index >= 0) {
			this._items.splice(index, 1);
		}
	}
}

export class ProcessingPageList extends OrderPageList {
	protected get IDX(): IDX[] {
		let {OrderMain} = this.uqs.JkOrder;
		return [OrderMain];
	}
}

export class DonePageList extends OrderPageList {
	protected get IDX(): IDX[] {
		let {OrderMain} = this.uqs.JkOrder;
		return [OrderMain];
	}
}

export class ReturningPageList extends OrderPageList {
	protected get IDX(): IDX[] {
		let {OrderMain} = this.uqs.JkOrder;
		return [OrderMain];
	}
}
