import { CUqBase } from 'uq-app';
import { VYncProjects } from './VYncProjects';
import { YncProjectsResponse, YncProjectsItem } from './YncProductItem';

export class CYncProjects extends CUqBase {

    private OrganCode: string;
    private UserId: number;
    YncProjectsItems: YncProjectsItem[] = [];
    private YncProjectsResponse: YncProjectsResponse;

    async internalStart(OrganCode: string, UserId: number) {
        this.OrganCode = OrganCode;
        this.UserId = UserId;
        await this.getYncProjects();
        this.openVPage(VYncProjects);
    }

    getYncProjects = async () => {
        let formData = new FormData();
        formData.append("OrganCode", this.OrganCode);
        formData.append("UserId", this.UserId.toString());

        let res = await window.fetch('http://apitest.sinopec.ad/api/ynk/projects', {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            let content = await res.json();
            if (content.ok) {
                this.YncProjectsResponse = JSON.parse(content);
                if (this.YncProjectsResponse.code === 200) {
                    this.YncProjectsItems = this.YncProjectsResponse.response;
                }
            }
        }
    };

    returnYncProject = (model: any) => {
        this.returnCall(model);
    }
}