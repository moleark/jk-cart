import * as React from 'react';
import { FA, nav } from 'tonva';
import classNames from 'classnames';

export const CustomHeaderTemplate = (content?: any, right?: any, bg?: any, textC?: any) => {
    return <header className={classNames('d-flex align-items-center p-0 justify-content-between', bg ? bg : 'bg-white', textC ? textC : 'text-white')} style={{ background: bg, color: textC, minHeight: '3rem' }}>
        <nav className="d-flex align-items-center justify-content-center"
            style={{ cursor: 'pointer', width: "2.5rem", height: "2.3rem" }}
            onClick={() => nav.back()}>
            <FA name="angle-left" />
        </nav>
        <div className="flex-fill">{content}</div>
        <aside className="d-flex justify-content-end align-items-stretch" style={{ minWidth: '2.3rem', padding: 2 }}>{right}</aside>
    </header>
}