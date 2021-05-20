import { List, VPage } from "tonva-react";
import { OrderDetail } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";
import { renderOrderStates } from "./renderOrderStates";

export class VOrder extends VPage<CTrial> {
	header() {return 'Order - ' + this.controller.order.no}
	content() {
		let {order, acceptOrder, returnOrder} = this.controller;
		let {no, id, customer, details, draft, processing, returning, done} = order;
		let vCommands: any;
		if (!done) {
			let btns:{caption:string, onClick:()=>void}[] = [];
			if (draft) {
				btns.push({caption: '接受', onClick: acceptOrder});
			}
			else if (processing) {
				/*
				let {deliverOrder, payOrder, invoiceOrder} = this.controller;
				btns.push(
					{caption: '发货', onClick: deliverOrder},
					{caption: '收款', onClick: payOrder},
					{caption: '发票', onClick: invoiceOrder},		
				);
				*/
			}
			if (returning) {
				btns.push(
					{caption: '退货', onClick: returnOrder}
				);
			}
			vCommands = <div className="m-3">
				{btns.map((v, index) => {
					let {caption, onClick} = v;
					return <button key={index} onClick={onClick} 
						className="btn btn-info btn-small mr-3">{caption}</button>;
				})}
			</div>
		}
		return <div>
			{vCommands}
			<div className="m-3 d-flex">
				{renderOrderStates(order)}
			</div>
			<div className="m-3 border-bottom">NO:{no} &nbsp; ID:{id} &nbsp; customer:{customer}</div>
			<List items={details} item={{render: this.renderDetail}} />
		</div>;
	}

	renderDetail = (detail: OrderDetail, index:number) => {
		let arr:{key:string;val:any}[] = [];
		for (let i in detail) {
			arr.push({key:i, val: (detail as any)[i]});
		}
		return <div className="px-3 py-2">
			{arr.map((v, index) => {
				let {key, val} = v;
				return <span key={index}>{key}:<b>{val}</b> &nbsp; </span>;
			})}
		</div>;
	}
}