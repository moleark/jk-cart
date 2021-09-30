import * as React from 'react';
import { Page, VPage, nav } from "tonva-react";
import logo from '../images/logo.png';
import { appConfig } from 'uq-app/appConfig';
import { CMe } from './CMe';

export class AboutThisApp extends VPage<CMe>{

    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        this.openPage(this.page);
    }

    private page = () => {
        let right = null;
        let links: any = <div className="sep-product-select" style={{ width: "80%", margin: " 0 auto 0 auto" }} />
        return <Page header="关于百灵威购物APP" right={right}>
            <div className='bg-white p-3'>
                <div className="h3 flex-fill text-center">
                    <img src={logo} />
                </div>
                <div className="h3 flex-fill text-center">
                    <span className="text-primary mr-3">百灵威购物APP</span>
                </div>
                <div className="h3 flex-fill text-center small">
                    <span className="text-muted mr-3">V{appConfig.version}</span>
                </div>

                {
                    (this.version && this.version !== appConfig.version) && <>
                        {links}
                        < div className="d-flex my-3 cursor-pointer" style={{ width: "70%", margin: " 0 auto 0 auto" }} onClick={() => nav.resetAll()} >
                            <div className="text-danger">发现新版本 V{this.version}，升级APP</div>
                        </div>
                        {links}
                    </>
                }
            </div>
        </Page>;
    }
}