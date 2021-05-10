//import * as React from 'react';
import { Page, nav, LMR } from "../components";
import { VPage } from '../vm';
//import { appInFrame } from '../net';
import { CAppBase } from "./CAppBase";
//import { UQsMan } from '../uq';

/*
export class VAppMain extends VPage<CMainBase> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    render(param?:any) {
        return this.appContent();
    }

    protected appPage = () => {
        let {caption} = this.controller;
        return <Page header={caption} logout={async()=>{appInFrame.unit = undefined}}>
            {this.appContent()}
        </Page>;
    }

    protected appContent = () => {
        let {cUqArr} = this.controller;
        let content:any;
        if (cUqArr.length === 0) {
            content = <div className="text-danger">
                <FA name="" /> 此APP没有绑定任何的UQ
            </div>;
        }
        else {
            content = cUqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <>{content}</>;
    };
}
*/
export class VUnsupportedUnit extends VPage<CAppBase<any>> {
	private params: {predefinedUnit:number, uqsLoadErrors:string[]};
    async open(params: {predefinedUnit:number, uqsLoadErrors:string[]}) {
		this.params = params;
        this.openPage(this.page);
    }

    private page = () => {
		let {predefinedUnit, uqsLoadErrors} = this.params;
        let {user} = nav;
		let userName:string = user? user.name : '[未登录]';
		//let {appOwner, appName} = UQsMan.value;
        return <Page header="APP无法运行" logout={true}>
            <div className="m-3 text-danger container">
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">登录用户</div>
                    <div className="col-sm text-body">{userName}</div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">预设小号</div>
                    <div className="col-sm text-body">{predefinedUnit || <small className="">[无预设小号]</small>}</div>
                </div>
				{
					uqsLoadErrors && uqsLoadErrors.map(v => {
						return <div className="form-group row">
							<div className="col-sm-3 font-weight-bold">App</div>
							<div className="col-sm text-body">{v}</div>
						</div>
					})
				}
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">小号{predefinedUnit}</div>
                    <div className="col-sm text-body">
                        预设小号定义在 public/unit.json 文件中。
                        定义了这个文件的程序，只能由url直接启动。
                        用户第一次访问app之后，会缓存在localStorage里。<br/>
                        如果要删去缓存的预定义Unit，logout然后再login。
                    </div>
                </div>
            </div>
		</Page>;		
	}
	/*
	<div className="form-group row">
		<div className="col-sm-3 font-weight-bold">
			可能原因<FA name="exclamation-triangle" />
		</div>
		<div className="col-sm text-body">
			<ul className="p-0">
				<li>没有小号运行 {appName}</li>
				<li>用户 <b>{userName}</b> 没有加入任何一个运行{appName}的小号</li>
				{
					predefinedUnit && 
					<li>预设小号 <b>{predefinedUnit}</b> 没有运行App {appName}</li>
				}
			</ul>
		</div>
	</div>
	*/
}

export class VUnitSelect extends VPage<CAppBase<any>> {
    async open() {
        this.openPage(this.page);
    }

    private renderRow = (item: any, index: number):JSX.Element => {
        let {id, nick, name} = item;
        return <LMR className="px-3 py-2" right={'id: ' + id}>
            <div>{nick || name}</div>
        </LMR>;
    }
    private onRowClick = async (appUnit: any) => {
		//appInFrame.unit = appUnit.id; // 25;
		//this.controller.setAppUnit(appUnit);
        await this.controller.start();
    }

    private page = () => {
        return <Page header="选择小号" logout={true}>
			<div>this.controller.appUnits appUnits removed</div>
        </Page>
        // <List items={this.controller.appUnits} item={{render: this.renderRow, onClick: this.onRowClick}}/>
	}
}

export class VErrorsPage extends VPage<CAppBase<any>> {
    async open(errors:string[]) {
        this.openPage(this.page, {errors:errors});
    }

    private page = (errors:{errors:string[]}) => {
        return <Page header="ERROR">
            <div className="m-3">
				<div className="p-3 d-flex justify-content-center align-items-center">
					<button className="btn btn-danger" onClick={nav.resetAll}>重启网页</button>
				</div>

                <div>Load Uqs 发生错误：</div>
                {errors.errors.map((r, i) => <div key={i}>{r}</div>)}
            </div>
        </Page>;
    }
}

export class VStartError extends VPage<CAppBase<any>> {
    async open(error:any) {
        this.openPage(this.page, {error:error});
    }

    private page = ({error}:{error:any}) => {
        return <Page header="App start error!">
            <pre>
                {typeof error === 'string'? error : error.message}
            </pre>
        </Page>;
    }
}