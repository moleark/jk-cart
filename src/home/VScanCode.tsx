import { observer } from 'mobx-react';
import * as React from 'react';
import { VPage } from "tonva-react";
import { CustomHeaderTemplate } from 'tools/CustomHeaderTemplate';
import { CHome } from './CHome';

const ScanCodeTip: string = '只可扫本司产品二维码';

export class VScanCode extends VPage<CHome> {

    scan: any;
    async open(param?: any) {
        this.openPage(this.page);
    }

    media = () => {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore 
            this.scan = new plus.barcode.Barcode('bcid');
            this.scan.onmarked = this.onmarked;
            this.scan.start();
        }
    }

    onmarked = async (type: any, result: any) => {
        var text = '未知: ';
        switch (type) {
            // @ts-ignore 
            case plus.barcode.QR:
                text = 'QR';
                break;
            // @ts-ignore 
            case plus.barcode.EAN13:
                text = 'EAN13';
                break;
            // @ts-ignore 
            case plus.barcode.EAN8:
                text = 'EAN8';
                break;
        }
        console.log('result==>', result);// '912152 LT40U57 Jkchemical 1'   
        let reg = /(Jkchemical)/, verArr = [1];
        if (text === 'QR' && reg.test(result)) {
            let Ver = result.charAt(result.length - 1);
            let shiftArr = result.split(' ');
            if (verArr.includes(Number(Ver))) {
                let { scanCodetoProductDetail } = this.controller;
                this.scanClose();
                await scanCodetoProductDetail(shiftArr[0]);
            }
        } else {
            alert('此码无法解析额');
            this.close();
        }
    }

    scanClose = () => {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore 
            this.scan.close();
        }
    }

    close = () => {
        this.scanClose();
        this.closePage();
    }

    private page = observer(() => {
        this.media();
        setTimeout(() => {
            this.media();
        }, 5);
        let header = <div className='w-100 text-center text-light'>扫一扫</div>;
        return <div className="w-100 h-100 d-flex flex-column">
            <div className="w-100">
                {CustomHeaderTemplate(header, '', '#555555', '', this.close)}
            </div>
            <div className="alert alert-warning py-0 w-100 rounded-0 m-0 text-center" role="alert">{ScanCodeTip}</div>
            <main className="flex-fill">
                <div id='bcid' className="w-100 h-100" style={{ background: '#F5F5F5' }}></div>
            </main>
        </div>;
    });
}
