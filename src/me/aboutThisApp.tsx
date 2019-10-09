import * as React from 'react';
import { Page } from 'tonva';
import logo from '../images/logo.png';
import { appConfig } from 'configuration';

export class AboutThisApp extends React.Component {
    render() {
        let right = null;
        return <Page header="关于百灵威购物APP" right={right}>
            <div className='bg-white p-3'>
                <div className="h3 flex-fill text-center">
                    <img src={logo} />
                </div>
                <div className="h3 flex-fill text-center">
                    <span className="text-primary mr-3">百灵威购物APP</span>
                </div>
                <div className="h3 flex-fill text-center small">
                    <span className="text-muted mr-3">V{appConfig.version}</span>
                </div>
            </div>
        </Page>;
    }
}