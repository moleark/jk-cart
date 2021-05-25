import { List, VPage } from "tonva-react";
import { ReturnGetCustomerPendingDeliverRet } from "uq-app/uqs/JkOrder";
import { CDeliver } from "./CDeliver";

export class VDeliver extends VPage<CDeliver> {
	header() {return '发货'}
	content() {
		let {customerPendingDeliver, onCustomer} = this.controller;
		return <div className="py-2">
			<List items={customerPendingDeliver} item={{render: this.renderItem, onClick: onCustomer}} />
		</div>
	}

	private renderItem(item: ReturnGetCustomerPendingDeliverRet, index: number) {
		let {customer, quantity} = item;
		return <div className="px-3 py-2">
			customer: {customer}, quantity: {quantity}
		</div>;
	}
}

export class VDeliverSuccess extends VPage<CDeliver> {
	header() {return '发货完成'}
	get back(): 'close' | 'back' | 'none' {return 'close';}
	content() {
		return <div className="p-3">
			发货完成！
		</div>
	}
}