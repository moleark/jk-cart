import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, Form, ObjectSchema, NumSchema, ArrSchema, UiSchema, UiArr, FormField } from 'tonva';
import { FA } from 'tonva';
import { tv } from 'tonva';
import { MinusPlusWidget } from '../tools';
import { CCart } from './CCart';
import { CartPackRow, CartItem2 } from './Cart';

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
                    { name: 'quantity', type: 'number' } as NumSchema,
                    { name: 'currency', type: 'object' } as ObjectSchema
                ]
            }
        ],
    } as ArrSchema
];

export class VCart extends VPage<CCart> {
    async open() {
        this.openPage(this.page);
    }

    protected CheckOutButton = observer(() => {
        let { checkOut, cApp } = this.controller;
        let { cart } = cApp;
        let amount = cart.amount.get();
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} (¥{amount})</> :
            <>{check}</>;
        return <div className="d-flex justify-content-center">
            <button className="btn btn-success w-75 mx-5"
                type="button"
                onClick={checkOut} disabled={amount <= 0}>
                {content}
            </button>
        </div>;
    });

    render(params: any): JSX.Element {
        return <this.tab />;
    }

    private renderCartItem = (item: CartItem2) => {
        let { product } = item;
        let { controller } = this;
        let { onProductClick, renderCartProduct } = controller;
        return <div className="pr-1">
            <div className="row">
                <div className="col-lg-6 pb-3" onClick={() => onProductClick(product)}>
                    {renderCartProduct(product)}
                </div>
                <div className="col-lg-6"><FormField name="packs" /></div>
            </div>
        </div>;
    }

    private packsRow = (item: CartPackRow) => {
        let { pack, price, currency } = item;

        return <div className="px-2">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-6c mr-4 text-right"><span className="text-danger h5">¥{price}</span></div>
                <FormField name="quantity" />
            </div>
            <div>{this.controller.renderDeliveryTime(pack)}</div>
        </div>;
    }

    private uiSchema: UiSchema = {
        selectable: true,
        deletable: true,
        restorable: true,
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
                                WidgetClass: MinusPlusWidget,
                                onChanged: this.controller.onQuantityChanged as any
                            }
                        },
                    } as UiArr
                }
            } as UiArr
        }
    }

    protected cartForm = observer(() => {
        let { cart } = this.controller.cApp;
        let { data: cartData } = cart;
        return <Form className="bg-white flex-fill overflow-auto" schema={cartSchema} uiSchema={this.uiSchema} formData={cartData} />
    });

    private empty() {
        return <div className="py-5 text-center bg-white">你的购物车空空如也</div>
    }

    private page = observer((params: any): JSX.Element => {
        let { cart } = this.controller.cApp;
        let footer: any, content: any;
        if (cart.count.get() === 0 && cart.cartItems.length === 0) {
            content = this.empty();
            footer = undefined;
        }
        else {
            content = <this.cartForm />;
            footer = <this.CheckOutButton />;
        }
        return <Page header="购物车" footer={footer}>
            {content}
        </Page>;
    })

    private tab = observer(() => {
        let { cart } = this.controller.cApp;
        let header = <header className="py-2 text-center bg-info text-white">
            <FA className="align-middle" name="shopping-cart" size="2x" /> &nbsp; <span className="h5 align-middle">购物车</span>
        </header>;
        if (cart.count.get() === 0 && cart.cartItems.length === 0) {
            return <>
                {header}
                {this.empty()}
            </>;
        }
        return <>
            <this.cartForm />
            <this.CheckOutButton />
        </>;
		/*
        return <div className="bg-white d-flex flex-column h-100">
            {header}
            <this.cartForm />
            <footer className="p-3 d-flex justify-content-center"><this.CheckOutButton /></footer>
		</div>
		*/
    });

    header() {
        let header = <header className="py-2 text-center bg-info text-white">
            <FA className="mr-3" name="shopping-cart" size="lg" />
            <span >购物车</span>
        </header>;
        return header;
    }
	/*
	footer() {
		return <div className="p-3 d-flex justify-content-center"><this.CheckOutButton /></div>;
	}
	*/

    content() {
        return <this.tab />
    }
}