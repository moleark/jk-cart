import * as React from 'react';
import { View, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, Context, Form, ItemSchema } from 'tonva';
import { CProduct } from '../CProduct';
import { MinusPlusWidget } from 'tools';
import { Product } from 'model';

/**
 * 显示产品包装价格，配合CProduct.renderProductPrice使用
 * 需要的参数product必须是BoxId(或者object?)
 */
export class VPrice extends View<CProduct> {

    private schema: ItemSchema[] = [
        { name: 'pack', type: 'object' } as ObjectSchema,
        { name: 'quantity', type: 'number' } as NumSchema,
        { name: 'retail', type: 'number' } as NumSchema,
        { name: 'vipPrice', type: 'number' } as NumSchema,
        { name: 'promotionPrice', type: 'number' } as NumSchema,
        { name: 'currency', type: 'string' },
    ];

	/*
    @observable private prices: any;
    private initPrices = async (product: BoxId, salesRegionId: number, discount: number) => {
        if (this.prices === undefined)
            this.prices = await this.controller.getProductPrice(product, salesRegionId, discount);
	}
	*/

    private renderPrice(product:Product, item: any) {
		let onQuantityChanged = async (context: Context, value: any, prev: any):Promise<void> => {
			let { data } = context;
			let { pack, retail, vipPrice, promotionPrice, currency } = data;
			let price = this.minPrice(vipPrice, promotionPrice) || retail;
			let { cApp } = this.controller;
			let { cart } = cApp;
			if (value > 0)
				await cart.add(product, pack, value, price, retail, currency);
			else
				await cart.removeItem([{ productId: product.id, packId: pack.id }]);
		}

		let uiSchema: UiSchema = {
			items: {
				pack: { visible: false },
				retail: { visible: false },
				vipPrice: { visible: false },
				promotionPrice: { visible: false },
				currency: { visible: false },
				quantity: {
					widget: 'custom',
					label: null,
					className: 'text-center',
					WidgetClass: MinusPlusWidget,
					onChanged: onQuantityChanged
				} as UiCustom
			}
		}
	
        let { retail, vipPrice, promotionPrice } = item;
        let right = null;
        if (retail) {
            let price: number = this.minPrice(vipPrice, promotionPrice);
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <Form schema={this.schema} uiSchema={uiSchema} formData={item} />
                </div>
            </div >
        } else {
            right = <small>请询价</small>
        }
        return right;
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    render(product: Product): JSX.Element {
        //let { currentSalesRegion } = this.controller.cApp;
        //return <this.content product={product} SalesRegionId={currentSalesRegion} discount={discount} />;
        let { renderDeliveryTime } = this.controller;
		//this.initPrices(product, SalesRegionId, discount);
		let {prices} = product;
		return <>{prices?.map((v: any, index: number) => {
			let { pack, retail } = v;
			if (!retail) return <small key={0}>请询价</small>;
			return <div className="px-2" key={pack.id}>
				<div className="row">
					<div className="col-6">
						<div><b>{tv(pack)}</b></div>
						<div>{renderDeliveryTime(pack)}</div>
					</div>
					<div className="col-6">
						{this.renderPrice(product, v)}
					</div>
				</div>
			</div>;
		})}</>;
		/*
        return <>
            {priceUI}
		</>;
		*/
    }

	/*
    private content = observer((param?: any) => {
        let priceUI;
        let { product, SalesRegionId, discount } = param;

        let { renderDeliveryTime } = this.controller;
        this.initPrices(product, SalesRegionId, discount);
        if (this.prices && this.prices.length > 0) {
            priceUI = this.prices.map((v: any, index: number) => {
                let { pack, retail } = v;
                if (retail) {
                    return <div className="px-2" key={pack.id}>
                        <div className="row">
                            <div className="col-6">
                                <div><b>{tv(pack)}</b></div>
                                <div>{renderDeliveryTime(pack)}</div>
                            </div>
                            <div className="col-6">
                                {this.renderPrice(v)}
                            </div>
                        </div>
                    </div>;
                } else {
                    return <small>请询价</small>
                }
            });
        }
        return <>
            {priceUI}
        </>;
	})
	*/
}
