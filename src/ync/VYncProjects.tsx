import * as React from 'react';
import { VPage, Page, List, LMR, FA } from 'tonva-react';
import { observer } from 'mobx-react';
import { CYncProjects } from './CYncProjects';

export class VYncProjects extends VPage<CYncProjects> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { YncProjectsItems } = this.controller;

        let header = <header>
            <div>选择项目</div>
        </header>;
        return <Page header={header} headerClassName="py-1 bg-primary" >
            <List items={YncProjectsItems} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });


    private onClick = async (model: any) => {
        this.controller.returnYncProject(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { ProjectName } = item;
        return <LMR className="py-2 border">
            <div><FA name="circle" className="px-2 text-primary"></FA>{ProjectName}</div>
        </LMR >;
    }

}
