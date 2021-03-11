/* eslint-disable */
import * as React from 'react';
import { View, nav, LMR, Image, FA, A, Ax } from 'tonva';
import { CMe } from './CMe';
import { observer } from 'mobx-react';


/**
 * 在jk-web中使用的登录状态组件
 */
export class VLoginState extends View<CMe> {

    render() {
        return <this.page />;
    }

    private page = observer(() => {
        let { user } = this.controller;
        let v: any;
        if (!user) {
            v = <>
                <a className="" href="/register" target="_self">注册</a> /&nbsp;
                <a className="" href="/login" target="_self">登录</a>
            </>;
        }
        else {
            let { name, nick, icon } = user;
            let Avatar: JSX.Element = !icon ? <FA name="user" size="lg" className="text-primary" /> : <Image className="w-1c h-1c" style={{ width: "1rem", height: "1rem" }} src={icon} />
            v = <>
                <a className="mr-2 nav-item dropdown" href="/me" target="_self">
                    {Avatar}
                    <span className="dropdown-menu dropdown-menu-right px-2 m-0">{nick || name}</span>
                </a>
                <a className="mr-2" href="/logout" target="_self">退出</a>
            </>;
        }
        return <>
            {v}
        </>;
    })
}

export function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
