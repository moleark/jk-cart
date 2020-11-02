import React, { useState } from "react";
import classNames from 'classnames';
import { nav } from "../nav";

export interface AxProps {
	children: React.ReactNode;
	href: string;
	onClick: (event:React.MouseEvent) => void;
	className?: string;
	aClassName?: string;
	naClassName?: string;
	target?: string;
}

export const Ax = (props: AxProps) => {
	let {children, className} = props;
	if (nav.isWebNav === true) {
		let {href, aClassName, target} = props;
		if (!href) return null;
		if (nav.testing === true) href += '#test';
		return <a className={classNames(className, aClassName)} href={href} target={target}>{children}</a>;
	}
	else {
		let {onClick, naClassName} = props;
		if (!onClick) return null;
		return <span className={classNames(className, naClassName)} onClick={onClick}>{children}</span>;
	}
}

export const A = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
	if (nav.isWebNav === false) {
		return <a {...props} />;
	}
	let {href} = props;
	if (nav.testing === true) href += '#test';
	return <a {...props} href={href} />;
}
