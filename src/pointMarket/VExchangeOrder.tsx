import * as React from 'react';
import { VPage, Page, LMR, FA, tv, List, autoHideTips } from 'tonva-react';
import { CPointProduct, OrderSource } from './CPointProduct';
import { observer } from 'mobx-react-lite';
import { observable, makeObservable } from 'mobx';
import { PointProductImage } from 'tools/productImage';
import { randomColor } from 'tools/randomColor';
import { pointIcon } from 'tools/images';
import { xs } from 'tools/browser';
import { VModalC } from './view/VModalC';

export class VExchangeOrder extends VPage<CPointProduct> {
	//@observable protected shippingAddressIsBlank: boolean = false;
	protected shippingAddressIsBlank = observable.box<boolean>();
    protected pageDesc: string = OrderSource.EXCHANGEORDER;
    disBtn: boolean = false;

    constructor(c: CPointProduct) {
        super(c);
        makeObservable(this, {
            disBtn: observable
        });
    }

    async open(param?: any) {
        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    protected renderPointProduct = (pointProduct: any) => {
        let { product, quantity } = pointProduct;
		if (quantity <= 0) return;
		let style:React.CSSProperties = { border:`2px solid ${randomColor()}` };
		// let style:React.CSSProperties = { height: '35vw',border:`2px solid ${randomColor()}` };
		return tv(product, (v) => {
			return <div className="w-100 d-flex flex-column mb-4">{/* 20vh  */}
				<div title={v.description} className="w-100 z-height" style={style} >
					<PointProductImage chemicalId={v.imageUrl} className="w-100 h-100" />
				</div>
				<div className="small w-100">
					<div className="text-truncate w-100 my-1">{v.descriptionC}</div>
					<div className="d-flex justify-content-between">
						{/*  <div>
							<FA name='database' className="text-warning" />
							<span className="text-danger h5"> {point}</span>
						</div> */}
						<div className='d-flex'>
							<img src={pointIcon} alt="" style={{ height: 24 }} />
							<span className="text-danger h5 m-0 ml-1 align-self-end"> {v.point}</span>
						</div>
						<div>*{quantity}</div>
					</div>
				</div>
			</div>
		});
    }

    protected onSubmitOwn = async () => {
        let { submitOrder } = this.controller;
        await submitOrder();
    }

    protected onSubmit = async () => {
        let { orderData, cApp, createOrderStocks } = this.controller;
        let { cLottery } = cApp;
        // 必填项验证
        let { shippingContact } = this.pageDesc === OrderSource.EXCHANGEORDER ? orderData : cLottery.prizeOrderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank.set(true);
            //setTimeout(() => this.shippingAddressIsBlank = false, GLOABLE.TIPDISPLAYTIME);
            return;
        };
        await this.onSubmitOwn();
        this.disBtn = true;
    }

	/*
    protected renderTipsUI = () => {
        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />
        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        return {
            chevronRight,
            shippingAddressBlankTip
        }
	}
	*/

    protected renderContact = () => {
        //let { chevronRight, shippingAddressBlankTip } = this.renderTipsUI();
        let { orderData, onSelectShippingContact, cApp } = this.controller;
        let data = this.pageDesc === OrderSource.EXCHANGEORDER ? orderData.shippingContact : cApp.cLottery.prizeOrderData.shippingContact;
        return <div className="px-2">
            <div className="row py-3 bg-white mb-1" onClick={() => { xs ? onSelectShippingContact() : this.changeVisible(true) }}>
                <div className="col-3 text-muted pr-0">收货地址:</div>
                <div className="col-9">
					<LMR className="w-100 align-items-center"
						right={<FA name="chevron-right" className="cursor-pointer" />}>
						{tv(data, undefined, undefined, this.nullContact)}
					</LMR>
                    {/*shippingAddressBlankTip*/}
					{autoHideTips(this.shippingAddressIsBlank, ()=><div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>)}
                </div>
            </div>
        </div>
    }

    changeVisible = (visible?: boolean) => {
        this.controller.visible = visible || false;
    };

    protected page = observer(() => {
        let { pointProductsSelected, pointToExchanging: pointsSum ,visible} = this.controller;
        let header = <div className="w-100 text-center">兑换确认</div>;
        let footer = <div className="d-block">
            {autoHideTips(this.noStockTip)}
            <div className="w-100 px-3 d-flex justify-content-between">
                <div>总计:<span className="text-danger ml-2 mr-1 h2" >{pointsSum}</span>分</div>
                <button disabled={this.disBtn} type="button" className="btn btn-danger m-1" style={{backgroundColor:'#dc3545'}} onClick={this.onSubmit}>确认兑换</button>
            </div>
        </div>;
        let vModel = React.createElement(observer(() => {
            return <VModalC title="地址管理" visible={visible} width={520}
                onCancel={()=>{this.changeVisible()}} onClose={()=>{this.changeVisible()}} footer={null}>
                {this.controller.renderContnet()}
            </VModalC>
        }))
        return <Page header={header} right={<></>} footer={footer}>
            {this.renderContact()}
            {vModel}
            <List items={pointProductsSelected} item={{
                render: this.renderPointProduct,
                className: 'col-6 col-md-4 col-lg-3 px-3 bg-transparent'
                // className: 'w-50 px-3'
            }}
                className="row mx-0 mt-2 bg-transparent"
                // className="d-flex flex-wrap bg-transparent mt-2"
            ></List>
        </Page>
    })
}


/**
 * 领取奖品页面
 */
export class VMyPrizeExchangeOrder extends VExchangeOrder {
    //@observable shippingAddressIsBlank: boolean = false;
    protected pageDesc: string = OrderSource.PRIZEORDER;

    renderPointProduct = (pointProduct: any) => {
        return <div>11111</div>
    }

    /*  protected onSubmitOwn = async () => {
         let { cLottery } = this.controller.cApp;
         await cLottery.submitOrder();
     } */

    protected page = observer(() => {
        let { cApp } = this.controller;
        let { cLottery } = cApp;
        let footer = <div className="d-block">
            <div className="w-100 px-3 d-flex justify-content-end">
                <button type="button" className="btn btn-danger m-1" onClick={this.onSubmit}>确认领取</button>
            </div>
        </div>;

        return <Page header="奖品领取预览" footer={footer}>
            {this.renderContact()}
            <List items={cLottery.myPrizeLib} item={{ render: this.renderPointProduct }}

            ></List>
        </Page>
    })
}