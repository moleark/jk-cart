import { CUqBase } from 'tapp';
import { makeObservable, observable } from 'mobx';
import moment from 'moment';
import _ from "lodash";
import { CApp } from '../../tapp/CApp';
import { VCertificate } from './VCertificate';
import { VCertificateHistory } from './VCertificateHistory';
import { VError } from '../../tools/VError';

export const certificateStatus: { [status: number | string]: string } = {
    "-1": "待审核",
    "0": "未通过",
    "1": "已通过",
};

export class CCertificate extends CUqBase {
    buyeraccountCertificate: any[] = [];
    
    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            buyeraccountCertificate: observable,
        });
    }

    async internalStart() { }

    openUpLoadCertificate = async () => {
        let allCertificate: any[] = await this.getCertificate();
        if (!allCertificate.length) {
            this.openVPage(VError); return;
        };
        if(allCertificate.length)  await this.getBuyeraccountCertificate(allCertificate[0]?.id);
        this.openVPage(VCertificate, allCertificate);
    }

    getCertificate = async () => {
        let { JkCustomer } = this.uqs;
        return JkCustomer.ID({ IDX: JkCustomer.Certificate, id: undefined });
    }

    /* 上传许可证 */
    saveUpLoadCertificate = async (param: any) => {
        let { currentUser } = this.cApp;
        let { JkCustomer } = this.uqs;
        let date = moment().format("YYYY-MM-DD HH:mm:ss");
        _.assign(param, {
            status: 0, buyeraccount: currentUser.buyerAccount.id,
            creator: currentUser.id, createDate: date,
        });
        let result = await JkCustomer.Acts({ certificateSource: [param] });
        let ids: any[] = result["certificateSource"].map((el: number) => ({ id: el, createDate: date }));/* date */
        await JkCustomer.Acts({ dxPendingAuditCertificate: ids });
    };

    /* 获取企业许可证 BuyeraccountCertificate */
    getBuyeraccountCertificate = async (certificate:number) => {
        let { currentUser } = this.cApp;
        let { JkCustomer } = this.uqs;
        if (!currentUser) return;
        let buyeraccount = currentUser?.buyerAccount?.id;
        this.buyeraccountCertificate = await JkCustomer.IX({ IX: JkCustomer.BuyeraccountCertificate, ix: buyeraccount });

        this.buyeraccountCertificate = this.buyeraccountCertificate.filter((el: any) => el.xi === certificate);
    };

    /* 删除许可证 */
    delBuyeraccountCertificate = async (buyCertificate:any[]) => {
        await this.uqs.JkCustomer.Acts({ buyeraccountCertificate: buyCertificate });
    }

    /* 页面 企业许可证上载历史记录 */
    openCertificateHistory = async () => {
        let { currentUser } = this.cApp;
        let { JkCustomer } = this.uqs;
        if (!currentUser) return;
        let certificateHistory = await JkCustomer.ID({ IDX: JkCustomer.CertificateSource, id: undefined, order: "desc" });
        certificateHistory = certificateHistory.filter((el: any) => el.creator === currentUser.id);
        let ids = certificateHistory.map((el: any) => el.id);
        let auditHistory = await JkCustomer.ID({ IDX: JkCustomer.CretificateSourceAuditHistory, id: ids });
        certificateHistory.forEach((el: any) => {
            let getHistoryById: any = auditHistory.find((i: any) => i.id === el.id);
            if (!getHistoryById) el.status = -1;
            el.comments = getHistoryById?.comments;
            el.statusDesc = certificateStatus[el.status];
        });
        this.openVPage(VCertificateHistory, certificateHistory);
    }
}
