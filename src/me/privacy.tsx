import { Page, VPage } from 'tonva-react';
import marked from 'marked';
import { CMe } from './CMe';
import { observable, makeObservable } from 'mobx';

export class Privacy extends VPage<CMe>{

    @observable private privacy: any;
    async open(param?: any) {

        this.privacy = await this.controller.getCommonText(1);
        this.openPage(this.page);
    }

    private page = () => {
        return <Page header="百灵威购物服务条款与隐私政策">
            <div className='bg-white p-3'>
                <div className="mx-auto text-center" style={{ width: 300 }}>
                    <h4>服务条款与隐私政策</h4>
                    <p>VS.20190920</p>
                </div>
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: marked(this.privacy.content) }} />
            </div>
        </Page>;
    }
}