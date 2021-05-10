import * as React from 'react';
import { VPage, Page, List, EasyDate, tv, Scroller } from 'tonva-react';
import { CPointProduct } from "./CPointProduct";
import { observer } from 'mobx-react-lite';


export class VPointDetails extends VPage<CPointProduct> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer((param: any) => {
        let { pagePointHistory } = this.controller;
        return <Page header="积分详情" onScrollBottom={this.onScrollBottom}>
            {pagePointHistory.items && pagePointHistory.items.length > 0 && <List items={pagePointHistory} item={{ render: this.renderItem }} />}
        </Page >;

    });

    protected onScrollBottom = async (scroller: Scroller) => {
        this.controller.pagePointHistory.more();
    }

    private renderItem = (item: any) => {
        let { date, customer, comments, point } = item;
        // console.log("qwqw", item)
        return <div className="w-100 d-flex flex-column px-3 py-2">
            <div className="d-flex justify-content-between">
                <div className="text-muted"><small><b>{comments}</b></small></div>
                <div className="pr-2" style={{ color: "pink" }}><small>{point}</small></div>
            </div>
            <div className="d-flex justify-content-between pt-1">
                <div className="text-info"><small>{tv(customer, v => v.name)}</small></div>
                <div className="text-info"><small><EasyDate date={date}></EasyDate></small></div>
            </div>

        </div>

        // return <div className="row px-3 py-2 d-flex">
        //     <div className="col-6 col-md-6"><small><b>{comments}</b></small></div>
        //     <div className="col-6 col-md-6 w-100 d-flex justify-content-between">
        //         <div className="" ><small>{tv(customer, v => v.name)}</small></div>
        //         <div className="" ><small><EasyDate date={date}></EasyDate></small></div>
        //     </div>
        // </div>

        /*
            let left=<div className="w-40">订单：{comments}</div>
            let right= <div className="float-right" ><EasyDate date={date}></EasyDate></div> 
            let content= <div className="text-center px-1" >{tv(customer,v=> v.name)}</div>
            return <LMR className="cursor-pointer w-100 px-3" 
               left={ left } right={right}> {content}
           </LMR>;
       */

        /*          
         return <div className="w-100 d-flex justify-content-between">
            <div className=""><b>订单:{comments}</b></div>
            <div className="mx-3 " >{tv(customer,v=> v.name)}</div>
            <div className="w-30 float-right" ><EasyDate date={date}></EasyDate></div>
         </div>
        */

    }

}