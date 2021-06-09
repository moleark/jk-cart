import * as React from 'react';
import { VPage, Page, Tabs, TabCaptionComponent, TabProp } from 'tonva';
import { COrder } from './COrder';
import { Ax, List, EasyDate } from 'tonva';
import { observable } from 'mobx';
import { xs } from 'tools/browser';
import { ListTable } from 'tools/listTable';
import { GLOABLE } from 'global';

export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMyOrders extends VPage<COrder> {

	/*
    @observable private pendingOrders: any[];
    @observable private processingOrders: any[];
    @observable private completedOrders: any[];
	@observable private allOrders: any[];
	*/
	@observable private list: any[] = [];
	private currentState: string;
	private tabs: TabProp[];

	/*
    async open(param: any) {
        this.currentState = param;
        this.openPage(this.page);
	}
	*/

	init(param: any) {
		this.currentState = param;
		let { getMyOrders } = this.controller;
		let oss = [
			{ caption: '待审核', state: 'processing', icon: 'desktop' },
			{ caption: '待发货', state: 'completed', icon: 'truck' },
			{ caption: '所有订单', state: 'all', icon: 'file-text-o' },
		];
		/* let TabCaptionComponent = (label:string, icon:string, color:string) => <div 
			className={'d-flex justify-content-center align-items-center flex-column cursor-pointer ' + color}>
			<div><i className={'fa fa-lg fa-' + icon} /></div>
			<small>{label}</small>
		</div>; */
		this.tabs = oss.map(v => {
			let { caption, state, icon } = v;
			return {
				name: caption,
				caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
				content: () => {
					if (xs) return <List items={this.list} item={{ render: this.renderOrder }} none="[无]" />;
					return this.orderListTable(state);
				},
				isSelected: this.currentState === state,
				load: async () => {
					this.currentState = state;
					this.list = await getMyOrders(this.currentState);
				}
			};
		});
	}

	private orderListTable = (state:string): JSX.Element => {
		if (!this.list.length) return <div className="w-100 text-center py-3">无</div>;
		let os: { [state: string]: string } = {
			'processing': '待审核',
			'completed': '待发货',
		};
        let columns = [{ id: 1, name: '订单编号' },{ id: 2, name: '日期' },{ id: 3, name: '订单状态' },{ id: 4, name: '详情' }];
        let content = <>{ this.list.map((v: any) => {
			let { id, no, date, OState } = v;
			return <tr className="article-product-list order-wrap-list" key={id}>
				<td data-title={columns[0].name} className="mint">{no}</td>
				<td data-title={columns[1].name}><EasyDate date={date} /></td>
				<td data-title={columns[2].name}>{os[state !=='all'? state : OState]}</td>
				<td data-title={columns[3].name}>
					<Ax href={"/orderDetail/" + id} className='w-100' target="_blank">
						<button type='button' className="btn-primary w-4c rounded-sm">详情</button>
					</Ax>
				</td>
			</tr>
		})}</>;
		return <ListTable columns={columns} content={content} ></ListTable>;
	}

	private renderOrder = (order: any, index: number) => {
		let { openOrderDetail } = this.controller;
		let { id, no, date } = order;
		return <div className="m-3">
			<div className="d-flex w-100 justify-content-between cursor-pointer" onClick={() => openOrderDetail(id)}>
			<div><span className="small text-muted">订单: </span><strong>{no}</strong></div>
			<div className="small text-muted"><EasyDate date={date} /></div>
		</div></div>;
		/* return <Ax href={"/orderDetail/" + id } className='w-100 m-3' target='_blank'>
			<div className="d-flex w-100 justify-content-between cursor-pointer">
			<div><span className="small text-muted">订单: </span><strong>{no}</strong></div>
			<div className="small text-muted"><EasyDate date={date} /></div>
		</div></Ax>; */
	}

	header() {
		if (!xs) return '';
		return '订单管理';
	}

	content(): JSX.Element {
		let title = !xs ? <div className="text-left mt-5"><h1>订单管理</h1></div> : null;
		return 	<div className="row mx-0 bg-light my-1">
				<div className="col-lg-3 d-none d-lg-block">
					{this.controller.cApp.cMe.renderMeSideBar()}
				</div>
				<div className={`col-lg-9 px-0 mx-auto ${!xs ? 'px-2' :''}`} style={{maxWidth:!xs ? 800 :'none'}}>
				{title}
				<div className="mb-5 reset-z-header-boxS">
					<Tabs tabs={this.tabs} tabPosition="top" tabBg={!xs ? 'bg-light' : ''} />
				</div>
				<div className="alert alert-info alert-signin my-2">
					<div>原官网历史订单
						<a className="text-primary" href={ GLOABLE.CONTENTSITE + "/Member/Center/SaleOrderList.aspx?language=zh-CN" }
							target="_blank"><b>查询</b></a>
					</div>
				</div>
				</div>
			</div>
	}

	private page = () => {

		let { getMyOrders } = this.controller;
		let oss = [
			{ caption: '待审核', state: 'processing', icon: 'desktop' },
			{ caption: '待发货', state: 'completed', icon: 'truck' },
			{ caption: '所有订单', state: 'all', icon: 'file-text-o' },
		];
		let tabs = oss.map(v => {
			let { caption, state, icon } = v;
			return {
				name: caption,
				caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
				content: () => {
					return <List items={this.list} item={{ render: this.renderOrder }} none="[无]" />
				},
				isSelected: this.currentState === state,
				load: async () => {
					this.currentState = state;
					this.list = await getMyOrders(this.currentState);
				}
			};
		});
		/*
        let tabs = [{
            name: '待审核',
            caption: (selected: boolean) => TabCaptionComponent("待审核", "desktop", color(selected)),
            content: () => {
                return <List items={this.processingOrders} item={{ render: this.renderOrder }} none="无待审核订单" />
            },
            isSelected: this.currentState === 'processing',
            load: async () => {
                this.currentState = 'processing';
                this.processingOrders = await getMyOrders(this.currentState);
            }
        }, {
            name: '待发货',
            caption: (selected: boolean) => TabCaptionComponent("待发货", "truck", color(selected)),
            content: () => {
                return <List items={this.completedOrders} item={{ render: this.renderOrder }} none="还没有已完成的订单" />
            },
            isSelected: this.currentState === 'completed',
            load: async () => {
                this.currentState = 'completed';
                this.completedOrders = await getMyOrders(this.currentState);
            }
        }, {
            name: '所有订单',
            caption: (selected: boolean) => TabCaptionComponent("所有订单", "file-text-o", color(selected)),
            content: () => {
                return <List items={this.allOrders} item={{ render: this.renderOrder }} none="还没有订单" />
            },
            isSelected: this.currentState === 'all',
            load: async () => {
                this.currentState = 'all';
                this.allOrders = await getMyOrders(this.currentState);
            }
		}];
		*/
		// return <Page header="我的订单" tabs={tabs} tabPosition="top" />
		//return <Tabs tabs={tabs} tabPosition='top' />
		return <Page header="我的订单">
			<Tabs tabs={tabs} tabPosition="top" />
		</Page>
	}
}