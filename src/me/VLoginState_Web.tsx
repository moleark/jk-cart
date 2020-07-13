import * as React from 'react';
import { View, nav, LMR, Image, FA } from 'tonva';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';

export class VLoginState_Web extends View<CMe> {

    render() {
        let { user } = nav;
        if (!user) {
            return <div className="d-flex align-items-center justify-content-end small text-muted">
                <a className="px-2" href="./shop?type=signUp">注册</a>
                <a className="px-2" href="./shop?type=login" >登录</a>
                {this.controller.renderCarLabel_Web()}
            </div>
        }
        let { id, name, nick, icon } = user;
        return <div className="d-flex align-items-center justify-content-end small text-muted">
            <a className="px-2" href="./shop?type=me">{name}</a>
            <a className="px-2" href="./shop?type=loginOut">退出</a>
            {this.controller.renderCarLabel_Web()}
        </div>;
    }
}

