//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
import { jnkTop } from "me/loginTop";
import { AppConfig, DevConfig } from "tonva-react";
import { tvs } from "tvs";

const bz: DevConfig = {
	name: 'bizdev',
	alias: 'bz',
}

const jk: DevConfig = {
	name: '百灵威系统工程部',
	alias: 'jk',
}

export const appConfig: AppConfig = {
	loginTop: jnkTop,
	version: '1.1.124',
	app: undefined,
	uqs: [
		{
			dev: jk,
			name: 'deliver',
			version: '0.1.1',
		}, {
			dev: jk,
			name: "order",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "chemical",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "chemicalSecurity",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "product",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "common",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "webuser",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "customer",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "customerDiscount",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "promotion",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "warehouse",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "salesTask",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "member",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "积分商城",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "webBuilder",
			version: "0.1.1"
		},
		{
			dev: jk,
			name: "platformjoint",
			version: "0.1.1"
		}
	],
	noUnit: true,
	tvs: tvs || {},
	oem: '百灵威' || undefined,
	htmlTitle: '百灵威购物',
};