//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
import { GLOABLE } from "cartenv";
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
	version: '1.1.149',
	app: {
		dev: jk,
		name: 'cart',
	},
	uqs: [
		/*
		{
			dev: bz,
			name: 'hello-tonva',
			alias: 'HelloTonva',
			version: '0.1.0',
		},
		*/

		{
			dev: jk,
			name: 'order',
			version: '0.1.1',
		},
		{
			dev: jk,
			name: 'product',
			version: '0.1.1',
		},
		{
			dev: jk,
			name: 'customer',
			version: '0.1.1',
		},
	],
	noUnit: true,
	tvs,
	oem: undefined,
	loginTop: jnkTop,
	privacy: GLOABLE.PIRVACYURL
};
