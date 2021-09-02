import { CTrial } from "../";
import { CUqSub, JkOrder } from "uq-app"
import { CApp } from "tapp"
import { UQs } from "uq-app";
import { DxOrderDetail, OrderDetail } from 'uq-app/uqs/JkOrder';
import { VDeliver, VDeliverSuccess } from "./VDeliver";
import { VDeliverForCustomer } from "./VDeliverForCustomer";


export interface DeliverDetail {
	orderDetail: OrderDetail;
	deliverQuantity: number;
}

export class CDeliver extends CUqSub<CApp, UQs, CTrial> {
	//customerPendingDeliver: ReturnGetCustomerPendingDeliverRet[];
	//deliversForCustomer: OrderDetail[];
	deliverDetails: DeliverDetail[];
	customer: number;

	protected async internalStart() {
		/*
		let result = await this.uqs.JkOrder.GetCustomerPendingDeliver.query({});
		this.customerPendingDeliver = result.ret;
		*/
		this.openVPage(VDeliver);
	}
/*
	onCustomer = async (customerDeliver: ReturnGetCustomerPendingDeliverRet) => {
		let {JkOrder} = this.uqs;
		this.customer = customerDeliver.customer;
		let ret = await JkOrder.QueryID<OrderDetail & DxOrderDetail>({
			IX: [JkOrder.IxCustomerPendingDeliver],
			IDX: [JkOrder.OrderDetail, JkOrder.DxOrderDetail],
			ix: this.customer,
		});
		let delivers = ret.map(v => {
			let {quantity, deliveredQuantity, returnQuantity} = v;
			return {
				orderDetail:v, 
				deliverQuantity:quantity - (returnQuantity ?? 0)  - (deliveredQuantity ?? 0)
			};
		});
		this.deliverDetails = delivers.filter(v => v.deliverQuantity > 0);
		this.openVPage(VDeliverForCustomer);
	}
*/
	saveDeliverSheet = async () => {
		/*
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
		*/
		this.closePage();
		this.openVPage(VDeliverSuccess);
	}
}
