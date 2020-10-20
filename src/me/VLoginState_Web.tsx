import * as React from 'react';
import { View, nav, LMR, Image, FA } from 'tonva';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';

export class VLoginState_Web extends View<CMe> {

    render() {
        let { user } = nav;
        if (!user) {
            /*
            return <>
                <a className="nav-link header-login">
                    注册/登录
                </a>
                {this.controller.renderCarLabel_Web()}
            </>
            */
            return <div className="d-flex align-items-center justify-content-end small text-muted">
                <a className="px-2" href="./shop?type=signUp" target="_self">注册</a>
                <a className="px-2" href="./shop?type=login" target="_self">登录</a>
                {this.controller.renderCarLabel_Web()}
            </div>
        }
        let { id, name, nick, icon } = user;
        return <div className="d-flex align-items-center justify-content-end small text-muted">
            <a className="px-2" href="./shop?type=me" target="_self">{name}</a>
            <a className="px-2" href="./shop?type=loginOut" target="_self">退出</a>
            {this.controller.renderCarLabel_Web()}
        </div>;
    }
}

