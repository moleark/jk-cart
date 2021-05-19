import { CSSProperties } from "react";
import { FA, LMR, VPage } from "tonva-react";
import { CTrial } from "./CTrial";

const style: CSSProperties = {marginBottom:'0.1rem'};

export class VTrial extends VPage<CTrial> {
	header() {return '试验代码';}
	content() {
		const cmds:[string, (cmd:any)=>void][] = [
			['订单列表', this.controller.showOrderList],
			['试验', this.showCmd],
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

	private showCmd = (caption:string) => {
		alert(caption);
	}
}