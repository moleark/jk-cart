import * as React from 'react';
import { nav, User, Page, Image, VPage } from 'tonva';
import { Prop, Media, IconText, FA, PropGrid, LMR } from 'tonva';
import { About } from './about';
import { ContactUs } from './contactUs';
import { observer } from 'mobx-react';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';
import { AboutThisApp } from './aboutThisApp';
import { appConfig } from 'configuration';

export class VMe extends VPage<CMe> {

    async open(param?: any) {

    }

    private exit() {
        nav.showLogout();
    }

    private about = () => nav.push(<About />);
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
        if (user === undefined) return null;
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
        return <this.meInfo />;
    }

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
                onClick: this.about
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="smile-o" text="用户协议" />,
                onClick: this.controller.openLegal
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
                        <FA name="sign-out" size="lg" /> 登录/注册
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
                    component: <div className="text-center flex-fill"><button className="btn btn-danger w-75" onClick={this.exit}>
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
                /* {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="积分商城" />,
                    onClick: this.openMyPoint
                }, */
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
        return <PropGrid rows={rows} values={{}} />;
    })
}

export function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
