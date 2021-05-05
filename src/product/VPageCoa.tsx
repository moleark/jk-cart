import * as React from 'react';
import { Page, VPage } from 'tonva';
import { CProduct } from './CProduct';
import { observer } from 'mobx-react';
import moment from 'moment';
import classNames from 'classnames';
import { xs } from 'tools/browser';

const BrandImg: { [brand: string]:string} = {
    'J&K':'/images/coa/coa.jpg',
    'Amethyst':'/images/coa/coaa10.jpg',
};

export class VPageCoa extends VPage<CProduct> {

    async open(param?: any) {
        let iframeList: any = document.querySelectorAll('body iframe');
        if (iframeList && iframeList.length) iframeList[iframeList.length - 1].setAttribute('class', "test-iframe-d-n");
		this.openPage(this.page,param);
	}

	page = observer((param?: any) => {
        let { content : COAContent } = param;
        let { content, version, issueDate, lot, origin, product } = COAContent;
        content = JSON.parse(content.replace(/(\n|\t|\r)*/g, ''));
        issueDate = moment(issueDate).format('YYYY-MM-DD');
        let brand:any = product?.obj?.brand?.obj;
        let arr1 = ['description','cas','molecularFormula','molecularWeight','issueDate'];
        let OtherArr = Object.keys(content).filter((v: any) => !arr1.find((i: any) => i === v));
        let header: any, title = '质检报告';
        if (xs) header = title;
        return <Page header={header}>
            <div style={{visibility: "hidden"}} onClick={()=>{window.print();}} >打印</div>
			<div className="text-center w-100 mt-lg-2">
                <img src={BrandImg[brand?.name] || BrandImg['J&K']} className="w-75" alt=""/>
                <h5 className="r-font-size font-weight-bolder">CERTIFICATE OF ANALYSIS</h5>
            </div>
            <div className="border-bottom border-dark font-weight-bold py-1" style={{ borderTopStyle:'double'}}>
                <div className="row mx-0">
                    {renderCOAItem('catalogNO.',origin)}
                    {renderCOAItem('LotNumber',lot?.obj?.lotnumber)}
                </div>
                <div className="row mx-0">{renderCOAItem('ProductName',content['description'],null,'col-lg-5')}</div>
                <div className="row mx-0">{renderCOAItem('CAS',content['cas'],null,'col-lg-5')}</div>
                <div className="row mx-0">{renderCOAItem('Version',version,null,'col-lg-5')}</div>
                <div className="row mx-0">{renderCOAItem('Molecular Formula',content['molecularFormula'],null,'col-lg-5')}</div>
                <div className="row mx-0">
                    {renderCOAItem('Molecular Weight', content['molecularWeight'])}
                    {renderCOAItem('Issue Date',issueDate)}
                </div>
            </div>
            <div>
                {
                    OtherArr.map((v: any, index: number) => {
                        let cont = content[v];
                        if(Object.prototype.toString.call(cont) ==="[object Object]") {
                            return <>
                                <div className="row mx-0 font-weight-bold">{renderCOAItem(v, ' ', null, 'col-lg-5')}</div>
                                {
                                    Object.keys(cont).map((i: any, o: number) => {
                                        if(Object.prototype.toString.call(cont[i]) ==="[object String]"){
                                            return <div className="row mx-0"  key={o}>
                                                {renderCOAItem(i, cont[i], 'ml-2 font-weight-normal', 'col-lg-5')}
                                            </div>
                                        };
                                        return null;
                                    })
                                }
                            </>
                        };
                        if(Object.prototype.toString.call(cont) ==="[object String]") {
                            return <div className="row mx-0 font-weight-bold" key={index}>
                                {renderCOAItem(v, cont, null, 'col-lg-5')}
                            </div>
                        };
                        return null;
                    })
                }
            </div>
            <div className="mb-lg-5 mb-sm-5 mt-2">
                <img src="/images/coa/coa1.gif" className="col-lg-4 col-sm-8 col-10" alt=""/>
            </div>
		</Page>
    })
}

function renderCOAItem(caption: string, value: any, captionClass?: string, valClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : "";
    valClass = valClass ? classNames(valClass) : "";
    return <>
        <div className={classNames("col-lg-2 col-sm-5 col-5", capClass)}> {caption}</div>
        <span className="mx-2">:</span>
        <div className={classNames("col-lg-2 col-sm-5 col-5", valClass)}>{value}</div>
    </>;
}