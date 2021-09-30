//=== UqApp builder created on Mon Sep 27 2021 10:46:50 GMT+0800 (中国标准时间) ===//
import { VPage, Page } from 'tonva-react';
import { CApp } from './CApp';

export class VMain extends VPage<CApp> {
	header() { return 'TEST'; }
	content() {
		return <div className="m-3">
			<div>{this.renderMe()}</div>
			<div className="mb-5">同花样例主页面</div>
		</div>;
	}
}
