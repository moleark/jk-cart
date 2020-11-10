import { CUqApp } from "../../tapp/CBase";
import { CProduct } from "../CProduct";
import { CFavorites } from "customer/CFavorites";
/*
export class CAppProduct extends CUqApp {

    cProduct: CProduct;
    cFavorites: CFavorites;

    protected async internalStart(key: any) {
        await super.init();

        this.cProduct = this.newC(CProduct);
        this.cFavorites = this.newC(CFavorites);

        this.cProduct.start(key);
        // this.cProduct.showProductDetail(1000);
    }

}

export class CAppProductDetail extends CUqApp {

    cProduct: CProduct;
    cFavorites: CFavorites;

    protected async internalStart(productId: any) {
        await super.init();

        this.cProduct = this.newC(CProduct);
        this.cFavorites = this.newC(CFavorites);

        this.cProduct.showProductDetail(productId);
    }

}
*/