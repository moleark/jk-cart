import * as React from 'react';
import { CProduct } from './CProduct';
import { VPage, Page, autoHideTips } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
//import { GLOABLE } from 'cartenv';

export class VVerifyCode extends VPage<CProduct> {
    @observable verifyCodeInput: HTMLInputElement;
	//@observable verifyInfo: string;
	private verifyInfo = observable.box<string>();
    async open(param?: any) {
        this.openPage(this.page);
    }

    onSubmit = async () => {
        let verifyCode = this.verifyCodeInput.value;
        let {openPDFView, getPDFFileUrl } = this.controller;
        if (!verifyCode) {
            this.verifyInfo.set('验证码不可为空');
            //setTimeout(() => this.verifyInfo = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        this.verifyCodeInput.value = '';      
        let content:any = await getPDFFileUrl(verifyCode);        
        if (content.status && content.status === 412) {
            this.verifyInfo.set(content.msg);
            //setTimeout(() => this.verifyInfo = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        } else {
            this.closePage(); 
            await openPDFView(content);
        }
    }

    private page = observer(() => {
        let { verifyCode, getVerifyCode } = this.controller;
        let header = <div className="w-100 text-center">验证码</div>;
        return <Page header={header} right={<></>} >
            <div className="d-flex flex-column px-5 pt-3">
                <div className='d-flex '>
                    <img src={verifyCode} alt="" className="border p-1 rounded-lg" />
                    <button className="btn btn-link btn-block w-6c align-self-end py-0" onClick={() => getVerifyCode()}>换一张</button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); this.onSubmit() }} >
                    <input ref={v => this.verifyCodeInput = v} type="text" className='form-control border-primary mt-2' placeholder='输入验证码' style={{ maxWidth: '20rem' }} />
                </form>
                
				{
					// this.verifyInfo && <div className='small text-danger'>* {this.verifyInfo}</div>
					autoHideTips(this.verifyInfo, tip => <div className='small text-danger'>* {tip}</div>)
				}
                <button className="btn btn-sm btn-outline-primary mt-2" type="button" onClick={this.onSubmit} style={{ maxWidth: '20rem' }}>确 认</button>
            </div>
        </Page>
    })
}