import { VPage } from "tonva-react";
import { CTrial } from "./CTrial";

export class VCodeTrial extends VPage<CTrial> {
	header() {return '代码试验'}
	content() {
		let {JkOrder} = this.controller.uqs;
		return <div className="代码试验">
			代码试验
			<div>{JkOrder.IDRender(31195136)}</div>
			<div>{JkOrder.IDRender(31195138)}</div>
		</div>
	}
}