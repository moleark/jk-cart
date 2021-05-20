import { VPage } from "tonva-react";
import { CTrial } from "./CTrial";

export class VDeliver extends VPage<CTrial> {
	header() {return '发货'}
	content() {
		return <div className="p-3">
			可发货客户，可搜索客户
		</div>
	}
}