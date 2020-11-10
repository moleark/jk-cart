import React from "react";
import classNames from 'classnames';
import { nav } from "../nav";

export interface AxProps {
	children: React.ReactNode;
	href: string;
	onClick?: (event:React.MouseEvent) => void;
	className?: string;
	aClassName?: string;
	naClassName?: string;
	target?: string;
	props?: any;
}

// 如果是web方式，用webNav方式route网页
// 如果是app方式，用click方式压栈页面
export const Ax = (axProps: AxProps) => {
	let {href, children, className, props} = axProps;
	if (nav.isWebNav === true) {
		let {aClassName, target} = axProps;
		if (!href) return null;
		//if (nav.testing === true) href += '#test';
		let onClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
			evt.preventDefault();
			nav.navigate(href);
		}
		return <a className={classNames(className, aClassName)} href={href} target={target} onClick={onClick} {...props}>{children}</a>;
	}
	else {
		let {onClick, naClassName} = axProps;
		if (!onClick) {
			onClick = () => nav.navigate(href);
		}
		return <span className={classNames(className, 'cursor-pointer', naClassName)} onClick={onClick}>{children}</span>;
	}
}

// 同普通的a tag
// 会自动处理href，处理生产版跟测试版之间的不同
export const A = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
	if (nav.isWebNav === false) {
		return <a {...props} />;
	}
	let {href} = props;
	//if (nav.testing === true) href += '#test';
	let onClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
		evt.preventDefault();
		nav.navigate(href);
	}
	return <a {...props} href={href} onClick={onClick} />;
}
