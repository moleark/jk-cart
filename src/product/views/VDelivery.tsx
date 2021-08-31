import * as React from 'react';
import { tv, View } from "tonva-react";
import { CProduct } from '../CProduct';
import { observer } from 'mobx-react';
import className from 'classnames';

export class VDelivery extends View<CProduct> {
	/*
    @observable private inventoryAllocation: any[];
    @observable private futureDeliveryTimeDescription: string;
	*/
    render(param: any): JSX.Element {
        let { pack } = param;
        let { id: packId, obj } = pack;
        //let { obj: packObj } = param;
		return React.createElement(observer(() => {
			//let { packId, productId } = param;
            let { product, cApp } = this.controller;
            product = cApp.getProduct(obj?.owner);
            if (!product) return;
            let { futureDeliveryTimeDescription } = product;
            let inventoryAllocation = product.getInventoryAllocation(packId);
			// if (!inventoryAllocation || !futureDeliveryTimeDescription) return null;
			if (!inventoryAllocation || inventoryAllocation.length === 0) {
				if (!futureDeliveryTimeDescription) return null;
				return <div>{'期货: ' + futureDeliveryTimeDescription}</div>;
			}
            let restrict = inventoryAllocation.some(v=> v?.quantity !== 0) ? 1:  0;
			return <>{inventoryAllocation.map((v, index) => {
				let { warehouse, quantity, deliveryTimeDescription } = v;
				if (quantity > 0) {
                    restrict += 1;
					return <div key={index} className={className(param?.defColor ? param?.defColor : "text-success" )}>
						{tv(warehouse, (values: any) => <span>{values?.name ? String(values.name).replace('库房','') : null}</span>)}: {(quantity > 10 ? '>10' : quantity)}{/* small */}
						{deliveryTimeDescription}
					</div>
				} else {
                    if (restrict === 0) {
                        if (!futureDeliveryTimeDescription) return null;
                        restrict += 1;
				        return <div key={index}>{'期货: ' + futureDeliveryTimeDescription}</div>;
                    }
					return undefined;
				}
			})}</>;
		}));
    }

	/*
    private initInventoryAllocation = async (productId: number, packId: number, salesRegionId: number) => {
        if (this.inventoryAllocation === undefined)
            this.inventoryAllocation = await this.controller.getInventoryAllocation(productId, packId, salesRegionId);
    }

    private initFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        if (this.futureDeliveryTimeDescription === undefined)
            this.futureDeliveryTimeDescription = await this.controller.getFutureDeliveryTimeDescription(productId, salesRegionId);
	}

    private content = observer((param: any): any => {
        let deliveryTimeUI;
		let { packId, productId, currentSalesRegion } = param;
        if (productId) {
            this.initInventoryAllocation(productId, packId, currentSalesRegion);
            this.initFutureDeliveryTimeDescription(productId, currentSalesRegion);
        }
        if (this.inventoryAllocation === undefined || this.futureDeliveryTimeDescription === undefined)
			return null;

        if (this.inventoryAllocation && this.inventoryAllocation.length > 0) {
            deliveryTimeUI = this.inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                if (quantity > 0) {
                    return <div key={index} className="text-success">
                        {tv(warehouse, (values: any) => <span className="small">{values.name}</span>)}: {(quantity > 10 ? '>10' : quantity)}
                        {deliveryTimeDescription}
                    </div>
                } else {
                    return undefined;
                }
            });
        } else {
            deliveryTimeUI = <div>{this.futureDeliveryTimeDescription && '期货: ' + this.futureDeliveryTimeDescription}</div>;
        }
		return deliveryTimeUI;
	})
	*/
}