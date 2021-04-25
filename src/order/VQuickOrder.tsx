/* eslint-disable */
import * as React from 'react';
import { autoHideTips, BoxId, FA, List, tv, VPage } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import classNames from 'classnames';
import XLSX from "xlsx";
import { LMR } from '../tonva/components/simple/LMR';
import { xs } from 'tools/browser';
import { CQuickOrder } from './CQuickOrder';
import { Product } from 'model';
import { renderBrand, renderPropItem } from 'product/renders';

const productOrderType: { [type:number]:string } = {
    1: "产品编号订购",
    2: "上传Excel文件订购",
};


export class VQuickOrder extends VPage<CQuickOrder> {

    @observable directOrderType: number = 1;        /* 一键下单 类型 */
    @observable excelData: any[] = [];              /* excel文件数据 */
    @observable execlFileName: string;              /* excel文件名称 */
    private excelTip = observable.box<string>('');

    header() {
        return this.isWebNav === true ? null : <>快速订购</>;
    }

    right() {
        return this.isWebNav === true ? null : <></>;
    }

    content() {
        return <this.contentView />
    }

    /* 存储input输入值 */
    inputStorageToOrigin = () => {
        this.controller.quickOrderProducts.forEach((el: any) => { if (el?.iptValue) el.origin = el?.iptValue?.value; });
    };

    productContent = (item: any, index: number) => {
        let delProduct = () => {
            this.inputStorageToOrigin();
            this.controller.quickOrderProducts.splice(index, 1);
        };
        let { product, origin, noProductTip } = item;
        let rightUI = <div><span className="ml-2"
            onClick={() => { delProduct() }} ><FA name="trash-o" className="cursor-pointer" /></span></div>;
        return React.createElement(observer(() => {
            return <LMR right={rightUI} >
                <div className="row mx-0 py-1 border-bottom">
                    <div className="col-lg-6 row mx-0 align-items-center px-0">
                        {
                            !product
                                ? <input ref={v => { item.iptValue = v }} defaultValue={origin || ''}
                                        placeholder="产品编号" type="text" className="form-control col-6 col-sm-3 d-inline-block" />
                                : null
                        }
                        <span className={classNames(!product ? "col-12 col-sm-9 text-danger" : "col-12", "small align-self-center px-0")}>
                            {
                                !product && noProductTip
                                    ? <div className="px-2">{noProductTip}</div>
                                    : this.renProduct(product)
                            }
                        </span>
                    </div>
                    <div className="col-lg-6 px-0">
                        {this.controller.renderPriceQuickOrderView(item)}
                    </div>
                </div>
            </LMR>
        }));
    };

    renProduct = (product: Product) => {
        if (!product) return <></>;
        let { props, brand } = product;
        let { description, descriptionC, origin } = props;
        let eName = <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>;
        let cName: any;
        if (descriptionC !== description) {
            cName = <div dangerouslySetInnerHTML={{ __html: descriptionC || '' }}></div>;
        };
        return <>
            <div className="small font-weight-bolder">{eName}{cName}</div>
            <div className="row mx-0">
                {renderPropItem('产品编号', origin, 'text-primary')}
                {renderBrand(brand)}
            </div>
        </>;
    };

    /** 
     * 上传excel文件 添加产品
     */
    excelUpload = () => {
        let csv2table = (csv: string) => {
            let rows = csv.split('\n');
            rows.pop();
            let arr: any[] = rows.map((row: string, idx: number) => {
                let columns = row.split(',');
                let obj = {
                    id: idx + 1,
                    origin: columns[0],
                    pack: columns[1],
                    quantity: columns[2],
                };
                return obj;
            });
            return arr;
        };
        let readExcelFile = (e: any) => {
            let reads = new FileReader();
            let fileName = e.target.files[0];
            this.execlFileName = fileName?.name ? fileName.name.replace(/(.{2}).*(.{1}.xls(x?))/, "$1...$2") : '';
            reads.readAsBinaryString(fileName);
            reads.onload = (e) => {
                //workbook存放excel的所有基本信息
                let workbook = XLSX.read(e.target.result, { type: 'binary' });
                //定义sheetList中存放excel表格的sheet表，就是最下方的tab
                let sheetList = workbook.SheetNames;
                //只获取第一张表的数据
                let firstSheet = sheetList[0];
                //存放json数组格式的表格数据
                let worksheet = workbook.Sheets[firstSheet];
                let csv = XLSX.utils.sheet_to_csv(worksheet);
                let csv1 = csv2table(csv);
                // let excelData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });//每行以json数组形式输出
                this.excelData = csv1; //|| excelData;
            };
            e.target.value = '';
        }
        return <div className="col-lg-6 p-2" style={{ background: "#efefef" }}>
            <div className="w-50 py-2 text-center position-relative rounded-sm border-primary" style={{ border: "1px dashed" }}>
                上传Excel文件 <br /><span className="small">（格式: .xlsx、.xls）</span>
                <div className="text-primary">{this.execlFileName}</div>
                <input onChange={(e) => readExcelFile(e)} type="file" name="" className="position-absolute w-100 h-100 cursor-pointer"
                    style={{ top: 0, left: 0, opacity: 0 }}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
            {autoHideTips(this.excelTip, <div className="text-danger">*{this.excelTip.get()}</div>)}
            <div className="row mx-0 align-items-end justify-content-between mt-2">
                <button onClick={this.UploadExcel} className="btn btn-sm btn-primary w-25"><span className="mx-2">上载</span></button>
                <a className="col-6 col-sm-6 text-right collapsed text-primary small p-0" data-toggle="collapse" href="#setMyFileC" role="button" aria-expanded="false">
                    如何设置我的文件
                </a>
            </div>
            <div className="mt-lg-2 mb-lg-2 collapse" id="setMyFileC">
                如何设置我的Excel文件以进行快速订购
                <div className="small">您的文件应按以下所示的列顺序包含以下信息。请不要在列中包含任何文本标题。</div>
                <div className="text-center my-2"><img style={{ maxWidth: "100%" }} src="/images/Excel.gif" alt="" /></div>
                <div className="small"><span className="text-danger">注意：</span>“产品编号”是输入文件中唯一需要的列。您可以根据需要省略包装尺寸和/或数量。上传文件后，您将可以编辑所有产品信息。</div>
            </div>
        </div>
    }

    private contentView = observer(() => {
        let { quickOrderProducts, overOrder } = this.controller;
        let quickOrderDised = !quickOrderProducts.length || !quickOrderProducts.every((v: any) => v?.selectedPack && v?.selectedPack?.retail);
        return <div className="mb-5 row mx-0 ">
            {!xs ? <h4 className="col-12 mt-5 mb-4 text-center">快速订购</h4> : null}
            <div className="px-2 px-lg-0">
                <h5>按产品编号订购</h5>
                <div className="small">输入商品编号,检索商品。下单时所有产品必须有效,且已选择包装的大小和数量。</div>
            </div>
            <div className="col-lg-12 mx-auto p-2 rounded" style={{ background: "#efefef" }}>
                <List items={quickOrderProducts} item={{ render: this.productContent, className: "bg-transparent" }} none={<div className="py-2 d-flex justify-content-center" style={{userSelect: "none"}}>请添加产品</div>} />
                <div className="py-2">
                    <button onClick={this.addMoreProducts} className="btn btn-sm btn-primary col—2"><span className="mx-2">添加更多产品</span></button>
                    {
                        quickOrderProducts.every((v: any) => v.product)
                            ? <button onClick={overOrder} disabled={quickOrderDised}
                                className="btn btn-sm btn-success col—2 float-right" style={{ backgroundColor: "#218838" }}><span className="mx-2">现在下单</span></button>
                            : <button onClick={this.getProductByOriginOrPack}
                                className="btn btn-sm btn-primary col—2 float-right" style={{ backgroundColor: "#007bff" }}><span className="mx-2">获取产品包装</span></button>
                    }
                </div>
            </div>
            <div className="d-none d-sm-block">
                <div className="mt-3 px-2 px-lg-0">
                    <h5>上传您自己的产品列表</h5>
                    <div className="small">通过上载每行一个产品（最多30行）的Excel文件，将商品添加到列表中。
                        文件的第一列必须是产品编号,第二列包装大小和第三列数量的列表。您可以将任何/所有产品的包装尺寸和数量列留空。上传文件后，您就可以添加/编辑包装的尺寸和数量。</div>
                </div>
                {this.excelUpload()}
            </div>
        </div>
    });

    /**
     * 添加更多产品
     */
    addMoreProducts = () => {
        let { quickOrderProducts } = this.controller;
        let { length: leng } = quickOrderProducts;
        if (length >= 30) return;
        let id = quickOrderProducts[leng - 1]?.id || 0;
        let len = 30 - leng < 5 ? 30 - leng : 5;
        let newArr = Array.from({ length: len }, (v, k) => { return { id: id + k + 1, origin: '' } });
        this.inputStorageToOrigin();
        this.controller.quickOrderProducts.push(...newArr);
    };

    /**
     * 上载Excel
     */
    UploadExcel = async () => {
        if (!this.execlFileName) {
            this.excelTip.set('请上传的文件.');
            return;
        };
        let excelData = this.excelData.map((el: any) => {
            if (!el || (el && !("origin" in el) && el.origin !== "")) return;
            if ("pack" in el) {
                let radioyArr = el.pack.match(/(\d*\.*\d+)/g);
                let unitArr = el.pack.replace(/(\.)*/g, "").match(/\D+/g);
                let radioy = radioyArr ? Number(radioyArr[0]) : 1;
                let unit = unitArr ? unitArr[0] : "";
                return {
                    id: el.id,
                    origin: el.origin,
                    radiox: 1,
                    radioy: radioy,
                    unit: unit,
                    quantity: Number(el?.quantity) || 1,
                }
            } else return { id: el.id, origin: el.origin };
        }).filter((v: any) => v);
        if (!excelData.length || excelData.length > 30) {
            this.excelTip.set('您上传的文件无法解析,请保证数据格式正确,并且包含至少1中产品,最多30个产品!');
            return;
        };
        this.controller.quickOrderProducts = excelData;
        this.excelData = [];
        this.execlFileName = '';
        await this.getProductByOriginOrPack();
    };

    /**
     * 获取产品
     */
    getProductByOriginOrPack = async () => {
        let { quickOrderProducts, QueryProductsByOriginOrPack } = this.controller;
        this.inputStorageToOrigin();
        let origins: any = quickOrderProducts.map((el: any) => {
            if (el.product) return;
            let obj:any= {
                id: el.id,
                origin: el.origin || el?.iptValue?.value
            };
            if ("radioy" in el || "unit" in el) {
                obj = { ...obj, radiox: el?.radiox, radioy: el?.radioy, unit: el?.unit, quantity: el?.quantity };
            };
            return obj;
        }).filter((v: any) => v && v.origin);
        if (!origins.length) return;
        await QueryProductsByOriginOrPack(origins);
    };
}