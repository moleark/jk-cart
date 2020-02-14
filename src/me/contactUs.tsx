import * as React from 'react';
import { Page } from 'tonva';

export class ContactUs extends React.Component {
    render() {
        let right = null;
        return <Page header="联系我们" right={right}>
            <div className='bg-white p-3'>
                <div className="h3 pb-3 border-bottom border-muted">
                    <span className="text-primary mr-3">联系我们</span>
                </div>
                <div className="small">
                    <span>全国客服热线: <a href="tel:4006667788">400-666-7788</a></span>
                    <span className="ml-4">QQ: 4006667788</span>
                </div>
                <div className="my-5">
                    <p className="h4 text-info">J&amp;K Scientific Ltd.</p>
                    <div className="small">
                        <p>地址：北京市朝阳区北辰西路69号峻峰华亭A座5层</p>
                        <p>邮编：100029</p>
                        <p>电话：<a href="tel:4006667788">400-666-7788</a> / <a href="+861082848833">+86 10 8284 8833</a></p>
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
            </div>
        </Page >;
    }
}