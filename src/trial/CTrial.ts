import { CUqBase } from "uq-app";
import { OrderDetail, OrderMain, ParamSaveOrder, ReturnGetCustomerReturnable$page } from "uq-app/uqs/JkOrder";
import { DonePageList, DraftPageList, OrderAllPageList, OrderPageList, ProcessingPageList, ReturningPageList } from "./orderPageList";
import { VInvoice } from "./VInvoice";
import { VOrder } from "./VOrder";
import { VOrderDoneList, VOrderDraftList, VOrderMainList, VOrderProcessingList, VOrderReturningList } from "./VOrderMainList";
import { VReceive } from "./VReceive";
import { VTrial } from "./VTrial";
import { CDeliver } from "./deliver";
import { VTestIDV } from "./VTestIDV";
import { VMockReturn } from "./VMockReturn";
import { QueryPager } from "tonva-react";
import { VOrderReturn } from "./VOrderReturn";
import { VInputForm } from "./VInputForm";

export interface Order extends OrderMain {
	draft: number;
	processing: number;
	returning: number;
	done: number;
	details: OrderDetail[];
}

export class CTrial extends CUqBase {
	customerReturnablePager: QueryPager<ReturnGetCustomerReturnable$page>;
	mockCustomer = 65695;

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

	saveOrderMain = async () => {
		let ret = await this.uqs.JkOrder.Acts({
			orderMain: [
				{
					id: undefined,
					no: 'jk-old-102',
				} as any,
			],
			/*
			orderDetail: [
				{
					id: undefined,
				} as any,
				{
					id: undefined,
				} as any,
			]
			*/
		});
		alert(JSON.stringify(ret));
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
			customer: this.mockCustomer, 
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
					warehouse: 14,
					item: 29514,
					product: 12686,
					quantity: 10,
					amount: 10*310,
					price: 310.00,
				},
				{
					id: undefined,
					main: undefined,
					warehouse: 14,
					item: 2422,
					product: 1003,
					quantity: 9,
					amount: 9*1605.00,
					price: 1605.00,
				},
				{
					id: undefined,
					main: undefined,
					warehouse: 14,
					item: 2423,
					product: 1003,
					quantity: 9,
					amount: 9*4466.00,
					price: 4466.00,
				}
			],	
		}
		let ret = await this.uqs.JkOrder.SaveOrder.submit(data);
		alert('data mocked: ' + JSON.stringify(data) + '\n returned: ' + JSON.stringify(ret));
	}

	uqUpgrade = async () => {
		//await this.uqs.JkOrder.QueryTest.query({});
	}

	mockOrderReturn = async () => {
		this.customerReturnablePager = new QueryPager(this.uqs.JkOrder.GetCustomerReturnable, 10, 10);
		await this.customerReturnablePager.first({customer: this.mockCustomer});
		this.openVPage(VMockReturn);
	}

	async showOrderReturn(customer: number, order: number) {
		let orderReturn = await this.uqs.JkOrder.GetCustomerOrderReturn.query({
			customer,
			order,
		});
		this.openVPage(VOrderReturn, orderReturn);
	} 

	async applyReturn(detail: {orderDetail: number; quantity: number;}[]) {
		await this.uqs.JkOrder.SaveOrderReturn.submit({detail});
	}

	showInputForm = () => {
		this.openVPage(VInputForm)
	}
}
