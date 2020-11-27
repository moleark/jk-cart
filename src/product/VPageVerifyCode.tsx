import * as React from 'react';
import { observable } from 'mobx';
import { VPage, autoHideTips } from 'tonva';
import { CProduct } from './CProduct';

const materialCaptions:{[type:string]:any} = {
	'MSDS': {type:'MSDS', CName:"化学品安全技术说明书", EName:'Material Safety Data Sheet (MSDS)'},
	'SPEC': {type:'SPEC', CName:"技术规格说明书", EName:'Specifications (SPEC)'},
	'COA': {type:'COA', CName:"质检报告", EName:'Certificate of Analysis (COA)'},
}

export class VPageVerifyCode extends VPage<CProduct> {
    private productOrigin: HTMLInputElement;
    private productLot: HTMLInputElement;
    private verifyCodeInput: HTMLInputElement;
	private productOriginTip = observable.box<string>();
	private productLotTip = observable.box<string>();
	private verifyInfo = observable.box<string>();

	header() {return <div className="w-100 text-center">产品资料</div>}

	right(){return <></>}

	content() {
		let { verifyCode, product, materialType, getVerifyCode } = this.controller;
		let assistContent = (materialType === 'MSDS' || materialType === 'SPEC') ? <>{this.captcha()}</> : <>{this.lots()}</>; 
		let content = materialCaptions[materialType];

		return <div className="container">
					<div className="row">
						<div className="col-lg-12"><h1 className="title my-4">{content.CName}</h1></div>
						<div className="col-lg-8">
							<div className="box">
								<form className="content">
									<p>{content.EName}</p>
									<div className="row">
										<div className="col-md-4">
											<input ref={v => this.productOrigin = v} type="text"
												className='form-control border-primary my-2' placeholder='产品编号' />
											{autoHideTips(this.productOriginTip, tip => <div className='small text-danger'>* {tip}</div>)}
										</div>
										{assistContent}
										<div className="col-md-12">
											<button className="btn btn-primary w-5c mt-2 mb-5" onClick={this.onSubmit}>查询</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
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

	private lots = () => {
		return <div className="col-md-4">
				<input ref={v => this.productLot = v} type="text"
					className='form-control border-primary my-2' 
					placeholder='产品批号' />
				{autoHideTips(this.productLotTip, tip => <div className='small text-danger'>* {tip}</div>)}
			</div>
	}

	private captcha = () => {
		let { verifyCode, product, getVerifyCode } = this.controller;
		return <>
			<div className="col-md-4">
				<input ref={v => this.verifyCodeInput = v} type="text"
					className='form-control border-primary my-2' placeholder='验证码' />
				{autoHideTips(this.verifyInfo, tip => <div className='small text-danger'>* {tip}</div>)}
			</div>
			<div className="col-md-4 my-2">
				<img src={verifyCode} alt="" className="border p-1 rounded-lg" />
				<button className="btn btn-link btn-block w-5c p-0 m-0 d-inline-block align-self-center"
					onClick={getVerifyCode}>换一张</button>
			</div>
		</>;
	}

    private onSubmit = async () => {
        let productOrigin = this.productOrigin.value;
        let productLot = this.productLot ? this.productLot.value : ' ';
        let verifyCode = this.verifyCodeInput ? this.verifyCodeInput.value : ' ';
		let { openPDFView, product } = this.controller;
		if (!productOrigin) this.productOriginTip.set('产品编号不可为空');
		if (!productLot) this.productLotTip.set('产品批号不可为空');
		if (!verifyCode) this.verifyInfo.set('验证码不可为空');
		if (!productOrigin || !productLot || !verifyCode) return;

        /* this.productOrigin.value = this.productLot.value = this.verifyCodeInput.value = '';      
        let content:any = await product.getPDFFileUrl(verifyCode);
        if (content.status && content.status === 412) {
            this.verifyInfo.set(content.msg);
            return;
        } else {
            this.closePage(); 
            await openPDFView(content);
        } */
    }
}
