//=== UqApp builder created on Mon Sep 27 2021 10:46:50 GMT+0800 (中国标准时间) ===//
import { NavView, start, nav } from 'tonva-react';
import { CApp } from './CApp';
import { appConfig } from './appConfig';
import React from 'react';

export const App: React.FC = () => {
	nav.setSettings(appConfig);
	const onLogined = async (isUserLogin?:boolean) => {
		await start(CApp, appConfig, isUserLogin);
	}
	return <NavView onLogined={onLogined} />;
}

