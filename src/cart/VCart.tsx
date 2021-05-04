import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Form, ObjectSchema, NumSchema, ArrSchema, UiSchema, UiArr, FormField, UiCustom, FA, tv, Ax } from 'tonva';
import { MinusPlusWidget } from '../tools';
import { CCart } from './CCart';
import { CartPackRow, CartItem } from '../store';
import { xs } from 'tools/browser';

const cartSchema = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'checked', type: 'boolean' },
            { name: 'product', type: 'object' } as ObjectSchema,
            {
                name: 'packs', type: 'arr', arr: [
                    { name: 'pack', type: 'object' } as ObjectSchema,
                    { name: 'price', type: 'number' } as NumSchema,
                    { name: 'retail', type: 'number' } as NumSchema,
                    { name: 'quantity', type: 'number' } as NumSchema,
                    { name: 'currency', type: 'object' } as ObjectSchema
                ]
            }
        ],
    } as ArrSchema
];

export class VCart extends VPage<CCart> {
    /*
    async open() {
        this.openPage(this.page);
    }
    */

    protected CheckOutButton = observer(() => {
        let { checkOut, strikeOut, cApp, editButton } = this.controller;
		let { cart } = cApp.store;
        let amount = cart.amount;
		/*
        let check = editButton ? '删除' : "去结算";
        let content = editButton ? <>{check}</> : amount > 0 ?
            <>{check} (¥{amount})</> :
            <>{check}</>;
		*/
        if (editButton) {
			let check = editButton ? '删除' : "去结算";
			let content = editButton ? <>{check}</> : amount > 0 ?
				<>{check} (¥{amount})</> :
				<>{check}</>;
			return <div className="d-flex justify-content-end">
                <button className="btn btn-success w-25 mx-5" style={{ background: '#28a745' }}
                    type="button"
                    onClick={strikeOut}>
                    {content}
                </button>
            </div>;
        } else {
			let check = editButton ? '删除' : "去结算";
			let content = editButton ? <>{check}</> : amount > 0 ?
				<>{check} (¥{amount})</> :
				<>{check}</>;
			return <div className="d-flex justify-content-center">
                <button className="btn btn-success mx-5" style={{ background: '#28a745' }}
                    type="button"
                    onClick={checkOut} disabled={amount <= 0}>
                    {content}
                </button>
            </div>;
        }
    });

    render(params: any): JSX.Element {
        return <this.tab />;
    }

    private renderCartItem = (item: CartItem) => {
        let { product } = item;
        let { controller } = this;
        let { onItemClick, renderCartProduct } = controller;
        return <div className="row justify-content-between">
            <div className="col-lg-5 px-0" >{/* onClick={() => onItemClick(item)} */}
                <Ax href={'/product/' + product.id}>
                    {renderCartProduct(product)}
                </Ax>
            </div>
            <div className="col-lg-6 px-0 mt-2"><FormField name="packs" /></div>
        </div>
    }

    private packsRow = (item: CartPackRow) => {
        let { pack, price } = item;
        return <>
            <div className="px-2 d-flex align-items-center">
                <div className="col-4 px-0"><b>{tv(pack)}</b></div>
                <div className="col-4 px-0"><span className="text-danger h5">¥{price}</span></div>
                <div className="col-4 px-0"><FormField name="quantity" /></div>
            </div>
            {/* <div>{this.controller.renderDeliveryTime(pack)}</div> */}
        </>
        /* return <div className="px-2">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-6c mr-4 text-right"><span className="text-danger h5">¥{price}</span></div>
                <FormField name="quantity" />
            </div>
            <div>{this.controller.renderDeliveryTime(pack)}</div>
        </div>; */
    }

    private uiSchema: UiSchema = {
        selectable: true,
        deletable: true,
        restorable: false,
        items: {
            list: {
                widget: 'arr',
                Templet: this.renderCartItem,
                ArrContainer: (label: any, content: JSX.Element) => content,
                RowContainer: (content: JSX.Element) => <div className="py-3">{content}</div>,
                items: {
                    packs: {
                        widget: 'arr',
                        Templet: this.packsRow,
                        selectable: false,
                        deletable: false,
                        ArrContainer: (label: any, content: JSX.Element) => content,
                        RowContainer: (content: JSX.Element) => content,
                        RowSeperator: <div className="border border-gray border-top my-3" />,
                        items: {
                            quantity: {
                                widget: 'custom',
                                className: 'text-center',
                                WidgetClass: MinusPlusWidget as any,
                                onChanged: this.controller.onQuantityChanged
                            } as UiCustom
                        },
                    } as UiArr
                },
                onDeleted: this.controller.onRemoveCartItem,
            } as UiArr
        }
    }

    protected cartForm = observer(() => {
        let { cApp } = this.controller;
		let { cart } = cApp.store;
        let { cartItems } = cart;
        let data = { list: cartItems };
        return <>
            {!xs ? <div className="col-lg-12 px-3"><h1 className="mt-4 mb-3">购物车</h1></div> : null}
            <div className="d-none d-lg-block">
                <div className="w-100 border-bottom ">
                    <div className="col-lg-6 d-flex ml-auto mr-0 mb-2 px-2 font-weight-bolder h6">
                        <div className="col-4">包装</div>
                        <div className="col-4">单价</div>
                        <div className="col-4 text-left pl-0" style={{ textIndent: '2em' }}>数量</div>
                    </div>
                </div>
            </div>

            <Form className="bg-white flex-fill overflow-auto reset-z-fieldset"
                schema={cartSchema} uiSchema={this.uiSchema} formData={data} />
        </>
    });

    private empty() {
        return <div className="mt-1 py-5 text-center bg-white">你的购物车空空如也</div>
    }

    /**
     * 是否编辑
     */
    private whetherToEdit = () => {
        // let { cart } = this.controller.cApp;
        // cart.editButton.set(!cart.editButton.get());
    }

    /*
    private page = observer((params: any): JSX.Element => {
        let { cart } = this.controller.cApp;
        let footer: any, content: any;
        let cancel = cart.editButton.get() ? '取消' : '编辑';
        let right = <small className="mr-3" onClick={this.whetherToEdit}>{cancel}</small>
        if (cart.count.get() === 0 && cart.cartItems.length === 0) {
            content = this.empty();
            footer = undefined;
        }
        else {
            content = React.createElement(this.cartForm);
            footer = React.createElement(this.CheckOutButton);
        }
        // return <Page header="购物车" right={right} footer={footer}>
        //     {content}
        // </Page>;
        return <Page header="购物车" footer={footer}>
            {content}
        </Page>;
    })
    */

    // header() {return <div className="navheader">购物车</div>}
    header() {
        if (!xs) return '';
        return <div className="navheader">购物车</div>;
    }
    footer() {
        return  React.createElement(observer(() => {
            let { cApp } = this.controller;
			let { cart } = cApp.store;
            let footer: any;
            if (cart.count === 0 && cart.cartItems && cart.cartItems.length === 0) {
                footer = undefined;
            }
            else {
                footer = React.createElement(this.CheckOutButton);
            }
            return footer;
        }));
    }

    content() {
        return  React.createElement(observer(() => {
            let { cApp } = this.controller;
			let { cart } = cApp.store;
            let content: any;
            if (cart.count === 0 && cart.cartItems && cart.cartItems.length === 0) {
                content = this.empty();
            }
            else {
                content = React.createElement(this.cartForm);
            }
            return <>
                {content}
                {this.renderQuickOrder()}
            </>;
        }));
    }

    private tab = observer(() => {
        let { cApp } = this.controller;
		let { cart } = cApp.store;
        let header = <header className="py-2 text-center bg-info text-white">
            <FA className="align-middle" name="shopping-cart" size="2x" /> &nbsp; <span className="h5 align-middle">购物车</span>
        </header>;
        if (cart.count === 0 && cart.cartItems.length === 0) {
            return <>
                {header}
                {this.empty()}
            </>;
        }

        let content = React.createElement(this.cartForm);
        let footer = React.createElement(this.CheckOutButton);
        return <>
            {content}
            {footer}
        </>;
    });

    renderQuickOrder = () => {
        let { cQuickOrder } = this.controller.cApp;
        return <div className="row mx-0 px-2 my-2">
                <div className="border rounded col-12 col-lg-6 p-2" style={{ background: "#f5f5f5" }}>
                <div className="font-weight-bolder">快速订购</div>
                <div className="small">按产品编号订购或上传您自己的产品列表，以快速将多个产品添加到购物车。</div>
                <Ax className="text-primary small ml-1" onClick={() => { cQuickOrder.openQuickOrder() }} href="/quickOrder">快速订购 &gt;&gt; </Ax>
            </div>
        </div>
    };

    /*
    header() {
        let { cart } = this.controller.cApp;
        let cancel = cart.editButton.get() ? '取消' : '编辑';
        let header = <header className="py-2 text-center bg-info text-white position-relative">
            <FA className="mr-3" name="shopping-cart" size="lg" />
            <span>购物车</span>
        </header>;
        return header;
    }
    */
    /*
    footer() {
        return <div className="p-3 d-flex justify-content-center"><this.CheckOutButton /></div>;
    }
    */
    /*
    content() {
        return <this.tab />
    }
    */
}