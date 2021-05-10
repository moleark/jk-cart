import * as React from 'react';
import { View } from 'tonva-react';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { Modal } from 'antd';

export class VModelCardDiscount extends View<CCoupon> {

    render(param?: any): JSX.Element {
    	return React.createElement(observer(() => {
			return <Modal
                title="折扣明细"
                visible={this.controller.CardDiscount}
                onCancel={() => {this.controller.CardDiscount = false;}}
                style={{top:'35%'}}
                footer={null}>
                {this.controller.renderCardDiscount()}
            </Modal>
		}));
	}
}