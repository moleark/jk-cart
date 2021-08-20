import { AppConfig } from "tonva";
import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { GLOABLE } from "cartenv";

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: '百灵威系统工程部/cart',
    version: '1.1.143',
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威',
    privacy: GLOABLE.PIRVACYURL
};