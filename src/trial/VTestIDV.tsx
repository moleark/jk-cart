import React from "react";
import { observer } from "mobx-react";
import { VPage } from "tonva-react";
import { CTrial } from "./CTrial";

export class VTestIDV extends VPage<CTrial> {
	header() {return 'Test IDV'}
	content() {
		return React.createElement(observer(() => {
			let {JkOrder} = this.controller.uqs;
			let render = (idVal: {no: string}) => {
				return <span>NO: {idVal?.no}</span>;
			}
			return <div className="p-3">
				<div>直接用id显示ID</div>
				<div>{render(JkOrder.IDV(31195136))}</div>
				<div>{render(JkOrder.IDV(31195138))}</div>
				<div>{render(JkOrder.IDV(31195136))}</div>
			</div>	
		}));
	}
}