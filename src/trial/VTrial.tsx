import { CSSProperties } from "react";
import { FA, LMR, VPage } from "tonva-react";
import { CTrial } from "./CTrial";

const style: CSSProperties = {marginBottom:'0.1rem'};

export class VTrial extends VPage<CTrial> {
	header() {return '试验代码';}
	content() {
		const cmds:[string, (cmd:any)=>void][] = [
			['全部订单', this.controller.showOrderMainList],
			['待批订单', this.controller.showOrderDraftList],
			['待处理订单', this.controller.showOrderProcessingList],
			['完成订单', this.controller.showOrderDoneList],
			['待退货订单', this.controller.showOrderReturningList],
			['发货', this.controller.showDeliver],
			['收款', this.controller.showReceive],
			['开票', this.controller.showInvoice],
			['Test IDV', this.controller.showTestIDV],
		];
		let right = <FA name="angle-right" className="align-self-center" />;
		return <div>
			{cmds.map((v, index) => {
				let [caption, act] = v;
				return <LMR key={index} className="px-3 py-2 cursor-pointer bg-white" 
					right={right} onClick={() => act(caption)} style={style}>
					{caption}
				</LMR>
			})}
		</div>
	}
}
