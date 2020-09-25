import * as React from 'react';
import { Page, VPage } from 'tonva';
import { CustomHeaderTemplate } from 'tools/CustomHeaderTemplate';
import { CHome } from './CHome';

export class VScanCode extends VPage<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    media = () => {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误 
            window.plusBarcode();
        }
        /* console.log(navigator);//mediaDevices
        let opt = {
            audio: true,
            video: {
                width: 375,
                height: 603
            }
        };
        navigator.mediaDevices.getUserMedia(opt)
            .then((mediaStream) => {
                let video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = (e) => { video.play() };
            })
            .catch((err) => {
                console.log(err.name + ": " + err.message)
            }); */

    }

    private page = () => {
        this.media();
        return <div className="w-100 h-100 position-relative">
            <div className="position-absolute w-100" style={{ zIndex: 9 }}>
                {CustomHeaderTemplate('扫码', '', 'bg-transparent', 'text-primary')}
            </div>
            <div id='bcid' className="w-100 h-100"></div>
        </div>;
    };
}