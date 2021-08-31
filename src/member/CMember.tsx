/* eslint-disable */
import * as React from 'react';
//import Loadable from 'react-loadable';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from "tonva-react";
import { Loading, nav } from "tonva-react";
import { BoxId } from "tonva-react";
import { CUqBase } from '../tapp/CBase';
import { VMember } from './VMember';

export class CMember extends CUqBase {

    @observable.ref member: any;
    private referrer: BoxId;

    protected async internalStart(param: any) {
		if (!this.isLogined) return;
		let { member } = this.uqs;
		let { id: currentUserId } = this.user;
		let promises: PromiseLike<any>[] = [
			member.MemberAction.submit({}),
			member.MemberRecommender.table({ referrer: currentUserId }),
			member.MemberRecommender.table({ member: currentUserId }),
		];
		let [{ code, point }, fans, referrer] = await Promise.all(promises);
		this.referrer = referrer;
		this.member = { recommendationCode: code, point, fans, referrer };
    }

    private loginCallback = async () => {
        nav.pop();
        await this.internalStart(undefined);
    }

    private render = observer(() => {
        if (this.isLogined) {
            return this.member === undefined ? <Loading /> : this.renderView(VMember);
        } else {
            return <div
                className="d-flex h-100 flex-column align-items-center justify-content-center">
                <div className="flex-fill" />
                <button className="btn btn-success w-20c"
                    onClick={() => nav.showLogin(this.loginCallback, true)}>
                    <FA name="sign-out" size="lg" /> 请登录
                </button>
                <div className="flex-fill" />
                <div className="flex-fill" />
            </div>;
        }
    })

    tab = () => {
        this.start();
        return <this.render />;
    }

    setReferrer(code: string) {
        if (code) {
            // 写入map，方法是add，用这个方法可能会写入多次，多以在写入之前要检查有没有，有的话，就不能再调用这个方法了
            // 这个逻辑我认为应该是在服务端，写入的时候要给双方积分，给多少积分的逻辑，也应该在后端，从邀请码到拥有此邀请码
            // 的会员id之间的转换，逻辑也应该在后台，这个后端的逻辑写在ACTION中？
            if (!this.referrer) {
                let { id: currentUserId } = this.user;
            }
        }
    }
}