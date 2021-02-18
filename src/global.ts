import AnalyticalChemistry from './images/AnalyticalChemistry.png';
import LabSupplies from './images/LabSupplies.png';
import LifeScience from './images/LifeScience.png';
import MaterialScience from './images/MaterialScience.png';
import OrganicChemistry from './images/OrganicChemistry.png';
import { env } from 'tonva';

enum EnumCategory { OrganicChemistry = 1, AnalyticalChemistry = 2, LifeScience = 3, MaterialScience = 4, LabSupplies = 5 };
const CategoryIds_Production: { [id: number]: EnumCategory } = {
	47: EnumCategory.OrganicChemistry,
	470: EnumCategory.AnalyticalChemistry,
	1013: EnumCategory.LifeScience,
	1219: EnumCategory.MaterialScience,
	1545: EnumCategory.LabSupplies,
};
const CategoryIds_Test: { [id: number]: EnumCategory } = {
	7: EnumCategory.OrganicChemistry,
	430: EnumCategory.AnalyticalChemistry,
	986: EnumCategory.LifeScience,
	1214: EnumCategory.MaterialScience,
	1545: EnumCategory.LabSupplies,
};

interface CategoryRes {
	src: string;
	labelColor: string;
}

const RootCategoryRes: { [key in EnumCategory]: CategoryRes } = {
	[EnumCategory.OrganicChemistry]: {
		src: OrganicChemistry,
		labelColor: 'text-info',
	},
	[EnumCategory.AnalyticalChemistry]: {
		src: AnalyticalChemistry,
		labelColor: 'text-success',
	},
	[EnumCategory.LifeScience]: {
		src: LifeScience,
		labelColor: 'text-danger',
	},
	[EnumCategory.MaterialScience]: {
		src: MaterialScience,
		labelColor: 'text-warning',
	},
	[EnumCategory.LabSupplies]: {
		src: LabSupplies,
		labelColor: 'text-primary',
	},
};

interface Language {
	id: number;
	no: "zh-CN";
	description: "华 -中国";
};

interface SaleRegion {
	id: number;
	name: string;
	currency: 5;
	no: "CN";
};

interface Global {
	CHINA: number;
	CHINESE: Language;
	SALESREGION_CN: SaleRegion;
	//TIPDISPLAYTIME: 3000;
	ANDROIDAPPADDRESS: string;
	PIRVACYURL: string;
	CONTENTSITE: string;
};

// 生产配置
const GLOABLE_PRODUCTION: Global = {
	CHINA: 44,
	CHINESE: { "id": 196, "no": "zh-CN", "description": "华 -中国" },
	SALESREGION_CN: { "id": 1, "name": "中国大陆", "currency": 5, "no": "CN" },
	//TIPDISPLAYTIME: 3000,
	ANDROIDAPPADDRESS: "https://shop.jkchemical.com/download/jk-shop.apk",
	PIRVACYURL: "https://shop.jkchemical.com/privacy/shop.txt",
	CONTENTSITE: "https://web.jkchemical.com",
	// CONTENTSITE: "http://localhost:6061",
}

// 测试环境配置
const GLOABLE_TEST: Global = {
	CHINA: 43,
	CHINESE: { "id": 197, "no": "zh-CN", "description": "华 -中国" },
	SALESREGION_CN: { "id": 4, "name": "中国大陆", "currency": 5, "no": "CN" },
	//TIPDISPLAYTIME: 3000,
	ANDROIDAPPADDRESS: "https://shop.jkchemical.com/download/jk-shop.apk",
	PIRVACYURL: "https://c.jkchemical.com/privacy/shop.txt",
	// CONTENTSITE: "https://c.jkchemical.com/jk-web",
	CONTENTSITE: "http://localhost:6061",
}

export const GLOABLE = env.testing === true ? GLOABLE_TEST : GLOABLE_PRODUCTION;
//export { GLOABLE_PRODUCTION as GLOABLE };
//export { GLOABLE_TEST as GLOABLE };

let categoryIdRes: { [id: number]: CategoryRes };
(function () {
	categoryIdRes = {};
	let categoryIds = env.testing === true ? CategoryIds_Test : CategoryIds_Production;
	for (let id in categoryIds) {
		categoryIdRes[id] = RootCategoryRes[categoryIds[id]];
	}
})();

export function rootCategroyResFromId(categoryId: number): CategoryRes {
	return categoryIdRes[categoryId];
}