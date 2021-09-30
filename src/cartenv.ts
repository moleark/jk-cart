import AnalyticalChemistry from './images/AnalyticalChemistry.png';
import LabSupplies from './images/LabSupplies.png';
import LifeScience from './images/LifeScience.png';
import MaterialScience from './images/MaterialScience.png';
import OrganicChemistry from './images/OrganicChemistry.png';
import { env } from "tonva-react";


// 生产配置
const GLOABLE_PRODUCTION = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    ROOTCATEGORY: {
        47: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        470: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        1013: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1219: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    } as any,
    TIPDISPLAYTIME: 3000,
    ANDROIDAPPADDRESS: "https://shop.jkchemical.com/download/jk-shop.apk",
    PIRVACYURL: "https://web.jkchemical.com/privacy-shop",
    CONTENTSITE: "https://web.jkchemical.com",
    // CONTENTSITE: "http://localhost:6061",
    // JD: 'http://localhost:3016/jd',
    JD: 'https://joint.jkchemical.com/jd',

}

// 测试环境配置
const GLOABLE_TEST = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    ROOTCATEGORY: {
        7: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        430: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        986: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1214: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    } as any,
    TIPDISPLAYTIME: 3000,
    ANDROIDAPPADDRESS: "https://shop.jkchemical.com/download/jk-shop.apk",
    PIRVACYURL: "https://web.jkchemical.com/privacy-shop",
    CONTENTSITE: "https://c.jkchemical.com/jk-web",
    // CONTENTSITE: "http://localhost:6061",
    // JD: 'http://localhost:3016/jd',
    JD: 'https://c.jkchemical.com/joint/jd',
}

export const GLOABLE = env.testing === true ? GLOABLE_TEST : GLOABLE_PRODUCTION;
//export { GLOABLE_PRODUCTION as GLOABLE };
//export { GLOABLE_TEST as GLOABLE };