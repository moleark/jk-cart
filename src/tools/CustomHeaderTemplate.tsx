import * as React from 'react';
import { FA, nav } from "tonva-react";
import classNames from 'classnames';

export const CustomHeaderTemplate = (content?: any, right?: any, bg?: any, textC?: any, back?: any) => {
    return <header className={classNames('d-flex align-items-center p-0 justify-content-between', bg ? bg : 'bg-white')} style={{ background: bg, minHeight: '3rem' }}>
        <nav className={`d-flex align-items-center justify-content-center ${textC ? textC : 'text-white'}`}
            style={{ cursor: 'pointer', width: "2.5rem", height: "2.3rem", color: textC, }}
            onClick={() => { nav.back(); if (back) back() }}>
            <FA name="angle-left" />
        </nav>
        <div className="flex-fill">{content}</div>
        <aside className="d-flex justify-content-end align-items-stretch" style={{ minWidth: '2.3rem', padding: 2 }}>{right}</aside>
    </header>
}