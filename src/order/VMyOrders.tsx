import * as React from 'react';
import { VPage, Page, Tabs, TabCaptionComponent, TabsProps, TabProp } from 'tonva';
import { COrder } from './COrder';
import { List, EasyDate } from 'tonva';
import { observable } from 'mobx';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMyOrders extends VPage<COrder> {

	/*
    @observable private pendingOrders: any[];
    @observable private processingOrders: any[];
    @observable private completedOrders: any[];
	@observable private allOrders: any[];
	*/
	@observable private list: any[];
	private currentState: string;
	private tabs:TabProp[];

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
			{caption: '待审核', state: 'processing', icon: 'desktop'}, 
			{caption: '待发货', state: 'completed', icon: 'truck'}, 
			{caption: '所有订单', state: 'all', icon: 'file-text-o'}, 
		];
		this.tabs = oss.map(v => {
			let {caption, state, icon} = v;
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
	}

    private renderOrder = (order: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date, discription, flow } = order;
        return <div className="m-3 justify-content-between cursor-pointer" onClick={() => openOrderDetail(id)}>
            <div><span className="small text-muted">订单: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
	}
	
	header() {
		return '我的订单';
	}
	content():JSX.Element {
		return <Tabs tabs={this.tabs} tabPosition="top" />;
	}

    private page = () => {

        let { getMyOrders } = this.controller;
		let oss = [
			{caption: '待审核', state: 'processing', icon: 'desktop'}, 
			{caption: '待发货', state: 'completed', icon: 'truck'}, 
			{caption: '所有订单', state: 'all', icon: 'file-text-o'}, 
		];
		let tabs = oss.map(v => {
			let {caption, state, icon} = v;
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