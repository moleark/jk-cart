import * as React from 'react';
import { View, FA, IconText, Ax } from 'tonva';
import { observer } from 'mobx-react';
import { CMe } from './CMe';
import setting from 'images/setting.svg';
import number1 from 'images/number-01.svg';
import order1 from 'images/order-01.svg';

export const meLib = [
                {
                    type: '帐户设置',
                    image: setting,
                    belongs: [
                        {
                            component: <IconText iconClass="text-info mr-2" icon="key" text="修改密码" />,
                            href:'/password',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="key" text="账户信息" />,
                            href:'/meInfo',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="地址管理" />,
                            href:'/contact',
                        },
                    ]
                },{
                    type: '会员管理',
                    image: number1,
                    belongs: [
                        {
                            component: <IconText iconClass="text-info mr-2" icon="heart" text="商品收藏" />,
                            href:'/favorites',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="shopping-bag" text="积分管理" />,
                            href:'/pointshop',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="connectdevelop" text="卡券管理" />,
                            href:'/couponManage',
                        },
                    ]
                },{
                    type: '订单管理',
                    image: order1,
                    belongs: [
                        {
                            component: <IconText iconClass="text-info mr-2" icon="file-text" text="订单记录" />,
                            href:'/myOrders',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="发票管理" />,
                            href:'/invoice',
                        },
                    ]
                },
            ]


export class VMeSideBar extends View<CMe> {

    render(): JSX.Element {
        let { pathname } = document.location;
        return <div className="my-5 px-2 border rounded">
            {meLib.map((v: any,index:number) => {
                return <div key={index}>
                    <div className="text-center border-bottom py-2 font-weight-bolder">{v.type}</div>
                    <ul className="px-0 text-center ">
                        {v.belongs.map((o: any,index:number) => {
                            return <li style={{ background:o.href === pathname ? '#f5f5f5':''}}
                                className='list-inline rounded'
                                key={index}><Ax href={o.href}>{o.component}</Ax></li>
                        })}
                    </ul>
                </div>
            })}
        </div>
	}
}
