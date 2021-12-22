import { ResUploader, VPage, Image as Images, LMR, nav, Form, Schema, UiSelect, UiSchema, UiInputItem, Context, List, FA, Ax } from 'tonva-react';
import { pageHTitle } from "tools/pageHeaderTitle";
import { CCertificate } from "./CCertificate";
import classNames from 'classnames';
import React from "react";
import { observer } from "mobx-react";
import { makeObservable, observable } from 'mobx';

const xlargeSize = 1600;
const largeSize = 800;
const mediumSize = 400;
const smallSize = 180;

const SizeNub: { [size: string]: number } = {
    "sm": smallSize,
    "md": mediumSize,
    "lg": largeSize,
    "xl": xlargeSize,
    "raw": -1,
};

const schema: Schema = [
    { name: 'certificate', type: 'id', required: true },
    { name: 'expiredDate', type: 'string', required: true },
];

export class VCertificate extends VPage<CCertificate> {
    checkType: number = 1;
    private form: Form;
    isDelCertificate: boolean = false;  /* 是否删除许可证 */

    private resUploader: ResUploader;

	private imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'apng', 'bmp', 'ico', 'cur', 'tiff', 'tif', 'webp'];
    
    private imgBaseSize: number;
    private suffix: string;

    file: File = null;
    desImgSize: number = null;
    srcImgWidth: number = null;
    srcImgHeight: number = null;
    isChanged: boolean = false;
    resId: string = null;
    enableUploadButton: boolean = false;
    srcImage: string = null;
    desImage: string = null;
    fileError: string = null;
    uploaded: boolean = false;

    certificates: any[] = [];

    uiSchema: UiSchema = {
        items: {
            certificate: { widget: 'select', label: '证件类型', className: "required-item",list:[] } as UiSelect,
            expiredDate: { widget: 'date', label: '失效日期' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    constructor(c: CCertificate) {
        super(c);
        makeObservable(this, {
            checkType: observable,
            isDelCertificate: observable,

            file: observable,
            desImgSize: observable,
            srcImgWidth: observable,
			srcImgHeight: observable,
			isChanged: observable,
			resId: observable,
			enableUploadButton: observable,
			srcImage: observable,
			desImage: observable,
			fileError: observable,
            uploaded: observable,
            
			certificates: observable,
        });
    }

    init(param?: any): void {
        this.certificates = param;
        if (this.certificates.length) {
            this.checkType = this.certificates[0].id;
            (this.uiSchema.items.certificate as UiSelect).list = this.certificates?.map((el: any) => ({ value: el.id, title: el.name }));
        };
    }

    changeType = async (type:number) => {
        this.checkType = type;
        await this.controller.getBuyeraccountCertificate(type);
    }

    private onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.fileError = undefined;
        this.uploaded = false;
        this.enableUploadButton = evt.target.files.length > 0;
        if (this.enableUploadButton) {
            this.file = evt.target.files[0];
            let pos = this.file.name.lastIndexOf('.');
            if (pos >= 0) this.suffix = this.file.name.substr(pos + 1).toLowerCase();
            console.log('this.suffix',this.suffix);
            
            if(this.imageTypes.indexOf(this.suffix) < 0){
                this.fileError = `图片类型必须是 ${this.imageTypes.join(', ')} 中的一种`;
                return;
            };
            let reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = async () => {
				this.srcImage = reader.result as string;
				switch (this.suffix) {
                    default:
                        await this.setSize("raw");
                        break;
                    case 'svg':
						this.imgBaseSize = mediumSize;
						this.desImgSize = this.srcImage.length;
						this.desImage = this.srcImage;
						break;
				}
            };
        }
    }

    private compress = ():Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            var img = new Image();
            img.src = this.srcImage;
            img.onload = () => {
                // 默认按比例压缩
                let { width, height } = img;
                this.srcImgWidth = width; this.srcImgHeight = height;
                let scale = width / height;
				let w:number, h:number;
				if (this.imgBaseSize < 0 || (width <= this.imgBaseSize && height <= this.imgBaseSize)) {
					w = width;
					h = height;
				} else if (scale < 0) {
                    w = this.imgBaseSize; h = w / scale;
                } else {
                    h = this.imgBaseSize; w = h * scale;
                };

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width"); anw.nodeValue = String(w);
                let anh = document.createAttribute("height"); anh.nodeValue = String(h);
                canvas.setAttributeNode(anw); canvas.setAttributeNode(anh);
                ctx.drawImage(img, 0, 0, w, h);
                let base64 = canvas.toDataURL('image/' + this.suffix , 0.7); // 默认图片质量为0.7
                let blob = this.convertBase64UrlToBlob(base64);
                this.desImgSize = blob.size;
                if (this.desImgSize > 3*1024*1024) {
                    this.fileError = "图片大于3M，无法上传";
                    this.enableUploadButton = false;
                }
                resolve(base64);
            }
        });
    }

    private convertBase64UrlToBlob(urlData: string):Blob {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { form } = context;
        let { certificate, expiredDate } = form.data;
        let { currentUser } = this.controller.cApp;
        if (!currentUser || !currentUser?.id || !currentUser?.buyerAccount?.id) return;
        await this.upload();
        if (this.resId) {
            let param: any = {
                certificate: certificate, expiredDate: expiredDate,
                path: nav.resUrl + this.resId.substr(1),
            };
            await this.controller.saveUpLoadCertificate(param);
        };
    }

    private upload = async () => {
        if (!this.resUploader) return;
        let formData = new FormData();
        let blob = this.convertBase64UrlToBlob(this.desImage);
        formData.append('image', blob, this.file.name);
        let ret = await this.resUploader.upload(formData);
        if (typeof ret === 'object') {
            let {error} = ret;
            let type = typeof error;
            let err:string;
            switch (type) {
                case 'undefined': err = 'error: undefined'; break;
                case 'string': err = error; break;
                case 'object': err = error.message; break;
                default: err = String(err); break;
            }
            this.fileError = 'error: ' + type + ' - ' + err;
            return;
        }
        this.resId = ret;
        this.uploaded = true;
    }

    private async setSize(size?: 'sm' | 'md' | 'lg' | 'xl' | 'raw') {
        this.imgBaseSize = SizeNub[size];
		this.desImage = await this.compress();
    }

    private levelDiv() {
        let arr = [{ caption: '原图', size: 'raw' }, { caption: '小图', size: 'sm' }];
        if (this.srcImgHeight > mediumSize || this.srcImgWidth > mediumSize) arr.push({caption:'中图', size:'md'});
        if (this.srcImgHeight > largeSize || this.srcImgWidth > largeSize) arr.push({caption:'大图', size:'lg'});
        if (this.srcImgHeight > xlargeSize || this.srcImgWidth > xlargeSize) arr.push({caption:'超大图', size:'xl'});
        // if (arr.length < 2) return;
        return <div>{arr.map((v, index) => {
            let {caption, size} = v;
            return <label key={index} className="me-3 pr-2"><input type="radio" name="size" 
                onChange={()=>this.setSize(size as any)}
                defaultChecked={index===0} /> {caption}</label>;
        })}</div>
    };

    renderLicensed = () => {
        return React.createElement(observer(() => {
            let { buyeraccountCertificate } = this.controller;
            let certificateUI: JSX.Element = <div className="text-muted text-center py-2 border rounded image-none h-min-6c"> 无证件 </div>;
            if (buyeraccountCertificate.length) {
                certificateUI = <List items={buyeraccountCertificate} className="row mx-0"
                    item={{ render: this.renderItem, className: "col-6 col-sm-4 col-lg-3" }} />
            };
            return <div className="border rounded overflow-hidden">
                <LMR right={<>{this.isDelCertificate && <button onClick={this.delCertificate}
                    className='btn btn-sm btn-outline-success' >删除</button>}
                    <span onClick={() => this.isDelCertificate = !this.isDelCertificate} className='mx-2' >
                        <FA name={this.isDelCertificate ? 'undo' : 'trash-o'} /></span> </>}>
                    <div className="py-1">
                        {this.certificates.map((el: any) => {
                            let classA = this.checkType === el.id ? "bg-primary text-light border-bottom-0" : "border-bottom";
                            return <span onClick={() => this.changeType(el.id)} key={el.id}
                                className={classNames("border-right px-3 py-2 mt-0 cursor-pointer", classA)}
                            >{el.name}</span>;
                        })}
                    </div></LMR>
                <div className='my-2 mx-3'>{certificateUI}</div>
            </div>
        }));
    };

    delCertificate = async () => {
        let delArr = this.controller.buyeraccountCertificate.map((el: any) => {
            if (!el?.isdelC) return undefined;
            el.xi = -1 * el.xi; return el;
        }).filter((el: any) => el);
        if (delArr.length) {
            await this.controller.delBuyeraccountCertificate(delArr);
            this.controller.buyeraccountCertificate = []; //this.controller.buyeraccountCertificate.filter((el: any) => el?.isdelC);
        };
        this.isDelCertificate = false;
    };

    renderItem = (item: any) => {
        let left: JSX.Element;
        if (this.isDelCertificate) {
            left = <input onChange={(e: any) => { item.isdelC = e.target.checked; }} type="checkbox" className="mx-1 my-1" />;
        };
        return <LMR left={left} className="reset-z-header-boxS">
            <div className="d-block overflow-hidden">
                <div className="h-min-12c d-flex align-items-center border bg-center-img">
                    <img className="w-100 h-100" src={item.path} alt="" /></div>
            </div>
        </LMR>
    };

    renderLoadImage = () => {
        return React.createElement(observer(() => {
            return <div className="mx-3 mb-3">
                <LMR right={<label><button onClick={this.onSaveClick} disabled={!this.enableUploadButton}
                    className="btn btn-outline-success" >上传</button></label>}
                ><ResUploader ref={v => this.resUploader = v}
                    multiple={false} maxSize={2048} label="选择图片文件"
                    onFilesChange={this.onFileChange} />
                    <div className="small text-muted">支持 {this.imageTypes.join(', ')} 格式图片。</div>
                    {this.fileError && <div className="text-danger">{this.fileError}</div>}
                    {this.file && this.desImgSize && <div>{this.levelDiv()}</div>}
                </LMR>
                <div className="text-center mt-2"
                    style={{ border: (this.uploaded === true ? '2px solid green' : '1px dotted gray'), padding: '8px'}}>
                    <Images className="h-min-4c" style={{ maxWidth: '100%' }} src={this.desImage} />
                </div>
            </div>
        }));
    };

    content(): JSX.Element {
        let LoginedUI = React.createElement(observer(() => {
            let { currentUser, isLogined } = this.controller.cApp;
            if (!isLogined) return <div className='mt-5 alert alert-danger'>请您<Ax href="/login" className='text-primary' > 登录 </Ax> 后在上传证件</div>;
            if (currentUser && currentUser.buyerAccount) return <></>;
            return <div className='mt-5 alert alert-danger'>
                您的账户并未进行审核,无法上传证件,请补全 <Ax href="/meInfo" className='text-primary' >账户信息</Ax> 后，耐心等待
            </div>;
        }));
        return <div className="mb-5">
            {pageHTitle(<div className="text-left">企业许可证</div>)}
            <div className='d-flex justify-content-end my-2 ' > <Ax href='/upload/certificateHistory'>历史记录</Ax> </div>
            <div>
                {LoginedUI}
                {this.renderLicensed()}
                {React.createElement(observer(() => {
                    let { currentUser, isLogined } = this.controller.cApp;
                    if (!isLogined || !currentUser || (currentUser && !currentUser?.buyerAccount)) return <></>;
                    return <div className="rounded overflow-hidden mt-5" style={{ border: "1px dashed #007bffe6" }}>
                        <div className="text-center h5 py-2" style={{ borderBottom: "1px dashed #007bffe6" }}>证件上传</div>
                        <Form ref={v => this.form = v} fieldLabelSize={3} className="mx-3"
                            schema={schema} uiSchema={this.uiSchema}
                            formData={{ certificate: this.certificates[0]?.id, expiredDate: undefined }}
                            onButtonClick={this.onFormButtonClick} />
                        {this.renderLoadImage()}
                    </div>;
                }))}
            </div>
        </div>
    };

    private onSaveClick = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }
}