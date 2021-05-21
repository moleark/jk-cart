import { CTrial } from "../";
import { CApp, CUqSub } from "uq-app"
import { UQs } from "uq-app";
import { OrderDetail, ReturnGetCustomerPendingDeliverRet } from 'uq-app/uqs/JkOrder';
import { VDeliver } from "./VDeliver";
import { VDeliverForCustomer } from "./VDeliverForCustomer";

export class CDeliver extends CUqSub<CApp, UQs, CTrial> {
	customerPendingDeliver: ReturnGetCustomerPendingDeliverRet[];
	deliversForCustomer: OrderDetail[];
	customer: number;

	protected async internalStart() {
		let result = await this.uqs.JkOrder.GetCustomerPendingDeliver.query({});
		this.customerPendingDeliver = result.ret;
		this.openVPage(VDeliver);
	}

	onCustomer = async (customerDeliver: ReturnGetCustomerPendingDeliverRet) => {
		let {JkOrder} = this.uqs;
		this.customer = customerDeliver.customer;
		this.deliversForCustomer = await JkOrder.QueryID<OrderDetail>({
			IX: [JkOrder.IxCustomerPendingDeliver],
			IDX: [JkOrder.OrderDetail],
			ix: this.customer,
		});
		this.openVPage(VDeliverForCustomer);
	}
}
