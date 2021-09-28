// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes, TFunc, FieldItem, FieldItemNumber, FieldItemString, FieldItemId, UI, uqStringify } from "tonva-react";
import { TuidProductX } from "./JkProduct";

const resRaw: Res<any> = {
	$zh: {
	},
	$en: {
	}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {
	return res[str as string] ?? str;
}

export function render(item: TuidProductX):JSX.Element {
	let {brand, origin, description, descriptionC, imageUrl, no} = item;
	let desc: string, descVice: string;
	if (description) {
		desc = description;
		if (descriptionC) {
			if (descriptionC !== description) {
				descVice = descriptionC;
			}
		}
	}
	else {
		desc = descriptionC;
	}
	let vBrand: any = undefined;
	return <>
		<div>{no && <small className="text-muted">{no}</small>} <b>{desc}</b></div>
		{descVice && <div>{descVice}</div>}
		<div>{vBrand}</div>
	</>;
};
