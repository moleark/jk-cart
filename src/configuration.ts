import { AppConfig } from "tonva";
import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { GLOABLE } from "cartenv";
import { sign } from "crypto";

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: '百灵威系统工程部/cart',
    version: '1.1.98',
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威',
    privacy: GLOABLE.PIRVACYURL
};