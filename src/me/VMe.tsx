import * as React from 'react';
import { nav, Image, VPage, Ax } from 'tonva';
import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { ContactUs } from './contactUs';
import { observer } from 'mobx-react';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';
import { AboutThisApp } from './aboutThisApp';
import { appConfig } from 'configuration';
import { observable } from 'mobx';
import className from 'classnames';
import setting from 'images/setting.svg';
import number1 from 'images/number-01.svg';
import order1 from 'images/order-01.svg';
import { browser, xs } from 'tools/browser';
import { A } from '../tonva/components/ax/index';
import welcome from 'images/welcome.png';

export class VMe extends VPage<CMe> {
	/*
    async open(param?: any) {
		this.open
	}
	*/
	private tips = observable.box('a');

    private exit() {
        nav.showLogout();
    }

    private contactUs = () => nav.push(<ContactUs />);
    private privacy = () => {
        this.controller.openPrivacy();
    }
    private aboutThisApp = () => {
        // nav.push(<AboutThisApp />);
        this.openVPage(AboutThisApp)
    }

    private changePassword = async () => {
        await nav.changePassword();
    }

    private openContactList = async () => {
        this.controller.openContactList();
    }

    private openInvoice = async () => {
        this.controller.openInvoice();
    }

    private openMyPoint = async () => {
        this.controller.openMyPoint();
    }

    private openCouponManage = async () => {
        this.controller.openCouponManage();
    }

    private openFavorites = async () => {
        this.controller.openFavorites();
    }

    private meInfo = observer(() => {
        let { user } = nav;
        if (user === undefined) {
			return null;
		}
        let { id, name, nick, icon } = user;
        return <LMR className="px-3 py-2 cursor-pointer w-100 bg-primary text-white"
            left={<Image className="w-3c h-3c mr-3" src={icon} />}
            right={<FA className="align-self-end" name="angle-right" />}
            onClick={() => {
                this.openVPage(EditMeInfo);
            }}>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-light">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </LMR>;
    });

    private orderStates = () => {
        let { openMyOrders } = this.controller;
        let oss = [
            { caption: '待审核', state: 'processing', icon: 'desktop' },
            { caption: '待发货', state: 'completed', icon: 'truck' },
            { caption: '所有订单', state: 'all', icon: 'file-text-o' },
        ];

        return <div className="d-flex justify-content-around w-100 my-3">
            {
                oss.map(((os, index) => {
                    let { caption, state, icon } = os;
                    return <div key={index} className="flex-fill d-flex flex-column align-items-center cursor-pointer"
                        onClick={() => openMyOrders(state)}>
                        <FA name={icon} className="text-info fa-2x" />
                        <small>{caption}</small>
                    </div>;
                }))
            }
        </div>
    };

    render() {
        return <this.page />;
    }
    content() {
        return <this.page />;
    }
    header() {
        if (xs || browser.versions.iPad) return <this.meInfo />;
        return '';
	}
	footer():JSX.Element {return null;}

    private page = observer(() => {
        const { user } = nav;
        let aboutRows: Prop[] = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="phone" text="联系我们" />,
                onClick: this.contactUs
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="smile-o" text="关于百灵威" />,
                onClick: () => this.controller.openAbout()
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="smile-o" text="隐私政策" />,
                onClick: this.privacy
            },
            {
                type: 'component',
                component: <div className="w-100 d-flex justify-content-between" onClick={this.aboutThisApp}>
                    <IconText iconClass="text-info mr-2" icon="smile-o" text="关于本APP" />
                    <div className="py-2 small">V{appConfig.version}</div>
                </div>,
            },
            ''
        ];

        let rows: Prop[];
        if (user === undefined) {
            let { showLogin } = this.controller;
            rows = aboutRows;
            rows.push(
                {
                    type: 'component',
                    component: <button className="btn btn-success w-100 my-2" onClick={() => showLogin()}>
                        <FA name="sign-out" size="lg" /> 请登录
                    </button>
                },
            );
        }
        else {
            let logOutRows: Prop[] = [
                '',
                {
                    type: 'component',
                    bk: '',
                    component: <div className="text-center flex-fill mb-3"><button className="btn btn-danger w-75" onClick={this.exit}>
                        <FA name="sign-out" size="lg" /> 退出登录
						</button>
                    </div>
                },
            ];

            rows = [
				/*
                '',
                {
                    type: 'component',
                    component: <this.meInfo />
				},
				*/
                '',
                {
                    type: 'component',
                    component: <>{this.orderStates()}</>,
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="地址管理" />,
                    onClick: this.openContactList
                },
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="发票管理" />,
                    onClick: this.openInvoice
                },
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="积分管理" />,
                    onClick: this.openMyPoint
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="connectdevelop" text="卡券管理" />,
                    onClick: this.openCouponManage
                },
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="heart" text="商品收藏" />,
                    onClick: this.openFavorites
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="修改密码" />,
                    onClick: this.changePassword
                },
            ]
            rows.push(...aboutRows, ...logOutRows);
        }

        if (xs || browser.versions.iPad) return <>
            <PropGrid rows={rows} values={{}} />
        </>;
        else {
            if (user === undefined) {
                return <div className="d-flex justify-content-center" style={{ height: 340 }}>
                    <div className="my-auto p-5 rounded">
                        <div className="d-flex">
                            <img src={welcome} className="m-auto" alt="" />
                        </div>
                        您正在以访客身份查看本站内容,请
                            <Ax href="/login" className="alert-link font-weight-bolder"> 登录 </Ax>
                        或者
                            <Ax href="/register" className="alert-link font-weight-bolder"> 注册会员</Ax>
                    </div>
                </div>
            };
            let meLib = [
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
                            component: <IconText iconClass="text-info mr-2" icon="file-text" text="订单查询" />,
                            href:'/myOrders',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="file-text" text="订单记录" />,
                            href:'/myOrders',
                        },{
                            component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="发票管理" />,
                            href:'/invoice',
                        },
                    ]
                },
            ]
            return <div className="container mt-lg-2 py-3">
                <div className="row">
                    {
                        meLib.map((v: any,index:number) => {
                            return <div className="col-lg-4 single-product" key={index}>
                                <div className="border text-center pt-5">
                                    <a href="#"><img src={v.image} className="w-50" /></a>
                                </div>
                                <h2 className="mint-bg">{v.type}</h2>
                                <div className="background-grey h-auto">
                                    <ul className="pl-3">
                                        {
                                            v.belongs.map((o: any,index:number) => {
                                                return <li className="list-inline" key={index}><Ax href={o.href}>{o.component}</Ax></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        
        }
		// <button onClick={()=>this.tips.set('ddddd')}>push</button>
		// {autoHideTips(this.tips, <div className="text-danger">{this.tips.get()}</div>)}
    })
}

export function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
