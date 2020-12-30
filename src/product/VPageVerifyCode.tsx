import * as React from 'react';
import { observable } from 'mobx';
import { VPage, autoHideTips } from 'tonva';
import { CProduct } from './CProduct';
import { Page } from '../tonva/components/page/page';
import { observer } from 'mobx-react';
import { xs } from '../tools/browser';
import { VPagePDF } from './VPagePDF';
import { languageCaptions } from './VPageProduct';

const materialCaptions:{[type:string]:any} = {
	'MSDS': {type:'MSDS', CName:"化学品安全技术说明书", EName:'Material Safety Data Sheet (MSDS)'},
	'SPEC': {type:'SPEC', CName:"技术规格说明书", EName:'Specifications (SPEC)'},
	'COA': {type:'COA', CName:"质检报告", EName:'Certificate of Analysis (COA)'},
}

const defLangs = [{language:"CN" },{language:"EN"},{language: "DE" },{language:"EN-US"},];

export class VPageVerifyCode extends VPage<CProduct> {
    private productOrigin: HTMLInputElement;
    private productLot: HTMLInputElement;
    private captchaInput: HTMLInputElement;
    private selectVal: HTMLSelectElement;
	private productOriginTip = observable.box<string>();
	private productLotTip = observable.box<string>();
	private captchaTip = observable.box<string>();

	async open(param?: any) {
		this.openPage(this.page, {origin:param});
	}

	/* header() {return <div className="w-100 text-center">产品资料</div>}

	right(){return <></>}
 */
	page = observer((param?: any) => {		

		let { materialType } = this.controller;
		let assistContent = (materialType === 'MSDS' || materialType === 'SPEC') ? <>{this.captchaUI(materialType)}</> : <>{this.lots()}</>; 
		let content = materialCaptions[materialType];
		let header: any,right:any;
		if (xs) {
			header = <div className="w-100 text-center">产品资料</div>;
			right = <></>;
		};
		let { origin } = param;
		return <Page header={header} right={right}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12"><h1 className="title my-4">{content.CName}</h1></div>
					<div className="col-lg-12">
						<div className="box">
							<div className="content">
								<p>{content.EName}</p>
								<div className="row">
									<div className="col-md-3">
										<input ref={v => this.productOrigin = v} type="text"
											className='form-control border-primary my-2' defaultValue={origin ? origin : ''}  placeholder='产品编号' />
										{autoHideTips(this.productOriginTip, tip => <div className='small text-danger'>* {tip}</div>)}
									</div>
									{assistContent}
									<div className="col-md-12">
										<button className="btn btn-primary w-5c mt-2 mb-5" onClick={(e:any)=>{e.preventDefault();this.onSubmit()}}>查询</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
		

		/* return <div className="d-flex flex-column pt-3 m-auto mt-lg-2" style={{ maxWidth: '20rem' }}>
			<div className='d-flex '>
				<img src={captcha} alt="" className="border p-1 rounded-lg" />
				<button className="btn btn-link btn-block w-6c align-self-end py-0"
					onClick={(e:any)=>{ getCaptcha()}}>换一张</button>
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
		</div>; */
	})

	private lots = () => {
		return <div className="col-md-3">
				<input ref={v => this.productLot = v} type="text"
					className='form-control border-primary my-2' 
					placeholder='产品批号' />
				{autoHideTips(this.productLotTip, tip => <div className='small text-danger'>* {tip}</div>)}
			</div>
	}

	private captchaUI = (type:string) => {
		let { captcha, productMsdsVersions, getCaptcha } = this.controller;
		let langUI: undefined | JSX.Element;
		
		if (type === 'MSDS') {
			let langArr: any[] = productMsdsVersions.length ? productMsdsVersions : defLangs;
			langUI = <select ref={v => this.selectVal = v} defaultValue='CN' className="p-1 mr-2 mb-2 text-dark">
					{langArr.map((v: any) => (<option key={v.language} value={v.language}>{languageCaptions[v.language]}</option>))}
				</select>
		};
		return <>
			<div className="col-md-3">
				<input ref={v => this.captchaInput = v} type="text"
					className='form-control border-primary my-2' placeholder='验证码' />
				{autoHideTips(this.captchaTip, tip => <div className='small text-danger'>* {tip}</div>)}
			</div>
			<div className="col-md-6 my-2">
				{langUI}
				<img src={captcha} alt="" className="border p-1 rounded-lg mb-1" style={{height:35}} />
				<button className="btn btn-link btn-block w-5c p-0 m-0 d-inline-block align-self-center"
					onClick={(e:any) => { e.preventDefault();getCaptcha()}}>换一张</button>
			</div>
		</>;
	}

	private onSubmit = async () => {
        let productOrigin = this.productOrigin.value;
        let productLot = this.productLot ? this.productLot.value : true;
		let currtCaptcha = this.captchaInput ? this.captchaInput.value : true;

		if (!productOrigin) this.productOriginTip.set('产品编号不可为空');
		if (!productLot) this.productLotTip.set('产品批号不可为空');
		if (!currtCaptcha) this.captchaTip.set('验证码不可为空');

		if (!productOrigin || !productLot || !currtCaptcha) return;
		let {  getPDFFileUrl } = this.controller;
		let content: any = await getPDFFileUrl({ origin: productOrigin ,captcha: currtCaptcha, lang: this.selectVal ? this.selectVal.value : undefined, lot: productLot });
		if (content === undefined) return;
		if (content.status) {
			if (content.status === 400) this.captchaTip.set(content.msg);
			 else alert(content.msg);
		} else {
			if (this.captchaInput) this.captchaInput.value = '';
			if (this.productLot) this.productLot.value = '';
			this.openVPage(VPagePDF, content);
		};
    }
}