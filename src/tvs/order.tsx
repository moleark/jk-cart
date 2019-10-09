import { tvProduct } from "./product";
import { tvAddress, tvCountry, tvCurrency } from "./common";
import { tvContact } from "./customer";

export const order = {
    productx: tvProduct,
    address: tvAddress,
    country: tvCountry,
    province: tvCountry,
    city: tvCountry,
    county: tvCountry,
    contact: tvContact,
    currency: tvCurrency,
}
