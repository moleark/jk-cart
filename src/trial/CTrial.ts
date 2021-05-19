import { CUqBase } from "uq-app";
import { OrderDetail, OrderMain } from "uq-app/uqs/JkOrder";
import { VOrder } from "./VOrder";
import { VOrderMainList } from "./VOrderMainList";
import { VTrial } from "./VTrial";

export interface Order extends OrderMain {
	details: OrderDetail[];
}

export class CTrial extends CUqBase {
	protected async internalStart() {
		this.openVPage(VTrial);
	}

	orderList: OrderMain[];
	showOrderList = async () => {
		let order = this.uqs.JkOrder;
		this.orderList = await order.QueryID<OrderMain>({
			IDX: [order.OrderMain],
		});
		this.openVPage(VOrderMainList);
	}
	
	order: Order;
	onClickOrder = async (orderMain: OrderMain) => {
		let order = this.uqs.JkOrder;
		let ret = await order.IDDetailGet<OrderMain, OrderDetail>({
			main: order.OrderMain,
			detail: order.OrderDetail,
			id: orderMain.id,
		});
		this.order = {
			...ret[0][0],
			details: ret[1],
		};
		this.openVPage(VOrder);
	}

}