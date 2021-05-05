import * as React from 'react';
import { CProduct } from './CProduct';
import { VPage, Page } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import Pdfh5 from 'pdfh5'
import "pdfh5/css/pdfh5.css";

export class VPagePDF extends VPage<CProduct> {
    @observable pdfh5: any;
    @observable fileName: string = '';      /* 文件名称 暂弃 */
    @observable fileUrl: any;               /* 文件路径 */
    @observable isFoundFile: boolean = true;/* 文件是否存在 */
    @observable fileContent: any;           /* 内容 */

    async open(param?: any) {
        // this.fileName = this.controller.currentFileName;
        this.fileUrl = param?.fileUrl || '#';
        this.fileContent = param?.content;
        setTimeout(() => {this.parsRenderPDF()}, 50);
        this.openPage(this.page);
    }

    private parsRenderPDF = () => {
        if (!this.fileUrl) {
            this.isFoundFile = false;
        } else {
            this.isFoundFile = true;
            this.pdfh5 = new Pdfh5("#PDFVIEW", {
                // pdfurl: this.fileUrl
                data: this.fileContent
            });
        }
    }

    // showAci

    /* dln = async () => {       
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(new Blob([this.fileUrl])); //创建下载的链接
        // let fileName ='';
        downloadElement.href = href;
        downloadElement.download = 'SDS.pdf';//decodeURIComponent(fileName)//解码
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href); //释放掉blob对象
    } */

    private page = observer(() => {
        // let header = <div className="w-100 text-center">{this.fileName}</div>;
        // let right = <></>;// <div className="mr-2" onClick={() => this.isShowActionSheet = true}><FA name='ellipsis-h' /></div>;
        //setTimeout(() => {this.ParsRenderPDF()}, 50);
        // return <Page header={header} right={right} >
        return <Page >
            <div className="text-right mt-1 rounded py-1 pr-3 d-none d-sm-block" style={{background:'#f5f5f5'}}>
                <a href={this.fileUrl} target="_blank">
                    <button className="btn btn-sm btn-success w-3c" style={{backgroundColor: '#218838'}}>下载</button>
                    {/* <FA name="cloud-download" className="text-primary" size='2x' /> */}
                </a>
            </div>
            {/* <button onClick={()=>{this.dln()}} className="btn btn-primary">下载</button> */}
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
                    ? <div id="PDFVIEW" className="w-100 my-2" style={{ height: '100vh',overflowY:'auto' }}></div>
                    : <div className="text-center py-5">NOT FOUND</div>
            }
        </Page>
    })
}