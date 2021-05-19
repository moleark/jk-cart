import { List, VPage } from "tonva-react";
import { OrderDetail } from "uq-app/uqs/JkOrder";
import { CTrial } from "./CTrial";

export class VOrder extends VPage<CTrial> {
	header() {return 'Order - ' + this.controller.order.no}
	content() {
		let {order} = this.controller;
		let {no, id, customer, details} = order;
		return <div>
			<div className="p-3 border-bottom">NO:{no} &nbsp; ID:{id} &nbsp; customer:{customer}</div>
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