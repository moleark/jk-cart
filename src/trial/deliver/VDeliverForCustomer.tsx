import { Context, Form, IntSchema, List, LMR, Schema, UiNumberItem, UiSchema, VPage } from "tonva-react";
import { CDeliver, DeliverDetail } from "./CDeliver";

export class VDeliverForCustomer extends VPage<CDeliver> {
	header() {return '发货给客户'}
	content() {
		let {customer, deliverDetails, saveDeliverSheet} = this.controller;
		return <div>
			<div className="p-3">
				<div><b>下一步实现：</b></div>
				<ul>
					<li>查库存的同时锁库存10分钟</li>
					<li>分解下列订单明细</li>
					<li>库存满足，进入发货表</li>
					<li>库存不满足，进入寻货表</li>
					<li>点击按钮，操作</li>
					<li>也可以省去这个步骤，直接生成发货表和寻货表</li>
					<li>寻货不成，通知客户退货</li>
				</ul>
			</div>
			<div className="p-3">
				customer: {customer}
			</div>
			<List items={deliverDetails} item={{render: this.renderItem}} />
			<div className="p-3">
				<button className="btn btn-primary" onClick={saveDeliverSheet}>生成发货单</button>
			</div>
		</div>;
	}

	private renderItem = (row: DeliverDetail, index:number) => {
		let {product, item, quantity} = row.orderDetail;
		let schema:Schema = [
			{name: 'deliverQuantity', type: 'integer', min: 0, max: quantity} as IntSchema
		];
		let onChanged = (context:Context, value:any, prev:any):Promise<void> => {
			row.deliverQuantity = value;
			return;
		}
		let uiSchema: UiSchema = {
			items: {
				deliverQuantity: {
					label: null,
					placeholder: '实发数量',
					defaultValue: quantity,
					className: 'text-right',
					onChanged,
				} as UiNumberItem
			}
		}
		let FieldContainer = (label:any, content:JSX.Element): JSX.Element => {
			return <div>{content}</div>;
		}
		let right = <Form schema={schema} uiSchema={uiSchema} FieldContainer={FieldContainer}/>
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item} 应发:{quantity}
		</LMR>;
	}
}
