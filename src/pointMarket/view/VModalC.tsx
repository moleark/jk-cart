import * as React from 'react';
import { FA, View } from 'tonva-react';
import { observer } from 'mobx-react';
import { observable, makeObservable } from 'mobx';

export class VModalC extends React.Component<any,any> {
    visible: boolean = true;

    constructor(props: any) {
        super(props);
        let { visible } = this.props;
        this.visible = visible;
        makeObservable(this, {
            visible: observable
        });
    }

    medalOnClick = () => {
        this.visible = false;
    }

    render() {
        let { title, children, width, footer, onClose,onOk,onCancel } = this.props;

        width = width || "auto";
        if (footer === undefined) footer = <><button className="btn btn-sm btn-light" onClick={onCancel} >cancel</button>
            <button className="btn btn-sm btn-outline-success ml-2"  onClick={onOk} >ok</button></>;
        let footerUI: JSX.Element;
        if (footer !== null) footerUI = <div className="px-3 py-2 border-top text-right" >{footer}</div>;
        document.body.setAttribute("style", `overflow: ${this.visible ? "hidden" : "auto"};`);
        return React.createElement(observer(() => {
            if (!this.visible) return null;
            return <div className="modal" style={{ background: "rgba(0,0,0,.3)", display: "block" }}>
              <div onClick={onCancel} className="d-flex justify-content-center align-content-center w-100 h-100 " >
                    <div onClick={(e: any) => { e.stopPropagation(); }}
                        className="bg-white m-auto position-relative rounded" style={{ minWidth: "200px", width: width }} >
                        <div className="px-3 py-2 font-weight-bold border-bottom">{title}</div>
                        <div className="px-3 py-2">{children}</div>
                        {footerUI}
                        <div onClick={onClose} className="position-absolute cursor-pointer" style={{ right: 5, top: 0 }}>
                            <FA name="times-circle-o" size="lg" className="text-secondary" />
                        </div>
                    </div>
                </div>
            </div>;
        }))
    }
}