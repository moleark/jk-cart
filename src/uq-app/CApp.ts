//=== UqApp builder created on Mon Sep 27 2021 10:46:50 GMT+0800 (中国标准时间) ===//
import { CUqApp } from "./CBase";
import { VMain } from "./VMain";
import { setUI } from "./uqs";

const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];

export class CApp extends CUqApp {
	protected async internalStart(isUserLogin: boolean) {
		setUI(this.uqs);

		this.openVPage(VMain, undefined, this.dispose);
	}

	private timer: any;
	protected onDispose() {
		clearInterval(this.timer);
		this.timer = undefined;
	}

	private tick = 0;
	private gapIndex = 0;
	private callTick = async () => {
	}
}
