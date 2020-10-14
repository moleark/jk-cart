import * as React from 'react';
import { CProduct } from './CProduct';
import { VPage, Page } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import Pdfh5 from 'pdfh5'
import "pdfh5/css/pdfh5.css";

export class VPDFView extends VPage<CProduct> {
    @observable pdfh5: any;
    @observable fileName: string = '';      /* 文件名称 */
    @observable fileUrl: any;               /* 文件路径 */
    @observable isFoundFile: boolean = true;/* 文件是否存在 */

    async open(param?: any) {
        this.fileName = this.controller.currentFileName;
        this.fileUrl = param;
        this.openPage(this.page);
    }

    ParsRenderPDF = () => {
        if (this.fileUrl.status) {
            this.isFoundFile = false;
        } else {
            this.isFoundFile = true;
            this.pdfh5 = new Pdfh5("#PDFVIEW", {
                // pdfurl: this.fileUrl
                data: this.fileUrl
            });
        }
    }

    // showAci


    private page = observer(() => {
        let header = <div className="w-100 text-center">{this.fileName}</div>;
        let right = <></>;// <div className="mr-2" onClick={() => this.isShowActionSheet = true}><FA name='ellipsis-h' /></div>;
        setTimeout(() => {this.ParsRenderPDF()}, 50);
        
        return <Page header={header} right={right} >
            {/* <div className="position-fixed d-flex flex-column justify-content-end" style={{ top: 0, left: 0, bottom: 0, right: 0, background: 'rgba(0, 0, 0, .3)' }}>
                <div className="">
                    <div>
                        <button className="btn btn-light w-100">下载</button>
                    </div>
                    <footer className="mt-2">
                        <button className="btn btn-light w-100" onClick={() => this.isShowActionSheet = false}>取消</button>
                    </footer>
                </div>
            </div> */}
            {
                this.isFoundFile 
                    ? <div id="PDFVIEW" className="w-100" style={{ height: '91vh' }}></div>
                    : <div className="text-center py-5">{this.fileUrl.msg}</div>
            }
        </Page>
    })
}