import * as React from 'react';
import { View, nav, LMR, Image, FA } from 'tonva';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';

export class VLoginState extends View<CMe> {

    render() {
        let { user } = nav;
        let { showLogin, renderCarLabel } = this.controller;
        if (!user) {
            return <>
                <li className="nav-item d-none d-lg-block" onClick={() => showLogin()}>
                    <a className="nav-link header-login">注册/登录</a>
                </li>
                {renderCarLabel()}
            </>;
            /*
            return <div className="d-flex align-items-center justify-content-end small text-muted">
                <a className="px-2" href="./shop?type=signUp">注册</a>
                <a className="px-2" href="./shop?type=login">登录</a>
                {this.controller.renderCarLabel()}
            </div>
            */
        }
        let { id, name, nick, icon } = user;
        return <div className="d-flex align-items-center justify-content-end">
            <div>
                {<Image className="w-3c h-3c mr-3" src={icon} />}
            </div>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </div >;
    }
}

export function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
