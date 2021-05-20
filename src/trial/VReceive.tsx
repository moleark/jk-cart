import { VPage } from "tonva-react";
import { CTrial } from "./CTrial";

export class VReceive extends VPage<CTrial> {
	header() {return '收款'}
	content() {
		return <div className="p-3">
			应收款客户，可搜索客户
		</div>
	}
}