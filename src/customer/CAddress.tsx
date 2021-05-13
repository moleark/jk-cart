import { VAddress } from './VAddress';
import { CUqBase } from 'uq-app';
import { GLOABLE } from 'global';

export class CAddress extends CUqBase {
    provinceId: number;
    cityId: number;
    countyId: number;
    backLevel = 0;

    protected async internalStart() {
        let provinces = await this.getCountryProvince(GLOABLE.CHINA);
		this.backLevel = 0;
        this.openVPage(VAddress, provinces);
    }

    getCountryProvince = async (countryId: number): Promise<any[]> => {
        return await this.uqs.common.GetCountryProvinces.table({ country: countryId });
    }

    getProvinceCities = async (provinceId: number): Promise<any[]> => {
        return await this.uqs.common.GetProvinceCities.table({ province: provinceId });
    }

    getCityCounties = async (cityId: number): Promise<any[]> => {
        return await this.uqs.common.GetCityCounties.table({ city: cityId });
    }

    saveAddress = async (): Promise<any> => {
        let { Address } = this.uqs.common;
		let countryId =  GLOABLE.CHINA;
        let newAddress = await Address.save(undefined, { 
			country: countryId, 
			province: this.provinceId, 
			city: this.cityId, 
			county: this.countyId });
        let addressId = newAddress && Address.boxId(newAddress.id);
        this.returnCall(addressId);
    }
}
