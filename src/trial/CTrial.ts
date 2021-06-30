import { CUqBase } from "uq-app";
import { OrderDetail, OrderMain, ParamSaveOrder } from "uq-app/uqs/JkOrder";
import { DonePageList, DraftPageList, OrderAllPageList, OrderPageList, ProcessingPageList, ReturningPageList } from "./orderPageList";
import { VInvoice } from "./VInvoice";
import { VOrder } from "./VOrder";
import { VOrderDoneList, VOrderDraftList, VOrderMainList, VOrderProcessingList, VOrderReturningList } from "./VOrderMainList";
import { VReceive } from "./VReceive";
import { VTrial } from "./VTrial";
import { CDeliver } from "./deliver";
import { VTestIDV } from "./VTestIDV";

export interface Order extends OrderMain {
	draft: number;
	processing: number;
	returning: number;
	done: number;
	details: OrderDetail[];
}

export class CTrial extends CUqBase {
	/*
	constructor(cApp: CApp) {
		super(cApp);
		makeObservable(this, {
			orderList: observable,
		});
	}
	*/

	protected async internalStart() {
		this.openVPage(VTrial);
	}

	orderList: OrderPageList;
	showOrderMainList = async () => {
		this.orderList = new OrderAllPageList(this.uqs);
		await this.orderList.first(undefined);
		this.openVPage(VOrderMainList);
	}

	showOrderDraftList = async () => {
		this.orderList = new DraftPageList(this.uqs);
		await this.orderList.first(undefined);
		this.openVPage(VOrderDraftList);
	}

	showOrderProcessingList = async () => {
		this.orderList = new ProcessingPageList(this.uqs);
		await this.orderList.first(undefined);
		this.openVPage(VOrderProcessingList);
	}

	showOrderDoneList = async () => {
		this.orderList = new DonePageList(this.uqs);
		await this.orderList.first(undefined);
		this.openVPage(VOrderDoneList);
	}

	showOrderReturningList = async () => {
		this.orderList = new ReturningPageList(this.uqs);
		await this.orderList.first(undefined);
		this.openVPage(VOrderReturningList);
	}

	showDeliver = async () => {
		let cDeliver = this.newSub(CDeliver);
		//this.openVPage(VDeliver);
		await cDeliver.start();
	}

	showReceive = async () => {
		this.openVPage(VReceive);
	}

	showInvoice = async () => {
		this.openVPage(VInvoice);
	}

	showTestIDV = async () => {
		this.openVPage(VTestIDV);
	}
	
	order: Order;
	onClickOrder = async (order: Order) => {
		let jkOrder = this.uqs.JkOrder;
		let ret = await jkOrder.IDDetailGet<Order, OrderDetail>({
			main: jkOrder.OrderMain,
			detail: jkOrder.OrderDetail,
			id: order.id,
		});
		this.order = {
			...ret[0][0],
			...order,
			details: ret[1],
		};
		this.openVPage(VOrder);
	}

	acceptOrder = async () => {
		// 暂时屏蔽
		/*
		let jkOrder = this.uqs.JkOrder;
		let {id, customer, details} = this.order;
		await jkOrder.Acts({
			dxOrderDraft: [{id: -id}],
			dxOrderProcessing: [{id}],
			ixCustomerPendingDeliver: details.map(v => ({ix: customer, xi: v.id})),
		});
		(this.orderList as DraftPageList).acceptOrder(this.order);
		this.closePage();
		*/
	}

	payOrder = async () => {
		alert('accept');
	}

	deliverOrder = async () => {
		alert('deliver');
	}

	invoiceOrder = async () => {
		alert('invoice');
	}

	returnOrder = async () => {
		alert('return');
	}

	mockOrder = async () => {
		let data: ParamSaveOrder = {
			id: undefined,
			no: undefined,
			customer: 65695, 
			sumQuanity: undefined,
			sumAmount: undefined,
			couponNo: undefined,
			sheetId: undefined,
			shippingContact: undefined,
			contact: undefined,
			detail: [
				{
					id: undefined,
					main: undefined,
					warehouse: 1,
					item: 29514,
					product: 12686,
					quantity: 10,
					amount: 10*310,
					price: 310.00,
				}
			],	
		}
		let ret = await this.uqs.JkOrder.SaveOrder.submit(data);
		alert('data mocked: ' + JSON.stringify(data) + '\n returned: ' + JSON.stringify(ret));
	}
}