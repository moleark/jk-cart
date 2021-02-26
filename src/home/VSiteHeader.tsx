/* eslint-disable */
import * as React from 'react';
import { LMR, FA, View } from 'tonva';
import logo from '../images/logo_mobi.png';
import { CHome } from './CHome';
import 扫一扫 from 'images/扫一扫.png';

export class VSiteHeader extends View<CHome> {
    render() {
        let currentSalesRegion = <FA name="globe" />
        let left = <img className="m-1 ml-2" src={logo} alt="logo" style={{ height: "3rem", width: "2.5rem" }} />;
        //let cart = this.controller.cApp.cCart.renderCartLabel();
        // let right = undefined; // 
        let right = undefined;
        /* if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            right = <img src={扫一扫} alt="" className="mr-2" style={{ width: 24 }} onClick={this.controller.openScanCode} />;
        } */
        /*
        <div className="d-flex flex-row mr-1 align-items-center">
            {currentSalesRegion} &nbsp;
            <button onClick={()=>nav.start()}>Try</button>
        </div>;*/
        return <LMR
            className="mb-1 align-items-center bg-white reset-z-header-boxS"
            left={left} right={right}>
            <div className="px-3 py-4">
                {this.controller.renderSearchHeader('md')}
            </div>
        </LMR>
        //<div className="h4 px-3 mb-0">百灵威科技</div>
    }
}