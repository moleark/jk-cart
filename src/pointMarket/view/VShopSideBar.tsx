import * as React from 'react';
import { View, Ax, List } from 'tonva-react';
import { CPointProduct, topicClumps } from '../CPointProduct';

export class VShopSideBar extends View<CPointProduct> {

    render(): JSX.Element {
        let { pointProductGenre } = this.controller;
        let  Gengres = [{ id: null, name: "商城首页" },{ id: 5002, name: "积分商城" }, ...pointProductGenre, ...Object.values(topicClumps)];
        return <List items={Gengres}
            item={{
                render: (el: any) => {
                    let { id, name } = el;
                    let url = id ? `/pointshop/productLine/${id}` : "/pointshop";
                    return <><Ax href={url} className="w-100 text-center" >{name}</Ax></>
                },
                className: "py-2"
            }}
            className="cus-list border rounded"
        />;
	}
}
