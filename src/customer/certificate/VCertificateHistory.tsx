import { List, VPage, EasyDate } from 'tonva-react';
import { pageHTitle } from "tools/pageHeaderTitle";
import { CCertificate } from "./CCertificate";

export class VCertificateHistory extends VPage<CCertificate> {

    certificateHistory: any[] = [];

    init(param: any) {
        this.certificateHistory = param;
    }

    content() {
        return <div className="mb-5">
            {pageHTitle(<div className="text-center">企业许可证上传历史</div>)}
            <List items={this.certificateHistory} item={{render:this.renderItem, className:"col-12 col-sm-6 col-lg-4"}} className="row mx-0 mt-2" />
        </div>;
    }

    renderItem = (item: any) => {
        let { statusDesc, path, comments, createDate, status } = item;
        return <div className='flex-column justify-content-between'>
            <div className='h-min-12c h-max-20c d-flex flex-column align-items-center bg-center-img overflow-hidden'>
                <img className='w-100 h-100' src={path} alt="" />
            </div>
            <div className="py-2">
                <div><span >上载日期</span><span className='float-right'><EasyDate date={createDate} /></span></div>
                <div><span >审核状态</span><span className='float-right'><b>{statusDesc}</b></span></div>
                {comments && status === 0 && <div className=""><span><b>驳回原因</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-danger">{comments}</span></div>}
                
            </div>
        </div>
    }
}