import * as React from 'react';
import { xsOrIpad, xs } from './browser';


export function pageHTitle(title:any) {
    if (!xsOrIpad)  return <div className="text-center mt-5"><h1>{title}</h1></div>;
    return null;
}

export function CrPageHeaderTitle(title:string) {
    if (xs) return title;
    return '';
}