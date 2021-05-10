import { AppConfig } from 'tonva-react';
import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { GLOABLE } from "global";

export const appConfig: AppConfig = {
    // appName: '百灵威系统工程部/cart',
    version: '1.1.124',
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威',
    privacy: GLOABLE.PIRVACYURL
};