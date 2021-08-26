import * as React from 'react';
import { View } from 'tonva';
import { COrder } from './COrder';
import { FA } from 'tonva';


export class VModelByCreateOrder extends View<COrder>{

    render() {
        let { modalTitle, modalTitleS, renderModelContent } = this.controller;
        let showBack = modalTitle && modalTitleS[modalTitle].preLevel;
        // document.body.setAttribute("style", `overflow: ${modalTitle ? "hidden" : "auto"};`);
        return <div className='modal modal-dialog-show' style={{ display: modalTitle ? 'block' : 'none', background: "rgba(0,0,0,.3)", }}>
            <div className="d-flex justify-content-center align-content-center w-100 h-100" >
                <div className="border bg-light m-auto rounded pb-4 position-relative" style={{ maxWidth: 800 }}>
                    <div className="position-absolute cursor-pointer" style={{ right: 5, top: 0 }} onClick={() => { this.controller.modalTitle = ''; }}><FA name="times-circle-o" className="text-primary" /></div>
                    {
                        showBack &&
                        <div className="position-absolute cursor-pointer" style={{ left: 8, top: 8 }}
                            onClick={() => { this.controller.modalTitle = modalTitleS[modalTitle]?.preLevel }}>
                            <FA name="chevron-left" className="text-break" />
                        </div>
                    }
                    <div className="text-center border-bottom h4 py-2">{modalTitleS[modalTitle]?.title}</div>
                    <div className="h-max-30c overflow-auto scroll-S" style={{ overflowX: "hidden",minWidth:300}}>{renderModelContent()}</div>
                </div>
            </div>
        </div>;
    }
}