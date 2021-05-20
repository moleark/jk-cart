import { VPage } from "tonva-react";
import { CTrial } from "./CTrial";

export class VInvoice extends VPage<CTrial> {
	header() {return '发票'}
	content() {
		return <div className="p-3">
			显示可开票的客户，并且可以搜索
		</div>
	}
}