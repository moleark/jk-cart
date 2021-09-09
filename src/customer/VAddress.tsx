import * as React from 'react';
import { VPage, Page, BoxId, tv, FA } from 'tonva-react';

import { CAddress } from './CAddress';
import { observer } from 'mobx-react';
import { xsOrIpad } from '../tools/browser';
import { pageHTitle } from 'tools/pageHeaderTitle';
import { GLOABLE } from 'global';

export class VAddress extends VPage<CAddress> {
    protected provinceId: number;
    protected cityId: number;
    protected countyId: number;
    protected backLevel = 0;

    async open(param: any) {
        let provinces = await this.controller.getCountryProvince(GLOABLE.CHINA);
        this.openPage(this.page, { provinces: provinces });
    }

    private page = (param: any) => {
        this.backLevel++;
        let header = this.titleHeader('选择所在省市');
        return <Page header={header}>
            <>
                {pageHTitle('选择所在省市')}
                <div className="row no-gutters pb-5">
                    {param.provinces.map((v: any) => this.renderPCC(v.province, this.onProvinceClick))}
                </div>
            </>
        </Page>
    }

    titleHeader = (title:string) => {
        if (xsOrIpad) return title;
        return '';
    }

    renderPCC = (pcc: BoxId, onClick: any) => {
        return <div key={pcc.id} className="col-6 col-md-4 col-lg-3 cursor-pointer">
            {tv(pcc, (value) => {
                let { id, chineseName } = value;
                return <>
                    <div className="pt-1 pb-1 px-2" onClick={() => onClick(id)}
                        style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
                    >
                        <span className="ml-1 align-middle">
                            <FA name="chevron-right" className="text-info small" />
                            &nbsp; {chineseName}
                        </span>
                    </div>
                </>;
            })}
        </div>
    }

    onProvinceClick = async (provinceId: any) => {
        this.provinceId = provinceId;
        let cities = await this.controller.getProvinceCities(provinceId);
        if (cities) {
            let len = cities.length;
            if (len === 1) {
                await this.onCityClick(cities[0].city.id);
                return;
            }
            if (len > 1) {
                this.backLevel++;
                let header = this.titleHeader('选择所在城市');
                this.openPageElement(<Page header={header}>
                    <>
                        {pageHTitle('选择所在城市')}
                        <div className="row no-gutters pb-5">
                            {cities.map(v => this.renderPCC(v.city, this.onCityClick))}
                        </div>
                    </>
                </Page>);
                return;
            }
        } else {
            this.closePage(this.backLevel);
            this.saveAddress();
        }
    }

    onCityClick = async (cityId: any) => {
        this.cityId = cityId;
        let counties = await this.controller.getCityCounties(cityId);
        if (counties && counties.length > 0) {
            this.backLevel++;
            let header = this.titleHeader('选择所在区县');
            this.openPageElement(<Page header={header}>
                <>
                    {pageHTitle('选择所在区县')}
                    <div className="row no-gutters pb-5">
                        {counties.map(v => this.renderPCC(v.county, this.onCountyClick))}
                    </div>
                </>
            </Page>);
        } else {
            this.closePage(this.backLevel);
            this.saveAddress();
        }
    }

    onCountyClick = async (countyId: any) => {
        this.countyId = countyId;
        console.log('this.backLevel',this.backLevel);
        
        this.closePage(this.backLevel);
        this.saveAddress();
    }

    saveAddress = async () => {
        await this.controller.saveAddress(GLOABLE.CHINA, this.provinceId, this.cityId, this.countyId);
        // await this.controller.cApp.cAddress.saveAddress(GLOABLE.CHINA, this.provinceId, this.cityId, this.countyId);
    }
}


export class VAddressRW extends VAddress {
    onProvinceClick = async (provinceId: any) => {
        this.provinceId = provinceId;
        let cities = await this.controller.cApp.cAddress.getProvinceCities(provinceId);
        if (cities) {
            let { cOrder } = this.controller.cApp;
            let len = cities.length;
            if (len === 1) {
                cOrder.modalTitleS['countyChoice'].preLevel = 'provinceChoice';
                await this.onCityClick(cities[0].city.id);
                return;
            }
            if (len > 1) {
                this.backLevel++;
                cOrder.cities = cities;
                cOrder.modalTitle = 'cityChoice';
                cOrder.modalTitleS['countyChoice'].preLevel = 'cityChoice';
                return;
            }
        } else {
            this.saveAddress();
        }
    }

    onCityClick = async (cityId: any) => {
        this.cityId = cityId;
        let counties = await this.controller.cApp.cAddress.getCityCounties(cityId);
        if (counties && counties.length > 0) {
            this.backLevel++;
            this.controller.cApp.cOrder.counties = counties;
            this.controller.cApp.cOrder.modalTitle = 'countyChoice';
        } else {
            this.saveAddress();
        }
    }

    onCountyClick = async (countyId: any) => {
        this.countyId = countyId;
        this.saveAddress();
    }

    saveAddress = async () => {
        await this.controller.cApp.cOrder.saveAddress(GLOABLE.CHINA, this.provinceId, this.cityId, this.countyId);
    }
}

export class VProvince extends VAddressRW{
    render(param?: any): JSX.Element {
        return <div className="row no-gutters">
                {param.provinces.map((v: any) => this.renderPCC(v.province, this.onProvinceClick))}
            </div>
    }
}

export class VCity extends VAddressRW{
    render(param?: any): JSX.Element {
        return React.createElement(observer(() => {
            return <div className="row no-gutters">
                {param?.cities.map((v:any) => this.renderPCC(v.city, this.onCityClick))}
            </div>
        }))
    }
}

export class VCounty extends VAddressRW{
    render(param?: any): JSX.Element {
        return React.createElement(observer(() => {
            return <div className="row no-gutters">
                {param?.counties.map((v: any) => this.renderPCC(v.county, this.onCountyClick))}
            </div>
        }))
    }
}