import * as React from 'react';
import { View, tv, ObjectSchema, NumSchema, UiSchema, UiCustom, Context, Form, ItemSchema, Tuid } from 'tonva';
import { CProduct } from '../CProduct';
import { MinusPlusWidget } from 'tools';
import { Product } from '../../store';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MinusPlusWidgetTable } from 'tools/minusPlusWidget';

/**
 * 显示产品包装价格，配合CProduct.renderProductPrice使用
 * 需要的参数product必须是BoxId(或者object?)
 */
export class VPrice extends View<CProduct> {
    isShowTable: boolean = false;
    protected schema: ItemSchema[] = [
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

    protected renderPrice(product:Product, item: any) {
		let onQuantityChanged = async (context: Context, value: any, prev: any):Promise<void> => {
			let { data } = context;
			let { pack, retail, vipPrice, promotionPrice, currency } = data;
			let price = this.minPrice(vipPrice, promotionPrice) || retail;
			await this.controller.cApp.store.cart.changeQuantity(product, pack, value, price, retail, currency);
			/*
			let { cApp } = this.controller;
			let { cCart } = cApp;
			if (value > 0)
				await cCart.add(product, pack, value, price, retail, currency);
			else
				await cCart.removeItem([{ productId: product.id, packId: pack.id }]);
			*/
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
					WidgetClass: !this.isShowTable ? MinusPlusWidget : MinusPlusWidgetTable,
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
                if (this.isShowTable) {
                    retailUI = <del className="text-danger"><span className="text-muted">¥{retail}</span></del>;
                } else {
                    retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
                }
            }
            else {
                price = retail;
            }
            right = <div className="row">
                <div className="col-sm-6 mb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 mb-0 d-flex justify-content-end align-items-center">
                    <Form schema={this.schema} uiSchema={uiSchema} formData={item} />
                </div>
            </div >

            if (this.isShowTable) 
                right = <>
                <td data-title="价格" className=" red">
                    <div className="item-product-price">
                        <small className="text-muted">{retailUI}</small>&nbsp;{retailUI ? '/' : ''} &nbsp;
                        <span className="text-danger">¥ <span>{price}</span></span>
                    </div>
                </td>
                <td data-title="数量">
                    <div className="d-flex justify-content-end">{/* d-flex justify-content-md-center justify-content-sm-end justify-content-end */}
                        <Form schema={this.schema} uiSchema={uiSchema} formData={item} />
                    </div>
                </td>
            </ >
        } else {
            right = <small>请询价</small>
            if (this.isShowTable) right = <><td className="py-3">请询价</td><td></td></>;
        }
        return right;
    }

    protected minPrice(vipPrice: any, promotionPrice: any) {
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
					<div className="col-5 d-flex flex-column justify-content-center mb-2 pb-1">
						<div><b>{tv(pack)}</b></div>
						<div>{renderDeliveryTime(pack)}</div>
					</div>
					<div className="col-7 mb-0">
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

/**
 * 应用场景 产品列表显示包装 table
 */
export class VPriceWithTr extends VPrice {
    isShowTable: boolean = true;

    render(product: Product): JSX.Element {
		let {prices} = product;
        return React.createElement(observer(() => {
            return  <>{prices?.map((v: any, index: number) => {
            let { pack } = v;
            
            return <tr className="article-product-list text-right">
                    <td data-title="包装">
                        {tv(pack)}
                    </td>
                <td data-title="库存"> <span>{this.controller.renderDeliveryTime(pack,"dark-333")}</span></td>
                {this.renderPrice(product, v)}
            </tr>
            })}</>;
        }))
    }
}

/**
 * 根据产品编号/包装规格查询产品，在客户手动输入或提交excel表格下单的场景下使用
 */
export class VPriceQuickOrder extends VPrice {
    @observable selectPack: any;
    renderPrice(param: any, item: any) {
        let onQuantityChanged = async (context: Context, value: any, prev: any):Promise<void> => {
            let { data } = context;
            let { pack, retail, vipPrice, promotionPrice, currency } = data;
            let { cApp } = this.controller;
            let { cQuickOrder } = cApp;
            await cQuickOrder.changeProductQuantity(param, pack, value);
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
	
        let { retail, vipPrice, promotionPrice, quantity } = item;
        // if (!quantity) return;
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
                <div className="col-sm-6 mb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 mb-0 d-flex justify-content-end align-items-center">
                    <Form schema={this.schema} uiSchema={uiSchema} formData={item} />
                </div>
            </div >
        } else {
            right = <small>请询价</small>
            if (this.isShowTable) right = <><td className="py-3">请询价</td><td></td></>;
        }
        return right;
    }

    render(param: any): JSX.Element {
        return React.createElement(observer(() => {

        let { id, product, QPacks, noPackTip, selectedPack } = param;
        if (!product) return <></>;
        if (QPacks && !QPacks.length) return <div className="text-danger small align-self-center col-6">{noPackTip}</div>;
        let { cApp } = this.controller;
        let { cQuickOrder } = cApp;
        this.selectPack = selectedPack;
        let { renderDeliveryTime } = this.controller;
        let pricesByPackUI = this.selectPack ? <div className="px-2 col-6 col-sm-7 mb-0" key={this.selectPack?.pack?.id + 1}>
            {this.renderPrice(param, this.selectPack)}
        </div> : null;
        return <>
            <div className="row mx-0">
                <div className="col-6 col-sm-5 d-flex flex-column justify-content-center">
                    <div>
                        <select defaultValue={this.selectPack?.pack?.id || ''} onChange={(e: any) => {
                            this.selectPack = QPacks.find((i: any) => i.pack.id == e.target.value);
                            cQuickOrder.selectedPack(param, this.selectPack);
                        }} name="" id="" className="form-control" >
                            <option hidden value="">选择包装</option>
                            {
                                QPacks?.map((v: any,index:number) => {
                                    return <option key={index} value={v.pack.id}>{v.pack.obj?.radiox !==1 ? v.pack.obj?.radiox + "*" : ""} {v.pack.obj?.radioy}{v.pack.obj?.unit}</option>
                                })
                            }
                        </select>
                    </div>
                    {this.selectPack && <div className="small">{renderDeliveryTime(this.selectPack?.pack)}</div>}
                </div>
                {
                    this.selectPack && this.selectPack.pack
                        ? <>{pricesByPackUI}</>
                    :null
                }
            </div>
            </>        
        }))
    }
}