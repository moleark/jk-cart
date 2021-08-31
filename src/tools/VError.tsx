/* eslint-disable */
import * as React from 'react';
import { VPage } from "tonva-react";
import { observer } from 'mobx-react';
import { CApp } from '../tapp/CApp';

export class VError extends VPage<CApp> {

    header() {
        return this.isWebNav === true ? null : <></>;
    }

    right() {
        return this.isWebNav === true ? null : <></>;
    }

    content() {
        return <this.contentView />
    }

    private contentView = observer(() => {
        return <div className="container my-3">
            <div className="row p-5 m-5">
                <div className="col text-center">
                    <i className="fa fa-exclamation fa-5x text-warning" aria-hidden="true"></i>
                </div>
                <div className="col">
                    <p className="h3">抱歉，页面无法访问...</p>
                    <p className="text-mute">
                        请检查网址是否有误。
                    </p>
                </div>
            </div>
        </div>
    })
}