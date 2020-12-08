import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { nav, BoxId } from 'tonva';
import { VOrderDraftdetail } from './VOrderDraftdetail'
import { VNotYOrder } from './VNotYOrder';
import { groupByProduct } from 'tools/groupByProduct';


export class COrderDraft extends CUqBase {
    private data: any;
    protected async internalStart(param: any) {

    }
    showSharedOrder = async (param: any) => {
        let { customerId, orderdraftid } = param;

        let { currentUser } = this.cApp;
        if (customerId === currentUser.id) {
            let par = await this.uqs.orderDraft.OrderDraft.getSheet(2);
            let { data } = par;
            let { orderItems } = data;
            let orderItemsGrouped = groupByProduct(orderItems);
            data.orderItems = orderItemsGrouped;
            this.openVPage(VOrderDraftdetail, par);
        }
        else
            this.openVPage(VNotYOrder)
    }

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }
}