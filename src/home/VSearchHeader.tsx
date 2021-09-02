import { View, nav, SearchBox } from 'tonva-react';
import { CHome } from './CHome';


export class VSearchHeader extends View<CHome> {

    private onSearch = async (key: string, param: 'home' | 'insearch' | 'productdetail') => {
        let { cProduct, topKey } = this.controller.cApp;
        if (param !== 'home') {
            nav.popTo(topKey);
        }
        cProduct.start({ key: key, type: 1 });
    }

    render(param: 'home' | 'insearch' | 'productdetail') {
        let size: any = param === 'home' ? "md" : 'sm';
        return <SearchBox className="w-100"
            size={size}
            allowEmptySearch = {true}
            onSearch={(key: string) => this.onSearch(key, param)}
            placeholder="搜索品名、编号、CAS、MDL等" />
    }
}