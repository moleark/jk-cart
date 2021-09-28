import * as React from 'react';
import { Page } from 'tonva-react';

interface Phone {
	number: string;
	caption: string;
}

interface Section {
	caption: string;
	address: string;
	post?: string;
	phones: Phone[];
	fax?: string;
	email: string[];
}

const sections: Section[] = [
	{
		caption: 'J&K Scientific Ltd.',
		address: '北京市朝阳区北辰西路69号峻峰华亭A座5层',
		post: '100029',
		phones: [
			{ number: '4006667788', caption: '400-666-7788' },
			{ number: '+861082848833', caption: '+86 10 8284 8833' },
		],
		fax: '+86 10 8284 9933',
		email: ['jkinfo@jkchemical.com', 'jkinfo@jk-sci.com'],
	},
	{
		caption: 'J&K Scientific Ltd. (上海)',
		address: '上海市浦东区世纪大道1777号东方希望大厦10楼H座',
		post: '200122',
		phones: [{ number: '+862161638833', caption: '+86 21 6163 8833' }],
		fax: '+86 21 6163 8800',
		email: ['jksh@jkchemical.com', 'jksh@jk-sci.com']
	},
	{
		caption: 'J&K Scientific Ltd. (广东)',
		address: '广东省广州市天河区珠江新城华夏路28号富力盈信大厦3108室',
		post: '510623',
		phones: [{ number: '+862038889733', caption: '+86 20 3888 9733' }],
		fax: '+86 20 3888 8285',
		email: ['jkgz@jkchemical.com', 'jkgz@jk-sci.com'],
	}/* ,
	{
		caption: 'J&K Scientific Ltd. (成都)',
		address: '四川省成都市高新区科园南路1号1栋8楼803号',
		post: '610041',
		phones: [{ number: '+8602883231067', caption: '+86 028 83231067' }],
		email: ['jkinfo@jkchemical.com'],
	} */,
	{
		caption: 'J&K Scientific Ltd. (香港)',
		address: 'FLAT/RM 1901, 19/F, Lee Garden One,33 Hysan Avenue, Causeway Bay, Hong Kong',
		phones: [{ number: '+85228105022', caption: '+852 2810 5022' }],
		fax: '+852 2810 5033',
		email: ['jkhk@jkchemical.com'],
	}
];

const Row: React.FunctionComponent<any> = ({ label, content }) => {
	if (!content) return null;
	return <div className="my-1">
		<span className="small text-muted">{label}</span>：{content}
	</div>;
}

export class ContactUs extends React.Component {
	render() {
		let right = null;
		return <Page header="联系信息" right={right}>
			<div className='bg-white pb-5'>
				<div className="h4 pb-3 border-bottom border-muted text-center p-3 mb-3">
					<span className="text-primary mr-">联系我们</span>
				</div>
				<div className="px-3 my-3">
					<small className="text-muted">全国客服热线：</small><a href="tel:4006667788">400-666-7788</a>
					<span className="ml-4"><small className="text-muted">QQ：</small>4006667788</span>
				</div>
				{sections.map((v, index) => {
					let { caption, address, post, phones, fax, email } = v;
					return <div key={index} className="my-4">
						<div className="h5 text-info border-bottom p-3">{caption}</div>
						<div className="px-3">
							<Row label="地址" content={address} />
							<Row label="邮编" content={post} />
							<Row label="电话" content={
								phones && phones.map((phone, phoneIndex) => {
									let { number, caption } = phone;
									return <a key={phoneIndex} className="mr-5" href={'tel:' + number}>{caption}</a>
								})}
							/>
							<Row label="传真" content={fax} />
							<Row label="电子邮件" content={
								email && email.map((e, eIndex) => {
									return <a key={eIndex} className="mr-5" href={'mailto:' + e}>{e}</a>
								})}
							/>
						</div>
					</div>
				})}
			</div>
		</Page >;
	}
}
/*
<div className="my-5">
<p className="h4 text-info">J&amp;K Scientific Ltd.</p>
<div className="small">
	<p>地址：北京市朝阳区北辰西路69号峻峰华亭A座5层</p>
	<p>邮编：100029</p>
	<p>电话：<a href="tel:4006667788">400-666-7788</a> / <a href="tel:861082848833">+86 10 8284 8833</a></p>
	<p>传真：+86 10 8284 9933</p>
	<p>电子邮件：<a href="mailto:jkinfo@jkchemical.com">jkinfo@jkchemical.com</a><a className="ml-3" href="mailto:jkinfo@jk-sci.com">jkinfo@jk-sci.com</a></p>
</div>
</div>
<div className="my-5">
<p className="h4 text-info">J&amp;K Scientific Ltd.(上海)</p>
<div className="small">
	<p>地址：上海市浦东区世纪大道1777号东方希望大厦10楼H座</p>
	<p>邮编：200122</p>
	<p>电话：<a href="tel:+862161638833">+86 21 6163 8833</a></p>
	<p>传真：+86 21 6163 8800</p>
	<p>电子邮件：<a href="mailto:jksh@jkchemical.com">jksh@jkchemical.com</a><a className="ml-3" href="mailto:jksh@jk-sci.com">jksh@jk-sci.com</a></p>
</div>
</div>
<div className="my-5">
<p className="h4 text-info">J&amp;K Scientific Ltd.(广东)</p>
<div className="small">
	<p>地址：广东省广州市天河区珠江新城华夏路28号富力盈信大厦3108室</p>
	<p>邮编：510623</p>
	<p>电话：<a href="tel:+862038889733">+86 20 3888 9733</a></p>
	<p>传真：+86 20 3888 8285</p>
	<p>电子邮件：<a href="mailto:jkgz@jkchemical.com">jkgz@jkchemical.com</a><a className="ml-3" href="mailto:jkgz@jk-sci.com">jkgz@jk-sci.com</a></p>
</div>
</div>
<div className="my-5">
<p className="h4 text-info">J&amp;K Scientific Ltd.(成都)</p>
<div className="small">
	<p>地址：四川省成都市高新区科园南路1号1栋8楼803号</p>
	<p>邮编：610041</p>
	<p>电话：<a href="tel:+8602883231067">+86 028 83231067</a></p>
	<p>电子邮件：<a href="mailto:jkinfo@jkchemical.com">jkinfo@jkchemical.com</a></p>
</div>
</div>
<div className="my-5">
<p className="h4 text-info">J&amp;K Scientific Ltd.(香港)</p>
<div className="small">
	<p>地址：FLAT/RM 1901, 19/F, Lee Garden One,33 Hysan Avenue, Causeway Bay, Hong Kong</p>
	<p>电话：<a href="tel:+85228105022">+852 2810 5022</a></p>
	<p>传真：+852 2810 5033</p>
	<p>电子邮件：<a href="mailto:jkhk@jkchemical.com">jkhk@jkchemical.com</a></p>
</div>
</div>
*/