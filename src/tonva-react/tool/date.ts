import { env } from "./env";

const options:Intl.DateTimeFormatOptions = { 
	weekday: 'long', 
	year: 'numeric', 
	month: 'long', 
	day: 'numeric' 
}

export function toLocaleDateString(date:Date) {
	if (!date) return '';
	return date.toLocaleDateString('zh-cn', options);
}

export const miniSecondsOf2020_01_01 = 26297280*60000;  // 2020-1-1 到 1970-1-1 的毫秒数
export function dateFromMinuteId(id: number, timeZone?: number): Date {
	let m = (id / Math.pow(2, 20));
	if (timeZone !== undefined) m += timeZone * 60;
	return new Date(m * 60000 + miniSecondsOf2020_01_01);
}
