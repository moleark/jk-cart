import { CTrial } from "../";
import { CApp, CUqSub, JkOrder } from "uq-app"
import { UQs } from "uq-app";
import { OrderDetail, ReturnGetCustomerPendingDeliverRet } from 'uq-app/uqs/JkOrder';
import { VDeliver, VDeliverSuccess } from "./VDeliver";
import { VDeliverForCustomer } from "./VDeliverForCustomer";
import { makeObservable, observable } from "mobx";


export interface DeliverDetail {
	orderDetail: OrderDetail;
	deliverQuantity: number;
}

export class CDeliver extends CUqSub<CApp, UQs, CTrial> {
	customerPendingDeliver: ReturnGetCustomerPendingDeliverRet[];
	//deliversForCustomer: OrderDetail[];
	deliverDetails: DeliverDetail[];
	customer: number;

	protected async internalStart() {
		let result = await this.uqs.JkOrder.GetCustomerPendingDeliver.query({});
		this.customerPendingDeliver = result.ret;
		this.openVPage(VDeliver);
	}

	onCustomer = async (customerDeliver: ReturnGetCustomerPendingDeliverRet) => {
		let {JkOrder} = this.uqs;
		this.customer = customerDeliver.customer;
		let ret = await JkOrder.QueryID<OrderDetail>({
			IX: [JkOrder.IxCustomerPendingDeliver],
			IDX: [JkOrder.OrderDetail],
			ix: this.customer,
		});
		this.deliverDetails = ret.map(v => ({orderDetail:v, deliverQuantity:v.quantity}));
		this.openVPage(VDeliverForCustomer);
	}

	saveDeliverSheet = async () => {
		let {JkOrder} = this.uqs;
		let ret = await JkOrder.ActDetail<JkOrder.DeliverMain, JkOrder.DeliverDetail>({
			main: {
				ID: JkOrder.DeliverMain,
				value: {customer: this.customer},
			},
			detail: {
				ID: JkOrder.DeliverDetail,
				values: this.deliverDetails.map(v => ({
					parent: undefined,
					orderDetailId: v.orderDetail.id,
					deliverQuantity: v.deliverQuantity,
				})).filter(v => v.deliverQuantity>0),
			},
		});
		let retAct = await JkOrder.Delivered.submit({deliverMainId: ret.main});
		this.closePage();
		this.openVPage(VDeliverSuccess);
	}
}
