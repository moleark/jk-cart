import * as React from 'react';
import { VPage, Page, Tabs, TabCaptionComponent, TabProp, LMR } from 'tonva-react';
import { COrder } from './COrder';
import { Ax, List, EasyDate } from 'tonva-react';
import { observable, makeObservable } from 'mobx';
import { xs } from 'tools/browser';
import { ListTable } from 'tools/listTable';
import { GLOABLE } from 'global';
import { Pagination } from 'antd';
import { observer } from 'mobx-react';

export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export const OrdersPageSize: number = 15;/* 订单分页每页数量 */

export class VMyOrders extends VPage<COrder> {

	/*
    @observable private pendingOrders: any[];
    @observable private processingOrders: any[];
    @observable private completedOrders: any[];
	@observable private allOrders: any[];
	*/
	searchKey: HTMLInputElement;
	currentPage:  number = 1;
	listAll:  any[] = [];
	private list: any[] = [];
	currentState: string;
	private tabs: TabProp[];

	constructor(c: COrder) {
        super(c);

        makeObservable<VMyOrders, "list">(this, {
            searchKey: observable,
            currentPage: observable,
            listAll: observable,
            list: observable,
            currentState: observable
        });
	}

	/*
    async open(param: any) {
        this.currentState = param;
        this.openPage(this.page);
	}
	*/
	toRepeat = (arr: any[], key: string) => {
		let obj: any = {};
		return arr.filter(item => obj[item[key]] ? '' : (obj[item[key]] = true));
	};

	init(param: any) {
		this.currentState = param;
		let { getMyOrders, searchMyOrders } = this.controller;
		let oss = [
			{ caption: '待审核', state: 'processing', icon: 'desktop' },
			{ caption: '待发货', state: 'completed', icon: 'truck' },
			{ caption: '已发货', state: 'shipped', icon: 'truck' },
			{ caption: '所有订单', state: 'all', icon: 'file-text-o' },
		];
		/* let TabCaptionComponent = (label:string, icon:string, color:string) => <div 
			className={'d-flex justify-content-center align-items-center flex-column cursor-pointer ' + color}>
			<div><i className={'fa fa-lg fa-' + icon} /></div>
			<small>{label}</small>
		</div>; */
		let loadList = async (state: string) => {
			this.currentState = state;
			this.currentPage = 1;
			let arr: any[] = await getMyOrders(this.currentState);
			this.listAll = this.toRepeat(arr, "id");
			if (this.currentState === "processing") this.list = this.listAll;
			else {
				let arr: any[] = [];
				if (this.currentState === "all") arr = await getMyOrders("processing");
				this.list = [arr, this.listAll.slice(0, OrdersPageSize)].flat();
			};
		};
		let searchOrderByKey = async () => {
			let value = this.searchKey?.value;
			// if (!value) return;
			let arr: any = await searchMyOrders({ keyWord: value });
			this.listAll = this.toRepeat(arr.items, "id");
			this.list = this.listAll.slice(0, OrdersPageSize);
		};
		let toSearchOrdersUI: JSX.Element = React.createElement(observer(() => {
			if (this.currentState !== "all") return null;
			return <LMR className="py-2" right={<button className="btn-sm btn-primary w-4c rounded-sm"
				onClick={() => { searchOrderByKey() }} >查询</button>} >
				<form onSubmit={(e: any) => { e.preventDefault(); searchOrderByKey() }} >
					<input ref={(v) => this.searchKey = v} placeholder="查询订单 输入:订单号、产品名称、CAS等" className="form-control" type="text" />
				</form>
			</LMR>
		}));
		
		this.tabs = oss.map(v => {
			let { caption, state, icon } = v;
			return {
				name: caption,
				caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
				content: () => {
					return React.createElement(observer(() => {
						if (xs) return <List items={this.list} item={{ render: this.renderOrder }} none="[无]" />;
						return <>{ toSearchOrdersUI}{this.orderListTable(state) }</>
					}));
				},
				isSelected: this.currentState === state,
				load: async () => { await loadList(state);},
				onShown: async () => { await loadList(state);},
			};
		});
	}

	private orderListTable = (stateA: string): JSX.Element => {
		// if (!this.list.length) return <div className="w-100 text-center py-3">无</div>;
		let os: { [state: string]: string } = {
			'processing': '待审核',
			'completed': '待发货',
			'shipped': '已发货',
			"11":"待审核",
			"12":"待发货",
			"13":"已发货",
		};
		let columns = [{ id: 1, name: '订单编号' }, { id: 2, name: '日期' }, { id: 3, name: '订单状态' }, { id: 4, name: '详情' }];
		let content = <>{this.list.map((v: any,index:number) => {
			let { id, no, date, state } = v;
			return <tr className="article-product-list order-wrap-list" key={id + index + no}>
				<td data-title={columns[0].name} className="mint">{no}</td>
				<td data-title={columns[1].name}><EasyDate date={date} /></td>
				<td data-title={columns[2].name}>{os[state]}</td>
				<td data-title={columns[3].name}>
					<Ax href={"/orderDetail/" + id} className='w-100' target="_blank">
						<button type='button' className="btn-primary btn-sm w-4c rounded-sm">详情</button>
					</Ax>
				</td>
			</tr>
		})}</>;
		if(!this.list.length) content = <tr><td className="text-center py-3" colSpan={4} >无订单</td></tr>
		return <ListTable columns={columns} content={content} ></ListTable>;
	}

	private renderOrder = (order: any, index: number) => {
		let { openOrderDetail } = this.controller;
		let { id, no, date, state } = order;
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

	changeShowOrders = async (value: any) => {
		document.body.scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
		this.currentPage = value;
		let arr: any[] = [];
		if (this.currentState === "all" && value === 1) arr = await this.controller.getMyOrders("processing");
		this.list = [arr, this.listAll.slice((value - 1) * OrdersPageSize, value * OrdersPageSize)].flat();
	};

	content(): JSX.Element {
		let title = !xs ? <div className="text-left mt-5"><h1>订单管理</h1></div> : null;
		return React.createElement(observer(() => {
			let paginationUI: JSX.Element;
			if (this.currentState !== "processing") {
				paginationUI = <Pagination onChange={(v) => { this.changeShowOrders(v); }} current={this.currentPage}
					defaultCurrent={1} pageSize={OrdersPageSize} hideOnSinglePage={true}
					total={this.listAll.length} showSizeChanger={false} className="page-item text-center" />;
			};
			return <div className="row mx-0 bg-light my-1">
				<div className="col-lg-3 d-none d-lg-block">
				{this.controller.cApp.cMe.renderMeSideBar()}
			</div>
				<div className={`col-lg-9 px-0 mx-auto ${!xs ? 'px-2' : ''}`} style={{ maxWidth: !xs ? 800 : 'none' }}>
					{title}
					<div className="mb-5 reset-z-header-boxS">
						<Tabs tabs={this.tabs} tabPosition="top" tabBg={!xs ? 'bg-light' : ''} />
						{paginationUI}
					</div>
					<div className="alert alert-info alert-signin my-2">
						<div>原官网历史订单
						<a className="text-primary" href={GLOABLE.CONTENTSITE + "/Member/Center/SaleOrderList.aspx?language=zh-CN"}
								target="_blank" rel="noreferrer"><b>查询</b></a>
						</div>
					</div>
				</div>
			</div>
		}));
	};

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