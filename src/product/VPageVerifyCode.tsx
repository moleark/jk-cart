import * as React from 'react';
import { observable } from 'mobx';
import { VPage, autoHideTips } from 'tonva';
import { CProduct } from './CProduct';

export class VPageVerifyCode extends VPage<CProduct> {
    private verifyCodeInput: HTMLInputElement;
	private verifyInfo = observable.box<string>();

	header() {return <div className="w-100 text-center">验证码</div>}

	content() {
		let { verifyCode, product } = this.controller;
		let { getVerifyCode } = product;
		return <div className="d-flex flex-column pt-3 m-auto mt-lg-2" style={{ maxWidth: '20rem' }}>
			<div className='d-flex '>
				<img src={verifyCode} alt="" className="border p-1 rounded-lg" />
				<button className="btn btn-link btn-block w-6c align-self-end py-0"
					onClick={getVerifyCode}>换一张</button>
			</div>
			<form onSubmit={(e) => { e.preventDefault(); this.onSubmit() }} >
				<input ref={v => this.verifyCodeInput = v} type="text" 
					className='form-control border-primary mt-2' 
					placeholder='输入验证码' 
					style={{ maxWidth: '20rem' }} />
			</form>
			
			{
				// this.verifyInfo && <div className='small text-danger'>* {this.verifyInfo}</div>
				autoHideTips(this.verifyInfo, tip => <div className='small text-danger'>* {tip}</div>)
			}
			<button className="btn btn-sm btn-outline-primary mt-2" type="button" 
				onClick={() => this.onSubmit()} 
				style={{ maxWidth: '20rem' }}>确 认</button>
		</div>;
	}

    private onSubmit = async () => {
        let verifyCode = this.verifyCodeInput.value;
        let {openPDFView, product } = this.controller;
        if (!verifyCode) {
            this.verifyInfo.set('验证码不可为空');
            //setTimeout(() => this.verifyInfo = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        }
        this.verifyCodeInput.value = '';      
        let content:any = await product.getPDFFileUrl(verifyCode);
        if (content.status && content.status === 412) {
            this.verifyInfo.set(content.msg);
            //setTimeout(() => this.verifyInfo = undefined, GLOABLE.TIPDISPLAYTIME);
            return;
        } else {
            this.closePage(); 
            await openPDFView(content);
        }
    }
}
