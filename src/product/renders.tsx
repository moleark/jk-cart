import React from 'react';
import classNames from 'classnames';

export function renderBrand(brand: any) {
	if (!brand) return;
    return renderPropItem('品牌', brand.name);
}

export function renderPropItem(caption: string, value: any, captionClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
    let valClass = captionClass ? classNames(captionClass) : "";
    return <>
        <div className={classNames("col-6 col-sm-2 pr-0 small", capClass)}> {caption}</div>
        <div className={classNames("col-6 col-sm-4", valClass)}>{value}</div>
    </>;
}

/**
 * 产品未售提示UI
 */
export function renderUnsold(discountinued: number) {
    if (discountinued && discountinued === 1)
        return <div onClick={(e: any) => e.stopPropagation()} className='w-100 carousel-control-prev'><b className="alert-primary alert">该产品已下架！</b></div>
    else
        return <></>
}
